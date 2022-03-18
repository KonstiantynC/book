<template>
  <div id="app">
    <div class="app__main">
      <router-view />
    </div>
    <app-footer />
  </div>
</template>

<script>
  import AppFooter from '@/components/Footer'

  export default {
    name: 'app',
    components: { AppFooter }
  }
</script>

<style lang="scss">
  .app__main {
    min-height: calc(100vh - 88px);
  }
</style>
