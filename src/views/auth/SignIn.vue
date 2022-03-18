<template>
  <div class="sign-in">
    <logo />

    <span class="sign-in__title auth__title">
      {{ $t('sign-in.title') }}
    </span>

    <div class="sign-in__form-wrp">
      <sign-in-form class="sign-in__form" />
    </div>
  </div>
</template>

<script>
  import Logo from "@/components/common/Logo"
  import SignInForm from "@/components/forms/auth/SignInForm"

  export default {
    name: 'sign-in',
    components: { Logo, SignInForm },
  }
</script>

<style scoped>
  @import "_auth.scss";

  .sign-in {
    width: 100%;
    min-height: calc(100vh - 88px);
    padding: 3.4rem 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sign-in__title {
    margin: 5.4rem 0 4.5rem;
  }

  .sign-in__form-wrp {
    width: 42.8rem;
  }
</style>