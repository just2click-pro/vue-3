import { defineComponent, ref, computed } from 'vue';
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

import { Post } from '@/mocks'
import { useStore } from '@/state/store'

import TimelinePost from '@/components/TimelinePost/TimelinePost.vue'


dayjs.extend(advancedFormat)
export type Period = 'Today' | 'This week' | 'This month'


export default defineComponent({
  name: 'Timeline',
  components: {
    TimelinePost
  },
  async setup () {
    const periods: Period[] = ['Today', 'This week', 'This month']
    const currentPeriod = ref<Period>('Today')
    const store = useStore()

    if (!store.getState().posts.loaded) {
      await store.fetchPosts()
    }

    const allPosts: Post[] = store.getState().posts.ids.reduce<Post[]>((acc, id) => {
      const thePost = store.getState().posts.all.get(id)

      if (!thePost) {
        throw Error(`This post was not found, id: ${id}`)
      }

      return acc.concat(thePost)
    }, [])

    const posts = computed(() => {
      return allPosts.filter(post => {
        if (currentPeriod.value === 'Today') {
          return post.created.isAfter(dayjs().subtract(1, 'day'))
        }

        if (currentPeriod.value === 'This week') {
          return post.created.isAfter(dayjs().subtract(1, 'week'))
        }

        if (currentPeriod.value === 'This month') {
          return post.created.isAfter(dayjs().subtract(1, 'month'))
        }

        return false
      })
    })

    const setPeriod = (period: Period) => {
      currentPeriod.value = period
    }

    return {
      periods,
      currentPeriod,
      setPeriod,
      posts,
    }
  }
})
