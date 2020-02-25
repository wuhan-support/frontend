<template>
  <div>
    <v-row
      v-if="!disableRegionSelector"
      align="center"
      class="mx-0"
    >
      <div
        class="subtitle-2"
      >
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
      <v-row
        v-else-if="geolocation.failed"
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          class="subtitle-1 text-center red--text font-weight-bold"
        >
          <span>
            定位失败，请确认是否开启浏览器及网站定位权限
            <v-btn
              outlined
              small
              :loading="geolocation.determining"
              @click="geolocate"
            >
              重试
            </v-btn>
          </span>
        </v-col>
      </v-row>
    </v-expand-transition>
    <v-text-field
      v-model="search"
      label="搜索"
      :placeholder="searchText"
      dense
      outlined
      hide-details
      clearable
    >
      <template v-slot:prepend-inner>
        <v-icon left>
          mdi-magnify
        </v-icon>
      </template>
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
      id="data-table--content"
      :items="data"
      :search="search"
      :page="page"
      :items-per-page="24"
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
          @change="pageChanged"
        />
      </template>
      <template v-slot:default="props">
        <slot v-bind="props" />
      </template>
      <template v-slot:footer="{ pagination }">
        <Paginator
          :page="page"
          :pagination="pagination"
          scroll
          large
          @change="pageChanged"
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
            if (!/(省|市|自治区|特别行政区)/.test(el.province)) {
              if (/(北京|天津|上海|重庆)/.test(el.province)) {
                el.province = `${el.province}市`
              } else if (/(澳门|香港)/.test(el.province)) {
                el.province = `${el.province}特别行政区`
              } else {
                el.province = `${el.province}省`
              }
            }
          }

          if (el.city) {
            el.city = el.city.replace(" ", "");
            if (!/(区|市|级)/.test(el.city)) {
              el.city = `${el.city}市`
            }
          }

          if (el.suburb) el.suburb = el.suburb.replace(" ", "");
          return el
        });
      },
      // 根据当前行政区划选择，生成过滤器
      filters () {
        const filters = [];
        for (const [index, regionSegment] of this.region.entries()) {
          if (index === 0) filters.push(el => el.province === regionSegment);
          if (index === 1) filters.push(el => el.city === regionSegment);
          if (index === 2) filters.push(el => el.suburb === regionSegment)
        }
        return filters
      },
      // 根据列表数据，生成行政区划选择列表
      regionList () {
        const regionList = {};
        for (const item of this.cleanedData) {
          if (!item.province || !item.city) continue;
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
          return this.filters.every((func) => {
            return func(el)
          })
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

        // 增加索引号
        const indexed = sorted.map((el, index) => {
          el["_index"] = index;
          return el
        });

        return indexed
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
          // setTimeout(() => {
          //   this.geolocation.failed = false
          //   this.geolocation.lat = null
          //   this.geolocation.lng = null
          // }, 4000)
        })
        .finally(() => {
          this.geolocation.determining = false
        })
      },
      pageChanged ({page, scroll=false}) {
        this.page = page;
        if (scroll) this.$vuetify.goTo('#data-table--content', {duration: 275, offset: 0, easing: 'easeOutQuad'})
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
