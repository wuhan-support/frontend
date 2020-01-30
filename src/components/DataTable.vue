<template>
  <div>
    <v-row
      align="start"
      class="mx-0"
    >
      <div class="subtitle-2">
        按地区过滤：
      </div>
      <PlaceSelector
        v-model="region"
        class="mx-0 mb-1"
      />
    </v-row>
    <v-text-field
      v-model="search"
      :label="region.length ? '在所选地区范围内搜索' : '搜索'"
      placeholder="名称、地区或地址"
      dense
      class="my-1"

      outlined
      hide-details
      clearable
    />
    <v-data-iterator
      :items="data"
      :search="search"
      :page="page"
      :items-per-page="20"
      hide-default-footer
    >
      <template v-slot:no-data>
        <v-alert
          border="left"
          outlined
          type="info"
        >
          十分抱歉，但现在暂时还没有相关记录
        </v-alert>
      </template>
      <template v-slot:no-results>
        <v-alert
          border="left"
          outlined
          type="info"
        >
          没有查询到关键字 "{{ search }}" 的结果
        </v-alert>
      </template>
      <template v-slot:header="{ pagination }">
        <Paginator
          :page="page"
          :pagination="pagination"
          @change="(newPage) => {page = newPage}"
        />
      </template>
      <template v-slot:default="props">
        <slot v-bind="props" />
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
</template>

<script>
  import Paginator from "./Paginator";
  import PlaceSelector from "./PlaceSelector";
  export default {
    name: "DataTable",
    components: {PlaceSelector, Paginator},
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        page: 1,
        search: "",
        region: []
      }
    },
    computed: {
      filters () {
        const filters = [];
        for (let [index, regionSegment] of this.region.entries()) {
          if (index === 0) filters.push((el) => el.province === regionSegment);
          if (index === 1) filters.push((el) => el.city === regionSegment);
          if (index === 2) filters.push((el) => el.suburb === regionSegment)
        }
        return filters
      },
      data() {
        return this.items.filter((el) => {
          if ("province" in el && "city" in el && "suburb" in el) {
            return this.filters.every((func) => {
              return func(el)
            })
          } else {
            return true
          }
        });
      }
    },
  }
</script>

<style scoped>

</style>
