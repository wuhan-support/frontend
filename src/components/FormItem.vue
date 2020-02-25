<template>
  <div class="form-item">
    <template v-if="dense">
      <span class="label d-inline-block mr-2">{{ label }}</span>
      <span
        class="value d-inline-block mb-1"
        :style="{'width': fullWidth ? 'calc(100% - 96px)' : '     '}"
      >
        <slot name="value" />
      </span>
    </template>
    <template v-else>
      <div class="label">
        {{ label }}
        <span
          v-if="required"
          class="red--text font-weight-black"
        >*</span>
      </div>
      <div class="value">
        <slot name="value" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.form-item {
  // display: flex;
  line-height: 36px;
  // justify-content: space-between;
  & > .label {
    // width: 5em; */
    font-size: 14px;
    font-weight: bolder;
  }
  & > .value {
  }
}
</style>

<script>
export default {
  name: "FormItem",
  props: {
    label: {
      type: String,
      default: null,
      required: true
    },
    required: {
      type: Boolean,
      default() {
        return false;
      }
    },
    dense: {
      type: Boolean,
      default() {
        return false;
      }
    },
    fullWidth: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
