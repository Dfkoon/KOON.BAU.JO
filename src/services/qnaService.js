const LOCAL_STORAGE_KEY = 'sarhah_messages';

const getLocalMessages = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const saveLocalMessages = (messages) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
};

export const qnaService = {
    // Send a new question
    async sendQuestion(text) {
        await new Promise(resolve => setTimeout(resolve, 500));
        try {
            const messages = getLocalMessages();
            const newMessage = {
                id: 'msg-' + Date.now(),
                text,
                answer: null,
                isPublic: false,
                createdAt: new Date().toISOString()
            };
            messages.push(newMessage);
            saveLocalMessages(messages);
            return { success: true };
        } catch (error) {
            console.error("Error sending question:", error);
            return { success: false, error };
        }
    },

    // Get all messages (for Admin)
    async getAllMessages() {
        await new Promise(resolve => setTimeout(resolve, 300));
        const messages = getLocalMessages();
        return messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    // Get public answered messages (for Students)
    async getPublicMessages() {
        const messages = await this.getAllMessages();
        return messages.filter(m => m.isPublic && m.answer);
    },

    // Answer a question (Admin)
    async answerQuestion(id, answer) {
        const messages = getLocalMessages();
        const index = messages.findIndex(m => m.id === id);
        if (index !== -1) {
            messages[index].answer = answer;
            messages[index].isPublic = true;
            messages[index].answeredAt = new Date().toISOString();
            saveLocalMessages(messages);
            return { success: true };
        }
        return { success: false, error: 'Message not found' };
    },

    // Delete a question (Admin)
    async deleteQuestion(id) {
        let messages = getLocalMessages();
        const filtered = messages.filter(m => m.id !== id);

        if (messages.length === filtered.length) return { success: false, error: "Not found" };

        saveLocalMessages(filtered);
        return { success: true };
    }
};
