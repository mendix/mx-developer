<template>
  <span :class="b({ on, 'has-sub': link.sub && link.sub.length > 0, 'is-link': true })" @click.stop.prevent="onClick">{{ link.title }}</span>
</template>
<script>
import Vue from 'vue';
import { waitForMX } from 'Resources/helpers';

let timeout = null;

export default {
  name: 'headerlink__head',
  props: ['link', 'mob', 'on', 'menu', 'topmenu', 'alternative'],
  computed: {
    alternateUrl: function () {
      return this.alternative && this.alternative.url || false;
    }
  },
  methods: {
    onClick(evt) {
      if (window.mx && window.mx.data && window.mx.data.action) {
        window.mx.data.action({
          params: {
            actionname: this.link.microflow,
          },
          callback: () => {},
          error: () => {
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
