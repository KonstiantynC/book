<template>
  <div
    class="input-field"
    :class="[
      {
        'input-field--error': errorMessage.length,
        'input-field--auth': isAuthField,
      },
    ]"
  >
    <div class="input-field__input-wrp">
      <span
        v-if="required"
        class="input-field__required-marker"
      >
        *
      </span>
      <input
        v-bind="$attrs"
        class="input-field__input"
        :value="value"
        :placeholder="placeholder"
        @input="$emit(EVENTS.input, $event.target.value)"
      >
    </div>

    <div class="input-field__error-msg">
      {{ errorMessage }}
    </div>
  </div>
</template>


<script>
  const EVENTS = {
    input: 'input',
  }

  export default {
    name: 'input-field',
    props: {
      value: { type: [String, Number], default: undefined },
      placeholder: { type: String, default: '' },
      isError: { type: Boolean, default: false },
      isAuthField: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
      errorMessage: { type: String, default: '' }
    },
    data: () => ({
      EVENTS,
    }),
    methods: {
      onChange() {
        this.$emit(EVENTS.input, this.value)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/scss/variables";

  $input-field-height: 5.2rem;

  .input-field {
    margin-bottom: 1.2rem;
  }

  .input-field__input {
    height: $input-field-height;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    border: none;
    border-radius: 1rem;
    margin: 0 0 0.8rem;
    padding: 0 2.2rem;
    box-shadow: 0 0 1rem $input-field-shadow-color;

    .input-field--error & {
      border: 0.1rem solid $input-field-error-color;
    }

    .input-field--auth & {
      border-radius: 1.5rem;
    }

    &::placeholder {
      font-style: normal;
      font-weight: bold;
      font-size: 1.5rem;
      line-height: 1.2;
      color: $input-field-placeholder-color;
    }
  }

  .input-field__required-marker {
    color: $sign-up-form-forgot-pwd-color;
    position: absolute;
    font-size: 3rem;
    width: 1.3rem;
    height: 3.1rem;
    margin: -1.5rem;
  }

  .input-field__error-msg {
    color: $input-field-error-color;
  }
</style>