<template>
  <v-row
    v-resize="handleOnResize"
    class="place-selector"
    align="center"
  >
    <v-region
      v-model="regions"
      :type="isLarge ? 'group' : 'select'"
      @values="handleRegionChange"
    />
  </v-row>
</template>

<script>
export default {
  name: 'PlaceSelector',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      regions: {},
      data: [],
      timer: null,
      windowSize: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    isLarge() {
      return this.windowSize.x >= 1024
    }
  },
  watch: {
    value(newVal) {
      // 若有回显需求 do something...
      // this.regions = ...
    }
  },
  mounted () {
    this.handleOnResize()
  },
  methods: {
    // 监听地址选择
    handleRegionChange(regions) {
      this.data = Object.values(regions)
        .filter(_ => !!_)
        .map(_ => _.value)
      const events = [{
        name: 'input',
        data: this.data
      }, {
        name: 'change',
        data: regions
      }]
      events.forEach(e => {
        this._events[e.name] && this.$emit(e.name, e.data)
      })
    },
    // 监听屏幕大小改变
    handleOnResize () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.windowSize = {
          x: window.innerWidth,
          y: window.innerHeight
        }
        if (this.data.length < 3) {
          this.regions = {}
          this.data = []
          this.$emit('input', this.data)
        }
      }, 100)
    }
  }
}
</script>

<style scoped>
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
