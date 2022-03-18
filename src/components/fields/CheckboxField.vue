<template>
  <div class="checkbox-field">
    <input
        class="checkbox-field__input"
        type="checkbox"
        v-bind="$attrs"
        :checked="checked"
        :name="$attrs.name || id"
        :id="id"
        :value="cbValue"
        @change="onChange"
    >

    <label
        class="checkbox-field__label"
        :for="id"
        :title="$attrs.title"
    >
      <slot />
    </label>

    <div class="checkbox-field__checkbox" />
  </div>
</template>

<script>

const EVENTS = {
  input: 'input',
}

export default {
  props: {
    value: { type: [String, Number, Array, Boolean], required: true },
    cbValue: { type: [String, Number, Boolean, Array, Object], default: false },
  },
  computed: {
    id () {
      return `checkbox-field-${this._uid}`
    },
    checked () {
      const model = this.value
      const value = this.cbValue
      if (typeof value === 'undefined') {
        return model
      }
      let result
      switch (this.typeof(model)) {
        case 'number':
          result = model & +value
          break
        case 'array':
          result = this.typeof(value) !== 'array'
              ? ~model.findIndex((item) => item === value)
              : value.every(item => this.arrayIncludes(model, item))
          break
        default:
          result = model
          break
      }
      return result
    },
  },
  methods: {
    onChange (event) {
      const isChecked = event.target.checked
      const model = this.value
      const value = this.cbValue || isChecked
      if (typeof value === 'undefined') {
        return this.$emit(EVENTS.input, isChecked)
      }

      switch (this.typeof(model)) {
        case 'number':
          this.$emit(
              EVENTS.input,
              isChecked ? model + +value : model - value
          )
          break
        case 'array':
          if (this.typeof(value) !== 'array') {
            this.$emit(EVENTS.input, isChecked
                ? model.concat(value)
                : model.filter((item) => item !== value))
          } else {
            this.$emit(EVENTS.input, isChecked
                ? model.concat(value)
                : model.filter((item) => !this.arrayIncludes(value, item)))
          }
          break
        default:
          this.$emit(EVENTS.input, isChecked)
          break
      }
    },
    typeof (value) {
      const type = typeof value

      let result
      switch (type) {
        case 'object':
          if (Array.isArray(value)) result = 'array'
          if (value === null) result = 'null'
          break
        default:
          result = type
          break
      }
      return result
    },
    arrayIncludes (array, value) {
      return Boolean(array.find(item => item === value))
    },
  },
}
</script>

<style lang="scss">
@import "@/scss/variables";

$z-index-checkbox-field: 0;
$checkbox-size: 1.8rem;

.checkbox-field {
  position: relative;
  display: flex;
  width: fit-content;
  z-index: 0;
}

.checkbox-field__label {
  font-size: 1.5rem;
  color: $checkbox-label-color;
  vertical-align: middle;
  padding-left: 2.8rem;
  cursor: pointer;
  font-weight: bold;
  line-height: 1.2;

  .checkbox-field__input:disabled ~ & {
    filter: grayscale(100%);
    cursor: default;
    color: $checkbox-border-focus-color;
  }
}

.checkbox-field__checkbox {
  width: $checkbox-size;
  min-width: $checkbox-size;
  height: $checkbox-size;
  cursor: pointer;
  margin: 0 1.3rem 0 0;
  z-index: $z-index-checkbox-field;
  border: solid 0.1rem;
  border-radius: 0.5rem;
  border-color: $checkbox-border-color;
  position: absolute;
  left: 0;
  top: calc(50% - #{$checkbox-size * 0.05});
  transform: translateY(-50%);
  pointer-events: none;
  outline: 0.25rem solid transparent;
  outline-offset: -0.1rem;
  transition: outline-color 0.4ms;

  &:after {
    content: '';
    position: absolute;
    top: calc(50% - #{$checkbox-size * 0.1});
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    display: block;
    height: $checkbox-size * 0.5;
    width: $checkbox-size * 0.25;
    border: solid white;
    border-width: 0 0.2rem 0.2rem 0;
    opacity: 0;
  }

  .checkbox-field__input:checked ~ & {
    background-color: $checkbox-checked-color;
    padding: 2px;

    &:after {
      opacity: 1;
    }
  }

  .checkbox-field__input:disabled ~ & {
    filter: grayscale(100%);
    cursor: default;
    color: $checkbox-border-focus-color;
  }

  .checkbox-field__input:focus ~ & {
    outline-color: $checkbox-border-focus-color;
  }

  .checkbox-field:hover > .checkbox-field__input:enabled ~ & {
    outline-color: $checkbox-border-focus-color;
  }
}

.checkbox-field__input {
  position: absolute;
  opacity: 0;
  height: $checkbox-size;
  width: $checkbox-size;
  top: calc(50% - #{$checkbox-size * 0.1});
  transform: translateY(-50%);
  left: 0;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
}
</style>
