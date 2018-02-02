<template>
    <a
      v-if="link.url && !link.external"
      :class="b({ on, 'has-sub': link.sub && link.sub.length > 0, 'is-link': true })"
      :href="link.url"
      @click="menuClick"
      v-track-link>{{ link.title }}</a>
    <a
      v-else-if="link.url && link.external && link.sub && link.sub.length > 0"
      :class="b({ on, 'has-sub': link.sub && link.sub.length > 0, 'is-link': true })"
      :href="link.url"
      @click="menuClick"
      target="_blank" rel="noopener"
      v-track-link>{{ link.title }}</a>
    <a
      v-else-if="link.url && link.external && !(link.sub && link.sub.length > 0)"
      :class="b({ on, 'has-sub': link.sub && link.sub.length > 0, 'is-link': true })"
      :href="link.url"
      target="_blank" rel="noopener"
      v-track-link>{{ link.title }}</a>
    <span
      v-else
      :class="b({ on, 'has-sub': link.sub && link.sub.length > 0 })"
      @click.stop.prevent="menu">{{ link.title }}</span>
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
