<template>
    <div class="form-test">
        <form-item v-for="(item, index) in formKeyObj" :key="index" :label="`${index + 1}. ${item.label}`" :class="item.valueKey">
            <template slot="value">
                <template v-if="item.valueKey === 'name'">
                    <input :placeholder="item.placeholder" v-model="item.value" />
                </template>
                <template v-else-if="item.valueKey === 'region'">
                    <PlaceSelector v-model="item.value" />
                </template>
                <template v-else-if="item.valueKey === 'address'">
                    <textarea :placeholder="item.placeholder" v-model="item.value"></textarea>
                </template>
                <template v-else-if="item.valueKey === 'patients'">
                    <input :placeholder="item.placeholder" v-model="item.value" />
                </template>
                <template v-else-if="item.valueKey === 'beds'">
                    <input :placeholder="item.placeholder" v-model="item.value" />
                </template>
                <template v-else-if="item.valueKey === 'contactName'">
                    <input :placeholder="item.placeholder" v-model="item.value" />
                </template>
                <template v-else-if="item.valueKey === 'contactOrg'">
                    <input :placeholder="item.placeholder" v-model="item.value" />
                </template>
                <template v-else-if="item.valueKey === 'contactPhone'">
                    <input :placeholder="item.placeholder" v-model="item.value" />
                </template>
                <template v-else-if="item.valueKey === 'suppplies'">
                    <div class="btn" @click="item.value = [].concat(item.value || [], {})">add</div>
                    <template v-if="item.value">
                        <div class="subItem" v-for="(item0, index0) in item.value" :key="index0">
                            <div class="btn" @click="item.value.splice(index0, 1)">remove</div>
                            <form-item v-for="(item1, index1) in subFormKeyObj[item.valueKey]" :key="index1" :label="item1.label">
                                <template slot="value">
                                    <input :placeholder="item1.placeholder" v-model="item0[item1.valueKey]" />
                                </template>
                            </form-item>
                        </div>
                    </template>
                </template>
                <template v-else-if="item.valueKey === 'pathways'">
                    <input :placeholder="item.placeholder" v-model="item.value" />
                </template>
                <template v-else-if="item.valueKey === 'logisticStatus'">
                    <input :placeholder="item.placeholder" v-model="item.value" />
                </template>
                <template v-else-if="item.valueKey === 'source'">
                    <input :placeholder="item.placeholder" v-model="item.value" />
                </template>
                <template v-else-if="item.valueKey === 'proof'">
                    <input :placeholder="item.placeholder" v-model="item.value" />
                </template>
                <template v-else-if="item.valueKey === 'notes'">
                    <textarea :placeholder="item.placeholder" v-model="item.value"></textarea>
                </template>
            </template>
        </form-item>
    </div>
</template>

<style lang="scss" scoped >
.form-test {
    .form-item {
        &.name,
        &.address,
        &.patients,
        &.beds,
        &.contactName,
        &.contactOrg,
        &.contactPhone,
        &.pathways,
        &.logisticStatus,
        &.source,
        &.proof {
            input {
                font-size: 14px;
                outline: none;
                width: 100%;
                background: #f8f8f8;
                border-radius: 4px;
                padding: 0 10px;
            }
        }

        &.suppplies {
            .subItem {
                padding: 10px;

                input {
                    font-size: 14px;
                    outline: none;
                    width: 100%;
                    background: #f8f8f8;
                    border-radius: 4px;
                    padding: 0 10px;
                }
            }
        }

        &.address,
        &.notes {
            textarea {
                font-size: 14px;
                outline: none;
                width: 100%;
                background: #f8f8f8;
                border-radius: 4px;
                padding: 0 10px;
            }
        }
    }
}
</style>

<script>
import FormItem from "../components/FormItem";
import PlaceSelector from "../components/PlaceSelector";

