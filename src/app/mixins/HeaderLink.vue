<template>
  <div :class="b({'has-sub': link.sub && link.sub.length > 0})" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <toplink :on="on"
             :link="link"
             :ontop="navlevel"
             :mob="mob"
             :menu="menu"
             :topmenu="topmenu"
             :alternative="alternative"
             :linkID="linkID" />
    <span :class="b('expand')" v-if="link.sub && link.sub.length > 0" @click.stop.prevent="menu">
      <span :class="b('expand-icon', { 'active': on })"></span>
    </span>
    <div :class="b('submenu', { on, 'is-top': navlevel && !mob })" v-if="link.sub && link.sub.length > 0 && on" :style="styleHeight">
      <ul :class="b('linkblock')">
        <li :class="b('link')" v-for="(sub, index) in link.sub" :key="index">
          <headerlink v-if="sub.sub && sub.sub.length > 0" :link="sub" :mob="mob"></headerlink>
          <link-element v-else :track="true" :link="sub"/>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';

import Link from '../components/Link.vue';

let timeout = null;

export default {
  name: 'headerlink',
  props: ['link', 'mob', 'alternative', 'linkID', 'navlevel'],
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
    'link-element': Link
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
      if (!this.mob) {
        if (timeout) {
          clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
          this.on = true;
        }, 250);
      }
    },
    mouseleave() {
      if (!this.mob) {
        if (timeout) {
          clearTimeout(timeout);
        }
        this.on = false;
      }
    }
  }
};
</script>
