import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

const COLLECTION_NAME = 'updates';

export const updatesService = {
    // Get all updates
    getAllUpdates: async () => {
        if (!db) return [];
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error getting updates: ", error);
            return [];
        }
    },

    // Add a new update
    addUpdate: async (updateData) => {
        if (!db) return false;
        try {
            await addDoc(collection(db, COLLECTION_NAME), {
                ...updateData,
                createdAt: serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error("Error adding update: ", error);
            return false;
        }
    },

    // Update an existing update
    updateUpdate: async (id, updateData) => {
        if (!db) return false;
        try {
            const updateRef = doc(db, COLLECTION_NAME, id);
            await updateDoc(updateRef, {
                ...updateData,
                updatedAt: serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error("Error updating update: ", error);
            return false;
        }
    },

    // Delete an update
    deleteUpdate: async (id) => {
        if (!db) return false;
        try {
            await deleteDoc(doc(db, COLLECTION_NAME, id));
            return true;
        } catch (error) {
            console.error("Error deleting update: ", error);
            return false;
        }
    }
};
