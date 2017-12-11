<template>
  <div :class="b({'loading': !loaded })">
    <a :href="profile.loginUrl" :class="b('login-button', { 'shown': profile && !profile.loggedIn })" title="Click here to login">
      <img :src="profilePic" alt="Click here to login">
    </a>
    <a href="https://www.mendix.com/try-now/?utm_source=developers&utm_medium=community&utm_campaign=signup" :class="b('start-button', { 'shown': profile && !profile.loggedIn })">Start For Free</a>

    <span id="mendix-header-search-button" class="mx-developer__profile__search-button hidden"></span>
    <support-menu />

    <div :class="b('avatar', { 'empty': !profile || !profile.avatarUrl })" v-if="profile && profile.loggedIn" @mouseleave="mouseleave" v-on:click="menu">
      <img v-if="profile && profile.avatarUrl && !imgError" :src="profile.avatarUrl" :alt="profile && profile.displayName" @mouseenter="mouseenter" @error="imgLoadError">
      <img v-if="!(profile && profile.avatarUrl) || imgError" :src="profilePic" :alt="profile && profile.displayName" @mouseenter="mouseenter">
      <div :class="b('submenu', { open })">
        <span :class="b('display-name')">Welcome, {{ profile && profile.displayName }}</span>
        <a :class="b('submenu__link', { 'type': 'platform' })" :href="urls.platform">Mendix App Platform</a>
        <a :class="b('submenu__link', { 'type': 'community' })" :href="urls.community" v-if="profile">My Profile</a>
        <a :class="b('submenu__link', { 'type': 'developer' })" :href="urls.developer" v-if="profile">Account Settings</a>
        <a :class="b('submenu__link', { 'type': 'logout' })" :href="profile.logoutUrl" v-if="profile && profile.logoutUrl">Log out</a>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import fetchJsonp from 'fetch-jsonp';
import SupportMenu from './SupportMenu.vue';
import { urls } from 'Resources/helpers';

const url = `https://home.mendix.com/mxid/appbar2?q=${+(new Date())}`;

export default {
  name: 'profile',
  data () {
    return {
      loaded: false,
      profile: false,
      urls: urls,
      profilePic: require('Resources/img/header/avatar.svg'),
      open: false,
      imgError: false
    }
  },
  created() {
    fetchJsonp(url)
      .then(response => {
        return response.json()
      }).then(json => {
        this.loaded = true;
        if (json && json.length === 1) {
          this.profile = json[0];
        } else {
          console.log(`Failed to find profile, got response: `, json);
        }
      }).catch(ex => {
        this.loaded = true;
        console.log(`Failed to get profile: `, ex);
      })
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
    imgLoadError(e) {
      console.warn(`MX Header: Failed to load profile image: "${e.target.src}", disabling img`);
      this.imgError = true;
    }
  },
  components: {
    'support-menu': SupportMenu
  }
};
</script>
