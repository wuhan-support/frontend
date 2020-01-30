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
      <v-spacer />
      <v-btn
        right
        icon
        :loading="geolocation.determining"
        :class="{'red--text': geolocation.failed, 'green--text': location}"
        @click="geolocate"
      >
        <v-icon
          @click="geolocate"
        >
          mdi-crosshairs-gps
        </v-icon>
      </v-btn>
    </v-row>
    <v-expand-transition>
      <v-row
        v-if="location"
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          class="subtitle-1 text-center green--text font-weight-bold"
        >
          <span>
            已按照最近距离排序列表
          </span>
        </v-col>
      </v-row>
    </v-expand-transition>
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
  import geo from "../utils/geo";
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
        region: [],
        geolocation: {
          lat: null,
          lng: null,
          determining: false,
          failed: false
        }
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
      },
      location () {
        if (this.geolocation.lat && this.geolocation.lng && !this.geolocation.failed) {
          return this.geolocation
        } else {
          return null
        }
      }
    },
    methods: {
      geolocate() {
        this.geolocation.determining = true;

        geo.locate()
        .then(pos => {
          this.geolocation.lat = pos.coords.latitude
          this.geolocation.lng = pos.coords.longitude
        })
        .catch(err => {
          this.geolocation.failed = true
          setTimeout(() => {
            this.geolocation.failed = false
            this.geolocation.lat = null
            this.geolocation.lng = null
          }, 4000)
        })
        .finally(() => {
          this.geolocation.determining = false
        })
      }
    },
  }
</script>

<style scoped>

</style>
