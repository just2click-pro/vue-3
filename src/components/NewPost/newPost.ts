import { defineComponent } from 'vue';
import dayjs from 'dayjs'
import { useRouter } from 'vue-router';

import PostWriter from '@/components/PostWriter/PostWriter.vue'
import { Post } from '@/mocks'
import { useStore } from '@/state/store'

export default defineComponent({
  name: 'NewPost',
  components: {
    PostWriter
  },

  setup () {
    const newPost: Post = {
      id: '-1',
      title: 'New post',
      created: dayjs()
    }

    const store = useStore()
    const router =  useRouter()

    const save = async (post: Post) => {
      await store.createPost(post)
      // Go to root route
      router.push('/')
    }

    return {
      newPost,
      save
    }
  }
});
