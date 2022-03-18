<template>
  <div class="draft-books-form">
    <div class="draft-books-form__wrp">
      <div
          class="draft-books-form-title"
      >
        {{ $t('draft-books.title') }}
      </div>

      <div class="draft-books-form-list">
        <book-item
          v-for="(item, index) in books"
          :key="`draft-book-${index}`"
          :title="item.title"
          :cover="item.cover"
          :id="item.id"
        />
      </div>

    </div>
  </div>
</template>

<script>
  import BookItem from './BookItem.vue'

  export default {
    name: 'draft-books-form',
    components: { BookItem  },
    props: {
      books: { type: Array, required: true }
    },
    data: () => ({

    }),
  }
</script>

<style scoped lang="scss">
  @import "@/scss/variables";

  .draft-books-form-title {
    text-decoration: none;
    color: $ready-books-color;
    font-size: 2.5rem;
    width: 100%;
  }

  .draft-books-form__wrp {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .draft-books-form-list {
    margin-top: 3.4rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 3.6rem;
  }

  .draft-books-form {
    width: 100%;
  }

</style>
