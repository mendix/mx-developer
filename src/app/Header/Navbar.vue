<template>
  <div :class="b({'shown': init})">
    <div :class="b('header')">
      <a target="_self" href="https://developers.mendix.com" :class="b('brand')">
        <img :src="img" alt="Logo">
      </a>
    </div>
    <div :class="b('collapse', { 'mobile': mob })">
      <div :class="b('nav')">
        <div :class="b('item')" v-for="(link, index) in links" :key="index">
          <header-link :link="link" :mob="mob"></header-link>
        </div>
        <div :class="b('bottom')" />
      </div>
    </div>
    <profile />
  </div>
</template>
<script>
import Vue from 'vue';
import { constants } from 'Resources/helpers';
import headerLink from './HeaderLink.vue';
import profile from './Profile.vue';

export default {
  name: 'navbar',
  props: [
    'mob',
    'init'
  ],
  data () {
    return {
      imgLink: constants.headerImgUrl,
      links: require('Resources/menu/header.json'),
      img: require('Resources/img/mx_logo.png')
    }
  },
  components: {
    headerLink,
    profile
  }
};
</script>
