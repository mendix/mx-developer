<template>
  <div :class="b({'loading': !loaded })">
    <a :href="profile.loginUrl" :class="b('login-button', { 'shown': profile && !profile.loggedIn, event })" title="Click here to login">
      <img :src="profilePic" alt="Click here to login" v-track-link>
    </a>
    <a :href="signupLink" :class="b('start-button', { 'shown': profile && !profile.loggedIn })" v-track-link>Start For Free</a>

    <span id="mendix-header-search-button" class="mx-developer__profile__search-button hidden" @click="openSearch"></span>
    <support-menu />

    <div :class="b('avatar', { 'empty': !profile || !profile.avatarUrl, event })" v-if="profile && profile.loggedIn" v-on:click="menu">
      <profile-picture :profile="profile" />
      <div :class="b('submenu', { open })" id="mx-header-profile-submenu">
        <div :class="b('submenu__header')">
          <profile-picture :profile="profile" />
          <span :class="b('display-name')">{{ profile && profile.displayName }}</span>
          <span :class="b('display-username')">{{ profile && profile.userName }}</span>
        </div>
        <a :class="b('submenu__link', { 'type': 'platform' })" :href="homeURL" @click.stop="home($event)" id="mx-header-link-devportal" v-track-link>Developer Portal</a>
        <a :class="b('submenu__link', { 'type': 'community' })" :href="urls.community" v-if="profile" id="mx-header-link-dashboard" v-track-link>My Profile</a>
        <admin-links v-if="profile" :item-class="b('submenu__link', { 'type': 'admin' })" :closeFunc="closeMenu" />
        <a :class="b('submenu__link', { 'type': 'logout' })" :href="profile.logoutUrl" v-if="profile && profile.logoutUrl" v-track-link id="mx-header-link-logout">Log out</a>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import {mapGetters, mapActions} from 'vuex';

import SupportMenu from './SupportMenu.vue';
import ProfilePic from './ProfilePic.vue';
import AdminLinks from './AdminLinks.vue';
import Notifications from './Notifications.vue';

import { links, microflows } from 'Resources/mendix.json';
import { urls, replaceEnvLink, clickMf } from 'Resources/helpers';

export default {
  name: 'profile',
  data () {
    return {
      urls: urls,
      profilePic: require('Resources/img/header/avatar.svg'),
      signupLink: links.signup,
      homeURL: replaceEnvLink(links.home),
      open: false,
      imgError: false,
      event: process.env.OPTIONS.event
    }
  },
  computed: {
    ...mapGetters([
      'environment',
      'profile',
      'loaded',
    ])
  },
  created() {
    this.getProfile();
  },
  methods: {
    mouseleave(e) {
      this.open = false;
    },
    mouseenter(e) {
      this.open = true;
    },
    closeMenu() {
      this.open = false;
    },
    menu(e) {
      this.open = !this.open;
    },
    openSearch() {
      this.$tracker.trackEvent('Search', `Show`);
    },
    ...mapActions([
      'getProfile'
    ]),
    home: function (event) {
      this.closeMenu();
      if (this.environment === 'sprintr') {
        event.preventDefault();
        clickMf(microflows.sprintr.home, this.homeURL);
      }
    },
    openProfile: function (event) {
      this.closeMenu();
      if (this.environment === 'sprintr') {
        event.preventDefault();
        clickMf(microflows.sprintr.profile, this.urls.developer);
      }
    },
  },
  components: {
    'support-menu': SupportMenu,
    'profile-picture': ProfilePic,
    'admin-links': AdminLinks,
  }
};
</script>
