<template>
  <div :class="b({'loading': !loaded })">
    <a :href="profile.loginUrl" :class="b('login-button', { 'shown': profile && !profile.loggedIn })" title="Click here to login">
      <img :src="profilePic" alt="Click here to login" v-track-link>
    </a>
    <a :href="signupLink" :class="b('start-button', { 'shown': profile && !profile.loggedIn })" v-track-link>Start For Free</a>

    <span id="mendix-header-search-button" class="mx-developer__profile__search-button hidden" @click="openSearch"></span>
    <support-menu />
    <notifications v-if="profile && profile.loggedIn" />

    <div :class="b('avatar', { 'empty': !profile || !profile.avatarUrl })" v-if="profile && profile.loggedIn" @mouseleave="mouseleave" v-on:click="menu">
      <profile-picture :profile="profile" :enterFunc="mouseenter" />
      <div :class="b('submenu', { open })">
        <div :class="b('submenu__header')">
          <profile-picture :profile="profile" />
          <span :class="b('display-name')">{{ profile && profile.displayName }}</span>
          <span :class="b('display-username')">{{ profile && profile.userName }}</span>
        </div>
        <a :class="b('submenu__link', { 'type': 'platform' })" :href="urls.platform" v-track-link>Developer Portal</a>
        <a :class="b('submenu__link', { 'type': 'community' })" :href="urls.community" v-if="profile" v-track-link>My Dashboard</a>
        <a :class="b('submenu__link', { 'type': 'developer' })" :href="urls.developer" v-if="profile" v-track-link>Account Settings</a>
        <admin-links v-if="profile" :item-class="b('submenu__link', { 'type': 'developer' })" />
        <a :class="b('submenu__link', { 'type': 'logout' })" :href="logoutLink" v-if="profile && profile.logoutUrl" v-track-link>Log out</a>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import {mapGetters, mapActions} from 'vuex';
import fetchJsonp from 'fetch-jsonp';

import SupportMenu from './SupportMenu.vue';
import ProfilePic from './ProfilePic.vue';
import AdminLinks from './AdminLinks.vue';
import Notifications from './Notifications.vue';

import { links } from 'Resources/mendix.json';
import { urls, replaceEnvLink } from 'Resources/helpers';

export default {
  name: 'profile',
  data () {
    return {
      urls: urls,
      profilePic: require('Resources/img/header/avatar.svg'),
      signupLink: links.signup,
      logoutLink: replaceEnvLink(links.logout),
      open: false,
      imgError: false
    }
  },
  computed: {
    ...mapGetters([
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
    menu(e) {
      this.open = !this.open;
    },
    openSearch() {
      this.$tracker.trackEvent('Search', `Show`);
    },
    ...mapActions([
      'getProfile'
    ])
  },
  components: {
    'support-menu': SupportMenu,
    'profile-picture': ProfilePic,
    'admin-links': AdminLinks,
    'notifications': Notifications
  }
};
</script>
