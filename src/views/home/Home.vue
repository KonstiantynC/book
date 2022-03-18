<template>
  <div class="home">
    <nav-bar />

    <div class="home__view">
      <router-view />
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/navigation/NavBar'
  export default {
    name: 'home',
    components: { NavBar }
  }
</script>

<style scoped></style>