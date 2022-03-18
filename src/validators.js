import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

extend('email', {
  message: 'validation.email'
})

extend('required', {
  message: 'validation.required'
})

extend('confirmed', {
  message: 'validation.confirmed'
})

extend('min', {
  message: 'validation.min'
})


Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)