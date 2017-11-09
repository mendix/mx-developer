<template>
  <div :class="b()" @mouseenter="mouseenter" @mouseleave="mouseleave" @click="menu">
    <a :class="b('head', { on, 'has-sub': link.sub && link.sub.length > 0 })" v-if="link.url" :href="link.url">{{ link.title }}</a>
    <a :class="b('head', { on, 'has-sub': link.sub && link.sub.length > 0 })" v-else href="#" @click.stop.prevent="menu">{{ link.title }}</a>
    <span :class="b('expand')" v-if="link.sub && link.sub.length > 0" @click.stop.prevent="menu">
      <span :class="b('expand-icon', { 'active': on })"></span>
    </span>
    <div :class="b('submenu', { on })" v-if="link.sub && link.sub.length > 0">
      <ul :class="b('linkblock')">
        <li :class="b('link')" v-for="(sub, index) in link.sub" :key="index">
          <a :href="sub.url">{{ sub.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';

export default {
  name: 'headerlink',
  props: ['link', 'mob'],
  data () {
    return {
      on: false
    }
  },
  methods: {
    menu() {
      if (this.mob) {
        this.on = !this.on;
      }
    },
    mouseenter() {
      this.on = !this.mob ? true : this.on;
    },
    mouseleave() {
      if (!this.mob) {
        this.on = false;
      }
    }
  }
};
</script>
