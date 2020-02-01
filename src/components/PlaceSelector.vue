<template>
  <div class="place-selector">
    <!-- <v-region
      v-model="regions"
      type="select"
      @values="handleRegionChange"
    /> -->
    <v-row class="body-2">
      <v-col
        v-for="(selector, index) in selectorList"
        :key="index"
        class="pl-2"
        cols="4"
        sm="2"
      >
        <v-select
          v-model="regions[selector.type]"
          class="body-2"
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
  name: 'PlaceSelector',
  props: {
    customDataset: {
      type: Object,
      default: () => require('./../../public/pca.json')
    }
  },
  data() {
    return {
      label: '请选择',
      data: [],
      regions: {
        province: '湖北省',
        city: null,
        area: null
      }
    }
  },
  computed: {
    // 省数据
    provinceData() {
      return [null, ...Object.keys(this.customDataset || {})]
    },
    // 市数据
    cityData() {
      return [null, ...Object.keys(this.customDataset[this.regions.province] || {})]
    },
    // 区/县数据
    areaData() {
      return [null, ...((this.customDataset[this.regions.province] || {})[this.regions.city] || [])]
    },
    selectorList() {
      return [
        {
          type: 'province',
          data: this.provinceData
        },
        {
          type: 'city',
          data: this.cityData
        },
        {
          type: 'area',
          data: this.areaData
        }
      ]
    }
  },
  methods: {
    // 重新选择省/市时 清空下级数据
    clearRegionsData (type) {
      switch (type) {
        case 'province':
          this.regions.city = null
          this.regions.area = null
          break;
        case 'city':
          this.regions.area = null
          break;
      }
    },
    // 监听地址选择
    handleRegionChange (type) {
      this.clearRegionsData(type)
      this.data = Object.values(this.regions).filter(_ => !!_)
      const events = [
        {
          name: 'input',
          data: this.data
        },
        {
          name: 'change',
          data: this.regions
        }
      ]
      events.forEach(e => {
        this._events[e.name] && this.$emit(e.name, e.data)
      })
    }
    // // 监听地址选择
    // handleRegionChange (regions) {
    //   this.data = Object.values(regions)
    //     .filter(_ => !!_)
    //     .map(_ => _.value)
    //   const events = [
    //     {
    //       name: 'input',
    //       data: this.data
    //     },
    //     {
    //       name: 'change',
    //       data: regions
    //     }
    //   ]
    //   events.forEach(e => {
    //     this._events[e.name] && this.$emit(e.name, e.data)
    //   })
    // }
  }
}
</script>

<style scoped>
.place-selector {
  flex: 1;
}
.place-selector >>> .v-label {
  font-size: 14px;
}
.place-selector .selection {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.place-selector >>> .v-region div.rg-select div.rg-select__el div.rg-select__content {
  display: table-cell;
  width: 100px;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 6px 20px 6px 10px;
}
</style>

<style>
.rg-select__list li {
  color: black !important;
}
</style>
