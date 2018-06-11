<template>
  <div :class="b()" v-if="hasProfile">
    <div v-if="isOnSprintr">
      <div :class="itemClass" >
        <header-microflow-link :link="microflowBuzz" :alternative="deepLinkBuzz" :mob="mob" />
      </div>
      <div :class="itemClass" >
        <header-microflow-link :link="microflowApps" :alternative="deepLinkApps" :mob="mob" />
      </div>
      <div :class="itemClass" >
        <header-microflow-link :link="microflowPeople" :alternative="deepLinkPeople" :mob="mob" />
      </div>
    </div>
    <div v-else>
      <div :class="itemClass" >
        <header-link :link="deepLinkBuzz" :mob="mob" />
      </div>
      <div :class="itemClass" >
        <header-link :link="deepLinkApps" :mob="mob" />
      </div>
      <div :class="itemClass" >
        <header-link :link="deepLinkPeople" :mob="mob" />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { onSprintr, getEnvironment } from 'Resources/helpers';

import headerLink from './HeaderLink.vue';
import headerMicroflowLink from './HeaderMicroflowLink.vue';

import {mapGetters} from 'vuex';

const env = getEnvironment();

export default {
  name: 'sprintr',
  props: [
    'itemClass',
    'mob'
  ],
  data () {
    return {
      isOnSprintr: onSprintr(),
      deepLinkBuzz: {
        title: 'Buzz',
        url: `https://sprintr.home${env}.mendix.com/link/home`,
      },
      deepLinkApps: {
        title: 'Apps',
        url: `https://sprintr.home${env}.mendix.com/link/myprojects`,
      },
      deepLinkPeople: {
        title: 'People',
        url: `https://sprintr.home${env}.mendix.com/link/people`,
      },
      microflowBuzz: {
        title: 'Buzz',
        microflow: 'PCP.OpenBuzz',
      },
      microflowApps: {
        title: 'Apps',
        microflow: 'AppsDashboard.IVK_OpenAppsDashboard',
      },
      microflowPeople: {
        title: 'People',
        microflow: 'PCP.OpenBuzzPeople',
      },
    }
  },
  computed: {
    ...mapGetters([
      'hasProfile',
    ]),
  },
  methods: {

  },
  components: {
    headerLink,
    headerMicroflowLink
  },
};
</script>
