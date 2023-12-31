<template>
    <div class="page-wrapper">
        <header class="header">
            <SiteLogo :logo="logoUrl" />
            <NavBar />
        </header>
        <main class="container">
            <TopNav />
            <WelcomeTab />
            <OverViews />
            <div class="sections">
                <div class="section1">
                    <ProjectList />
                    <ContentTypes />
                </div>

                <div class="section2">
                    <h3>Connected Websites</h3>
                    <connectedWebsite v-for="item, i in data.webRecords" :key="i" :item="item" />

                    <button class="btn">
                        Connect More Websites
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import SiteLogo from './SiteLogo.vue';
import NavBar from './NavBar.vue';
import TopNav from './TopNav.vue';
import WelcomeTab from './WelcomeTab.vue';
import OverViews from './OverViews.vue';
import ProjectList from './ProjectList.vue';
import ContentTypes from './ContentTypes.vue';
import connectedWebsite from './connectedWebsite.vue';

import * as data from '../composables/data'

const logoUrl = '/logo.png'
</script>