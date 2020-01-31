<template>
  <div class="home">
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
        <v-row>
          <v-col
            v-for="(route, i) in routes"
            :key="i"
            cols="12"
            sm="12"
            md="6"
          >
            <v-card
              hover
              :to="{path: route.path}"
            >
              <v-sheet
                class="d-flex align-center justify-center"
                :class="route.meta.classes ? route.meta.classes : {'grey lighten-3': true}"
                height="96"
                tile
              >
                <v-icon size="48">
                  {{ route.meta.icon }}
                </v-icon>
              </v-sheet>
              <v-card-title
                :class="route.meta.classes"
                class="darken-1"
              >
                {{ $t(route.meta.i18n) }}
              </v-card-title>
              <v-card-subtitle
                :class="route.meta.classes"
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
        <v-card-title
          class="display-1 font-weight-bold"
          style="word-break: normal"
        >
          我们是？
        </v-card-title>
        <v-card-text class="subtitle-1 line-height-wide black--text">
          我们关注的是你所关注的：面向疫区内外民众和医疗机构的多维度信息整合平台。支持武汉，我们在一起！<br>
          #武汉加油 | <a href="https://app.feiyan.help">https://app.feiyan.help</a>
        </v-card-text>

        <v-card-title class="display-1 font-weight-bold">
          服务对象
        </v-card-title>
        <v-card-text class="subtitle-1 line-height-wide black--text">
          <p>
            <span class="font-weight-bold">对民众</span>：疫情防控、流言辟谣、义诊平台、免费心理咨询
          </p>
          <p>
            <span class="font-weight-bold">对医护人员</span>：需求发布平台、免费住宿及餐食、免费心理疏导咨询、医疗器械捐赠
          </p>
        </v-card-text>

        <v-card-title
          class="display-1 font-weight-bold"
        >
          项目特点
        </v-card-title>
        <v-card-text class="subtitle-1 line-height-wide black--text">
          <ul>
            <li>
              ✅ <span class="font-weight-bold">完全非盈利</span>：保证中立性
            </li>
            <li>
              ✅ <span class="font-weight-bold">一站式平台</span>：信息涵盖面广，受众类型多样
            </li>
            <li>
              ✅ <span class="font-weight-bold">响应及时</span>：推送最新一线信息
            </li>
            <li>
              ✅ <span class="font-weight-bold">国际化项目</span>：欢迎任何形式合作
            </li>
          </ul>
        </v-card-text>

        <v-card-title
          class="display-1 font-weight-bold"
        >
          分享
        </v-card-title>
        <v-card-text class="subtitle-1 line-height-wide black--text">
          欢迎点击右上角分享<span class="font-weight-bold">信息整合平台</span>，让更多朋友了解疫情发展、让更多医护人员的生活具有基本保障！支持武汉，我们在一起！
        </v-card-text>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  computed: {
    routes () {
      return this.$router.options.routes.filter(el => el.path !== '/' && !el.meta.hide)
    }
  },
}
</script>

<style scoped>

</style>
