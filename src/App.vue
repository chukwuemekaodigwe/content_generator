<script setup>
import ContentGenerator from './components/ContentGenerator.vue';
import { ref } from 'vue';

const hide = ref(false)
</script>

<template>
  <header class="sm:hidden xs:hidden" v-if="!hide">
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper py-5">
      <HelloWorld msg="Content Generator!" />
    </div>
  </header>

  <main>
    
    <ContentGenerator @output="hide = true"/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    margin-top: 20px;
  }
}
</style>
