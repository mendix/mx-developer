<template>
  <div :class="b({ open })" v-if="!reviewed && enabled">
      <div :class="b('inner', { open })">
          <div :class="b('message')">
              <a href="http://gtnr.it/2yFJfzA" target="_blank" v-if="messageStatus === 1" @click="closereview">Now through December 31st, for every approved Gartner Peer Insights review of Mendix by <strong>non-partners</strong>, Gartner will donate $25 to a charity of your choice.</a>
              <a href="http://gtnr.it/2yFJfzA" target="_blank" v-if="messageStatus === 2" @click="closereview">Now through December 31st, for every approved Gartner Peer Insights review of Mendix, Gartner will donate $25 to a charity of your choice.</a>
          </div>
          <div :class="b('close')" @click.stop.prevent="closereview"></div>
      </div>
  </div>
</template>
<script>
import Vue from 'vue';
import {mapGetters} from 'vuex';

import storage from 'local-storage-fallback';
const reviewKey = 'gartner_review_2017';
const now = +(new Date());
const reviewDeadline = +(new Date(2018, 0, 1, 0, 0, 0));
const isNotificationShown = () => storage.getItem(reviewKey) || (reviewDeadline < now);
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
    }
  },
  watch: {
    messageStatus(newVal, oldVal) {
      if ((newVal === 1 || newVal === 2) && !this.reviewed) {
        this.$nextTick(function () {
          setTimeout(() => {
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
