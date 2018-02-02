<template>
  <div :class="b({'footer': true})">
    <span :class="b('title')" v-if="link.title && !link.url">{{ link.title }}</span>
    <a v-track-link :class="b('title')" v-else-if="link.title && link.url" :href="link.url">{{ link.title }}</a>
    <ul :class="b('links', {'no-title': !link.title})" v-if="link.sub && link.sub.length > 0">
      <li :class="b('link', {'type': sub.type})" v-for="(sub, index) in link.sub" :key="index">
        <a v-track-link :href="sub.url" v-if="!sub.external">{{ sub.title }}</a>
        <a v-track-link :href="sub.url" v-if="sub.external" target="_blank" rel="noopener">{{ sub.title }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue';

export default {
  name: 'link-block',
  props: ['link']
};
</script>
