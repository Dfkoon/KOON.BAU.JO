const EVENTS_KEY = 'academic_calendar_events';
const SUGGESTIONS_KEY = 'calendar_suggestions';

// Initial dummy data to populate if empty
const INITIAL_EVENTS = [
    { title: 'First Semester Starts', date: '2025-10-01', description: 'Beginning of the academic year 2025/2026', type: 'official', id: 'evt-1' },
    { title: 'Midterm Exams', date: '2025-11-15', description: 'Midterm examination period', type: 'official', id: 'evt-2' },
    { title: 'Winter Break', date: '2026-01-20', description: 'End of first semester', type: 'official', id: 'evt-3' }
];

export const calendarService = {
    // --- Public: Get Official Events ---
    getAllEvents: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        let events = JSON.parse(localStorage.getItem(EVENTS_KEY));

        if (!events) {
            events = INITIAL_EVENTS;
            localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
        }

        // Sort by date
        return events.sort((a, b) => new Date(a.date) - new Date(b.date));
    },

    // --- Public: Suggest an Event ---
    suggestEvent: async (suggestionData) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        try {
            const suggestions = JSON.parse(localStorage.getItem(SUGGESTIONS_KEY) || '[]');
            const newSuggestion = {
                ...suggestionData,
                id: 'sug-' + Date.now(),
                status: 'pending',
                createdAt: new Date().toISOString()
            };
            suggestions.push(newSuggestion);
            localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(suggestions));
            return { success: true };
        } catch (error) {
            console.error("Error sending suggestion:", error);
            return { success: false, error };
        }
    },

    // --- Admin: Get Suggestions ---
    getSuggestions: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return JSON.parse(localStorage.getItem(SUGGESTIONS_KEY) || '[]');
    },

    // --- Admin: Approve Suggestion (Move to Official) ---
    approveSuggestion: async (id, data) => {
        try {
            // 1. Add to official events
            const events = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
            const newEvent = {
                ...data,
                id: 'evt-' + Date.now(),
                isOfficial: true,
                addedAt: new Date().toISOString()
            };
            events.push(newEvent);
            localStorage.setItem(EVENTS_KEY, JSON.stringify(events));

            // 2. Delete suggestion
            const suggestions = JSON.parse(localStorage.getItem(SUGGESTIONS_KEY) || '[]');
            const filtered = suggestions.filter(s => s.id !== id);
            localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(filtered));

            return true;
        } catch (error) {
            console.error("Error approving suggestion:", error);
            return false;
        }
    },

    // --- Admin: Reject/Delete Suggestion ---
    deleteSuggestion: async (id) => {
        try {
            const suggestions = JSON.parse(localStorage.getItem(SUGGESTIONS_KEY) || '[]');
            const filtered = suggestions.filter(s => s.id !== id);
            localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error("Error deleting suggestion:", error);
            return false;
        }
    },

    // --- Admin: Manage Official Events ---
    addEvent: async (eventData) => {
        try {
            const events = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
            events.push({
                ...eventData,
                id: 'evt-' + Date.now(),
                createdAt: new Date().toISOString()
            });
            localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
            return true;
        } catch (error) {
            console.error("Error adding event:", error);
            return false;
        }
    },

    deleteEvent: async (id) => {
        try {
            const events = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
            const filtered = events.filter(e => e.id !== id);
            localStorage.setItem(EVENTS_KEY, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error("Error deleting event:", error);
            return false;
        }
    }
};
