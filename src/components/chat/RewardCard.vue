<script setup lang="ts">
const props = defineProps<{
    title: string;
    points: number;
    imageUrl: string;
    disabled?: boolean;
}>();

const emit = defineEmits<{
    (e: "redeem"): void;
}>();

function onRedeem() {
    if (props.disabled) return;
    emit("redeem");
}
</script>

<template>
    <div class="card">
        <img class="img" :src="props.imageUrl" alt="" aria-hidden="true" />
        <div class="content">
            <p class="title">{{ props.title }}</p>
            <p class="points">{{ props.points }} pts</p>

            <button class="action-btn" type="button" :disabled="props.disabled" @click="onRedeem">
                Redeem
            </button>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    gap: 12px;
    padding: 12px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    max-width: 320px;
    color: #000;
}

.img {
    width: 56px;
    height: 56px;
    border-radius: 10px;
    object-fit: cover;
}

.title {
    margin: 0;
    font-weight: 600;
    font-size: 14px;
}

.points {
    margin: 4px 0 0 0;
    font-size: 13px;
    opacity: 0.8;
}

.action-btn {
    margin-top: 10px;
    padding: 8px 10px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: linear-gradient(90deg, #1b4e61 0%, #2a7b9b 100%);
    cursor: pointer;
    font-size: 13px;
}

.action-btn:hover {
    background: #258984;
}

.action-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
