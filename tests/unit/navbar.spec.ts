import { mount } from '@vue/test-utils'

// Using createRouter and createWebHistory is not going to work well here
// So we need to mock the router
//import { createRouter, createWebHistory } from 'vue-router'

import Navbar from '@/components/Navbar/Navbar.vue'
// We need to import the SignUp component which we want to search for
import SignUp from '@/components/SignUp/SignUp.vue'
import { Store } from  '@/state/store'

describe('Navbar', () => {
  it('shows a signup modal via teleport', async() => {
    const store = new Store({
      posts: {
        ids: [],
        all: new Map(),
        loaded: false,
      }
    })

    // Mock the '#modal' div for the teleport to work
    const el = document.createElement('div')
    el.id = "modal"
    document.body.appendChild(el)

    const wrapper = mount(Navbar, {
      attachTo: document.body,
      global: {
        components: {
          RouterLink: {
            template: `<div></div>`
          }
        },
        plugins: [
          store,
          // createRouter({
          //   history: createWebHistory(),
          //   routes: []
          // })
        ]
      }
    })

    const form = wrapper.getComponent(SignUp)

    expect(document.body.outerHTML).toContain('The value must be between 10 and 30')

    await form.get('#Username').setValue('Racheli Verechzon')
    await form.get('#Password').setValue('0123456789')

    expect(document.body.outerHTML).not.toContain('The value must be between 10 and 30')

    await form.trigger('submit.prevent')
  })
})
