<template>
  <div class="books">
    <div class="books__load-book">
      <div class="books__load-label">
        <img
          class="books__icon"
          :src="iconAdd"
        >
        <span>{{ $t('books.load-book-lbl') }}</span>
        <input
          @change="onChange"
          type="file"
          class="books__upload-book-input"
          accept=".epub"
        >
      </div>
    </div>

    <router-link
      to="/home/books-editor"
      class="books__create-book"
    >
      <div class="books__create-label">
        <img
          class="books__icon"
          :src="iconBook"
        >
        <span>{{ $t('books.create-book-lbl') }}</span>
      </div>
    </router-link>

    <div class="books__load-book-hint">
      <span>{{ $t('books.load-book-hint') }}</span>
    </div>
  </div>
</template>

<script>
  import iconAdd from '@/assets/icons/add-circle-outline.svg'
  import iconBook from '@/assets/icons/book.svg'


  export default {
    name: 'books',
    data: () => ({
      iconAdd,
      iconBook,
    }),
    methods: {
      onChange (event) {
        const file = event.target.files[0];
        this.$router.push({
          name: 'books-editor',
          params: { loadedBookFile: file }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/scss/variables";

  .books {
    width: 100%;
    min-height: calc(100vh - 88px);
    padding: 3.4rem 7.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .books__load-book,
  .books__create-book {
    position: relative;
    width: 100%;
    padding: 8.4rem 0;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    text-decoration: none;
    color: $books-action-color;
    box-shadow: $app-shadow;
    background-color: $books-action-bg-color;

    &:hover {
      cursor: pointer;
      box-shadow: 0 0 0 1px $books-action-hover-border-color inset;
    }
  }

  .books__load-label,
  .books__create-label {
    display: flex;
    align-items: center;

    & > .books__icon {
      margin-right: 0.8rem;
    }
  }

  .books__create-book {
    margin-top: 3rem;
  }

  .books__load-book-hint {
    width: 60%;
    margin-top: 4.5rem;
    color: $books-load-hint-color;
    font-size: 1.5rem;
    line-height: 1.2;
    text-align: center;
  }

  .books__upload-book-input {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    opacity: 0;
  }
</style>