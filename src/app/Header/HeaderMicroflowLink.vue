<script>
import HeaderLinkMixin from '../mixins/HeaderLink.vue';

import toplink from './TopMicroflowLink.vue';

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
