<template>
  <div :class="b()" v-if="sprintr || cloud">
    <div v-if="sprintr">
      <span
        :class="itemClass"
        v-if="adminDetails && adminDetails.HasCompanyAdmin"
        @click.stop.prevent="companyAdmin">Company Admin</span>
      <span
        :class="itemClass"
        v-if="adminDetails && adminDetails.HasPlatformAdmin"
        @click.stop.prevent="platformAdmin">Platform Admin</span>
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
        @click.stop.prevent="operationsDesk">Operations Desk</span>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import {mapActions, mapGetters} from 'vuex';

import { onSprintr, onCloud, replaceEnvLink, clickMf } from 'Resources/helpers';

export default {
  name: 'admin',
  props: [
    'item-class'
  ],
  data () {
    return {
      sprintr: onSprintr(),
      cloud: onCloud(),
      companyAdminLink: replaceEnvLink('https://sprintr.home.mendix.com/link/adminpanel/'),
      platformAdminLink: replaceEnvLink('https://sprintr.home.mendix.com/link/supportdeskcompanies/'),
      operationsDeskLink: replaceEnvLink('https://cloud.home.mendix.com/link/operationsdeskapps/'),
      operationsDeskMf: 'LoftManagement.OpenApplications',
      sprintrCompanyAdminMf: 'PCP_AccountManagement.OpenAdminPanelWrapper',
      sprintrPlatformMf: 'PCP_SupportDesk.DL_OpenSupportDeskCompanies'
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
    operationsDesk() {
      clickMf(this.operationsDeskMf, this.operationsDeskLink);
    },
    companyAdmin() {
      clickMf(this.sprintrCompanyAdminMf, this.companyAdminLink);
    },
    platformAdmin() {
      clickMf(this.sprintrPlatformMf, this.platformAdminLink);
    },
  }
};
</script>
