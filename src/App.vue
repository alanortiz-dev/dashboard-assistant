<script setup lang="ts">
import { ref } from "vue";
import ChatFabButton from "./components/chat/ChatFabButton.vue";
import ChatWindow from "./components/chat/ChatWindow.vue";

const isChatOpen = ref(false);

function toggleChat() {
  isChatOpen.value = !isChatOpen.value;
}
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <div class="app">
    <h1>Dashboard Assistant</h1>

    <p>Chat open: {{ isChatOpen }}</p>

    <ChatFabButton :isOpen="isChatOpen" @toggle="toggleChat" />
    <ChatWindow v-if="isChatOpen" @close="toggleChat" />
  </div>

</template>

<style scoped>
/* Vite starter styles (kept intentionally) */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.app {
  padding: 16px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
</style>
