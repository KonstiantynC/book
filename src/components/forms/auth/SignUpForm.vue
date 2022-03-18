<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form
      @submit.prevent="handleSubmit(submit)"
      class="sign-up-form"
    >
      <div class="app__form-row">
        <validation-provider
          rules="required"
          v-slot="{ errors }"
        >
          <input-field
            v-model="form.username"
            :placeholder="$t('sign-up-form.login-lbl')"
            :error-message="$t(errors[0])"
            required
          />
        </validation-provider>
      </div>

      <div class="app__form-row">
        <validation-provider
          rules="required|email"
          v-slot="{ errors }"
        >
          <input-field
            name="sign-up-form__email"
            v-model="form.email"
            :placeholder="$t('sign-up-form.email-lbl')"
            :error-message="$t(errors[0])"
            required
          />
        </validation-provider>
      </div>

      <div class="app__form-row">
        <validation-provider
          rules="required|min:8"
          vid="confirmation"
          v-slot="{ errors }"
        >
          <input-field
            v-model="form.password"
            type="password"
            :placeholder="$t('sign-up-form.password-lbl')"
            :error-message="$t(errors[0])"
            required
          />
        </validation-provider>
      </div>

      <div class="app__form-row">
        <validation-provider
          v-slot="{ errors }"
          rules="required|confirmed:confirmation"
        >
          <input-field
            v-model="form.confirmationPassword"
            type="password"
            :placeholder="$t('sign-up-form.confirm-password')"
            :error-message="$t(errors[0])"
            required
          />
        </validation-provider>
      </div>

      <div
        v-if="errorMessage.length"
        class="sign-up-form__failed-msg"
      >
        {{ errorMessage }}
      </div>

      <div class="sign-up-form__actions">
        <button
          type="submit"
          class="app__button-raised"
        >
          {{ $t('sign-up-form.register') }}
        </button>
      </div>

      <div class="sign-up-form__tip">
        <span class="sign-up-form__have-account-text">
          {{ $t('sign-up-form.have-account') }}
        </span>
        &nbsp;
        <router-link
          class="sign-up-form__have-account"
          to="/"
        >
          {{ $t('sign-up-form.sign-in') }}
        </router-link>
      </div>
    </form>
  </validation-observer>
</template>

<script>
  import InputField from '@/components/fields/InputField'
  import { vuexTypes } from '@/store/types'
  import { mapActions } from 'vuex'

  export default {
    name: 'sign-up-form',
    components: { InputField },
    data: () => ({
      form: {
        username: '',
        email: '',
        password: '',
        confirmationPassword: '',
      },
      errorMessage: ''
    }),
    computed: {
      isMatchPasswords () {
        return this.form.password === this.form.confirmationPassword
      },
      isPasswordsEmpty () {
        return this.form.password === '' && this.form.confirmationPassword === ''
      }
    },
    methods: {
      ...mapActions({
        signUp: vuexTypes.SIGN_UP
      }),
      async submit () {
        if (!this.isMatchPasswords && this.isPasswordsEmpty) {
          this.errorMessage = this.$t('sign-up-form.empty-form')
        } else {
          try {
            await this.signUp(this.form)
            alert('Аккаунт успешно создан')
            await this.$router.push('/')
          } catch (err) {
            if (err.response.data.errorCode && err.response.data.errorCode === 'user_exists') {
              this.errorMessage = this.$t('sign-up-form.user-exists')
            } else {
              this.errorMessage = this.$t('error-messages.something-error')
            }
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/scss/variables";

  .sign-up-form__actions {
    margin-top: 4.8rem;
  }

  .sign-up-form__have-account {
    color: $sign-up-form-forgot-pwd-color;
    font-size: 1.5rem;
    line-height: 1.2;
    text-decoration: none;
  }

  .sign-up-form__tip {
    display: flex;
    justify-content: center;
    margin: 2.5rem 0 0;
  }

  .sign-up-form__have-account-text {
    color: $sign-up-form-have-account-color;
  }

  .sign-up-form__failed-msg {
    text-align: center;
    margin-top: 4rem;
    font-size: 1.5rem;
    line-height: 1.2;
    color: $sign-up-form-failed-msg;
  }
</style>
