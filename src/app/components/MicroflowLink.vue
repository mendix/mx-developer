<template>
  <div v-if="link.microflow !== '' && show" @click.stop.prevent="onClick">
    <span :class="b('head', { 'is-link': true })">{{ link.title }}</span>
  </div>
</template>
<script>
import Vue from 'vue';
import { waitForMX } from 'Resources/helpers';

export default {
  name: 'headerlink',
  props: [
    'link',
  ],
  data () {
    return {
      show: false
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      waitForMX(
        () => {
          const isGuest = window.mx.session.isGuest();
          if ((!this.link.anonymous && !isGuest) || (this.link.anonymous)) {
            this.show = true;
          }
        },
        () => {
          // console.log('Not a Mendix app');
        });
    });
  },
  methods: {
    onClick(evt) {
      window.mx.data &&
      window.mx.data.action &&
      window.mx.data.action({
        params: {
          actionname: this.link.microflow,
        },
        callback: () => {
          // console.log(`Microflow '${this.link.microflow}' executed`);
        }
      })
    }
  }
};
</script>
