<template>
  <div :class="b({ 'bg': bgShown })" v-sticky>
    <div class="mx-developer__row">
      <button :class="b('hamburger')" jest="hamburger-button" type="button" @click.stop.prevent="menu">
        <span :class="b('hamburger-box')">
          <span :class="b('hamburger-inner', { 'active': mobStateGetter })"></span>
        </span>
      </button>
      <nav-bar :phone="phone" :init="init" />
      <resize-observer @notify="handleResize" />
    </div>
    <notification v-if="bannerEnabled && environment === 'forum'" />
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
  name: 'header-block',
  data() {
    return {
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
        'bgShown',
        'environment',
        'mobStateGetter'
    ])
  },
  mounted: function () {
    setTimeout(() => {
      this.$tracker.trackShow();
    }, 1000);
  },
  methods: {
    ...mapActions([
      'mobStateSetAction'
    ]),
    menu() {
      const sidebarToggle = getSideBarToggle();
      if (sidebarToggle && sidebarToggle.domNode && sidebarToggle.domNode.classList && !sidebarToggle.domNode.classList.contains('disabled')) {
        sidebarToggle.domNode.click();
        return;
      }
      /**
       * Using Vuex for data that needs to be accessed by the entire application is a good practice.
       * In this case, we moved mob property to the vuex store
       */
      this.mobStateSetAction();
    },
    handleResize() {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        if (!isSmallViewport()) {
          this.mobStateSetAction(false);
        }
        this.phone = isPhoneViewport();
      }, 50);
    }
  }
};
</script>
