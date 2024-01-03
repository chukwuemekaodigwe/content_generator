<script setup>
import ContentGenerator from './components/ContentGenerator.vue';
import { ref } from 'vue';

const hide = ref(false)
</script>

<template>
  <main>    
    <ContentGenerator @output="hide = true"/>
  </main>
</template>

<style scoped>
</style>
