<template>
  <v-app
    id="__app_root"
    :dark="dark"
    :style="{'background': $route.name === 'home' ? '#f0f0f0' : null}"
  >
    <v-navigation-drawer
      v-model="drawer"
      color="white"
      app
      clipped
      width="254"
      class="navigationDrawer"
      :disable-resize-watcher="$route.meta.hideDrawer"
    >
      <v-img
        :src="require('@/assets/logo/gray.svg')"
        aspect-ratio="2"
        max-width="512px"
        contain
        class="mx-auto logo"
      />
      <v-list>
        <v-list-item
          link
          :to="{path: '/'}"
        >
          <v-list-item-icon>
            <v-icon>
              mdi-chevron-left
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="itemTitle font-weight-bold">
              回到欢迎界面
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-for="route in routes">
          <v-list-item
            v-if="!route.children"
            :key="route.name"
            link
            :to="{name: route.name}"
            class="listItem"
            active-class="listItemActive font-weight-bold white--text"
          >
            <v-list-item-icon
              class="listItemIcon"
              :class="route.meta.classes"
            >
              <v-icon
                size="14"
                v-text="route.meta.icon"
              />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="itemTitle font-weight-bold">
                {{ route.meta.name }}
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
              <v-list-item-title>{{ $t(route.meta.title) }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="child in route.children.filter(el => !el.meta.hide)"
              :key="child.name"
              :to="{name: child.name}"
              exact
              link
              class="listItem"
              active-class="listItemActive font-weight-bold white--text"
            >
              <v-list-item-title>{{ child.meta.title }}</v-list-item-title>

              <v-list-item-icon>
                <v-icon
                  class="listItemIcon"
                  :class="route.meta.classes"
                  v-text="child.meta.icon"
                />
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </template>
        <v-divider />
        <div class="d-flex ma-4">
          <v-spacer />
          <LocaleSwitcher />
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      v-if="!$route.meta.hideDrawer"
      fixed
      app
      clipped-left
      dark
      color="white"
      class="appBar"
      height="50"
    >
      <!--      <v-icon-->
      <!--        size="16"-->
      <!--        class="black&#45;&#45;text navButtonIcon"-->
      <!--        @click.stop="drawer = !drawer"-->
      <!--      >-->
      <!--        wsicon wsicon-Menu-->
      <!--      </v-icon>-->
      <v-app-bar-nav-icon
        class="black--text"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title
        dark
        class="toolbarTitle"
      >
        <div class="toolbarTitle">
          {{ $router.currentRoute.meta.title }}
        </div>
      </v-toolbar-title>
      <v-icon
        size="30"
        right
        color="#a20002"
        class="logoIcon"
      >
        wsicon wsicon-logo-icon
      </v-icon>
    </v-app-bar>
    <v-content
      app
      class="mb-8"
    >
      <v-container>
        <v-snackbar
          v-model="$store.state.ajax.error"
          color="error darken-1"
          bottom
          :timeout="20000"
        >
          <v-row
            align="center"
            class="mx-0"
          >
            <v-icon class="mr-4 white--text">
              mdi-alert-circle
            </v-icon>

            数据加载失败

            <v-spacer />

            <v-btn
              class="ml-sm-4"
              small
              depressed
              ripple
              @click="refresh"
            >
              <v-icon
                small
                class="mr-1"
              >
                mdi-refresh
              </v-icon>
              刷新
            </v-btn>

            <v-btn
              class="ml-4"
              text
              small
              @click="$store.state.ajax.error = false"
            >
              关闭
            </v-btn>
          </v-row>
        </v-snackbar>
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
        class="text-center pb-6"
        :class="{'grey lighten-2': $route.name !== 'psychologicalPlatform', 'green lighten-1': $route.name === 'psychologicalPlatform'}"
        style="width: 100%"
      >
        <v-card-text>
          <template v-if="$route.name === 'psychologicalPlatform'">
            <h1 class="overline mb-4">
              这个世界并不完美<br>
              但我们正在让她更好
            </h1>
            <!-- <h1 class="overline mb-5">
              我们和你在一起，你不是孤独的❤️
            </h1> -->
          </template>
          <template v-else>
            <!--            <h1 class="overline mb-4">-->
            <!--              致敬英雄 逝者安息-->
            <!--            </h1>-->
            <!-- <h1 class="overline mb-3">
              医护工作者、武汉市民与湖北居民<br>
              我们与你同在
            </h1>
            <h1 class="overline mb-3">
              全国人民<br>
              让我们一起为武汉助力
            </h1> -->
            <h1 class="overline mb-5">
              {{ $t('app.slogan').join(' · ') }}
            </h1>
          </template>

          <v-row
            align="center"
            justify="center"
            class="mb-1"
          >
            <a
              href="https://wuhan.support/eula/"
              target="_blank"
              class="font-weight-bold secondary--text text--darken-2"
              style="text-decoration: none;"
            >
              {{ $t('footer.eula') }}
            </a>

            <v-divider
              vertical
              class="mx-3"
            />

            <a
              href="https://wuhan.support/privacy/"
              target="_blank"
              class="font-weight-bold secondary--text text--darken-2"
              style="text-decoration: none;"
            >
              {{ $t('footer.privacy') }}
            </a>
          </v-row>

          <span><a
            href="https://wuhan.support/"
            target="_blank"
            style="text-decoration: none;"
          ><strong>
            {{ $t('footer.team') }}
          </strong></a></span>

          <br>
          <v-btn
            small
            outlined
            class="mt-1"
            href="https://github.com/wuhan-support/"
          >
            <v-icon left>
              mdi-github-circle
            </v-icon>
            {{ $t('footer.source') }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
// import Console from "@/utils/Console";
// import utils from "./utils/utils";

import LocaleSwitcher from "./components/LocaleSwitcher";
export default {
  name: "App",
  components: {LocaleSwitcher},
  data() {
    return {
      routes: [],
      rawDrawer: !this.$vuetify.breakpoint.smAndDown,
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
    },
    drawer: {
      get () {
        return this.rawDrawer && !this.$route.meta.hideDrawer
      },
      set (value) {
        this.rawDrawer = value
      }
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
    refresh () {
      document.location.reload()
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
  margin: 20px;
  height: 45px;
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
  background: #a20002;
  border-left: 7px solid #910002;
}
.navigationDrawer .listItem .itemTitle {
  font-size: 16px !important;
}
.appBar {
  box-shadow: 0 1px 0 rgba(0,0,0,0.2) !important;
}
.appBar .navButtonIcon {
  color: #000000;
  margin: 0 5px;
}
.appBar .toolbarTitle {
  font-family: PingFangSC-Medium, PingFangSC-Medium, "PingFang SC", Roboto, sans-serif;
  font-size: 16px;
  color: #333E48;
  letter-spacing: 0;
}
.appBar .logoIcon {
  margin-left: auto;
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
