<template>
    <div class="logo">
        <div>
            <img :src="logo" alt="LOGO">
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['logo'])
const logo = props.logo
</script>