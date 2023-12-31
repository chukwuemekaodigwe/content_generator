<template>
    <div class="card">
        <span class="icon" v-html="icon">
        </span>
        <div class="flex-column">
            <span class="title">
                {{ item.title }}
            </span>
            <span>Modified
                {{ item.dateCreated }}
            </span>
        </div>
        <span class="morebutton">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6ZM14 18C14 16.9 13.1 16 12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18ZM14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12Z"
                    fill="#77AEF4" />
            </svg>
        </span>

    </div>
</template>>

<script setup>

import { defineProps, computed } from 'vue';
const props = defineProps(['item'])
const item = computed(() => props.item)

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                                    fill="none">
                                    <path
                                        d="M3.73975 26.25C3.05506 26.25 2.5 25.6939 2.5 25.0082V4.99175C2.5 4.30595 3.06914 3.75 3.73975 3.75H26.2603C26.945 3.75 27.5 4.30619 27.5 4.99175V25.0082C27.5 25.694 26.9309 26.25 26.2603 26.25H3.73975ZM25 18.75V6.25H5V23.75L17.5 11.25L25 18.75ZM25 22.2855L17.5 14.7855L8.53554 23.75H25V22.2855ZM10 13.75C8.61929 13.75 7.5 12.6307 7.5 11.25C7.5 9.86929 8.61929 8.75 10 8.75C11.3807 8.75 12.5 9.86929 12.5 11.25C12.5 12.6307 11.3807 13.75 10 13.75Z"
                                        fill="#77AEF4" />
                                </svg>`
</script>