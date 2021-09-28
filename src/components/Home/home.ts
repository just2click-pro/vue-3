import { defineComponent } from 'vue';

import Timeline from '@/components/Timeline/Timeline.vue'
import Spinner from '@/components/Spinner/Spinner.vue'

export default defineComponent({
  name: 'App',
  components: {
    Spinner,
    Timeline
  }
});
