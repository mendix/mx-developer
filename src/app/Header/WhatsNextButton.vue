<template>
  <span v-if="enabled" @click.stop.prevent="onClick">{{ guidanceText }}</span>
</template>
<script>
import Vue from 'vue';

export default {
  name: 'guidance-button',
  data () {
    return {
      enabled: false,
      fromStart: false,
      clickCallback: null
    }
  },
  methods: {
    onClick(e) {
      if (this.clickCallback) {
        this.clickCallback();
      }
    }
  },
  computed: {
    guidanceText: function() {
      return 'What\'s next?';
      //return (this.fromStart ? 'Start' : 'Continue') + ' your page guidance';
    }
  },
  created() {
    this.$nextTick(() => {
      window.__mxToggleWhatsNextButton = (cb, start = true) => {
        if (cb && 'function' === typeof cb) {
          this.enabled = true;
          this.clickCallback = cb;
          this.fromStart = start;
        } else {
          this.enabled = false;
          this.clickCallback = null;
        }
      }
      if (window.__mxToggleWhatsNextTemp && null !== window.__mxToggleWhatsNextTemp.cb) {
        const { cb, start } = window.__mxToggleWhatsNextTemp;
        window.__mxToggleWhatsNextButton(cb, start);
        delete window.__mxToggleWhatsNextTemp;
      }
    });
  },
};
</script>
