<script>
import HeaderLinkMixin from '../mixins/HeaderLink.vue';

import toplink from './TopLink.vue';

export default {
  name: 'headerlink',
  mixins: [
    HeaderLinkMixin
  ],
  components: {
    toplink,
  }
};
</script>
