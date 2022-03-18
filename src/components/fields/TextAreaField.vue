<template>
  <div
    class="text-area-field"
    :class="[
      {
        'text-area-field--error': errorMessage.length,
      },
    ]"
  >
    <textarea
      class="text-area-field__input"
      :placeholder="placeholder || ' '"
      :value="value"
      :maxlength="maxlength"
      :required="required"
      @input="onInput"
    />

    <div class="text-area-field__error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
  const EVENTS = {
    input: 'input',
  }

  export default {
    name: 'text-area-field',
    props: {
      value: { type: [String, Number], default: undefined },
      placeholder: { type: String, default: '' },
      required: { type: Boolean, default: false },
      maxlength: { type: [String, Number], default: undefined },
      errorMessage: { type: String, default: '' }
    },
    data: () => ({
      currentLength: '0',
      EVENTS
    }),
    methods: {
      onInput (event) {
        if (this.maxlength) this.currentLength = event.target.value.length
        this.$emit(EVENTS.input, event.target.value)
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "@/scss/variables";

  .text-area-field {
    height: 100%;
    width: 100%;
  }

  .text-area-field__input {
    width: 100%;
    height: 100%;
    resize: none;
    border-radius: 1rem;
    padding: 1.2rem 2.2rem;
    border: none;
    box-shadow: 0 0 1rem $input-field-shadow-color;

    &::placeholder {
      font-style: normal;
      font-weight: bold;
      font-size: 1.5rem;
      line-height: 1.2;
      color: $input-field-placeholder-color;
    }

    .text-area-field--error & {
      border: 1px solid $input-field-error-color;
    }
  }

  .text-area-field__error-message {
    margin-top: 0.8rem;
    color: $input-field-error-color;
  }
</style>