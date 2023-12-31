<template>
    <div class="docu">
        <h3> Wizard Documents</h3>

        <div v-for="project, i in projects" :key="i" class="card">
            <span v-html="project.projectIcon ">
            </span>
            <div class="flex-column">
                <span class="heading">
                    {{ project.title }}
                </span>
                <span>Generated {{ project.dateCreated }}</span>
            </div>
            <span class="morebutton">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6ZM14 18C14 16.9 13.1 16 12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18ZM14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12Z"
                        fill="#77AEF4" />
                </svg>
            </span>
        </div>

    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { otherProjects } from '@/composables/data';

const projects = computed(()=>otherProjects)
</script>