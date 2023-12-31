<template>
    <div class="summary">
        <OverviewItem v-for="item, i in items" :key="i" :item="item"/>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import {reports} from '../composables/data'
import OverviewItem from './OverviewItem.vue';

const items = ref([...reports])
</script>