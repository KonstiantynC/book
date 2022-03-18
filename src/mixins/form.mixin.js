export default {
  computed: {
    isEmptyForm () {
      const formKeys = Object.keys(this.form)
      return formKeys.some(el => this.form[el] === '')
    }
  },
}
