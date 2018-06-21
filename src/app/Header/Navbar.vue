<template>
  <div :class="b({'shown': init})" ref="navbar">
    <div :class="b('header')" ref="header">
      <a target="_self" :href="homeURL" :class="b('brand')">
        <img :src="img" alt="Logo" v-track-link>
      </a>
    </div>
    <div :class="b('collapse', { 'mobile': mob })">
      <div :class="b('nav')">
        <sprintr-block :itemClass="b('item')" :mob="mob" v-if="environment !== 'beaver'" />
        <div :class="b('item')" v-for="(link, index) in links" :key="index">
          <header-link :link="link" :mob="mob"></header-link>
        </div>
        <div :class="b('bottom')" />
      </div>
    </div>
    <profile v-if="useProfile && environment !== 'beaver'" />
  </div>
</template>
<script>
import Vue from 'vue';
import { constants, waitForElementIdCb, replaceEnvLink } from 'Resources/helpers';
import { mapGetters } from 'vuex';
import { links } from 'Resources/mendix.json';

import headerLink from './HeaderLink.vue';
import profile from './Profile.vue';
import sprintrBlock from './SprintrBlock.vue';

export default {
  name: 'navbar',
  props: [
    'mob',
    'phone',
    'init'
  ],
  data () {
    return {
      imgLink: constants.headerImgUrl,
      links: require('Resources/menu/header.json'),
      img: require('Resources/img/mx_logo.png'),
      useProfile: true
    }
  },
  components: {
    headerLink,
    profile,
    sprintrBlock
  },
  mounted: function() {
    this.$nextTick(function () {
      waitForElementIdCb('zendesk_header_link', el => {
        this.$refs.header.innerHTML = el.innerHTML;
        el.remove();
      }, 500);
      waitForElementIdCb('zendesk_user_nav', el => {
        this.useProfile = false;
        this.$refs.navbar.append(el);
        el.removeAttribute('id');
      }, 500);
    })
  },
  computed: {
    ...mapGetters([
      'profile',
      'environment'
    ]),
    homeURL: function () {
      return (this.profile && !this.profile.loggedIn) ? this.profile.loginUrl : replaceEnvLink(links.home);
    }
  },
};
</script>
