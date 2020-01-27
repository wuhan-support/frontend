<template>
  <div class="home">
    <v-row
      align="center"
      justify="center"
      class="fill-height"
    >
      <v-col cols="12">
        <v-row
          justify="center"
          align="center"
        >
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xl="6"
          >
            <v-img
              :src="require('@/assets/logo/ncov.red.svg')"
              aspect-ratio="2"
              max-height="128px"
              min-width="64px"
              max-width="256px"
              contain
              class="mx-auto"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xl="6"
          >
            <v-img
              :src="require('@/assets/logo/feiyan.help.svg')"
              aspect-ratio="2"
              max-height="128px"
              min-width="64px"
              max-width="256px"
              contain
              class="mx-auto"
            />
          </v-col>
        </v-row>
        <v-card-title style="word-break: normal">
          <h1
            :class="{
              'display-2': $vuetify.breakpoint.mdAndUp,
              'display-1': $vuetify.breakpoint.smAndDown
            }"
            class="font-weight-bold mb-4"
          >
            首页
          </h1>
        </v-card-title>
        <v-card-text class="subtitle-1 line-height-wide black--text">
          支持武汉，我们在一起。
          <br>
          请使用左侧导航栏跳转至详细页面
        </v-card-text>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
