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
          <p :class="b('bottom-links')"><span v-html="copyRight"></span> All rights reserved. | <a href="http://www.mendix.com/" target="_blank">Mendix.com</a> | <a href="http://www.mendix.com/terms-of-use/" target="_blank">Terms of Use</a> | <a href="http://www.mendix.com/privacy-policy/" target="_blank">Privacy Policy</a></p>
        </div>
        <div :class="b('col', {'right': true})">
          <div :class="b('social-media')">
            <a :class="b('social-media-icon', { 'github': true })" target="_blank" :href="urls.github"></a>
            <a :class="b('social-media-icon', { 'instagram': true })" target="_blank" :href="urls.instagram"></a>
            <a :class="b('social-media-icon', { 'twitter': true })" target="_blank" :href="urls.twitter"></a>
            <a :class="b('social-media-icon', { 'linkedin': true })" target="_blank" :href="urls.linkedin"></a>
            <a :class="b('social-media-icon', { 'google-plus': true })" target="_blank" :href="urls.googleplus"></a>
            <a :class="b('social-media-icon', { 'facebook': true })" target="_blank" :href="urls.facebook"></a>
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
  name: 'footer',
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
