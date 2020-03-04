<template>
  <div :class="b()" v-if="hasProfile">
    <div v-if="isOnSprintr">
      <div :class="itemClass">
        <header-microflow-link
          :link="microflowBuzz"
          :alternative="deepLinkBuzz"
          :mob="mob"
          :linkID="linkIDs.buzz"
        />
      </div>
      <div :class="appsClass">
        <header-microflow-link
          :link="microflowApps"
          :alternative="deepLinkApps"
          :mob="mob"
          :linkID="linkIDs.apps"
        />
        <div class="mx-developer__headerlink__submenu">
          <ul class="mx-developer__headerlink__linkblock">
            <li class="mx-developer__headerlink__link">
              <div>
                <a href="https://sprintr.home.mendix.com/link/myapps" class=""
                  >My Apps</a
                >
              </div>
            </li>
            <li class="mx-developer__headerlink__link">
              <div>
                <a href="https://sprintr.home.mendix.com/link/mycompanyapps"
                  >My Company’s Apps</a
                >
              </div>
            </li>
            <li class="mx-developer__headerlink__link">
              <div>
                <a href="https://cloud.home.mendix.com/index.html">Nodes</a>
              </div>
            </li>
            <li class="mx-developer__headerlink__link">
              <div>
                <a href="https://privatecloud.mendixcloud.com/link/clusters/"
                  >Cluster Manager</a
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div :class="itemClass">
        <header-link
          :link="deepLinkPeople"
          :mob="mob"
          :linkID="linkIDs.people"
        />
      </div>
    </div>
    <div v-else>
      <div :class="itemClass">
        <header-link :link="deepLinkBuzz" :mob="mob" :linkID="linkIDs.buzz" />
      </div>
      <div :class="appsClass">
        <header-link :link="deepLinkApps" :mob="mob" />
        <div class="mx-developer__headerlink__submenu">
          <ul class="mx-developer__headerlink__linkblock">
            <li class="mx-developer__headerlink__link">
              <div>
                <a href="https://sprintr.home.mendix.com/link/myapps" class=""
                  >My Apps</a
                >
              </div>
            </li>
            <li class="mx-developer__headerlink__link">
              <div>
                <a href="https://sprintr.home.mendix.com/link/mycompanyapps"
                  >My Company’s Apps</a
                >
              </div>
            </li>
            <li class="mx-developer__headerlink__link">
              <div>
                <a href="https://cloud.home.mendix.com/index.html">Nodes</a>
              </div>
            </li>
            <li class="mx-developer__headerlink__link">
              <div>
                <a href="https://privatecloud.mendixcloud.com/link/clusters/"
                  >Cluster Manager</a
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div :class="itemClass">
        <header-link
          :link="deepLinkPeople"
          :mob="mob"
          :linkID="linkIDs.people"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters } from "vuex";

import { onSprintr, replaceEnvLink } from "Resources/helpers";

import { links, microflows } from "Resources/mendix.json";

import headerLink from "./HeaderLink.vue";
import headerMicroflowLink from "./HeaderMicroflowLink.vue";

export default {
  name: "sprintr",
  props: ["itemClass", "mob"],
  data() {
    return {
      isOnSprintr: onSprintr(),
      linkIDs: {
        buzz: "mx-header-link-buzz",
        apps: "mx-header-link-apps",
        people: "mx-header-link-people",
        datahub: "mx-header-link-datahub"
      },
      deepLinkBuzz: {
        title: "Buzz",
        url: replaceEnvLink(links.sprintr.buzz)
      },
      deepLinkApps: {
        title: "Apps",
        url: replaceEnvLink(links.sprintr.apps)
      },
      deepLinkDataHub: {
        title: "Data Hub",
        url: replaceEnvLink(links.sprintr.datahub)
      },
      deepLinkPeople: {
        title: "People",
        url: replaceEnvLink(links.sprintr.people)
      },
      microflowBuzz: {
        title: "Buzz",
        microflow: microflows.sprintr.buzz,
        progress: true
      },
      microflowApps: {
        title: "Apps",
        microflow: microflows.sprintr.apps,
        progress: true
      },
      microflowPeople: {
        title: "People",
        microflow: microflows.sprintr.people,
        progress: true
      }
    };
  },
  computed: {
    ...mapGetters(["hasProfile"]),
    appsClass: function() {
      return `${this.itemClass} has-apps-submenu`;
    }
  },
  methods: {
    toggleAppsMenu: function() {}
  },
  components: {
    headerLink,
    headerMicroflowLink
  }
};
</script>

<style>
.has-apps-submenu:hover .mx-developer__headerlink__submenu {
  opacity: 1;
  visibility: visible;
}

@media only screen and (max-width: 991px) {
  .has-apps-submenu .mx-developer__headerlink__submenu {
    display: none;
  }
}
</style>
