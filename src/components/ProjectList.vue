<template>
    <h3>Recent Projects</h3>
    <div class="project">
        <div class="card" id="new">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                    <g opacity="0.34">
                        <path
                            d="M19.25 19.25V12.25H22.75V19.25H29.75V22.75H22.75V29.75H19.25V22.75H12.25V19.25H19.25ZM21 38.5C11.335 38.5 3.5 30.6649 3.5 21C3.5 11.335 11.335 3.5 21 3.5C30.6649 3.5 38.5 11.335 38.5 21C38.5 30.6649 30.6649 38.5 21 38.5ZM21 35C28.732 35 35 28.732 35 21C35 13.268 28.732 7 21 7C13.268 7 7 13.268 7 21C7 28.732 13.268 35 21 35Z"
                            fill="white" />
                    </g>
                </svg>
            </span>
            <span>
                Create New
            </span>
        </div>

        <project v-for="project, i in projects" :key="i" :item="project" />
    </div>
</template>

<script setup>
import { projects } from '@/composables/data';
import project from './project.vue';
</script>