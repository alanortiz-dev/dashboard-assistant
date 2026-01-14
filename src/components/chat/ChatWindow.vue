<script setup lang="ts">
import closeWindowIcon from '../../assets/close-chat-button.icon.svg'

const emit = defineEmits<{
    (e: 'close'): void
}>()

function closeChat() {
    emit('close')
}

</script>

<template>
    <div class="chat-window">
        <!-- Header -->
        <header class="chat-header">
            <h2 class="chat-title">Hello Again Assistant</h2>
            <button class="close-btn" type="button" aria-label="Close chat" @click="closeChat">
                <img :src="closeWindowIcon" alt="" class="icon-img">
            </button>
        </header>

        <!-- Body -->
        <section class="chat-body">
            <div class="placeholder">
                <p>No messages yet…</p>
            </div>
        </section>

        <!-- Footer -->
        <footer class="chat-footer">
            <input class="chat-input" type="text" placeholder="Type a message…" />
            <button class="send-btn">Send</button>
        </footer>
    </div>
</template>

<style scoped>
.chat-window {
    position: fixed;
    bottom: 84px;
    right: 16px;
    width: 360px;
    height: 500px;

    display: flex;
    flex-direction: column;

    background: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);

    overflow: hidden;
    z-index: 9998;
}

/* Header */
.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    /* background: #0AAAD4; */
    background: linear-gradient(90deg, rgba(10, 170, 212, 1) 0%, rgba(190, 214, 99, 1) 82%, rgba(237, 221, 83, 1) 100%);
    color: #fff;
    padding: 12px 16px;
}

.chat-title {
    font-size: 16px;
    font-weight: 600;
}

.close-btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;

    background: transparent;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    padding: 0;
    border: 0;
}

.close-btn:focus {
    outline: none;
}

.close-btn:hover {
    background: rgba(255, 255, 255, 0.18);
}

.close-btn:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.9);
    outline-offset: 2px;
}


/* Body */
.chat-body {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    background: #f6f6f6;
}

.placeholder {
    color: #777;
    text-align: center;
    margin-top: 40%;
}

/* Footer */
.chat-footer {
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid #ddd;
    background: #fff;
}

.chat-input {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 8px 10px;
    font-size: 14px;
    background: linear-gradient(132deg, rgba(0, 191, 194, 1) 0%, rgba(103, 122, 194, 1) 100%);
}

.chat-input::placeholder {
    color: #fffefe;
}

.send-btn {
    background: #0AAAD4;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 14px;
    cursor: pointer;
}

.icon-img {
    width: 25px;
    height: 25px;
    display: block;
}
</style>
