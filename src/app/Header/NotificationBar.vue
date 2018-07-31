<template>
  <div :class="b({ open })" v-if="!reviewed && enabled">
    <div :class="b('inner', { open })">
      <div :class="b('message')">
        <a
          href="https://bit.ly/2IPS9zy"
          target="_blank"
          v-if="messageStatus === 1"
          @click="clickLink"
          rel="noopener noreferrer"
          v-track-link>
            We’re nominated for the Computable Awards 2018 in 7 categories! Support Mendix, and vote <strong>now</strong> via <span :class="b('message__link')">https://bit.ly/2IPS9zy</span>
          </a>
      </div>
      <div :class="b('close')" @click.stop.prevent="clickClose"></div>
    </div>
  </div>
</template>
<script>
// Currently disabled. Import this in index.vue
import Vue from 'vue';
import {mapGetters} from 'vuex';

import storage from 'local-storage-fallback';
const reviewKey = 'header_notification_computables_2018';
const now = +(new Date());
const deadline = +(new Date(2018, 9, 7, 0, 0, 0));
const isNotificationShown = () => storage.getItem(reviewKey) || (deadline < now);
const notificationSetShown = () => storage.setItem(reviewKey, true);

let timeout = null;

export default {
  name: 'notification',
  data() {
    return {
      reviewed: isNotificationShown(),
      open: false,
      enabled: true
    }
  },
  computed: {
    ...mapGetters([
        'loaded',
        'profile',
        'messageStatus'
    ])
  },
  methods: {
    closereview() {
      this.open = false;
      setTimeout(() => {
          this.reviewed = true,
          notificationSetShown();
      }, 1000);
    },
    clickClose() {
      Vue.$tracker.trackEvent('Computables', 'close');
      this.closereview();
    },
    clickLink() {
      Vue.$tracker.trackEvent('Computables', 'click');
      this.closereview();
    }
  },
  watch: {
    messageStatus(newVal, oldVal) {
      if ((newVal === 1 || newVal === 2) && !this.reviewed) {
        this.$nextTick(function () {
          setTimeout(() => {
            Vue.$tracker.trackEvent('Computables', 'open');
            this.open = true;
          }, 1000);
        })
      } else {
        this.enabled = false;
      }
    }
  }
};
</script>
