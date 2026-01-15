import { ref } from "vue";
import type { ChatMessage } from "../types/chat";

export function useChat() {
    const messages = ref<ChatMessage[]>([]);
    const isTyping = ref(false);
    const isLoadingHistory = ref(false);

    function loadHistory() {
        isLoadingHistory.value = true;
        messages.value = [];

        setTimeout(() => {
            messages.value = [
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    type: "text",
                    text: "Hola 👋 soy tu assistant del dashboard.",
                },
                {
                    id: crypto.randomUUID(),
                    role: "user",
                    type: "text",
                    text: "Muéstrame mis rewards",
                },
            ];
            isLoadingHistory.value = false;
        }, 400);
    }

    function sendText(text: string) {
        const clean = text.trim();
        if (!clean) return;
        if (isTyping.value) return;

        messages.value.push({
            id: crypto.randomUUID(),
            role: "user",
            type: "text",
            text: clean,
        });

        isTyping.value = true;

        setTimeout(() => {
            isTyping.value = false;

            messages.value.push({
                id: crypto.randomUUID(),
                role: "assistant",
                type: "reward",
                payload: {
                    title: "Daily Streak",
                    points: 250,
                    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=strong",
                },
            });
        }, 1000);
    }

    function redeemReward(payload: { title: string; points: number }) {
        if (isTyping.value || isLoadingHistory.value) return;

        // Optional: register the user's action in the chat
        messages.value.push({
            id: crypto.randomUUID(),
            role: "user",
            type: "text",
            text: `Redeem "${payload.title}"`,
        });

        isTyping.value = true;

        setTimeout(() => {
            isTyping.value = false;

            messages.value.push({
                id: crypto.randomUUID(),
                role: "assistant",
                type: "text",
                text: `Done. "${payload.title}" redeemed (+${payload.points} pts).`,
            });
        }, 500);
    }


    return {
        messages,
        isTyping,
        isLoadingHistory,
        loadHistory,
        sendText,
        redeemReward,
    };

}
