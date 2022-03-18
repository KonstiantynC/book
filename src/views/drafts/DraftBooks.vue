<template>
  <div class="draft-books">
    <template v-if="isLoaded && books.length">
      <draft-books-form
          :books="books"
      />
    </template>

    <template v-else-if="isLoaded">
      <p>{{ $t('draft-books.empty-list') }}</p>
    </template>

    <template v-else>
      <template v-if="isLoadFailed">
        <p>{{ $t('draft-books.load-failed') }}</p>
      </template>
      <template v-else>
        <spinner/>
      </template>
    </template>
  </div>
</template>

<script>
import DraftBooksForm from "@/components/forms/ready-books/DraftBooksForm"
import Spinner from "@/components/common/Spinner"
import {mapActions, mapGetters} from "vuex"
import {vuexTypes} from "@/store/types"

export default {
  name: "draft-books",
  components: {DraftBooksForm, Spinner},
  data: () => ({
    isLoaded: false,
    isLoadFailed: false
  }),
  computed: {
    ...mapGetters({
      books: vuexTypes.books,
    })
  },
  methods: {
    ...mapActions({
      loadBooks: vuexTypes.LOAD_BOOKS,
    })
  },
  async mounted() {
    try {
      await this.loadBooks()
      this.isLoaded = true
    } catch (err) {
      this.isLoadFailed = true
    }
  }
}
</script>

<style scoped lang="scss">
.draft-books {
  width: 100%;
  min-height: calc(100vh - 88px);
  padding: 3.4rem 7.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
