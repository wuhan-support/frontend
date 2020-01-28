<i18n>
  {
    "en": {
      "source": "Source: ",
      "view": "Details"
    },
    "zh": {
      "source": "信息来源：",
      "view": "查看详情"
    }
  }
</i18n>

<template>
  <v-data-iterator />
</template>

<script>
  export default {
    name: "Platforms",
    data () {
      return {}
    }
  }
</script>

<style scoped>
.source {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
