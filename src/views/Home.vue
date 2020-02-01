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
          :src="require('@/assets/logo/feiyan.help.svg')"
          aspect-ratio="2"
          max-width="128px"
          contain
          class="mx-auto"
        />
        <v-row
          justify="center"
          align="center"
        >
          <v-col cols="12">
            <h2 class="overline text-center">
              多维度信息共享平台 引导页
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
              replace
              hover
              :to="{name: route.children[0].name}"
            >
              <v-img
                class="white--text align-center text-center"
                height="200px"
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
export default {
  name: 'Home',
  computed: {
    routes () {
      return this.$router.options.routes.filter(el => el.path !== '/' && !el.meta.hide)
    }
  },
}
</script>

<style scoped>
</style>
