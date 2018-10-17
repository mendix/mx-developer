<template>
  <span :id="id" :class="b({ on, 'has-sub': link.sub && link.sub.length > 0, 'is-link': true })" @click.stop.prevent="onClick">{{ link.title }}</span>
</template>
<script>
import Vue from 'vue';

let timeout = null;

export default {
  name: 'headerlink__head',
  props: ['link', 'mob', 'on', 'menu', 'topmenu', 'alternative', 'linkID'],
  computed: {
    alternateUrl: function () {
      return this.alternative && this.alternative.url || false;
    },
    id: function () {
      return this.linkID || null;
    }
  },
  methods: {
    onClick(evt) {
      if (window.mx && window.mx.data && window.mx.data.action) {
        let progress = null;
        if (this.link.progress && window.mx && window.mx.ui && window.mx.ui.showProgress) {
          progress = window.mx.ui.showProgress();
        }
        window.mx.data.action({
          params: {
            actionname: this.link.microflow,
          },
          callback: () => {
            if (progress !== null && window.mx && window.mx.ui && window.mx.ui.hideProgress) {
              window.mx.ui.hideProgress(progress);
              progress = null;
            }
          },
          error: () => {
            if (progress !== null && window.mx && window.mx.ui && window.mx.ui.hideProgress) {
              window.mx.ui.hideProgress(progress);
              progress = null;
            }
            if (this.alternateUrl) {
              window.location = this.alternateUrl;
            }
          }
        })
      } else {
        if (this.alternateUrl) {
          window.location = this.alternateUrl;
        }
      }
    }
  }
};
</script>
