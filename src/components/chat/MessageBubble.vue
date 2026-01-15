<script setup lang="ts">
type Role = "user" | "assistant";

const props = defineProps<{
    role: Role;
    text?: string;
    typing?: boolean;
}>();

</script>

<template>
    <div class="row" :class="props.role">
        <div class="bubble">
            <template v-if="props.typing">
                <span class="typing" role="status" aria-label="Assistant is typing">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </span>
            </template>

            <template v-else>
                {{ props.text ?? "" }}
            </template>
        </div>
    </div>
</template>
<style scoped>
/* fila completa para poder alinear izquierda/derecha */
.row {
    display: flex;
    margin: 6px 0;
}

/* si es user → derecha */
.row.user {
    justify-content: flex-end;
    padding-top: 3px;
}

/* si es assistant → izquierda */
.row.assistant {
    justify-content: flex-start;
    padding-top: 3px;
}

.bubble {
    max-width: 79%;
    padding: 10px 12px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.3;
    background: #fff;
    color: #111;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    width: fit-content;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    word-break: break-word;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

/* estilos distintos según quién lo manda */
.row.user .bubble {
    background: #5cbbec;
    color: #fff;
    border-bottom-right-radius: 6px;
    text-align: justify;
    text-justify: inter-word;
}

.row.assistant .bubble {
    background: #E7E7E7;
    color: #111;
    border-bottom-left-radius: 6px;
    text-align: justify;
    text-justify: inter-word;
}

.typing {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: currentColor;
    opacity: 0.35;
    animation: typingDot 1.2s infinite ease-in-out;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typingDot {

    0%,
    80%,
    100% {
        transform: translateY(0);
        opacity: 0.35;
    }

    40% {
        transform: translateY(-3px);
        opacity: 1;
    }
}

@media (prefers-reduced-motion: reduce) {
    .dot {
        animation: none;
        opacity: 0.6;
    }
}
</style>
