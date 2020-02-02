<template>
  <div
    class="home"
  >
    <v-row
      align="center"
      justify="center"
      class="fill-height"
    >
      <v-col cols="12">
        <v-img
          :src="require('@/assets/logo/red.svg')"
          aspect-ratio="2"
          max-width="512px"
          contain
          class="mx-auto"
        />
        <v-card-title
          class="display-1 font-weight-bold"
          style="word-break: normal"
        >
          我们是?
        </v-card-title>
        <v-card-text class="subtitle-1 line-height-wide black--text">
          我们关注你所关注的，我们支持需要支持的：面向疫区内外民众和医疗机构的多维度综合信息平台。支持武汉，我们在一起！
        </v-card-text>
        <v-row
          justify="center"
          align="center"
        >
          <v-col cols="12">
            <h2 class="overline text-center">
              欢迎访问多维度综合信息平台
            </h2>
            <h1 class="heading text-center">
              您是?
            </h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(route, i) in routes"
            :key="i"
            cols="12"
            sm="12"
            md="6"
            lg="6"
            xl="4"
          >
            <v-card
              hover
              :to="{name: route.children[0].name}"
            >
              <v-img
                class="white--text align-center text-center"
                height="192px"
                :src="route.meta.banner"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
              >
                <v-icon
                  size="72"
                  :class="route.meta.color ? route.meta.color : ''"
                  color="white"
                >
                  {{ route.meta.icon }}
                </v-icon>
              </v-img>
              <v-card-title
                class="darken-1"
              >
                我是{{ route.meta.title }}
              </v-card-title>
              <v-card-subtitle
                class="darken-1"
              >
                {{ route.meta.subtitle }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import HomeDescription from "../components/HomeDescription";
export default {
  name: 'Home',
  components: {},
  computed: {
    routes () {
      return this.$router.options.routes.filter(el => el.path !== '/' && !el.meta.hide)
    }
  },
}
</script>

<style scoped>
</style>
