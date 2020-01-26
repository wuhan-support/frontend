<template>
  <v-app
    id="__app_root"
    :dark="dark"
  >
    <v-navigation-drawer
      v-model="drawer"
      app
      width="300"
    >
      <div class="drawer-logo blue darken-4">
        <v-img
          :src="require('@/assets/logo/feiyan.help.svg')"
          aspect-ratio="2.1"
          contain
        />
        <div class="white--text description">
          <v-row
            align="center"
            justify="center"
          >
            <span>{{ $t('app.name') }}</span>
          </v-row>
        </div>
      </div>
      <v-list
        dense
        nav
      >
        <template
          v-for="route in routes"
        >
          <v-list-item
            v-if="!route.children || route.meta.forceSingle"
            :key="route.name"
            @click="onMenuItemClicked(route)"
          >
            <v-list-item-icon>
              <v-icon v-text="route.meta.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t(route.meta.i18n) }} &nbsp; <v-icon
                  v-if="!route.component && !route.meta.forceSingle"
                  small
                >
                  mdi-open-in-new
                </v-icon>
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
              v-for="child in route.children"
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

        <v-divider class="my-2" />

        <v-container>
          <v-row
            justify="end"
          >
            <v-btn
              icon
              class="mx-1"
              @click="dark = !dark"
            >
              <v-icon>mdi-invert-colors</v-icon>
            </v-btn>

            <v-menu
              bottom
              left
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="mx-1"
                  v-on="on"
                >
                  <v-icon>mdi-translate</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(locale, i) in localizations"
                  :key="i"
                  @click="changeLocale(locale.id)"
                >
                  <v-list-item-title>{{ locale.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
        </v-container>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      fixed
      dark
      color="blue darken-3"
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      />

      <v-toolbar-title class="pl-2">
        <transition
          name="fade-transition"
          mode="out-in"
        >
          <v-avatar
            :size="32"
            class="mr-2"
          >
            <v-img
              src="https://placehold.it/32x32"
            />
          </v-avatar>
        </transition>
        <span class="title">
          {{ $t($router.currentRoute.meta.i18n) }}
        </span>
      </v-toolbar-title>
    </v-app-bar>
    <v-content
      class="mb-8"
    >
      <transition
        name="slide-fade"
        mode="out-in"
      >
        <v-container>
          <router-view />
        </v-container>
      </transition>
    </v-content>
    <v-footer
      app
      color="blue darken-3"
      class="white--text px-4 caption"
    >
      <v-spacer />
      &copy; Non-nCoV Support Group | {{ new Date().getFullYear() }}
    </v-footer>
  </v-app>
</template>

<script>
  import Console from "@/utils/Console";
  import utils from "./utils/utils";

  export default {
    name: 'App',
    data () {
      return {
        routes: [],
        localizations: [
          {
            id: 'zh',
            name: '中文'
          }, {
            id: 'en',
            name: 'English'
          }, {
            id: 'ja',
            name: '日本語'
          }
        ],
        drawer: !this.$vuetify.breakpoint.xsOnly,
      }
    },
    computed: {
      dark: {
        get () {
          return this.$store.state.settings.dark
        },
        set (value) {
          this.$store.commit('switchDark', value)
          this.$vuetify.theme.dark = value
        }
      }
    },
    watch: {
      'dark': ['onDarkChange']
    },
    beforeMount() {
      this.routes = this.$router.options.routes
    },
    mounted () {
      this.onDarkChange(this.$store.state.settings.dark);

      if (this.$store.getters.language) {
        this.changeLocale(this.$store.getters.language, false)
      } else {
        const language = utils.getFirstBrowserLanguage();
        Console.debug("[i18n] detected language", language);
        if (language) {
          // because this is a detection result, thus we are not storing it,
          // unless the user manually set one.
          this.changeLocale(language, false)
        }
      }

      if (this.$store.state.settings.dark) {
        this.$vuetify.theme.dark = this.$store.state.settings.dark
      }
    },
    methods: {
      onDarkChange (newValue) {
        if (newValue) {
          document.body.style.backgroundColor = "#303030"
        } else {
          document.body.style.backgroundColor = "#fafafa"
        }
      },

      onMenuItemClicked (route) {
        if (route.meta && route.meta.link) {
          window.open(route.meta.link);
        } else {
          this.$router.push({'name': route.name})
        }
      },
      changeLocale (localeId, save=true) {
        Console.debug("[i18n] locale changed to:", localeId, "| saving to vuex:", save);
        this.$i18n.locale = localeId;
        // this.$vuetify.lang.current = localeId;
        if (save) this.$store.commit("changeLocale", localeId);
        document.title = `${this.$t(this.$route.meta.i18n) + ' | ' || ''}${this.$t('app.name')}`;
      },
    }
  }
</script>

<style>
  .slide-fade-enter-active {
    transition: all .225s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .slide-fade-leave-active {
    transition: all .125s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(1.5vh);
    opacity: 0;
  }

  .theme--dark, .theme--light {
    transition: all .3s cubic-bezier(.25,.8,.5,1) !important;
  }

  .theme--light .bkop-light {
    background: rgba(255, 255, 255, .75) !important;
  }

  .theme--dark .bkop-light {
    background: rgba(66, 66, 66, .85) !important;
  }

  .theme--light .bkop-medium {
    background: rgba(255, 255, 255, .9) !important;
  }

  .theme--dark .bkop-medium {
    background: rgba(66, 66, 66, .9) !important;
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
