import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

const COLLECTION_NAME = 'ratings';

export const ratingsService = {
    // Add a new rating
    addRating: async (value) => {
        try {
            const docRef = await addDoc(collection(db, COLLECTION_NAME), {
                value: Number(value),
                timestamp: serverTimestamp(),
                userAgent: navigator.userAgent
            });
            return { id: docRef.id, value };
        } catch (error) {
            console.error("Error adding rating: ", error);
            throw error;
        }
    },

    // Get all ratings to calculate stats
    getAllRatings: async () => {
        try {
            const q = query(collection(db, COLLECTION_NAME), orderBy('timestamp', 'desc'));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error getting ratings: ", error);
            throw error;
        }
    },

    // Get statistics
    getStats: async () => {
        try {
            const ratings = await ratingsService.getAllRatings();
            const total = ratings.length;

            // Initialize counts for 1-5
            const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

            ratings.forEach(r => {
                const val = r.value;
                if (counts[val] !== undefined) {
                    counts[val]++;
                }
            });

            // Calculate percentages
            const stats = Object.keys(counts).map(key => {
                const count = counts[key];
                const percentage = total === 0 ? 0 : Math.round((count / total) * 100);
                return {
                    rating: Number(key),
                    count,
                    percentage
                };
            });

            return {
                total,
                breakdown: stats,
                recent: ratings.slice(0, 50) // Return last 50 for table
            };
        } catch (error) {
            console.error("Error calculating stats: ", error);
            throw error;
        }
    }
};
