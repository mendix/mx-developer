<template>
  <div :class="b({'has-sub': link.sub && link.sub.length > 0})" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <toplink :on="on" :link="link" :mob="mob" :menu="menu" :topmenu="topmenu" />
    <span :class="b('expand')" v-if="link.sub && link.sub.length > 0" @click.stop.prevent="menu">
      <span :class="b('expand-icon', { 'active': on })"></span>
    </span>
    <div :class="b('submenu', { on })" v-if="link.sub && link.sub.length > 0" :style="styleHeight">
      <ul :class="b('linkblock')">
        <li :class="b('link')" v-for="(sub, index) in link.sub" :key="index">
          <a :href="sub.url" v-if="!sub.external">{{ sub.title }}</a>
          <a :href="sub.url" v-if="sub.external" target="_blank" rel="noopener">{{ sub.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import toplink from './TopLink.vue';

export default {
  name: 'headerlink',
  props: ['link', 'mob'],
  data () {
    return {
      on: false
    }
  },
  computed: {
    styleHeight: function() {
      if (!this.mob) {
        return '';
      } else if (!this.on) {
        return 'max-height: 0px;';
      } else if (!this.link.sub || this.link.sub.length === 0) {
        return 'max-height: 0px';
      } else {
        return `max-height: calc(${(this.link.sub.length * 32)}px + 1em)`;
      }
    }
  },
  components: {
    toplink,
  },
  methods: {
    menu() {
      if (this.mob) {
        this.on = !this.on;
      }
    },
    topmenu(evt) {
      if (this.mob) {
        if (!this.on) {
          evt.preventDefault();
          this.on = true;
        }
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
