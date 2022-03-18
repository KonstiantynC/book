<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form
      @submit.prevent="handleSubmit(submit)"
      class="sign-in-form"
    >
      <div class="app__form-row">
        <validation-provider
          rules="required"
          v-slot="{ errors }"
        >
          <input-field
            v-model="form.username"
            :placeholder="$t('sign-in-form.login-lbl')"
            :error-message="$t(errors[0])"
          />
        </validation-provider>
      </div>

      <div class="app__form-row">
        <validation-provider
          rules="required"
          v-slot="{ errors }"
        >
          <input-field
            v-model="form.password"
            type="password"
            :placeholder="$t('sign-in-form.password-lbl')"
            :error-message="$t(errors[0])"
          />
        </validation-provider>
      </div>

      <div class="sign-in-form__tip">
        <checkbox-field v-model="isConfirm">
          {{ $t('sign-in-form.other-device') }}
        </checkbox-field>

        <router-link
          class="sign-in-form__forgot-password"
          to="/recovery-password"
        >
          {{ $t('sign-in-form.forgot-password') }}
        </router-link>
      </div>

      <div
        v-if="errorMessage.length"
        class="sign-in-form__failed-msg"
      >
        {{ errorMessage }}
      </div>

      <div class="sign-in-form__actions">
        <button
          type="submit"
          class="app__button-raised"
        >
          {{ $t('sign-in-form.login-btn') }}
        </button>
        <div class="sign-in-form__tip-auth">
          {{ $t('sign-in-form.or') }}
        </div>
        <button
          class="app__button-raised"
          @click="openRegistrationForm"
        >
          {{ $t('sign-in-form.register-btn') }}
        </button>
      </div>
    </form>
  </validation-observer>
</template>

<script>
  import InputField from '@/components/fields/InputField'
  import CheckboxField from '@/components/fields/CheckboxField'
  import formMixin from '@/mixins/form.mixin'
  import { vuexTypes } from '@/store/types'
  import { mapActions } from 'vuex'

  export default {
    name: 'sign-in-form',
    components: {InputField, CheckboxField},
    mixins: [formMixin],
    data: () => ({
      form: {
        username: '',
        password: '',
      },
      isConfirm: false,
      errorMessage: '',
    }),
    methods: {
      ...mapActions({
        login: vuexTypes.LOG_IN
      }),
      openRegistrationForm() {
        this.$router.push({
          path: '/sign-up'
        })
      },
      async submit() {
        if (this.isEmptyForm) {
          this.errorMessage = this.$t('sign-in-form.empty-form')
        } else {
          try {
            await this.login(this.form)
            await this.$router.push('/home')
          } catch (_) {
            this.errorMessage = this.$t('sign-in-form.wrong-credentials')
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/scss/variables";

  .sign-in-form__tip {
    display: flex;
    justify-content: space-between;
    margin-top: 2.2rem;
  }

  .sign-in-form__forgot-password {
    color: $sign-in-form-forgot-pwd-color;
    font-size: 1.5rem;
    line-height: 1.2;
    text-decoration: none;
  }

  .sign-in-form__actions {
    margin-top: 4.8rem;
  }

  .sign-in-form__tip-auth {
    margin: 2.8rem 0;
    text-align: center;
    font-size: 1.5rem;
    line-height: 1.2;
    color: $sign-in-form-tip-auth-color;
  }

  .sign-in-form__failed-msg {
    text-align: center;
    margin-top: 4rem;
    font-size: 1.5rem;
    line-height: 1.2;
    color: $sign-in-form-failed-msg;
  }
</style>