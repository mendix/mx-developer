<template>
  <div :class="b()">
    <a v-if="sprintr" :class="b('icon')" :href="notificationsDeepLink"></a>
    <span v-if="!sprintr" :class="b('icon')" @click.stop.prevent="notifications"></span>
  </div>
</template>
<script>
import Vue from 'vue';

import { replaceEnvLink, onSprintr, clickMf } from 'Resources/helpers';

export default {
  name: 'notifications',
  data () {
    return {
      sprintr: onSprintr(),
      notificationsDeepLink: replaceEnvLink('https://sprintr.home.mendix.com/link/notifications'),
      sprintrNotificationsMF: 'DL_Notifications'
    }
  },
  methods: {
    notifications() {
      clickMf(this.sprintrNotificationsMF, this.notificationsDeepLink);
    }
  }
};
</script>
