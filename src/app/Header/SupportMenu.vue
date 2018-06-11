<template>
  <div :class="b()" @mouseenter="mouseenter" @mouseleave="mouseleave" v-on:click="menu">
    <span :class="b('icon')"></span>
    <div :class="b('submenu', { open })">
        <a :class="b('submenu__link')" v-for="(sub, index) in links" :key="index" :href="sub.url" v-track-link>{{ sub.title }}</a>
        <guidance-button :class="b('submenu__link', { 'guidance': true })" />
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
const links = require('Resources/menu/support.json');
import GuidanceFlowButton from './GuidanceFlowButton.vue';

let timeout = null;

export default {
  name: 'supportmenu',
  data () {
    return {
      open: false,
      links
    }
  },
  methods: {
    mouseleave(e) {
      this.open = false;
    },
    mouseenter(e) {
      this.open = true;
    },
    menu(e) {
      this.open = !this.open;
    }
  },
  components: {
    'guidance-button': GuidanceFlowButton
  }
};
</script>
