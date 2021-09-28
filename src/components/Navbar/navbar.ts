import { computed, defineComponent } from 'vue';

import SignUp from '@/components/SignUp/SignUp.vue'
import { useModal } from '@/composibles/useModal'

export default defineComponent({
  name: 'navbar',
  components: {
    SignUp
  },

  setup() {
    const modal = useModal()

    return {
      show: () => {
        modal.showModal()
      }
    }
  }
});
