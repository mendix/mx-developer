<template>
  <div v-if="link.microflow !== '' && show" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <span :class="b('head', { 'is-link': true })" @click.stop.prevent="onClick">{{ link.title }}</span>
    <span :class="b('expand')" v-if="link.sub && link.sub.length > 0" @click.stop.prevent="menu">
      <span :class="b('expand-icon', { 'active': on })"></span>
    </span>
    <div :class="b('submenu', { on })" v-if="link.sub && link.sub.length > 0" :style="styleHeight">
      <ul :class="b('linkblock')">
        <li :class="b('link')" v-for="(sub, index) in link.sub" :key="index">
          <link-element :track="true" :link="sub"/>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { waitForMX } from 'Resources/helpers';

let timeout = null;

export default {
  name: 'headerlink',
  props: [
    'link',
  ],
  data () {
    return {
      show: false,
      on: false
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      waitForMX(
        () => {
          const isGuest = window.mx.session.isGuest();
          if ((!this.link.anonymous && !isGuest) || (this.link.anonymous)) {
            this.show = true;
          }
        },
        () => {
          // console.log('Not a Mendix app');
        });
    });
  },
  methods: {
    onClick(evt) {
      window.mx.data &&
      window.mx.data.action &&
      window.mx.data.action({
        params: {
          actionname: this.link.microflow,
        },
        callback: () => {
          // console.log(`Microflow '${this.link.microflow}' executed`);
        }
      })
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
