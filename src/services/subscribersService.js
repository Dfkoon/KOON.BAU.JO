import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, serverTimestamp, writeBatch, updateDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

const COLLECTION_KEY = 'subscribers';
const CAMPAIGNS_COLLECTION = 'newsletter_campaigns';

export const subscribersService = {
    // Add a new subscriber (Public or Admin)
    subscribe: async (email) => {
        // Simulate network delay for UX
        await new Promise(resolve => setTimeout(resolve, 500));

        // Basic Regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, message: 'invalid_email' };
        }

        try {
            // Check for duplicates
            const q = query(collection(db, COLLECTION_KEY), where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                return { success: false, message: 'already_subscribed' };
            }

            await addDoc(collection(db, COLLECTION_KEY), {
                email,
                subscribedAt: new Date().toISOString(), // Use string format for consistency
                source: 'web'
            });

            return { success: true };
        } catch (error) {
            console.error("Error subscribing:", error);
            return { success: false, message: 'server_error', error };
        }
    },

    // Get all subscribers
    getAllSubscribers: async () => {
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION_KEY));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt));
        } catch (error) {
            console.error("Error fetching subscribers:", error);
            return [];
        }
    },

    // Delete a subscriber
    deleteSubscriber: async (id) => {
        try {
            await deleteDoc(doc(db, COLLECTION_KEY, id));
            return true;
        } catch (error) {
            console.error("Error deleting subscriber:", error);
            return false;
        }
    },

    // Delete ALL subscribers (Use Batch for atomicity/efficiency)
    deleteAllSubscribers: async () => {
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION_KEY));
            const batch = writeBatch(db);

            querySnapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            return true;
        } catch (error) {
            console.error("Error deleting all subscribers:", error);
            return false;
        }
    },



    // Send Newsletter (Real Sending with EmailJS)
    sendNewsletter: async ({ title, content, image }) => {
        try {
            // 0. Validate Env Vars
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                console.error("Missing EmailJS keys", { serviceId, templateId, publicKey });
                return { success: false, message: 'missing_keys' };
            }

            // 1. Get all subscribers
            const subscribers = await subscribersService.getAllSubscribers();
            if (subscribers.length === 0) {
                return { success: false, message: 'no_subscribers' };
            }

            // 2. Log the campaign in Firestore FIRST (as "sending")
            const campaignDoc = await addDoc(collection(db, CAMPAIGNS_COLLECTION), {
                title,
                content,
                image: image || null,
                sender: 'koon.bau.jo',
                recipientCount: subscribers.length,
                sentAt: serverTimestamp(),
                status: 'sending'
            });

            // 3. Iterate and Send Emails
            let successCount = 0;
            let failCount = 0;
            let lastError = null;

            for (const sub of subscribers) {
                try {
                    await emailjs.send(serviceId, templateId, {
                        title: title,
                        content: content,
                        image: image || '',
                        to_email: sub.email // Important: Make sure your template uses this or sets "To" field dynamically
                    }, publicKey);
                    successCount++;
                } catch (err) {
                    console.error(`Failed to send to ${sub.email}`, err);
                    lastError = err;
                    failCount++;
                }
                // Small delay to be nice to the API
                await new Promise(r => setTimeout(r, 500));
            }

            // 4. Update Campaign Status
            await updateDoc(campaignDoc, {
                status: 'completed',
                successCount,
                failCount
            });

            return { success: true, recipientCount: successCount, failed: failCount, lastError };
        } catch (error) {
            console.error("Error sending newsletter:", error);
            return { success: false, error: error.message || error };
        }
    }
};
