<template>
  <div>
      <a :href="link.url" v-if="!link.external && track" v-track-link>{{ link.title }}</a>
      <a :href="link.url" v-if="!link.external && !track">{{ link.title }}</a>
      <a :href="link.url" v-if="link.external && track" target="_blank" rel="noopener" v-track-link>{{ link.title }}</a>
      <a :href="link.url" v-if="link.external && !track" target="_blank" rel="noopener">{{ link.title }}</a>
  </div>
</template>
<script>
import Vue from 'vue';

export default {
  name: 'link',
  props: [
    'link',
    'track',
    'target'
  ],
  data () {
    return {

    }
  },
  methods: {

  }
};
</script>
