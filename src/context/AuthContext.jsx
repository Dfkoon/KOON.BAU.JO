import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen to Firebase Auth state changes
    useEffect(() => {
        // Check for local session first (for the hardcoded admin)
        try {
            const localAdmin = localStorage.getItem('koon_admin_session');
            if (localAdmin === 'true') {
                setCurrentUser({
                    uid: 'admin-local',
                    email: 'admin@bau.koon',
                    displayName: 'Admin (Local)',
                    role: 'admin'
                });
                setLoading(false);
                return;
            }
        } catch (e) {
            console.warn("LocalStorage access failed", e);
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Check if the user is the Admin from Env
                const isAdmin = user.email?.toLowerCase() === import.meta.env.VITE_ADMIN_EMAIL?.toLowerCase();

                // Fetch extra profile data from Firestore
                let profileData = {};
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        profileData = docSnap.data();
                    }
                } catch (e) {
                    console.error("Error fetching user profile", e);
                }

                const userData = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName || user.email.split('@')[0],
                    role: isAdmin ? 'admin' : (profileData.role || 'student'),
                    ...profileData, // completedMaterials, etc.
                    ...user
                };

                setCurrentUser(userData);
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = (email, password) => {
        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        if (cleanEmail === 'admin' && cleanPassword === 'admin123') {
            try {
                localStorage.setItem('koon_admin_session', 'true');
            } catch (e) {
                console.warn("LocalStorage set failed", e);
            }
            setCurrentUser({
                uid: 'admin-local',
                email: 'admin@bau.koon',
                displayName: 'Admin (Local)',
                role: 'admin'
            });
            return Promise.resolve();
        }
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (email, password, additionalData = {}) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // Create user document in Firestore
        try {
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                role: 'student',
                createdAt: new Date().toISOString(),
                completedMaterials: [],
                ...additionalData
            });
        } catch (e) {
            console.error("Error creating user profile", e);
        }

        return result;
    };

    const logout = () => {
        try {
            localStorage.removeItem('koon_admin_session');
        } catch (e) {
            console.warn("LocalStorage remove failed", e);
        }
        return signOut(auth);
    };

    // Helper to update current user data (e.g. progress)
    const updateCurrentUserResult = async (updates) => {
        if (!currentUser || !currentUser.uid) return;

        // Optimistic update
        setCurrentUser(prev => ({ ...prev, ...updates }));

        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, updates);
        } catch (e) {
            console.error("Error updating user profile", e);
            // Revert on failure? For now, we just log.
        }
    };

    const value = {
        currentUser,
        login,
        signup,
        logout,
        updateCurrentUserResult
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
