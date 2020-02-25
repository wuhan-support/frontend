<template>
  <div class="home">
    <v-row
      align="center"
      justify="center"
      class="fill-height"
    >
      <v-col cols="12">
        <v-img
          :src="require('@/assets/logo/red.svg')"
          aspect-ratio="2"
          max-width="256px"
          contain
          class="mx-auto"
        />
        <v-row
          justify="center"
          align="center"
        >
          <v-col cols="12">
            <h1 class="heading text-center">
              医护人员信息
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
            lg="4"
          >
            <v-card
              hover
              class="viewCard"
              :to="{path: route.path}"
            >
              <v-sheet
                class="d-flex align-center justify-center grey lighten-3"
                height="96"
                tile
              >
                <template v-if="route.meta.icons">
                  <v-icon
                    v-for="icon in route.meta.icons"
                    :key="icon"
                    size="36"
                    :class="route.meta.color ? route.meta.color : ''"
                  >
                    {{ icon }}
                  </v-icon>
                </template>
                <template v-else>
                  <v-icon
                    size="48"
                    :class="route.meta.color ? route.meta.color : ''"
                  >
                    {{ route.meta.icon }}
                  </v-icon>
                </template>
              </v-sheet>
              <v-card-title
                class="darken-1"
              >
                {{ route.meta.title }}
              </v-card-title>
              <v-card-subtitle
                class="darken-1"
              >
                {{ route.meta.subtitle }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
        >
          <v-col class="text-center">
            <span class="caption">
              下拉了解项目详情
            </span>
          </v-col>
        </v-row>
        <v-divider class="my-5" />
        <HomeDescription />
      </v-col>
    </v-row>
  </div>
</template>

<script>

import HomeDescription from "../../components/HomeDescription";
export default {
  name: 'StaffHome',
  components: {
    HomeDescription
  },
  computed: {
    routes () {
      return this.$router.options.routes.find(el => el.name === this.$route.matched[0].name)
        .children.filter(el => el.path !== "" && !el.meta.hide)
    }
  },
}
</script>

<style scoped>

</style>
