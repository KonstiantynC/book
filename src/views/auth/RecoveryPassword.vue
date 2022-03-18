<template>
  <div class="recovery-password">
    <logo />

    <span class="recovery-password__title auth__title">
      {{ $t('recovery-password.title') }}
    </span>
    <div class="recovery-password__form-wrp">
      <recovery-password-form  class="recovery-password__form"/>
    </div>
  </div>
</template>

<script>
  import Logo from "@/components/common/Logo"
  import RecoveryPasswordForm from '@/components/forms/auth/RecoveryPasswordForm.vue'

  export default {
    name: 'recovery-password',
    components: { Logo, RecoveryPasswordForm },
  }
</script>

<style scoped>
  @import "_auth.scss";

  .recovery-password {
    width: 100%;
    padding: 3.4rem 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .recovery-password__title {
    margin: 5.4rem 0 4.5rem;
    width: 42.2rem;
  }

  .recovery-password__form-wrp {
    width: 42.8rem;
  }
</style>