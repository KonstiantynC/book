<template>
  <div class="sign-up">
    <logo />

    <span class="sign-up__title auth__title">
      {{ $t('sign-up.title') }}
    </span>

    <div class="sign-up__form-wrp">
      <sign-up-form class="sign-up__form"/>
    </div>
  </div>
</template>

<script>
  import Logo from "@/components/common/Logo"
  import SignUpForm from "@/components/forms/auth/SignUpForm"

  export default {
    name: 'sign-up',
    components: { Logo, SignUpForm },
  }
</script>

<style scoped>
  @import "_auth.scss";

  .sign-up {
    width: 100%;
    min-height: calc(100vh - 88px);
    padding: 3.4rem 0 3.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sign-up__title {
    margin: 5.4rem 0 4.5rem;
  }

  .sign-up__form-wrp {
    width: 42.8rem;
  }

</style>