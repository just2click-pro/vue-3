import { mount, flushPromises } from '@vue/test-utils'
import PostWriter from '@/components/PostWriter/PostWriter.vue'
import { Post } from '@/mocks'

describe('PostWriter', () => {
  it.only('Emits a save event with the new post', async (done) => {
    const wrapper = mount(PostWriter, {
      props: {
        post: {
          title: 'New title'
        }
      }
    })

    // Set a new title
    await wrapper.find('[data-test="title"]').setValue('A new title')
    // Get the content as a div
    const $content = wrapper.find<HTMLDivElement>('[data-test="content"]')
    $content.element.innerText = "## New content"
    await $content.trigger('input')

    // We wait for the debounce to finish
    setTimeout(async () => {
      // Submit the title
      await  wrapper.find('[data-test="submit"').trigger('click')
      // Select the first element and then the first property
      const emitted = (wrapper.emitted()['save'] as any)[0][0]

      console.log('emitted? ', emitted)

      expect(emitted.title).toBe('A new title')
      expect(emitted.markdown).toBe('## New content')
      expect(emitted.html).toBe('<h2 id="new-content">New content</h2>\n')
      done()
    }, 300)

  })
})
