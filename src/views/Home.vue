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
          aspect-ratio="4.4"
          max-width="256px"
          contain
          class="mx-auto py-3"
          style="margin-top: 36px"
        />
        <v-row
          justify="center"
          align="center"
          class="pb-3 mx-1"
        >
          <v-col
            cols="12"
            class="pt-0"
          >
            <h1 class="subtitle-1 font-weight-bold text-center">
              驰援一线 · 传递温暖
            </h1>
          </v-col>
        </v-row>

        <v-divider />

        <v-card
          hover
          class="viewCard"
          @click="openFile"
        >
          <v-img
            class="white--text align-center text-center"
            height="192px"
            src="https://wuhan-support-images.oss-accelerate.aliyuncs.com/images/help.jpg"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          >
            <v-icon
              size="48"
              class="fill-height"
              color="white"
            >
              mdi-file-pdf
            </v-icon>
            <v-icon
              class="fill-height"
              size="24"
              color="white"
            >
              mdi-download
            </v-icon>
          </v-img>
          <v-card-title
            class="darken-1"
          >
            Diagnosis and Treatment Protocol for Novel Coronavirus Disease from Military Medical Team Supporting Wuhan (Trial Version 2)
          </v-card-title>
          <v-card-subtitle
            class="darken-1"
          >
            The documentation is translated by our team members to help all of the people around the world to fight with COVID-19. Please spread this document to the officials.
          </v-card-subtitle>
        </v-card>

        <v-row
          justify="center"
          align="center"
        >
          <v-col cols="12">
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
              class="viewCard"
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
  methods: {
    openFile() {
      window.open(
        "https://wuhan-support-images.oss-accelerate.aliyuncs.com/files/Diagnosis-and-treatment-protocol-of-millitary-medical-team-version-2.pdf"
      )
    }
  },
}
</script>

<style scoped>

</style>
