<template>
  <div :class="b()" v-if="hasProfile">
    <div v-if="isOnSprintr">
      <div :class="itemClass" >
        <header-microflow-link :link="microflowBuzz" :alternative="deepLinkBuzz" :mob="mob" :linkID="linkIDs.buzz" />
      </div>
      <div :class="itemClass" >
        <header-microflow-link :link="microflowApps" :alternative="deepLinkApps" :mob="mob" :linkID="linkIDs.apps" />
      </div>
      <div :class="itemClass" >
        <header-link :link="deepLinkPeople" :mob="mob" :linkID="linkIDs.people" />
      </div>
    </div>
    <div v-else>
      <div :class="itemClass" >
        <header-link :link="deepLinkBuzz" :mob="mob" :linkID="linkIDs.buzz" />
      </div>
      <div :class="itemClass" >
        <header-link :link="deepLinkApps" :mob="mob" :linkID="linkIDs.apps" />
      </div>
      <div v-if="isOnDataHub" :class="itemClass" >
        <header-link :link="deepLinkDataHub" :mob="mob" :linkID="linkIDs.datahub" />
      </div>
      <div :class="itemClass" >
        <header-link :link="deepLinkPeople" :mob="mob" :linkID="linkIDs.people" />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import {mapGetters} from 'vuex';

import { onSprintr, onDataHub, replaceEnvLink } from 'Resources/helpers';

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
      isOnDataHub: onDataHub(),
      linkIDs: {
        buzz: 'mx-header-link-buzz',
        apps: 'mx-header-link-apps',
        people: 'mx-header-link-people',
        datahub: 'mx-header-link-datahub'
      },
      deepLinkBuzz: {
        title: 'Buzz',
        url: replaceEnvLink(links.sprintr.buzz),
      },
      deepLinkApps: {
        title: 'Apps',
        url: replaceEnvLink(links.sprintr.apps),
      },
      deepLinkDataHub: {
        title: 'Data Hub',
        url: replaceEnvLink(links.sprintr.datahub),
      },
      deepLinkPeople: {
        title: 'People',
        url: replaceEnvLink(links.sprintr.people),
      },
      microflowBuzz: {
        title: 'Buzz',
        microflow: microflows.sprintr.buzz,
        progress: true
      },
      microflowApps: {
        title: 'Apps',
        microflow: microflows.sprintr.apps,
        progress: true
      },
      microflowPeople: {
        title: 'People',
        microflow: microflows.sprintr.people,
        progress: true
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
