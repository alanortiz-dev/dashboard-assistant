<script setup lang="ts">
import MessageItem from "./MessageItem.vue";
import type { ChatMessage } from "../../types/chat";

const props = defineProps<{
    messages: ChatMessage[];
    disabled?: boolean;
}>();

const emit = defineEmits<{
    (e: "reward-redeem", payload: { title: string; points: number }): void;
}>();
</script>

<template>
    <div class="list">
        <MessageItem v-for="m in props.messages" :key="m.id" :message="m" :disabled="props.disabled"
            @reward-redeem="emit('reward-redeem', $event)" />
    </div>
</template>


<style scoped>
.list {
    display: flex;
    flex-direction: column;
}
</style>
