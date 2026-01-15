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
                    text: "Hello 👋 I’m your dashboard assistant. I can help you check rewards and recent activity.",
                },
                {
                    id: crypto.randomUUID(),
                    role: "user",
                    type: "text",
                    text: "Are you able to show my rewards?",
                },
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    type: "text",
                    text: "Sure. Ask me for your rewards anytime and I’ll pull them up.",
                },
            ];
            isLoadingHistory.value = false;
        }, 400);
    }

    function sendText(text: string) {
        const clean = text.trim();
        if (!clean) return;
        if (isTyping.value) return;

        // 1) User message
        messages.value.push({
            id: crypto.randomUUID(),
            role: "user",
            type: "text",
            text: clean,
        });

        // 2) Start typing
        isTyping.value = true;

        // Step A: typing -> assistant text
        setTimeout(() => {
            isTyping.value = false;

            messages.value.push({
                id: crypto.randomUUID(),
                role: "assistant",
                type: "text",
                text: "Sure. Here’s your latest reward. Give me a second to load it.",
            });

            // Step B: typing again -> reward card
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
            }, 2000);
        }, 700);
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
        }, 3000);
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
