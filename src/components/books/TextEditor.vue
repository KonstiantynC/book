<template>
  <div
    class="text-editor"
    :class="[
      {
        'text-editor--error': errorMessage.length,
      },
    ]"
  >
    <quill-editor
      :content="content"
      :options="editorOption"
      @change="onEditorChange($event)"
    />

    <div class="text-editor__error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'text-editor',
  components: { quillEditor },
  props: {
    bookContent: { type: String, default: '' },
    errorMessage: { type: String, default: '' }
  },
  data: () => ({
    content: '',
    editorOption: {},
    config: {}
  }),
  methods: {
    onEditorChange({ html }) {
      this.content = html
      this.$emit('input', this.content)
    }
  },
  mounted () {
    this.content = this.bookContent
  }
}
</script>

<style>
.quill-editor {
  width: 100%;
  background-color: #fff;
  border-radius: 1rem;
  border: none;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.08);
}

.ql-container.ql-snow {
  min-height: 20rem;
}
</style>

<style scoped lang="scss">
  @import "@/scss/variables";

  .text-editor {
    width: 100%;
    border-radius: 1rem;
  }

  .text-editor__editor {
    .text-editor--error & {
      border: 1px solid $input-field-error-color;
    }
  }

  .text-editor__error-message {
    margin-top: 0.8rem;
    color: $input-field-error-color;
  }
</style>