import { ref } from "vue";
import type { ChatMessage } from "../types/chat";

const HISTORY_LOAD_DELAY_MS = 400;
const ASSISTANT_TEXT_DELAY_MS = 1000;
const REWARD_CARD_DELAY_MS = 1000; // aligns with “after 1 second” expectation
const REDEEM_CONFIRM_DELAY_MS = 1500;

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
        }, HISTORY_LOAD_DELAY_MS);
    }

    function sendText(text: string) {
        const clean = text.trim();
        if (!clean) return;
        if (isTyping.value) return;

        // (1) Append the user's message to the chat stream
        messages.value.push({
            id: crypto.randomUUID(),
            role: "user",
            type: "text",
            text: clean,
        });

        // (2) Start the assistant response sequence (typing → text → typing → reward)
        isTyping.value = true;

        setTimeout(() => {
            isTyping.value = false;

            // (2a) First assistant reply as plain text
            messages.value.push({
                id: crypto.randomUUID(),
                role: "assistant",
                type: "text",
                text: "Sure. Here’s your latest reward. Give me a second to load it.",
            });

            // (2b) Simulate a short wait before showing the reward card
            isTyping.value = true;

            setTimeout(() => {
                isTyping.value = false;

                // (3) Render the reward as a widget message
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
            }, REWARD_CARD_DELAY_MS);
        }, ASSISTANT_TEXT_DELAY_MS);
    }

    function redeemReward(payload: { title: string; points: number }) {
        if (isTyping.value || isLoadingHistory.value) return;

        // Log the action as a user message so it stays visible in the conversation
        messages.value.push({
            id: crypto.randomUUID(),
            role: "user",
            type: "text",
            text: `Redeem "${payload.title}"`,
        });

        isTyping.value = true;

        setTimeout(() => {
            isTyping.value = false;

            // Confirm the action back to the user
            messages.value.push({
                id: crypto.randomUUID(),
                role: "assistant",
                type: "text",
                text: `Done. "${payload.title}" redeemed (+${payload.points} pts).`,
            });
        }, REDEEM_CONFIRM_DELAY_MS);
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
