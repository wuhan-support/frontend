<template>
  <v-app
    id="__app_root"
    :dark="dark"
  >
    <v-navigation-drawer
      v-model="drawer"
      color="white"
      app
      clipped
      width="254"
      class="navigationDrawer"
    >
      <v-list>
        <template v-for="route in routes">
          <v-list-item
            v-if="!route.children || route.meta.forceSingle"
            :key="route.name"
            link
            :to="{path: route.path}"
            class="listItem"
            active-class="listItemActive font-weight-bold white--text"
          >
            <v-list-item-icon class="listItemIcon" :class="route.meta.classes">
              <v-icon size=14 v-text="route.meta.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="itemTitle font-weight-bold">
                {{ $t(route.meta.i18n) }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-else
            :key="route.name"
            :value="route.meta.active"
            :prepend-icon="route.meta.icon"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-title>{{ $t(route.meta.i18n) }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="child in route.children.filter(el => !el.meta.hide)"
              :key="child.name"
              @click="onMenuItemClicked(child)"
            >
              <v-list-item-title>{{ $t(child.meta.i18n) }}</v-list-item-title>

              <v-list-item-icon>
                <v-icon v-text="child.meta.icon" />
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      dark
      color="white"
      class="appBar"
      height=50
    >
      <v-app-bar-nav-icon
        class="black--text"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title dark class="pl-1 toolbarTitle">
        <div class="title">
          {{ $t($router.currentRoute.meta.i18n) }}
        </div>
      </v-toolbar-title>
    </v-app-bar>
    <v-content
      app
      class="mb-8"
    >
      <v-container>
        <transition
          name="slide-fade"
          mode="out-in"
        >
          <router-view />
        </transition>
      </v-container>
    </v-content>
    <v-footer
      padless
    >
      <v-card
        flat
        tile
        class="text-center"
        color="grey lighten-2"
        style="width: 100%"
      >
        <v-card-text>
          <span>{{ new Date().getFullYear() }} — <strong>feiyan.help</strong></span>

          <v-btn
            outlined
            small
            class="ml-3"
            href="https://github.com/wuhan-support"
          >
            <v-icon left>
              mdi-github-circle
            </v-icon>
            Github
          </v-btn>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import Console from "@/utils/Console";
// import utils from "./utils/utils";

export default {
  name: "App",
  data() {
    return {
      routes: [],
      localizations: [
        {
          id: "zh",
          name: "中文"
        },
        {
          id: "en",
          name: "English"
        },
        {
          id: "ja",
          name: "日本語"
        }
      ],
      drawer: !this.$vuetify.breakpoint.xsOnly,
    };
  },
  computed: {
    dark: {
      get() {
        return this.$store.state.settings.dark;
      },
      set(value) {
        this.$store.commit("switchDark", value);
        this.$vuetify.theme.dark = value;
      },
    }
  },
  watch: {
    dark: ["onDarkChange"]
  },
  beforeMount() {
    this.routes = this.$router.options.routes.filter(el => !el.meta.hide);
  },
  mounted() {
    this.onDarkChange(this.$store.state.settings.dark);

    // if (this.$store.getters.language) {
    //   this.changeLocale(this.$store.getters.language, false);
    // } else {
    //   const language = utils.getFirstBrowserLanguage();
    //   Console.debug("[i18n] detected language", language);
    //   if (language) {
    //     // because this is a detection result, thus we are not storing it,
    //     // unless the user manually set one.
    //     this.changeLocale(language, false);
    //   }
    // }

    // if (this.$store.state.settings.dark) {
    //   this.$vuetify.theme.dark = this.$store.state.settings.dark;
    // }
  },
  methods: {
    onDarkChange(newValue) {
      if (newValue) {
        document.body.style.backgroundColor = "#303030";
      } else {
        document.body.style.backgroundColor = "#fafafa";
      }
    },
    changeLocale(localeId, save = true) {
      Console.debug(
        "[i18n] locale changed to:",
        localeId,
        "| saving to vuex:",
        save
      );
      this.$i18n.locale = localeId;
      // this.$vuetify.lang.current = localeId;
      if (save) this.$store.commit("changeLocale", localeId);
      document.title = `${this.$t(this.$route.meta.i18n) + " | " ||
        ""}${this.$t("app.name")}`;
    }
  }
};
</script>

<style>
* {
  font-family: core_sans_n45_regular, "Avenir Next", "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Source Han Sans SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi MicroHei", sans-serif;
  box-sizing: border-box;
  -webkit-font-feature-settings: "palt";
  font-feature-settings: "palt";
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
.logo {
  display: block;
  width: 165px;
  height: 50px;
}
.navigationDrawer {
  padding-top: 21px;
}
.navigationDrawer .listItem {
  height: 60px;
  padding: 0 20px !important;
  border-left: 7px solid transparent;
}
.navigationDrawer .listItem.home {
  letter-spacing: 1px;
}
.navigationDrawer .listItem .listItemIcon {
  display: inline !important;
  margin-right: 17px !important;
}
.listItemIcon:not(.listItemActive) i {
  color: #333333;
}
.navigationDrawer .listItemActive {
  background: #6CBD0F;
  border-left: 7px solid #64A020;
}
.navigationDrawer .listItem .itemTitle {
  font-size: 16px !important;
}
.appBar {
  box-shadow: 0 1px 0 rgba(0,0,0,0.2) !important;
}
.toolbarTitle .title {
  color: #333E48;
}
.slide-fade-enter-active {
  transition: all 0.225s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-fade-leave-active {
  transition: all 0.125s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(1.5vh);
  opacity: 0;
}

.theme--dark,
.theme--light {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}

.theme--light .bkop-light {
  background: rgba(255, 255, 255, 0.75) !important;
}

.theme--dark .bkop-light {
  background: rgba(66, 66, 66, 0.85) !important;
}

.theme--light .bkop-medium {
  background: rgba(255, 255, 255, 0.9) !important;
}

.theme--dark .bkop-medium {
  background: rgba(66, 66, 66, 0.9) !important;
}

.cursor-pointer {
  cursor: pointer;
}

.v-navigation-drawer::-webkit-scrollbar {
  width: 2px;
}

.v-navigation-drawer::-webkit-scrollbar-thumb {
  background-color: rgb(200, 200, 200);
}
</style>
