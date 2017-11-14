<template>
  <div :class="b({'footer': true})">
    <span :class="b('title')" v-if="link.title">{{ link.title }}</span>
    <ul :class="b('links', {'no-title': !link.title})" v-if="link.sub && link.sub.length > 0">
      <li :class="b('link')" v-for="(sub, index) in link.sub" :key="index">
        <a :href="sub.url" v-if="!sub.external">{{ sub.title }}</a>
        <a :href="sub.url" v-if="sub.external" target="_blank" rel="noopener">{{ sub.title }}</a>
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
