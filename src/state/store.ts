import { reactive, readonly, provide, inject, App } from 'vue'
import axios from 'axios'

import { Post } from '@/mocks'

export interface User {
  id: string;
  username: string;
  password: string;
}

interface State {
  posts: PostsState
}

export const storeKey = Symbol('store')

interface PostsState {
  // o(n)
  ids: string[] // [1, 2, 3, ... ]

  // o(1)
  all: Map<string, Post>
  loaded: boolean
}

export class Store {
  private state: State

  constructor(initial: State) {
    this.state = reactive(initial)
  }

  install(app: App) {
    app.provide(storeKey, this)
  }

  getState() {
    return readonly(this.state)
  }

  async createUser(user: User) {
    const { state } = this

    console.log('user? ', user)
  }

  async createPost(post: Post) {
    const { state } = this
    const response = await axios.post<Post>('/posts', post)

    state.posts.all.set(post.id, response.data)
    state.posts.ids.push(post.id)
  }

  async fetchPosts() {
    const { state } = this
    const response = await axios.get<Post[]>('/posts')

    const postsState: PostsState = {
      ids: [],
      all: new Map(),
      loaded: true
    }
    for (const post of response.data) {
      postsState.ids.push(post.id)
      postsState.all.set(post.id, post)
    }

    state.posts = postsState
  }
}

const all = new Map<string, Post>()

export  const store = new Store({
  posts: {
    all,
    ids: [],
    loaded: false,
  }
})

export function useStore(): Store {
  const _store = inject<Store>(storeKey)

  if (!_store) {
    throw Error('Opps, provide was not called for store')
  }

  return _store
}
