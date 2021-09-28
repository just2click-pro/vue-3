import { mount, flushPromises } from '@vue/test-utils'

import { Store } from '@/state/store'
import Timeline from '@/components/Timeline/Timeline.vue'
import { today, thisWeek, thisMonth } from '@/mocks'

jest.mock('axios', () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    })
  }
}))

function mountTimeline () {
  const store = new Store({
    posts: {
      ids: [],
      all: new Map(),
      loaded: false,
    }
  })
  const testComponent = {
    components: { Timeline },
    template: `
      <suspense>
        <template #default>
          <Timeline />
        </template>

        <template #fallback>
          Loading ...
        </template>
      </suspense>
    `,
  }

  return mount(testComponent, {
    global: {
      plugins: [store]
    }
  })
}

describe('Timeline', () => {
  it('renders today post by default', async () => {

    const wrapper = mountTimeline()

    await flushPromises()

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
  })

  it('updates when the user clicks a period', async () => {
    const wrapper = mountTimeline()

    await flushPromises()
    await wrapper.get('[data-test="This week"]').trigger('click')

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
  })

  it ('updates when the user clicks a period', async () => {
    const wrapper = mountTimeline()

    await flushPromises()
    await wrapper.get('[data-test="This month"]').trigger('click')

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM'))
  })
})
