<template>
  <div class="books-editor">
    <template v-if="isLoadedBook">
      <div
          v-if="loadedBookFile"
          class="books-editor__header"
      >
        {{ $t('books-editor.file') }}
        {{ loadedBookFile.name }}
        {{ $t('books-editor.successful-load') }}
      </div>

      <validation-observer
        class="books-editor__form"
        v-slot="{ handleSubmit }"
      >
        <form
          @submit.prevent="handleSubmit(submit)"
        >
          <div class="books-editor__details">
            <div class="books-editor__details-col">
              <validation-provider
                :rules="editableBookId ? '' : 'required'"
                v-slot="{ errors }"
              >
                <file-field
                  v-model="form.coverFile"
                  :file-extensions="['png', 'jpeg', 'jpg']"
                  :exist-img-url="existTitleImgUrl"
                  :error-message="$t(errors[0])"
                  @state-img-url="changeStateImgUrl"
                />
              </validation-provider>
            </div>

            <div class="books-editor__details-col">
              <div class="books-editor__title-field">
                <div class="books-editor__title-label">
                  {{ $t('books-editor.title-book-lbl') }}
                </div>
                <validation-provider
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input-field
                    v-model="form.title"
                    :placeholder="$t('books-editor.title-book-placeholder')"
                    :error-message="$t(errors[0])"
                  />
                </validation-provider>
              </div>

              <div class="books-editor__description-field">
                <div class="books-editor__description-label">
                  {{ $t('books-editor.description-book-lbl') }}
                </div>
                <validation-provider
                  rules="required"
                  v-slot="{ errors }"
                >
                  <text-area-field
                    v-model="form.description"
                    name="text-field"
                    class="books-editor__description-field"
                    :placeholder="$t('books-editor.description-book-placeholder')"
                    :error-message="$t(errors[0])"
                  />
                </validation-provider>
              </div>
            </div>

            <div class="books-editor__details-col">
              <div class="books-editor__genre-field">
                <div class="books-editor__genre-label">
                  {{ $t('books-editor.genre-book-lbl') }}
                </div>
                <select-field
                    :value="genre"
                >
                  <option
                      v-for="item in 5"
                      :key="item"
                      :value="item"
                  >
                    Выберите
                  </option>
                </select-field>
              </div>
            </div>

            <div class="books-editor__details-col">
              <div class="books-editor__settings-label">
                {{ $t('books-editor.settings-lbl') }}
              </div>
              <file-field
                class="books-editor__settings-field"
                :label="$t('books-editor.load-new-file-placeholder')"
              />
            </div>
          </div>

          <div class="books-editor__text-editor">
            <div class="books-editor__text-editor-label">
              {{ $t('books-editor.tool-panel-lbl') }}
            </div>
            <text-editor
              :book-content="form.bookFileText"
              @input="updateContent"
              :error-message="textEditorErrorMessage"
            />
          </div>

          <div class="books-editor__actions">
            <button
              disabled
              class="books-editor__ app__button-raised"
            >
              {{ $t('books-editor.complete-btn') }}
            </button>
            <button
              type="submit"
              class="app__button-raised"
            >
              {{ $t('books-editor.save-btn') }}
            </button>
            <button
              disabled
              class="app__button-raised"
            >
              {{ $t('books-editor.remove-btn') }}
            </button>
          </div>
        </form>
      </validation-observer>
    </template>

    <template v-else>
      <spinner />
    </template>
  </div>
</template>

