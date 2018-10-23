<template>
    <a
      v-if="link.url && !link.external"
      :class="b({ on, 'has-sub': link.sub && link.sub.length > 0, 'is-link': true, 'is-top': ontop })"
      :href="url"
      :id="id"
      @click="menuClick"
      v-track-link>{{ link.title }}</a>
    <a
      v-else-if="link.url && link.external && link.sub && link.sub.length > 0"
      :class="b({ on, 'has-sub': link.sub && link.sub.length > 0, 'is-link': true })"
      :href="url"
      :id="id"
      @click="menuClick"
      target="_blank" rel="noopener"
      v-track-link>{{ link.title }}</a>
    <a
      v-else-if="link.url && link.external && !(link.sub && link.sub.length > 0)"
      :class="b({ on, 'has-sub': link.sub && link.sub.length > 0, 'is-link': true })"
      :href="url"
      :id="id"
      target="_blank" rel="noopener"
      v-track-link>{{ link.title }}</a>
    <span
      v-else
      :class="b({ on, 'has-sub': link.sub && link.sub.length > 0 })"
      :id="id"
      @click.stop.prevent="menu">{{ link.title }}</span>
</template>
<script>
import Vue from 'vue';

import { replaceEnvLink } from 'Resources/helpers';

export default {
  name: 'headerlink__head',
  props: ['link', 'on', 'menu', 'topmenu', 'linkID', 'ontop'],
  computed: {
    url: function () {
      return this.link && this.link.url && replaceEnvLink(this.link.url) || null;
    },
    id: function () {
      return this.linkID || null;
    }
  },
  methods: {
    menuClick(evt) {
      if (!this.link || !this.link.sub || this.link.sub.length === 0) {
        return;
      }
      this.topmenu(evt);
    }
  }
};
</script>
