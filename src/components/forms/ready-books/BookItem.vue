<template>
  <div class="book-item-form">

    <div class="book-item-form__wrp">
      <img
          class="book-item-form-marker"
          :src="iconMarker"
      >
      <img
          class="book-item-form-marker-type"
          :src="iconMarkerType"
      >
      <img
          class="book-item-form-preview"
          :src="coverUrl"
      >
    </div>

    <div class="book-item-form-moderation">
      <div class="book-item-form-actions">
        <a href="#" class="book-item-form-link">
          {{ $t('draft-books.types.reading.title') }}
        </a>

        <router-link
            v-if="!routeIsReadyBooks"
            :to="{
            name:'books-editor',
            params: { editableBookId: id }
          }"
            class="book-item-form-link"
        >
          {{ $t('draft-books.types.edit.title') }}
        </router-link>
        <a v-else href="#" class="book-item-form-link">
          {{ $t('draft-books.types.edit.title') }}
        </a>
      </div>
    </div>

    <span class="book-item-form-name">
      {{ title }}
    </span>
  </div>
</template>

<script>
import bookImage from '@/assets/BookImage.png'
import iconMarker from '@/assets/marker.svg'
import iconMarkerType from '@/assets/type.svg'
import config from '@/config'

export default {
  name: 'book-item',
  props: {
    title: {type: String, required: true},
    cover: {type: String, required: true},
    id: {type: String, required: true}
  },
  computed: {
    coverUrl() {
      return this.routeIsReadyBooks ? this.bookImage : `${this.config.hostUrl}/static/images/${this.cover}`
    },
    routeIsReadyBooks() {
      return this.$route.path === '/home/ready-books'
    }
  },
  data: () => ({
    iconMarker,
    iconMarkerType,
    bookImage,
    config
  })
}
</script>

<style scoped lang="scss">
@import "@/scss/variables";

.book-item-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.book-item-form__wrp {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}

.book-item-form-preview {
  object-fit: cover;
  width: 100%;
  height: 20.8rem;
  border-radius: 1.6rem;
  margin: 0;
}

.book-item-form-name {
  display: flex;
  justify-content: center;
  width: 16.2rem;
  height: 1.6rem;
  font-size: 1.3rem;
  line-height: 1.6rem;
  font-weight: 700;
  color: $ready-books-color;
  margin: 0.8rem 0 0;
}

.book-item-form-moderation {
  width: 100%;
  position: absolute;
  max-height: 0;
  transition: max-height 0.4s ease-out;
  overflow: hidden;

  .book-item-form:hover & {
    max-height: 100%;
    transition: max-height 0.4s ease-in;
  }
}

.book-item-form-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 20.8rem;
  border-radius: 1.6rem;
  margin: 0;
  background: $book-item-form-actions-bg-color;
}

.book-item-form-link {
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  line-height: 1.6rem;
  color: $ready-books-link-color;
  text-shadow: 0 0 1rem $book-item-form-link-shadow-clr;
  margin: 0.6rem 0;
  text-decoration: none;

  &:hover {
    color: $book-item-form-link-hover-clr;
  }
}

.book-item-form-marker-type {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.book-item-form-marker {
  position: absolute;
  top: -1rem;
  right: -1rem;
}

</style>
