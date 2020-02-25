<template>
  <div class="place-selector">
    <!-- <v-region
      v-model="regions"
      type="select"
      @values="handleRegionChange"
    />-->
    <v-row class="body-2">
      <v-col
        v-for="(selector, index) in selectorList"
        :key="index"
        class="pl-2"
        cols="4"
        sm="4"
        md="3"
        lg="2"
        xl="1"
      >
        <v-select
          v-model="regions[selector.type]"
          hide-details
          class="subtitle-1"
          :items="selector.data"
          :no-data-text="label"
          :label="label"
          single-line
          dense
          @change="handleRegionChange(selector.type)"
        >
          <template v-slot:item="{ item }">
            <div class="body-2">
              <span v-if="item === null">全部</span>
              <span v-else>{{ item }}</span>
            </div>
          </template>
          <template v-slot:selection="{ item }">
            <div class="body-2 selection">
              <span v-if="item === null">全部</span>
              <span v-else>{{ item }}</span>
            </div>
          </template>
        </v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PlaceSelector",
  props: {
    // 自定义区域数据
    customDataset: {
      type: Object,
      default: () => require("../assets/pca.json")
    }
  },
  data() {
    return {
      label: "请选择",
      data: [],
      // 地区↓
      regions: {
        province: null, // 省份
        city: null, // 城市
        area: null // 区域
      }
    };
  },
  computed: {
    // 省数据
    provinceData() {
      return [null, ...Object.keys(this.customDataset || {})];
    },
    // 市数据
    cityData() {
      return [
        null,
        ...Object.keys(this.customDataset[this.regions.province] || {})
      ];
    },
    // 区/县数据
    areaData() {
      let city = this.regions.city
        ? this.customDataset[this.regions.province][this.regions.city]
        : [];
      return [null, ...city];
    },
    selectorList() {
      return [
        {
          type: "province",
          data: this.provinceData
        },
        {
          type: "city",
          data: this.cityData
        },
        {
          type: "area",
          data: this.areaData
        }
      ];
    }
  },
  methods: {
    // 重新选择省/市时 清空下级数据
    clearRegionsData(type) {
      switch (type) {
        case "province":
          this.regions.city = null;
          this.regions.area = null;
          break;
        case "city":
          this.regions.area = null;
          break;
      }
    },
    // 监听地址选择
    handleRegionChange(type) {
      this.clearRegionsData(type);
      this.data = Object.values(this.regions).filter(_ => !!_);
      const events = [
        {
          name: "input",
          data: this.data
        },
        {
          name: "change",
          data: this.regions
        }
      ];
      events.forEach(e => {
        this._events[e.name] && this.$emit(e.name, e.data);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.place-selector {
  flex: 1;
  >>> .v-label {
    font-size: 14px;
  }
  .selection {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
