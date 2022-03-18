<template>
  <div
    class="select-field"
    :class="[
      {
        'select-field--error': errorMessage,
        'select-field--disabled': isDisabled,
        'select-field--readonly': isReadonly,
      },
    ]"
  >
    <template v-if="label">
      <label
        class="select-field__label"
        :class="{ 'select-field__label--minimized': value || isListOpened }"
      >
        {{ label }}
      </label>
    </template>

    <div class="select-field__select-wrp">
      <select
        :id="`select-${_uid}`"
        class="select-field__select"
        :value="value"
        v-bind="$attrs"
        @change="onChange"
      >
        <option
          :key="`select-empty-placeholder`"
          class="select-field__empty-placeholder"
          value="select"
          disabled
          selected
          hidden
        >
          {{ $t('fields.select-field.empty-placeholder-lbl') }}
        </option>
        <slot/>
      </select>

      <i
        class="select-field__selected-icon mdi mdi-chevron-down"
        :class="{
          'select-field__selected-icon--active': isListOpened,
          'select-field__selected-icon--scale': label,
        }"
      />
    </div>

    <p
      v-if="errorMessage"
      class="select-field__err-mes"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import customSelect from 'custom-select'

const CUSTOM_SELECT_CONFIG = {
  containerClass: 'select-field__wrp',
  openerClass: 'select-field__opener',
  panelClass: 'select-field__panel',
  optionClass: 'select-field__option',
  isSelectedClass: 'select-field__option--selected',
  hasFocusClass: 'select-field__option--focused',
  isDisabledClass: 'select-field__wrp--disabled',
  isOpenClass: 'select-field--open',
}

export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number, Boolean, Object, Array, Date],
      required: true,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    customSelectInstance: {},
    isListOpened: false,
  }),

  computed: {
    isReadonly() {
      return ['readonly', '', true].includes(this.$attrs.readonly)
    },
    isDisabled() {
      return ['disabled', '', true].includes(this.$attrs.disabled)
    },
  },

  watch: {
    value(value) {
      this.customSelectInstance.value = value
    },
  },

  mounted() {
    this.customSelectInstance = customSelect(
        `#select-${this._uid}`, CUSTOM_SELECT_CONFIG
    )[0]

    if (this.customSelectInstance && this.customSelectInstance.container) {
      this.addCustomSelectEvents()
    }

    if (!this.value) {
      this.fixDisplayOfEmptyValue()
    }
  },

  beforeDestroy() {
    if (this.customSelectInstance && this.customSelectInstance.container) {
      this.removeCustomSelectEvents()
    }
  },

  methods: {
    onChange(event) {
      this.$emit('input', event.target.value)
    },

    addCustomSelectEvents() {
      this.customSelectInstance.container.addEventListener(
          'custom-select:open',
          () => {
            this.isListOpened = true
          }
      )
      this.customSelectInstance.container.addEventListener(
          'custom-select:close',
          () => {
            this.isListOpened = false
          }
      )
      this.customSelectInstance.container.addEventListener(
          'keydown',
          e => {
            e.preventDefault()
          }
      )
    },

    removeCustomSelectEvents() {
      this.customSelectInstance.container.removeEventListener(
          'custom-select:open',
          () => {
            this.isListOpened = true
          }
      )
      this.customSelectInstance.container.removeEventListener(
          'custom-select:close',
          () => {
            this.isListOpened = false
          }
      )
      this.customSelectInstance.container.removeEventListener(
          'keydown',
          e => {
            e.preventDefault()
          }
      )
    },

    fixDisplayOfEmptyValue() {
      const opener = this.$el
          .querySelector(`.${CUSTOM_SELECT_CONFIG.openerClass} > span`)

      if (opener) {
        opener.innerHTML = '&nbsp;'
      }
    },
  },
}
</script>

<style lang="scss">
@import "@/scss/variables";

