<template>
  <div :class="b({'footer': true})">
    <span :class="b('title')" v-if="link.title && !link.url">{{ link.title }}</span>
    <link-element :class="b('title')" v-else-if="link.title && link.url" :link="link" :track="true" />
    <ul :class="b('links', {'no-title': !link.title})" v-if="link.sub && link.sub.length > 0">
      <li :class="b('link', {'type': sub.type})" v-for="(sub, index) in link.sub" :key="index">
        <link-element :link="sub" :track="true" />
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue';
import Link from '../components/Link.vue';

export default {
  name: 'link-block',
  props: ['link'],
  components: {
    'link-element': Link
  }
};
</script>
