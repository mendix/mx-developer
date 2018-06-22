<template>
  <div :class="b({ 'bg': bgShown })">
    <div class="mx-developer__row">
      <button :class="b('hamburger')" type="button" @click.stop.prevent="menu">
        <span :class="b('hamburger-box')">
          <span :class="b('hamburger-inner', { 'active': mob })"></span>
        </span>
      </button>
      <nav-bar :mob="mob" :phone="phone" :init="init" />
      <resize-observer @notify="handleResize" />
    </div>
    <notification v-if="bannerEnabled" />
  </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { ResizeObserver } from 'Resources/vendor/vue-resize';
import { isSmallViewport, isPhoneViewport, getSideBarToggle } from 'Resources/helpers';
import NavBar from './Navbar.vue';
import NotificationBar from './NotificationBar.vue';

let timeout = null;

export default {
  name: 'header',
  data() {
    return {
      mob: false,
      phone: false,
      init: false,
      bannerEnabled: process.env.OPTIONS.banner
    }
  },
  components: {
    NavBar,
    'resize-observer': ResizeObserver,
    'notification': NotificationBar
  },
  computed: {
    ...mapGetters([
        'bgShown'
    ])
  },
  mounted: function () {
    setTimeout(() => {
      this.$tracker.trackShow();
    }, 1000);
  },
  methods: {
    menu() {
      const sidebarToggle = getSideBarToggle();
      if (sidebarToggle && sidebarToggle.domNode && sidebarToggle.domNode.classList && !sidebarToggle.domNode.classList.contains('disabled')) {
        sidebarToggle.domNode.click();
        return;
      }
      this.mob = !this.mob
    },
    handleResize() {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        if (!isSmallViewport()) {
          this.mob = false;
        }
        this.phone = isPhoneViewport();
      }, 50);
    }
  }
};
</script>
