<template>
  <div>
    <v-row
      v-if="!disableRegionSelector"
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
            已按照最近距离排序列表 <v-btn
              outlined
              small
              @click="(geolocation.lat = null) && (geolocation.lng = null)"
            >
              关闭
            </v-btn>
          </span>
        </v-col>
      </v-row>
    </v-expand-transition>
    <v-text-field
      v-model="search"
      :label="region.length ? '在所选地区范围内搜索' : '搜索'"
      :placeholder="searchText"
      dense
      class="my-1"

      outlined
      hide-details
      clearable
    >
      <template
        v-if="enableGeolocation"
        v-slot:append-outer
      >
        <v-btn
          icon
          :loading="geolocation.determining"
          :class="{'red--text': geolocation.failed, 'green--text': location}"
          style="margin-top: -7px"
          @click="geolocate"
        >
          <v-icon
            @click="geolocate"
          >
            mdi-crosshairs-gps
          </v-icon>
        </v-btn>
      </template>
    </v-text-field>
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
      },
      enableGeolocation: {
        type: Boolean,
        default () {
          return false
        }
      },
      disableRegionSelector: {
        type: Boolean,
        default () {
          return false
        }
      },
      searchText: {
        type: String,
        default () {
          return "名称、地区或地址"
        }
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
        const filtered = this.items.filter((el) => {
          if ("province" in el && "city" in el && "suburb" in el) {
            return this.filters.every((func) => {
              return func(el)
            })
          } else {
            return true
          }
        });
        const haveDistance = filtered.filter(el => {
          if (this.location) {
            if (el.latitude && el.longitude) {
              console.log(el.name, el.latitude, el.longitude)
              return true
            } else {
              return false
            }
          } else {
            return true
          }
        })

        const calculatedDistance = haveDistance.map(el => {
          if (this.location)  {
            el.distance = geo.distance(el.latitude, el.longitude, this.location.lat, this.location.lng)
          } else {
            el.distance = null
          }
          return el
        })
        const sorted = calculatedDistance.sort((a, b) => {
          return a.distance - b.distance
        })
        return sorted
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
