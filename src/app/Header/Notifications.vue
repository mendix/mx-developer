<template>
  <div :class="b()">
    <a v-if="!sprintr" :class="b('icon')" :href="notificationsDeepLink"></a>
    <span v-if="sprintr" :class="b('icon')" @click.stop.prevent="notifications"></span>
  </div>
</template>
<script>
import Vue from 'vue';

import { replaceEnvLink, onSprintr, clickMf } from 'Resources/helpers';
import { links, microflows } from 'Resources/mendix.json';

export default {
  name: 'notifications',
  data () {
    return {
      sprintr: onSprintr(),
      notificationsDeepLink: replaceEnvLink(links.sprintr.notifications),
      sprintrNotificationsMF: microflows.sprintr.notifications
    }
  },
  methods: {
    notifications() {
      clickMf(this.sprintrNotificationsMF, this.notificationsDeepLink);
    }
  }
};
</script>
