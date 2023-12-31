<template>
    <div class="sum-card">
        <span class="icon" v-html="item.svg">
        </span>
        <div class="flex-column">
            <span>{{ item.topic }}</span>
            <span class="sum-count"> {{ item.count }}</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
const props = defineProps(['item'])
const item = computed(() => props.item)

</script>
