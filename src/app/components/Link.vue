<template>
  <div>
      <a :href="url" v-if="!link.external && track" v-track-link>{{ link.title }}</a>
      <a :href="url" v-if="!link.external && !track">{{ link.title }}</a>
      <a :href="url" v-if="link.external && track" target="_blank" rel="noopener" v-track-link>{{ link.title }}</a>
      <a :href="url" v-if="link.external && !track" target="_blank" rel="noopener">{{ link.title }}</a>
  </div>
</template>
<script>
import Vue from 'vue';

import {replaceEnvLink} from 'Resources/helpers';

export default {
  name: 'link-element',
  props: [
    'link',
    'track',
    'target'
  ],
  data () {
    return {

    }
  },
  computed: {
    url() {
      if (!this.link || !this.link.url) {
        return '#';
      }
      return replaceEnvLink(this.link.url);
    }
  },
  methods: {

  }
};
</script>
