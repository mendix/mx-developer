<template>
  <div :class="b()" v-if="hasProfile">
    <div v-if="isOnSprintr">
     <div :class="itemClass" >

      </div>
      <div :class="itemClass" >

      </div>
      <div :class="itemClass" >

      </div>
    </div>
    <div v-else>
      <div :class="itemClass" >
        <header-link :link="deepLinkBuzz" :mob="mob"></header-link>
      </div>
      <div :class="itemClass" >
        <header-link :link="deepLinkApps" :mob="mob"></header-link>
      </div>
      <div :class="itemClass" >
        <header-link :link="deepLinkPeople" :mob="mob"></header-link>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { onSprintr, getEnvironment } from 'Resources/helpers';
import headerLink from './HeaderLink.vue';
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
        title: 'My Buzz',
        url: `https://sprintr.home${env}.mendix.com/link/home`,
      },
      deepLinkApps: {
        title: 'My Apps',
        url: `https://sprintr.home${env}.mendix.com/link/myprojects`,
      },
      deepLinkPeople: {
        title: 'My Network',
        url: `https://sprintr.home${env}.mendix.com/link/people`,
        sub: [
          {
            "title": "Our Community",
            "url": "https://developer.mendixcloud.com/link/community"
          }
        ]
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
  },
};
</script>
