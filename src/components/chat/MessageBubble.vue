<script setup lang="ts">
type Variant = "user" | "assistant";

const props = defineProps<{
    variant: Variant;
    text: string;
}>();
</script>

<template>
    <div class="row" :class="props.variant">
        <div class="bubble">
            {{ props.text }}
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
}

/* si es assistant → izquierda */
.row.assistant {
    justify-content: flex-start;
}

.bubble {
    max-width: 75%;
    padding: 10px 12px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.3;
    background: #fff;
    color: #111;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* estilos distintos según quién lo manda */
.row.user .bubble {
    background: #111;
    color: #fff;
    border-bottom-right-radius: 6px;
}

.row.assistant .bubble {
    background: #ffffff;
    color: #111;
    border-bottom-left-radius: 6px;
}
</style>