export default {
    name: 'FormTest',
    components: {
        FormItem,
        PlaceSelector
    },
    data () {
        return {
            formKeyObj: [{
                valueKey: 'name',
                label: '医院名称',
                type: 'String',
                placeholder: '请输入{{label}}',
                required: true,
                value: null
            }, {
                valueKey: 'region',
                label: '所在地区',
                type: 'Array-Object',
                placeholder: '请选择{{label}}',
                required: true,
                value: null
            }, {
                valueKey: 'address',
                label: '详细地址',
                type: 'String',
                placeholder: '请输入{{label}}',
                required: true,
                value: null
            }, {
                valueKey: 'patients',
                label: '医院现每天接待患者数量',
                type: 'Number',
                placeholder: '请输入{{label}}',
                required: true,
                value: null
            }, {
                valueKey: 'beds',
                label: '医院床位数',
                type: 'Number',
                placeholder: '请输入{{label}}',
                required: true,
                value: null
            },
            // 
            {
                valueKey: 'contactName',
                label: '责任人姓名',
                type: 'String',
                placeholder: '请输入{{label}}',
                required: true,
                value: null
            }, {
                valueKey: 'contactOrg',
                label: '责任人所在单位或组织',
                type: 'String',
                placeholder: '请输入{{label}}',
                required: true,
                value: null
            }, {
                valueKey: 'contactPhone',
                label: '责任人联系方式',
                type: 'String',
                placeholder: '请输入{{label}}',
                required: true,
                value: null
            },
            //
            {
                valueKey: 'suppplies',
                label: '物资需求列表',
                type: 'Array-Object',
                // placeholder: '请输入{{label}}',
                required: true,
                value: null
            }, {
                valueKey: 'pathways',
                label: '可接受的捐物资渠道',
                type: 'Array-Number',
                placeholder: '请选择{{label}}',
                required: true,
                value: null
            }, {
                valueKey: 'logisticStatus',
                label: '现在的物流状况',
                type: 'String',
                placeholder: '请输入{{label}}',
                required: true,
                value: null
            }, {
                valueKey: 'source',
                label: '需求信息数据来源',
                type: 'String',
                placeholder: '请录入{{label}}链接',
                required: true,
                value: null
            },
            //
            {
                valueKey: 'proof',
                label: '需求的官方证明',
                type: 'String',
                placeholder: '请录入{{label}}链接',
                required: true,
                value: null
            }, {
                valueKey: 'notes',
                label: '其他备注',
                type: 'String',
                placeholder: '请录入{{label}}',
                required: true,
                value: null
            }].map(item => {
                item.placeholder = (item.placeholder || '').replace('{{label}}', item.label);
                return item;
            }),
            subFormKeyObj: {
                region: [{
                    valueKey: 'province',
                    label: '省',
                    type: 'String',
                    placeholder: '请选择{{label}}',
                    required: true,
                    value: null
                }, {
                    valueKey: 'city',
                    label: '市',
                    type: 'String',
                    placeholder: '请选择{{label}}',
                    required: true,
                    value: null
                }, {
                    valueKey: 'suburb',
                    label: '区/县',
                    type: 'String',
                    placeholder: '请选择{{label}}',
                    required: true,
                    value: null
                }],
                suppplies: [{
                    valueKey: 'name',
                    label: '物资名称',
                    type: 'String',
                    placeholder: '请输入{{label}}',
                    required: true,
                    value: null
                }, {
                    valueKey: 'need',
                    label: '需求数量',
                    type: 'Number',
                    placeholder: '请输入{{label}}',
                    required: true,
                    value: null
                }, {
                    valueKey: 'daily',
                    label: '日常消耗',
                    type: 'Number',
                    placeholder: '请输入{{label}}',
                    required: true,
                    value: null
                }, {
                    valueKey: 'have',
                    label: '现在库存',
                    type: 'Number',
                    placeholder: '请输入{{label}}',
                    required: true,
                    value: null
                }, {
                    valueKey: 'requirements',
                    label: '供应要求',
                    type: 'String',
                    placeholder: '请输入{{label}}',
                    required: true,
                    value: null
                }].map(item => {
                    item.placeholder = (item.placeholder || '').replace('{{label}}', item.label);
                    return item;
                })
            }
        };
    },
    methods: {

    }
};
</script>