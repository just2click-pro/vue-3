import { defineComponent } from 'vue';
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

import { Post } from '@/mocks.ts'

dayjs.extend(advancedFormat)

export default defineComponent({
  name: 'TimelinePost',
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    }
  },

})
