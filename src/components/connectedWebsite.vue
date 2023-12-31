<template>
    <div>
        <div class="topic">
            {{ item.sitename }}
        </div>
        <div class="item-wrapper">
            <div class="item">
                <span class="title">
                    Published Today
                </span>
                <span class="count">
                    {{ item.todayPub.toLocaleString('en-gb') }}
                </span>
            </div>

            <div class="item">
                <span class="title">
                    Total Published
                </span>
                <span class="count">
                    {{ item.totPublish.toLocaleString('en-gb') }}
                </span>
            </div>

            <div class="item">
                <span class="title">
                    Visitor's Today
                </span>
                <span class="count">
                    {{ item.visitorToday.toLocaleString('en-gb') }}
                </span>
            </div>

            <div class="item">
                <span class="title" style="width: 99px!important">
                    Monthly Avg. Visitors
                </span>
                <span class="count">
                {{ item.monthlyVisit.toLocaleString('en-gb') }}
                </span>
            </div>

            <div class="item">
                <span class="title" style="width: 160px !important;">
                    Keyword Ranking <br> Top 30
                </span>
                <span class="count">
                    {{ item.keyWord.toLocaleString('en-gb') }}
                </span>
            </div>

        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
const props = defineProps(['item'])
const item = computed(() => props.item)

</script>