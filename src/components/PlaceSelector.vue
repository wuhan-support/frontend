<template>
  <div
    class="place-selector"
  >
    <v-region
      v-model="regions"
      type="select"
      @values="handleRegionChange"
    />
  </div>
</template>

<script>
export default {
  name: 'PlaceSelector',
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
.place-selector >>> .v-dropdown-container ul.rg-select__list li {
  color: black;
}
</style>
