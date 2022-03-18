import { vuexTypes } from '@/store/types'
import $api from "@/http"

export default {
  actions: {
    async [vuexTypes.LOAD_BOOK_CONTENT] (context, file) {
      const formData = new FormData()
      formData.append('bookFile', file)
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      const { data } = await $api.post('/api/v1/book/generate-text-from-file', formData, { headers }
      )
      return data
    },
    async [vuexTypes.CREATE_BOOK] (context, form) {
      const formData = new FormData()
      formData.append('author', form.author)
      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('bookFileText[]', JSON.stringify([{ page: 1, data: form.bookFileText }]))
      formData.append('coverFile', form.coverFile)
      formData.append('arraySongs[]', JSON.stringify(form.arraySongs))
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      await $api.post('/api/v1/book', formData, { headers })
    },
    async [vuexTypes.UPDATE_BOOK] (context, form) {
      const formData = new FormData()
      formData.append('bookId', form.bookId)
      formData.append('author', form.author)
      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('bookFileText[]', JSON.stringify([{ page: 1, data: form.bookFileText }]))
      formData.append('arraySongs[]', JSON.stringify(form.arraySongs))
      if (form.coverFile) {
        formData.append('coverFile', form.coverFile)
      }
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      await $api.put('/api/v1/book', formData, { headers })
    },
    async [vuexTypes.LOAD_BOOKS] ({ commit }) {
      const { data } = await $api.get('/api/v1/book/books-current-user')
      commit(vuexTypes.UPDATE_BOOKS, data)
    },
    async [vuexTypes.GET_BOOK_BY_ID] (context, id) {
      const { data } = await $api.get('/api/v1/book/' + id)
      return data
    }
  },
  mutations: {
    [vuexTypes.UPDATE_BOOK_CONTENT] (state, data) {
      state.bookContent = data
    },
    [vuexTypes.UPDATE_BOOKS] (state, data) {
      state.books = data
    },
    [vuexTypes.CLEAR_BOOKS] (state) {
      state.books = []
      state.bookContent = ''
    }
  },
  state: {
    books: [],
    bookContent: ''
  },
  getters: {
    [vuexTypes.books]: (state) => state.books,
    [vuexTypes.bookContent]: (state) => state.bookContent,
  }
}
