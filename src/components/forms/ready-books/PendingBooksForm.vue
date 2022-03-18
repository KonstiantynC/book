<template>
  <div class="pending-books">
    <div class="pending-books__wrp">
      <div class="pending-books-title">
        {{ $t('pending-books.sending-moderation') }}
      </div>

      <div class="pending-books-list">
        <template
            v-for="(book, index) in pendingBooks"
        >
          <book-item
              v-if="book.status === 'sending_moderation'"
              :key="`send-book-${index}`"
              :title="book.title"
              :cover="pathToImg"
              :id="book.id"
          />
        </template>
      </div>
    </div>

    <div class="pending-books__wrp">
      <div class="pending-books-title">
        {{ $t('pending-books.rejected-by-moderation') }}
      </div>

      <div class="pending-books-list">
        <template
            v-for="(book, index) in pendingBooks"
        >
          <book-item
              v-if="book.status === 'rejected_moderation'"
              :key="`reject-book-${index}`"
              :title="book.title"
              :cover="pathToImg"
              :id="book.id"
          />
        </template>
      </div>
    </div>

    <div class="pending-books__wrp">
      <div class="pending-books-title">
        {{ $t('pending-books.pending-action') }}
      </div>

      <div class="pending-books-list">
        <template
            v-for="(book, index) in pendingBooks"
        >
          <book-item
              v-if="book.status === 'pending_action'"
              :key="`pending-book-${index}`"
              :title="book.title"
              :cover="pathToImg"
              :id="book.id"
          />
        </template>
      </div>
    </div>

    <div class="pending-books__wrp">
      <div class="pending-books-title">
        {{ $t('pending-books.published-books') }}
      </div>

      <div class="pending-books-list">
        <template
            v-for="(book, index) in pendingBooks"
        >
          <book-item
              v-if="book.status === 'published_books'"
              :key="`published-book-${index}`"
              :title="book.title"
              :cover="pathToImg"
              :id="book.id"
          />
        </template>
      </div>
    </div>

  </div>
</template>

<script>
import BookItem from './BookItem.vue'
import {books} from "@/utils/pendingBooks.json"

export default {
  name: 'pending-books-form',
  components: {BookItem},
  data: () => ({
    pendingBooks: books
  }),
  computed: {
    pathToImg() {
      return '@/assets/BookImage.png'
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/variables";

.pending-books-title {
  font-size: 2.5rem;
}

.pending-books {
  width: 100%;
}

.pending-books__wrp {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 6.2rem 7.6rem 0;
}

.pending-books-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
}

</style>
