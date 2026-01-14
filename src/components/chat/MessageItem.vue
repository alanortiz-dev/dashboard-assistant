<script setup lang="ts">
import type { ChatMessage } from "../../types/chat";
import MessageBubble from "./MessageBubble.vue";
import RewardCard from "./RewardCard.vue";

const props = defineProps<{
    message: ChatMessage;
}>();
</script>

<template>
    <div v-if="props.message.type === 'text'">
        <MessageBubble :role="props.message.role" :text="props.message.text" />
    </div>

    <div v-else>
        <!-- reward -->
        <div class="row assistant">
            <RewardCard :title="props.message.payload.title" :points="props.message.payload.points"
                :imageUrl="props.message.payload.imageUrl" />
        </div>
    </div>
</template>

<style scoped>
.row {
    display: flex;
    margin: 6px 0;
}

.row.assistant {
    justify-content: flex-start;
}
</style>
