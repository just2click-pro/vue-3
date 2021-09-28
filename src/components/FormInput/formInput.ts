import { defineComponent } from 'vue'
import debounce from 'lodash/debounce'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: String,
      required: true,
    },
    error: {
      type:String,
    }
  },

  setup(props, ctx) {
    const handleInput = (e: Event) => {
      ctx.emit('update:modelValue', (e.target as HTMLInputElement).value)
    }

    return {
      handleInput
    }
  }
})
