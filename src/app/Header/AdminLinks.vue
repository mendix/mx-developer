<template>
  <div :class="b()" v-if="sprintr || cloud">
    <div v-if="sprintr">
      <span
        :class="itemClass"
        v-if="adminDetails && adminDetails.HasCompanyAdmin"
        @click.stop.prevent="companyAdmin($event)">Company Admin</span>
      <span
        :class="itemClass"
        v-if="adminDetails && adminDetails.HasPlatformAdmin"
        @click.stop.prevent="platformAdmin($event)">Platform Admin</span>
      <a
        :class="itemClass"
        v-if="adminDetails && adminDetails.HasOperationsDesk"
        :href="operationsDeskLink">Operations Desk</a>
    </div>
    <div v-if="cloud">
      <a
        :class="itemClass"
        v-if="adminDetails && adminDetails.HasCompanyAdmin"
        :href="companyAdminLink">Company Admin</a>
      <a
        :class="itemClass"
        v-if="adminDetails && adminDetails.HasPlatformAdmin"
        :href="platformAdminLink">Platform Admin</a>
      <span
        :class="itemClass"
        v-if="adminDetails && adminDetails.HasOperationsDesk"
        @click.stop.prevent="operationsDesk($event)">Operations Desk</span>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import {mapActions, mapGetters} from 'vuex';

import { onSprintr, onCloud, replaceEnvLink, clickMf } from 'Resources/helpers';
import { links, microflows } from 'Resources/mendix.json';

export default {
  name: 'admin',
  props: [
    'item-class',
    'closeFunc'
  ],
  data () {
    return {
      sprintr: onSprintr(),
      cloud: onCloud(),

      companyAdminLink: replaceEnvLink(links.sprintr.companyAdmin),
      platformAdminLink: replaceEnvLink(links.sprintr.platformAdmin),
      operationsDeskLink: replaceEnvLink(links.cloudportal.operationsDesk),

      sprintrCompanyAdminMf: microflows.sprintr.companyAdmin,
      sprintrPlatformMf: microflows.sprintr.platformAdmin,
      operationsDeskMf: microflows.cloudportal.operationsDesk
    }
  },
  created() {
    this.getAdminAttributes();
  },
  computed: {
    ...mapGetters([
      'adminDetails'
    ])
  },
  methods: {
    ...mapActions([
      'getAdminAttributes'
    ]),
    operationsDesk: function(event) {
      event.preventDefault();
      this.closeFunc && this.closeFunc();
      clickMf(this.operationsDeskMf, this.operationsDeskLink);
    },
    companyAdmin: function(event) {
      event.preventDefault();
      this.closeFunc && this.closeFunc();
      clickMf(this.sprintrCompanyAdminMf, this.companyAdminLink);
    },
    platformAdmin: function(event) {
      event.preventDefault();
      this.closeFunc && this.closeFunc();
      clickMf(this.sprintrPlatformMf, this.platformAdminLink);
    },
  }
};
</script>
