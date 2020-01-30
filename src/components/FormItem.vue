<template>
    <div class="form-item">
        <div class="label">
            {{label}}
        </div>
        <div class="value">
            <slot name="value"></slot>
        </div>
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
    name: 'FormItem',
    props: {
        label: {
            type: String,
            default: null,
            required: true
        }
    },
    data () {
        return {};
    },
    methods: {

    }
};
</script>