import { mount, flushPromises } from "@vue/test-utils"

import { Store } from '@/state/store'
import NewPost from "@/components/NewPost/NewPost.vue"

let routes: string[] = []

jest.mock('vue-router', () => ({
  useRouter: () => {
    return {
      push: (route: string) => {
        routes.push(route)
      }
    }
  }
}))

jest.mock('axios', () => ({
  post: (url: string, payload: any) => {
    return {
      data: payload
    }
  }
}))

describe('NewPost', () => {
  const store = new Store({
    posts: {
      ids: [],
      all: new Map(),
      loaded: false
    }
  })

  beforeEach(() => {
    // Reset the routes before each test
    routes = []
  })

  it('creates a new post and redirects to /', async () => {
    const wrapper = mount(NewPost, {
      global: {
        plugins: [store]
      }
    })

    // Before the save the state should have no "posts"
    expect(store.getState().posts.ids).toHaveLength(0)

    await wrapper.find('[data-test="submit"]').trigger('click')

    // After the save the state should have one "post"
    expect(store.getState().posts.ids).toHaveLength(1)

    // Expect the routing
    expect(routes).toEqual(['/'])
  })
})
