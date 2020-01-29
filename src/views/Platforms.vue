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
  <v-row align="center" justify="center">
    <v-col cols="12">
      <h1 class="heading mx-3">
        医院信息
      </h1>
      <v-skeleton-loader
        :loading="$store.getters.ajaxLoading && !data.length"
        type="card@4"
        class="mx-3"
      >
        <div>
          <v-text-field
            v-model="search"
            label="搜索"
            placeholder="医院名称、地址或区域"
            outlined
            hide-details
            clearable
          />
          <br />
          <v-data-iterator
            :items="dataset"
            :search="search"
            :page="page"
            :items-per-page="20"
            hide-default-footer
          >
            <template v-slot:no-data>
              <v-alert border="left" outlined type="warning">
                暂无数据
              </v-alert>
            </template>
            <template v-slot:no-results>
              <v-alert border="left" outlined type="info">
                没有查询到关键字 "{{ search }}" 的结果
              </v-alert>
            </template>
             <template v-slot:default="{ items }">
                 
             </template>
             <template v-slot:footer="{ pagination }">
              <Paginator
                :page="page"
                :pagination="pagination"
                @change="(newPage) => {page = newPage; $vuetify.goTo(0, {duration: 225, offset: 0, easing: 'easeOutQuad'})}"
              />
            </template>
          </v-data-iterator>
        </div>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import Paginator from "../components/Paginator";

export default {
  name: "Platforms",
   components: {Paginator},
  data() {
    return {
      search: "",
      page: 1,
      data: []
    };
  },
  computed: {
    dataset() {
      return this.data.filter(el => el.name.length || el.note === "住满");
    }
  }
};
</script>

<style scoped>
.source {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
