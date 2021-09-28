import { createApp } from 'vue'

import axios from 'axios'
import random from 'lodash/random'

import 'highlight.js/styles/sunburst.css'

import App from './App.vue'
import { store } from '@/state/store'
import { router } from '@/routing/router'

import { today, thisWeek, thisMonth, Post } from '@/mocks'

function delay() {
  return new Promise(res => {
    setTimeout(res, 2000)
  })
}

// The dirty way of mocking the server
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axios.get = async (url: string) => {
  if (url === '/posts') {
    await delay()
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    })
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axios.post = async (url: string, post: Post) => {
  if (url === '/posts') {
    // Set a random id for the new post being mocked
    const id = random(100, 10000)

    await delay()
    return Promise.resolve({
      data: {
        ...post, id
      }
    })
  }
}

const app = createApp(App)
app.use(router)
app.use(store)

app.mount('#app')
