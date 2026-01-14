<script setup lang="ts">
// import MessageBubble from "./MessageBubble.vue";
import MessageItem from "./MessageItem.vue";
import type { ChatMessage } from "../../types/chat"

const props = defineProps<{
    messages: ChatMessage[];
}>();
</script>

<template>
    <div class="list">
        <MessageItem v-for="m in props.messages" :key="m.id" :message="m" />
    </div>
</template>

<style scoped>
.list {
    display: flex;
    flex-direction: column;
}
</style>
