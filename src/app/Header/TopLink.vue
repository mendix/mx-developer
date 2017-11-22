<template>
    <a :class="b({ on, 'has-sub': link.sub && link.sub.length > 0, 'is-link': true })" v-if="link.url && !link.external" :href="link.url" @click="menuClick">{{ link.title }}</a>
    <a :class="b({ on, 'has-sub': link.sub && link.sub.length > 0, 'is-link': true })" v-else-if="link.url && link.external && link.sub && link.sub.length > 0" :href="link.url" @click="menuClick" target="_blank" rel="noopener">{{ link.title }}</a>
    <a :class="b({ on, 'has-sub': link.sub && link.sub.length > 0, 'is-link': true })" v-else-if="link.url && link.external && !(link.sub && link.sub.length > 0)" :href="link.url" target="_blank" rel="noopener">{{ link.title }}</a>
    <span :class="b({ on, 'has-sub': link.sub && link.sub.length > 0 })" v-else @click.stop.prevent="menu">{{ link.title }}</span>
</template>
<script>
import Vue from 'vue';

export default {
  name: 'headerlink__head',
  props: ['link', 'mob', 'on', 'menu', 'topmenu'],
  methods: {
    menuClick(evt) {
      if (this.link.sub.length === 0) {
        return;
      }
      this.topmenu(evt);
    }
  }
};
</script>
