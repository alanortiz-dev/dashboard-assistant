<script setup lang="ts">
import openIcon from '../../assets/open-button.icon.svg'
import closeIcon from '../../assets/close-button.icon.svg'

//Determine the state of the chat window
const props = defineProps<{
    isOpen: boolean;
}>();

const emit = defineEmits<{
    (e: "toggle"): void;
}>();

function onClick() {
    emit("toggle");
}
</script>

<template>
    <button class="fab" type="button" :aria-label="props.isOpen ? 'Close chat' : 'Open chat'" @click="onClick">
        <img class="icon-img" :src="props.isOpen ? closeIcon : openIcon" alt="" aria-hidden="true" />
    </button>
</template>

<style scoped>
/* Floating action button styles */
.fab {
    position: fixed;
    right: 16px;
    bottom: 16px;

    width: 56px;
    height: 56px;
    border-radius: 999px;

    border: none;
    cursor: pointer;

    background: linear-gradient(90deg, rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%);
    color: #fff;

    display: grid;
    place-items: center;

    box-shadow: 0 10px 30px rgba(136, 6, 6, 0.25);
    z-index: 9999;
}

.fab:focus {
    outline: 2px solid #403bc2;
    outline-offset: 3px;
}

.icon {
    font-size: 22px;
    line-height: 1;
}

.icon-img {
    width: 35px;
    height: 35px;
    position: fixed;
}
</style>
