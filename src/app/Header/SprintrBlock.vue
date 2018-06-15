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
import {mapGetters} from 'vuex';

import { onSprintr, getEnvironment, replaceEnvLink } from 'Resources/helpers';

import { links, microflows } from 'Resources/mendix.json';

import headerLink from './HeaderLink.vue';
import headerMicroflowLink from './HeaderMicroflowLink.vue';

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
        url: replaceEnvLink(links.sprintr.buzz),
      },
      deepLinkApps: {
        title: 'Apps',
        url: replaceEnvLink(links.sprintr.apps),
      },
      deepLinkPeople: {
        title: 'People',
        url: replaceEnvLink(links.sprintr.people),
      },
      microflowBuzz: {
        title: 'Buzz',
        microflow: microflows.sprintr.buzz,
      },
      microflowApps: {
        title: 'Apps',
        microflow: microflows.sprintr.apps,
      },
      microflowPeople: {
        title: 'People',
        microflow: microflows.sprintr.people,
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
