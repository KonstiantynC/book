<template>
  <div class="footer">
    <div class="footer__text">
      {{ $t('footer.copyright', { currentYear: currentYear }) }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app-footer',
    computed: {
      currentYear () {
        return new Date().getFullYear()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/scss/variables";

  .footer {
    padding: 3.5rem 0;
  }

  .footer__text {
    color: $footer-text-color;
    text-align: center;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.2;
  }
</style>