<template>
  <div :class="b()">
    <div :class="b('row', { 'links': true })" class="mx-developer__row">
      <div :class="b('link-col')" v-for="(link, index) in links" :key="index">
        <linkBlock :link="link"></linkBlock>
      </div>
    </div>
    <div :class="b('row')">
      <div  class="mx-developer__row">
        <div :class="b('col', {'left': true})">
          <div :class="b('bottom-links')"><div class="copyright__block"><span v-html="copyRight"></span> All rights reserved.</div><div class="copyright__delimiter"> | </div><a v-track-link href="http://www.mendix.com/" target="_blank">Mendix.com</a> | <a v-track-link href="http://www.mendix.com/terms-of-use/" target="_blank">Terms of Use</a> | <a v-track-link href="http://www.mendix.com/privacy-policy/" target="_blank">Privacy Policy</a></div>
        </div>
        <div :class="b('col', {'right': true})">
          <div :class="b('social-media')">
            <a v-track-link :class="b('social-media-icon', { 'github': true })" target="_blank" :href="urls.github"></a>
            <a v-track-link :class="b('social-media-icon', { 'instagram': true })" target="_blank" :href="urls.instagram"></a>
            <a v-track-link :class="b('social-media-icon', { 'twitter': true })" target="_blank" :href="urls.twitter"></a>
            <a v-track-link :class="b('social-media-icon', { 'linkedin': true })" target="_blank" :href="urls.linkedin"></a>
            <a v-track-link :class="b('social-media-icon', { 'google-plus': true })" target="_blank" :href="urls.googleplus"></a>
            <a v-track-link :class="b('social-media-icon', { 'facebook': true })" target="_blank" :href="urls.facebook"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { constants, urls } from 'Resources/helpers';
const links = require('Resources/menu/footer.json');
import linkBlock from './LinkBlock.vue';

export default {
  name: 'footer-block',
  data () {
    return {
      copyRight: constants.copyRight,
      links: links,
      length: links.length,
      urls
    }
  },
  components: {
    linkBlock
  }
};
</script>
