<template>
  <div :class="b()">
      <img v-if="profile && profile.avatarUrl && !imgError" :src="profile.avatarUrl" :alt="profile && profile.displayName" @mouseenter="mouseenter" @error="imgLoadError">
      <img v-if="!(profile && profile.avatarUrl) || imgError" :src="profilePic" :alt="profile && profile.displayName" @mouseenter="mouseenter">
  </div>
</template>
<script>
import Vue from 'vue';
export default {
  name: 'profile__picture',
  props: [
    'profile',
    'enterFunc'
  ],
  data () {
    return {
      profilePic: require('Resources/img/header/avatar.svg'),
      imgError: false
    }
  },
  methods: {
    imgLoadError(e) {
      console.warn(`MX Header: Failed to load profile image: "${e.target.src}", disabling img`);
      this.imgError = true;
    },
    mouseenter(e) {
      if (this.enterFunc) {
        this.enterFunc(e);
      }
    },
  }
};
</script>
