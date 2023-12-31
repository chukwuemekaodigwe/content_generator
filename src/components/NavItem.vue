<template>
    <li>
        <a href="" :class="active">
            <span v-html="link.svg">
                
            </span>

            {{link.title }}
        </a>
    </li>
</template>

<script setup>
import { defineProps, computed } from 'vue';
const props = defineProps(['link'])
const link = computed(()=> props.link)
const active = computed(()=> link.value.title == 'dashboard' ? 'active': '')
</script>
