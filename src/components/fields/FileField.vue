<template>
  <div
    class="file-field"
    :class="[
      {
        'file-field--error': errorMessage.length,
      },
    ]"
  >
    <div class="file-field__content">
      <template v-if="isEmpty && !isExistImgUrl">
        <div class="file-field__empty-placeholder">
          <img
            v-if="!label"
            :src="iconAddPhoto"
            class="file-field__empty-placeholder-icon"
          >
          <span class="file-field__empty-placeholder-lbl">
            {{ getLabel }}
          </span>
        </div>

        <input
          type="file"
          class="file-field__input"
          :accept="acceptedExtensions"
          title=""
          @change="onChange"
          @dragenter="isFileDragged = true"
          @dragleave="isFileDragged = false"
          @drop="isFileDragged = false"
        >

        <div
          v-if="!label"
          class="file-field__info-icon"
        >
          <img :src="iconInfoOutline">
        </div>
      </template>

      <template v-else>
        <div class="file-field__preview">
          <button
            class="file-field__reset-btn"
            @click="reset"
          >
            <i class="mdi mdi-close file-field__reset-icon" />
          </button>
          <div class="file-field__img-preview-wrp">
            <img
              class="file-field__img-preview"
              :src="existImgUrl || fileUrl"
            >
          </div>
        </div>
      </template>
    </div>
    <div class="file-field__error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
  import iconAddPhoto from '@/assets/icons/add-photo.svg'
  import iconInfoOutline from '@/assets/icons/info-outline.svg'

  const IMAGE_FILE_EXTENSIONS = ['jpg', 'png']

  export default {
    name: 'file-field',
    props: {
      fileExtensions: { type: Array, default: () => IMAGE_FILE_EXTENSIONS },
      label: { type: String, default: undefined },
      existImgUrl: { type: String, default: '' },
      errorMessage: { type: String, default: '' }
    },
    data: () => ({
      isFileDragged: false,
      fileUrl: '',
      iconAddPhoto,
      iconInfoOutline
    }),
    computed: {
      acceptedExtensions () {
        return this.fileExtensions
            .map(item => `.${item.toUpperCase()}`)
            .join(', ')
      },
      getLabel () {
        return (!this.label) ? this.$t('fields.file-field.empty-placeholder-lbl') : this.label
      },
      isEmpty () {
        return this.fileUrl === ''
      },
      isExistImgUrl () {
        return this.existImgUrl !== ''
      }
    },
    methods: {
      onChange (event) {
        const file = event.target.files[0];
        this.fileUrl = URL.createObjectURL(file);
        this.$emit('input', file)
      },
      reset () {
        this.fileUrl = ''
        this.$emit('input', null)
        this.$emit('state-img-url', '')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/scss/variables";

  .file-field,
  .file-field__preview {
    position: relative;
    height: 100%;
  }

  .file-field__content {
    text-align: center;
    position: relative;
    padding: 0.8rem;
    box-shadow: $app-shadow;
    background-color: #fff;
    border-radius: 1rem;
    transition: 0.2s;
    width: 100%;
    min-height: 14rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .file-field--error & {
      border: 1px solid $file-field-error-color;
    }
  }

  .file-field__input {
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    opacity: 0;
    height: 100%;
    width: 100%;
  }

  .file-field__empty-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .file-field__empty-placeholder-icon {
    height: 7.5rem;
    width: 7.5rem;
  }

  .file-field__empty-placeholder-lbl {
    margin-top: 3rem;
    font-size: 1.8rem;
    font-weight: bold;
    color: $file-field-placeholder-color;
  }

  .file-field__info-icon {
    position: absolute;
    bottom: 1.8rem;
    right: 1.8rem;
  }

  .file-field__img-preview-wrp {
    width: 100%;
    height: 100%;
  }

  .file-field__img-preview {
    object-fit: cover;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: auto;
    border-radius: 0.4rem;
  }

  .file-field__reset-btn {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    min-width: 3rem;
    min-height: 3rem;
    margin: 0.6rem 0.6rem;
    border-radius: 2rem;
    cursor: pointer;
    border: 1px solid #999;
    box-shadow: $app-shadow;
  }

  .file-field__error-message {
    margin-top: 0.8rem;
    color: $file-field-error-color;
  }
</style>
