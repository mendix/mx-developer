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
  </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { ResizeObserver } from 'Resources/vendor/vue-resize';
import { isSmallViewport, isPhoneViewport } from 'Resources/helpers';
import NavBar from './Navbar.vue';
// import NotificationBar from './NotificationBar.vue';

let timeout = null;

export default {
  name: 'header',
  data() {
    return {
      mob: false,
      phone: false,
      init: false
    }
  },
  components: {
    NavBar,
    'resize-observer': ResizeObserver
  },
  computed: {
    ...mapGetters([
        'bgShown'
    ])
  },
  methods: {
    menu() {
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
