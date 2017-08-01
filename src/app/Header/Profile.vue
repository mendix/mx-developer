<template>
  <div :class="b({'loading': !loaded })">
    <a href="https://developers.mendix.com/start-for-free/" :class="b('start-button', { 'shown': profile && !profile.loggedIn })">Start For Free</a>
    <a :href="profile.loginUrl" :class="b('login-button', { 'shown': profile && !profile.loggedIn })">Log in</a>
    <div :class="b('avatar', { 'empty': !profile || !profile.avatarUrl })" v-if="profile && profile.loggedIn" @mouseleave="mouseleave" v-on:click="menu">
      <img :src="profile && profile.avatarUrl || profilePic" :alt="profile && profile.displayName">
      <div :class="b('submenu', { open })">
        <span :class="b('display-name')">Welcome, {{ profile && profile.displayName }}</span>
        <a :class="b('submenu__link')" :href="urls.platform">Mendix App Platform</a>
        <a :class="b('submenu__link')" :href="urls.developer" v-if="profile">My profile</a>
        <a :class="b('submenu__link')" :href="urls.community" v-if="profile">My Community profile</a>
        <a :class="b('submenu__link')" :href="profile.logoutUrl" v-if="profile && profile.logoutUrl">Log out</a>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import fetchJsonp from 'fetch-jsonp';
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
      open: false
    }
  },
  created() {
    fetchJsonp(url, {
        jsonpCallbackFunction: '__mx_id_callback_func'
      })
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
    menu(e) {
      this.open = !this.open;
    }
  }
};
</script>