$col-select-field-selected-background: #ccc;
$col-select-field-selected: white;
$col-select-field-hover-background: rgba(#fff, 0.05);
$col-switch-field-background: blue;
$col-switch-field-disabled: white;
$col-switch-field-enabled: white;
$col-switch-field-enabled-bg: blue;
$col-switch-field-enabled-border: darken($col-switch-field-enabled, 10%);
$col-switch-field-disabled-border: darken($col-switch-field-disabled, 10%);

$col-field-text: #000;
$col-field-text-unfocused: #ccc;
$col-field-text-disabled: #999;
$col-field-hover: blue;
$col-field-icon: $col-field-text;
$col-field-border: grey;
$col-dropdown-bg: white;

$z-index-select-field-list: 5;

$field-color-background: grey;
$field-color-text: $col-field-text;
$field-color-border: $col-field-border;
$field-color-focused: $field-color-text;
$field-color-unfocused: $col-field-text-unfocused;
$field-color-disabled: $col-field-text-disabled;
$field-color-readonly-bg: green;
$field-color-error: red;
$field-label-font-size: 1.2rem;
$field-label-line-height: 1;
$field-text-font-size: 1.6rem;
$field-text-line-height: 1.25;
$field-error-font-size: 1.2rem;
$field-error-line-height: 1.25;
$field-transition-duration: 0.2s;
$field-error-margin-top: 0.4rem;
$field-input-padding-top: 1.2rem;
$field-input-padding-bottom: 1.2rem;
$field-input-padding-left: 1.6rem;
$field-input-padding-right: 1.6rem;
$field-input-padding: $field-input-padding-top $field-input-padding-left $field-input-padding-bottom $field-input-padding-right;
$textarea-background-color: #f9fafc;

@mixin material-border($color-focused, $color-unfocused, $focused-selector:'') {
  border: 0.1rem solid $color-unfocused;
  border-radius: 1.2rem;
  transition-duration: $field-transition-duration;
}

@mixin label-font-sizes {
  font-size: $field-label-font-size;
  line-height: $field-label-line-height;
}

@mixin readonly-material-border($color) {
  border: 0.1rem solid $color;
  background: none;
}

@mixin placeholder {
  color: $field-placeholer-color;
  transition: opacity $field-transition-duration;
}

$select-field-height-large: 5.2rem;
$select-field-height-medium: 5rem;
$select-field-height-small: 4rem;
$select-field-height-x-small: 3.6rem;

.select-field {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  color: $field-color-text;
}

.select-field__wrp {
  position: relative;
  height: 100%;
}

.select-field__select-wrp {
  position: relative;
  height: 100%;
}

.select-field__opener {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;
  min-width: 16rem;
  min-height: 3.6rem;
  background: white;
  font-weight: bold;
  border: none;
  border-radius: 1rem;
  color: #8A8A8A;
  padding: $field-input-padding;
  padding-right: 2.4rem;
  height: $select-field-height-large;
  box-shadow: $app-shadow;

  .select-field--open & {
    border-radius: 1.2rem 1.2rem 0 0;
  }

  .select-field--disabled &,
  .select-field--readonly & {
    cursor: default;
    pointer-events: none;
    color: $field-color-unfocused;

    @include readonly-material-border(red);
  }

  .select-field--error & {
    border-color: $field-color-error;
  }

  //&:not([disabled]):hover {
  //  border-color: $col-field-hover;
  //}
}

.select-field__wrp select {
  display: none;
}

.select-field__panel {
  opacity: 0;
  visibility: hidden;
  transition: 0.2s ease-out;
  margin-top: -1rem;
  position: absolute;
  left: 0;
  width: 100%;
  min-width: 16rem;
  top: 100%;
  background-color: $col-dropdown-bg;
  border-radius: 0 0 1.2rem 1.2rem;
  z-index: $z-index-select-field-list;
  max-height: 31rem;
  overflow-y: auto;
  filter: drop-shadow(0 0.4rem 0.4rem rgba(0, 0, 0, 0.08));
}

.select-field--open .select-field__panel {
  visibility: visible;
  opacity: 1;
  margin-top: 0;
}

.select-field__option {
  padding: 0.8rem 1.6rem;
  font-size: 1.6rem;
  transition: background-color 0.15s ease-out;
  cursor: pointer;
  border: none;
  min-height: 5.2rem;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  background-color: transparent;
}

.select-field__option--focused {
  background-color: $col-select-field-hover-background;
}

.select-field__option--selected {
  background-color: $col-select-field-selected-background;
  color: $col-select-field-selected;
}

.select-field__label {
  transition: all $field-transition-duration;
  pointer-events: none;
  color: $field-color-focused;
  margin-bottom: 0.8rem;

  @include label-font-sizes;
}

.select-field__selected-icon {
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  will-change: transform;
  color: #8A8A8A;
  font-size: 2.2rem;
  line-height: 1.5rem;
  pointer-events: none;

  &:before {
    transition: transform 0.2s ease-out;
  }

  .select-field--disabled &,
  .select-field--readonly & {
    filter: grayscale(100%);
    color: $field-color-unfocused;
  }
}

.select-field__selected-icon--active:before {
  transform: rotate(-180deg);
}

.select-field--disabled,
.select-field--readonly {
  filter: grayscale(100%);
}

.select-field--focused > .select-field__label {
  top: 0;
  color: $field-color-focused;
}

.select-field__label--minimized {
  top: 0;
}

.select-field__err-mes {
  color: $field-color-error;
  margin-top: $field-error-margin-top;
  font-size: $field-error-font-size;
  line-height: $field-error-line-height;
}

.select-field--error > .select-field__selected {
  @include material-border($field-color-error, $field-color-error);
}

.select-field--error > .select-field__label,
.select-field--error .select-field__selected-icon {
  color: $field-color-error;
}
</style>
