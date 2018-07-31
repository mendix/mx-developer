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

import Vue from 'vue';
import {mapGetters} from 'vuex';

import {CrossStorageClient} from 'chase-storage';

const reviewKey = 'header_notification_computables_2018';
const now = +(new Date());
const deadline = +(new Date(2018, 9, 7, 0, 0, 0));

let domain = 'https://developer-static.mendix.com';

if (process.env.NODE_ENV === 'development') {
  if (location.origin.indexOf('localhost') !== -1) {
    domain = 'http://localhost:3000'
  } else {
    domain = 'https://mx-developer-test.cfapps.io';
  }
}

const client = new CrossStorageClient(`${domain}/hub.html`);

let timeout = null;

export default {
  name: 'notification',
  data() {
    return {
      reviewed: false,
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
          this.reviewed = true;
          client.onConnect().then(function() {
            return client.set(reviewKey, true);
          });
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
          client
            .onConnect()
            .then(() => {
              return client.get(reviewKey);
            })
            .then((res) => {
              if (!res) {
                setTimeout(() => {
                  Vue.$tracker.trackEvent('Computables', 'open');
                  this.open = true;
                }, 1000);
              }
            })
            .catch(e => {
              Vue.$tracker.trackEvent('Computables', 'storageerror');
            });
        })
      } else {
        this.enabled = false;
      }
    }
  }
};
</script>
