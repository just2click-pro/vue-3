import { defineComponent, onMounted, ref, watch, watchEffect } from 'vue'
import { parse } from 'marked'
import highlight from 'highlight.js'
import debounce from 'lodash/debounce'

import { Post } from '@/mocks'

export default defineComponent({
  name: 'PostWriter',
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    }
  },

  emits: {
    save: (post: Post) => {
      // validations
      return true
    },
  },

  setup (props, ctx) {
    const title = ref(props.post.title)
    const content = ref('## Title\nEnter your text here...')
    const html = ref('')

    const parseHtml = (value: string) => {
      html.value = parse(value, {
        gfm: true,
        breaks: true,
        highlight: (code: string) => {
          return highlight.highlightAuto(code).value
        }
      })
    }

    /**
    // One option
    // watch(content, (newContent) => {
    //   html.value = parse(newContent)
    // }, {
    //   immediate: true // Forces the watch to trigger on load
    // })

    // Second option - doesn't work with debounce
    // watchEffect(() => {
    //   html.value = parse(content.value, {
    //     gfm: true,
    //     breaks: true,
    //     highlight: (code: string) => {
    //       return highlight.highlightAuto(code).value
    //     }
    //   })
    // })
     */

    // Long version
    // watch(content, debounce((value) => {
    //   parseHtml(value)
    // }, 250), {
    //   immediate: true
    // })

    // One liner
    watch(content, debounce(parseHtml, 250), { immediate: true })

    const contentEditable = ref<HTMLDivElement | null>(null)

    const handleInput = () => {
      if (!contentEditable.value) {
        throw new Error('This should never happen')
      }

      content.value = contentEditable.value?.innerText || ''
    }

    onMounted(() => {
      if (!contentEditable.value) {
        throw new Error('This should never happen')
      }
      contentEditable.value.innerText = content.value
    })

    const save = () => {
      const freshPost: Post = {
        ...props.post,
        title: title.value,
        html: html.value,
        markdown: content.value
      }

      ctx.emit('save', freshPost)
    }

    return {
      content,
      contentEditable,
      handleInput,
      html,
      save,
      title,
    }
  }
})
