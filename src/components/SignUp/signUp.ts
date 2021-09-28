import { computed, defineComponent, ref, nextTick } from 'vue';

import FormInput from '@/components/FormInput/FormInput.vue'
import { length, required, Status, validate } from '@/Validations/validation'
import { User, useStore } from '@/state/store'
import { useModal } from '@/composibles/useModal'

export default defineComponent({
  name: 'sign-up',
  components: {
    FormInput
  },

  setup() {
    const store = useStore()
    const modal = useModal()

    const username = ref('username')
    const usernameStatus = computed<Status>(() => {
      return validate(username.value,
        [required(), length({ min: 5, max: 10 })])
    })

    const password = ref('password')
    const passwordStatus = computed<Status>(() => {
      return validate(password.value,
        [required(), length({ min: 10, max: 30 })])
    })

    const submit = async (e: Event) => {
      const newUser: User = {
        id: '-1',   // -1 indicates a new user
        username: username.value,
        password: password.value
      }

      await store.createUser(newUser)
      nextTick(() => {
        modal.hideModal()
      })
    }

    return {
      password,
      passwordStatus,
      submit,
      username,
      usernameStatus
    }
  }
})
