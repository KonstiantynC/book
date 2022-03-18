<template>
  <div class="logo">
    <router-link
      to="/home"
      class="logo__home-link"
    >
      <span class="logo__txt">
        {{ APP_LOGO_TEXT }}
      </span>
    </router-link>
  </div>
</template>

<script>
const APP_LOGO_TEXT = 'ЛОГО'

export default {
  name: 'logo',
  data: () => ({
    APP_LOGO_TEXT,
  })
}
</script>

<style scoped lang="scss">
  @import "@/scss/variables";

  .logo__txt {
    font-weight: bold;
    font-size: 4rem;
    text-align: center;
    color: $app-logo-color;
  }

  .logo__home-link {
    text-decoration: none;
  }
</style>