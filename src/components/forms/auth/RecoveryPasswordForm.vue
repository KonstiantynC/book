<template>
  <div class="recovery-password-form">
    <div class="app__form-row">
      <input-field
        v-model="form.email"
        :placeholder="$t('recovery-password-form.email-lbl')"
      />
    </div>

    <span class="recovery-password-form__confirm-txt">
      {{ $t('recovery-password-form.confirm') }}
    </span>

    <div class="recovery-password-form__actions">
      <button 
        class="app__button-raised" 
      >
        {{ $t('recovery-password-form.send-password') }}
      </button>
    </div>

    <router-link 
      class="recovery-password-form__return-to-auth-link"
      :to="{ path: '/' }"
    >
      {{ $t('recovery-password-form.return-to-auth') }}
    </router-link>
  </div>
</template>

<script>
  import InputField from '@/components/fields/InputField'

  export default {
    name: 'recovery-password-form',
    components: { InputField },
    data: () => ({
      form: {
        email: '',
        isConfirm: false,
      }
    })   
  }
</script>

<style scoped lang="scss">
  @import "@/scss/variables";

  .recovery-password-form__confirm-txt {
    display: flex;
    justify-content: center;
    color: $recovery-password-form-confirm-color;
    margin: 0 0 5.6rem;
    font-size: 1.2rem;
    line-height: 1.4rem;
  }

  .recovery-password-form__return-to-auth-link {
    display: flex;
    justify-content: center;
    color: $recovery-password-form-return-to-auth-color;
    text-decoration: none;
    margin: 2.5rem 0 0;
    font-size: 1.5rem;
    line-height: 1.8rem;
  }
</style>