<script>
  import FileField from '@/components/fields/FileField'
  import InputField from '@/components/fields/InputField'
  import TextAreaField from '@/components/fields/TextAreaField'
  import SelectField from '@/components/fields/SelectField'
  import TextEditor from '@/components/books/TextEditor'
  import Spinner from '@/components/common/Spinner'
  import config from '@/config'
  import { vuexTypes } from '@/store/types'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'books-editor',
    components: {
      FileField,
      InputField,
      TextAreaField,
      SelectField,
      TextEditor,
      Spinner
    },
    props: {
      loadedBookFile: { type: [File, Object], default: () => {} },
      editableBookId: { type: String, default: '' }
    },
    data: () => ({
      form: {
        coverFile: null,
        author: 'Unknown Author',
        title: '',
        description: '',
        bookFileText: '',
        arraySongs: []
      },
      textEditorErrorMessage: '',
      existTitleImgUrl: '',
      isLoadedBook: false,
      genre: 'select'
    }),
    computed: {
      ...mapGetters({
        loadedNewBookContent: vuexTypes.bookContent
      }),
      isLoadedNewBook () {
        return this.loadedBookFile instanceof File
      },
      isEditableBook () {
        return this.editableBookId !== ''
      }
    },
    methods: {
      ...mapActions({
        createBook: vuexTypes.CREATE_BOOK,
        updateBook: vuexTypes.UPDATE_BOOK,
        loadBookContent: vuexTypes.LOAD_BOOK_CONTENT,
        getBook: vuexTypes.GET_BOOK_BY_ID
      }),
      updateContent (content) {
        this.form.bookFileText = content
      },
      async submit () {
        if (this.form.bookFileText === '') {
          this.textEditorErrorMessage = this.$t('validation.required')
          return
        }
        try {
          if (!this.isEditableBook) {
            await this.createBook(this.form)
            alert('Книга создана')
          } else {
            await this.updateBook({
              ...this.form,
              bookId: this.editableBookId,
            })
            alert('Книга успешно обновлена')
          }

          await this.$router.push({ name: 'draft-books' })
        } catch (err) {
          if (err.response.data.errorCode && err.response.data.errorCode === 'book_exists') {
            alert(this.$t('books-editor.book-exists'))
          } else {
            alert('Ошибка')
          }
        }
      },
      getFormatBookContent (content) {
        return content.reduce((previousValue, currentValue) => previousValue + currentValue.data, '')
      },
      changeStateImgUrl (value) {
        this.existTitleImgUrl = value
      }
    },
    async mounted () {
      if (this.isLoadedNewBook) {
        const { fileContent } = await this.loadBookContent(this.loadedBookFile)
        this.form.bookFileText = this.getFormatBookContent(fileContent)
      } else if (this.isEditableBook) {
        const { book, content } = await this.getBook(this.editableBookId)
        this.existTitleImgUrl = config.hostUrl  + `/static/images/${book.cover}`
        this.form.title = book.title
        this.form.description = book.description
        this.form.bookFileText = this.getFormatBookContent(content)
      }
      this.isLoadedBook = true
    }
  }
</script>

<style scoped lang="scss">
  @import "@/scss/variables";

  $_border-radius: 1rem;

  .books-editor {
    width: 100%;
    min-height: calc(100vh - 88px);
    padding: 3.4rem 7.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .books-editor__form {
    width: 100%;
  }

  .books-editor__header {
    width: 100%;
    padding: 1.4rem 0;
    font-size: 1.5rem;
    line-height: 1.2;
    text-align: center;
    border-radius: $_border-radius;
    box-shadow: $app-shadow;
    background-color: $books-editor-tool-bg-color;
  }

  .books-editor__details {
    margin-top: 5rem;
    width: 100%;
    display: grid;
    grid-template-columns: 350px 1fr calc(1fr / 2) calc(1fr / 2);
    grid-template-rows: 45rem;
    grid-gap: 4.6rem;
    height: 40.5rem;
  }

  .books-editor__title-label,
  .books-editor__genre-label,
  .books-editor__text-editor-label,
  .books-editor__settings-label,
  .books-editor__description-label {
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    line-height: 30px;
    margin-bottom: 1.2rem;
  }

  .books-editor__settings-field {
    height: calc(100% - 4.2rem);
  }

  .books-editor__description-field {
    // TODO: need review for set to 100%
    height: 30.2rem;
  }

  .books-editor__text-editor {
    width: 100%;
    margin-top: 7.8rem;
  }

  .books-editor__actions {
    width: 50%;
    display: flex;
    margin: 5rem auto;

    &>button {
      margin: 0 1.4rem;
    }
  }

  //.books-editor__details-col {
  //  height: 45rem;
  //}
</style>
