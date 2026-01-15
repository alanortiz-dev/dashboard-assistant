<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from "vue";
import { useChat } from "../../composables/useChat";
import MessageList from "./MessageList.vue";
import MessageBubble from "./MessageBubble.vue";
import closeWindowIcon from '../../assets/close-chat-button.icon.svg'

const draftText = ref("");
const inputRef = ref<HTMLInputElement | null>(null);

// Get chat state/actions from the composable
const { messages, isTyping, isLoadingHistory, loadHistory, sendText, redeemReward } = useChat();


// Send message
function send() {
    const text = draftText.value.trim();
    if (!text) return;
    sendText(text);
    draftText.value = "";
}

// Auto-scroll to the latest message
const endRef = ref<HTMLElement | null>(null);
watch(
    () => messages.value.length,
    async () => {
        await nextTick();
        endRef.value?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
);

// Refocus the input after the assistant finishes responding
watch(
    () => isTyping.value,
    async (typing) => {
        if (typing) return;
        await nextTick();
        inputRef.value?.focus();
    }
);


// Load history on mount
onMounted(() => {
    loadHistory();
});
</script>

<template>
    <div class="chat-window">
        <!-- Header -->
        <header class="chat-header">
            <h2 class="chat-title">Hello Again Assistant</h2>
            <button class="close-btn" @click="$emit('close')" aria-label="Close chat">
                <img :src="closeWindowIcon" alt="" class="icon-img">
            </button>
        </header>

        <!-- Body -->
        <section class="chat-body">
            <p v-if="isLoadingHistory" class="history-loading">Loading chat…</p>

            <template v-else>
                <MessageList :messages="messages" :disabled="isTyping || isLoadingHistory"
                    @reward-redeem="redeemReward" />
                <MessageBubble v-if="isTyping" role="assistant" text="" :typing="true" />

                <div ref="endRef" />
            </template>
        </section>

        <!-- Footer -->
        <footer class="chat-footer">
            <input ref="inputRef" class="chat-input" type="text" placeholder="Write a message..." v-model="draftText"
                @keydown.enter.prevent="send" :disabled="isTyping || isLoadingHistory" />

            <button class="send-btn" type="button" @click="send" :disabled="isTyping || isLoadingHistory">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="send-icon">
                    <path
                        d="M2.7 3.3a1 1 0 0 1 1.05-.24l17 6a1 1 0 0 1 0 1.88l-17 6A1 1 0 0 1 2 16V8a1 1 0 0 1 .7-.95ZM4 9.83v4.34L14.91 12 4 9.83Z" />
                </svg>
            </button>
        </footer>
    </div>
</template>

<style scoped>
.chat-window {
    position: fixed;
    bottom: 100px;
    right: 32px;
    width: 400px;
    height: 600px;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    z-index: 9998;
}

/* Header */
.chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: linear-gradient(90deg, #2a7b9b 0%, #1b4e61 100%);
    color: #fff;
}

.chat-title {
    font-size: 16px;
    font-weight: 600;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.close-btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;

    background: none;
    border: none;
    cursor: pointer;
    color: #fff;
    padding: 4px;
}

.close-icon {
    width: 22px;
    height: 22px;
}

/* Body */
.chat-body {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    background: #f9f9f9;
}

.history-loading {
    text-align: center;
    color: #777;
    margin-top: 45%;
    font-size: 14px;
}

/* Footer */
.chat-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid #eee;
    background: #fff;
}

.chat-input {
    flex: 1;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
}

.chat-input:focus {
    border-color: #2a7b9b;
}

.chat-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #3D3B3B;
}



.send-btn {
    background: #2a7b9b;
    border: none;
    border-radius: 8px;
    padding: 8px 10px;
    cursor: pointer;
    transition: background 0.2s;
    display: grid;
    place-items: center;
}

.send-btn:hover {
    background: #256c89;
}

.send-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.send-icon {
    width: 22px;
    height: 22px;
    color: #fff;
}

.icon-img {
    width: 25px;
    height: 25px;
    display: block;
}
</style>
