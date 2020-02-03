<template>
  <div>
    <v-row
      v-if="!disableRegionSelector"
      align="center"
      class="mx-0"
    >
      <div class="subtitle-2">
        按地区过滤：
      </div>
      <PlaceSelector
        v-model="region"
        :custom-dataset="regionList"
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
      :placeholder="searchText"
      dense
      class="searchBar"
      outlined
      hide-details
      clearable
    />
    <v-data-iterator
      id="data-table--content"
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
          @change="(newPage) => {page = newPage; $vuetify.goTo('#data-table--content', {duration: 125, offset: 0, easing: 'easeOutQuad'})}"
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
          return "请输入 名称 / 地区 / 地址 进行搜索"
        }
      },
      color: {
        type: String,
        default () {
          return "#a20002"
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
      // 清洗行政区划内的多余空格
      cleanedData () {
        return this.items.map((el) => {
          if (el.province) {
            el.province = el.province.replace(" ", "");
            if (el.province.length === 2) {
              el.province = `${el.province}省`
            }
          }
          if (el.city) el.city = el.city.replace(" ", "");
          if (el.suburb) el.suburb = el.suburb.replace(" ", "");
          return el
        });
      },
      // 根据当前行政区划选择，过滤当前数据集
      filters () {
        const filters = [];
        for (const [index, regionSegment] of this.region.entries()) {
          if (index === 0) filters.push((el) => el.province === regionSegment);
          if (index === 1) filters.push((el) => el.city === regionSegment);
          if (index === 2) filters.push((el) => el.suburb === regionSegment)
        }
        return filters
      },
      // 根据列表数据，生成行政区划选择列表
      regionList () {
        const regionList = {};
        for (const item of this.cleanedData) {
          if (item.province && !regionList[item.province]) regionList[item.province] = {};
          if (item.city && !regionList[item.province][item.city]) regionList[item.province][item.city] = [];
          if (item.suburb && regionList[item.province][item.city]) regionList[item.province][item.city].push(item.suburb);
        }
        return regionList
      },
      // 经过过滤器、数据清洗、地理位置计算、排序后的数据
      data () {
        // 行政区划过滤
        const filtered = this.cleanedData.filter((el) => {
          if ("province" in el && "city" in el && "suburb" in el) {
            return this.filters.every((func) => {
              return func(el)
            })
          } else {
            return true
          }
        });

        // 若开启地理位置排序，则清理掉没有地理位置信息的数据
        const haveDistance = filtered.filter(el => {
          if (this.location) {
            return !!(el.latitude && el.longitude);
          } else {
            return true
          }
        });

        // 计算当前地理位置与特定记录的距离
        const calculatedDistance = haveDistance.map(el => {
          if (this.location)  {
            el.distance = geo.distance(el.latitude, el.longitude, this.location.lat, this.location.lng)
          } else {
            el.distance = null
          }
          return el
        });

        // 按地理位置排序结果
        const sorted = calculatedDistance.sort((a, b) => {
          return a.distance - b.distance
        });

        return sorted
      },
      // 返回当前地理位置信息
      location () {
        if (this.geolocation.lat && this.geolocation.lng && !this.geolocation.failed) {
          return this.geolocation
        } else {
          return null
        }
      }
    },
    methods: {
      // 确定用户地理位置
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
.searchBar {
  /*background: #FFFFFF;*/
  border: 1px solid #a20002;
  box-shadow: 0 3px 20px 0 rgba(0,0,0,0.10);
  border-radius: 4px;
}
</style>
