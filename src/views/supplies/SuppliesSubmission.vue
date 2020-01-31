<template>
  <div class="form-test">
    <v-dialog
      v-model="missingDialog.enabled"
      persistent
      max-width="450px"
    >
      <v-card>
        <v-card-title class="warning mb-2">
          请检查填写内容
        </v-card-title>
        <v-card-text>
          <span class="subtitle-1">
            以下内容是必填的，但被留空了：
          </span>
          <ul class="my-2">
            <li
              v-for="c in missingDialog.content"
              :key="c"
            >
              {{ c }}
            </li>
          </ul>
          <span class="font-weight-bold mt-2">
            请在检查后重试
          </span>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="missingDialog.enabled = false"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <h1 class="heading">
      需求提交
    </h1>
    <v-card>
      <v-card-text class="subtitle-1 red font-weight-bold white--text my-2">
        数据贡献志愿者请注意：我们感谢您提供数据以帮助其他志愿者；但为了资源分配效率与信息准确度考量，在您提交数据后我们还需进行二次审核、确保信息真实无误后，再公开发布您的信息；因此，您可能不会看到您的信息被立即公开。若您想加速此流程，还请在下方的【需求官方证明】一栏中，填写相关官方证明，我们核验此证明后即可立即发布数据。感谢您的理解与配合！
      </v-card-text>
    </v-card>
    <form-item
      v-for="(item, index) in formKeyObj"
      :key="index"
      :label="`${index + 1}. ${item.label}`"
      :class="item.valueKey"
      :required="item.required"
    >
      <template slot="value">
        <template v-if="item.valueKey === 'name'">
          <input
            v-model="item.value"
            :placeholder="item.placeholder"
          >
        </template>
        <template v-else-if="item.valueKey === 'region'">
          <PlaceSelector v-model="item.value" />
        </template>
        <template v-else-if="item.valueKey === 'address'">
          <textarea
            v-model="item.value"
            :placeholder="item.placeholder"
          />
        </template>
        <template v-else-if="item.valueKey === 'patients'">
          <input
            v-model="item.value"
            :placeholder="item.placeholder"
          >
        </template>
        <template v-else-if="item.valueKey === 'beds'">
          <input
            v-model="item.value"
            :placeholder="item.placeholder"
          >
        </template>
        <template v-else-if="item.valueKey === 'contactName'">
          <input
            v-model="item.value"
            :placeholder="item.placeholder"
          >
        </template>
        <template v-else-if="item.valueKey === 'contactOrg'">
          <input
            v-model="item.value"
            :placeholder="item.placeholder"
          >
        </template>
        <template v-else-if="item.valueKey === 'contactPhone'">
          <input
            v-model="item.value"
            :placeholder="item.placeholder"
          >
        </template>
        <template v-else-if="item.valueKey === 'supplies'">
          <v-btn
            color="accent"
            dark
            depressed
            block
            @click="item.value = [].concat(nullSupply, item.value || [])"
          >
            <v-icon left>
              mdi-plus-circle
            </v-icon>
            添加物资
          </v-btn>
          <template v-if="item.value">
            <v-row>
              <v-col
                v-for="(item0, index0) in item.value"
                :key="index0"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <div
                  class="subItem mx-2"
                >
                  需求物资 {{ item0["name"] ? `"${item0["name"]}"` : `#${index0}` }}
                  <form-item
                    v-for="(item1, index1) in subFormKeyObj[item.valueKey]"
                    :key="index1"
                    :label="item1.label"
                    dense
                  >
                    <template slot="value">
                      <input
                        v-model="item0[item1.valueKey]"
                        :placeholder="item1.placeholder"
                      >
                    </template>
                  </form-item>
                  <v-btn
                    color="error"
                    class="mt-2"
                    small
                    @click="item.value.splice(index0, 1)"
                  >
                    <v-icon left>
                      mdi-minus-circle
                    </v-icon>
                    移除物品
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </template>
        </template>
        <template v-else-if="item.valueKey === 'pathways'">
          <input
            v-model="item.value"
            :placeholder="item.placeholder"
          >
        </template>
        <template v-else-if="item.valueKey === 'logisticStatus'">
          <input
            v-model="item.value"
            :placeholder="item.placeholder"
          >
        </template>
        <template v-else-if="item.valueKey === 'source'">
          <input
            v-model="item.value"
            :placeholder="item.placeholder"
          >
        </template>
        <template v-else-if="item.valueKey === 'proof'">
          <input
            v-model="item.value"
            :placeholder="item.placeholder"
          >
        </template>
        <template v-else-if="item.valueKey === 'notes'">
          <textarea
            v-model="item.value"
            :placeholder="item.placeholder"
          />
        </template>
      </template>
    </form-item>
    <v-btn
      large
      block
      color="primary"
      @click="submit"
    >
      <v-icon left>
        mdi-send
      </v-icon>
      确认提交
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
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

      &.supplies {
        .subItem {
          padding: 16px;
          background: #d7d7d7;
          border: 2px solid #979797;
          border-radius: 4px;

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
  import FormItem from "../../components/FormItem";
  import PlaceSelector from "../../components/PlaceSelector";
  import api from "../../apis/api";

  export default {
    name: 'SuppliesSubmission',
    components: {
      FormItem,
      PlaceSelector
    },
    data() {
      return {
        formKeyObj: [
          {
            valueKey: 'name',
            label: '医院名称',
            type: 'String',
            placeholder: '请输入{{label}}',
            required: true,
            value: null
          }, {
            valueKey: 'region',
            label: '医院所在地区',
            type: 'Array-Object',
            placeholder: '请选择{{label}}',
            required: true,
            value: null
          }, {
            valueKey: 'address',
            label: '医院详细地址',
            type: 'String',
            placeholder: '请输入{{label}}',
            required: true,
            value: null
          }, {
            valueKey: 'patients',
            label: '医院现每天接待患者数量',
            type: 'Number',
            placeholder: '请输入{{label}}',
            required: false,
            value: null
          }, {
            valueKey: 'beds',
            label: '医院床位数',
            type: 'Number',
            placeholder: '请输入{{label}}',
            required: false,
            value: null
          },
          //
          {
            valueKey: 'contactName',
            label: '责任人姓名',
            type: 'String',
            placeholder: '请输入{{label}}',
            required: false,
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
            valueKey: 'supplies',
            label: '物资需求列表',
            type: 'Array-Object',
            // placeholder: '请输入{{label}}',
            required: true,
            value: null
          }, {
            valueKey: 'pathways',
            label: '可接受的捐物资渠道',
            type: 'Array-Number',
            placeholder: '请输入{{label}}',
            required: true,
            value: null
          }, {
            valueKey: 'logisticStatus',
            label: '现在的物流状况',
            type: 'String',
            placeholder: '请输入{{label}}',
            required: false,
            value: null
          }, {
            valueKey: 'source',
            label: '需求信息数据来源',
            type: 'String',
            placeholder: '请输入{{label}}链接',
            required: true,
            value: null
          },
          //
          {
            valueKey: 'proof',
            label: '需求的官方证明',
            type: 'String',
            placeholder: '请输入{{label}}链接',
            required: false,
            value: null
          }, {
            valueKey: 'notes',
            label: '其他备注',
            type: 'String',
            placeholder: '请输入{{label}}',
            required: false,
            value: null
          }
        ].map(item => {
          item.placeholder = (item.placeholder || '').replace('{{label}}', item.label);
          return item;
        }),
        subFormKeyObj: {
          region: [
            {
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
          }
          ],
          supplies: [{
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
            label: '每日消耗',
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
        },
        nullSupply: {
          name: null,
          need: null,
          daily: null,
          have: null,
          requirements: null,
          severe: null,
        },
        missingDialog: {
          enabled: false,
          content: []
        }
      };
    },
    mounted() {
      this.prefillSupplies()
    },
    methods: {
      prefillSupplies () {
        const supplies = [
          {
            name: "N95",
            requirements: "requ"
          },
          {
            name: "fhy"
          }
        ];
        const supplyObject = this.formKeyObj.find(el => el.valueKey === "supplies");
        for (const supply of supplies) {
          const merged = {...this.nullSupply, ...supply};
          supplyObject.value = [].concat(merged, supplyObject.value || [])
        }
      },
      marshalData () {
        const marshalled = {};
        const missings = [];
        console.log(this.formKeyObj)
        for (const form of this.formKeyObj) {
          if (form.required && !form.value) {
            missings.push(form.label)
          } else if (form.valueKey === "region" && !(form.value && form.value.length === 3)) {
            missings.push(form.label);
          }
          if (form.valueKey === "region" && form.value.length === 3) {
            marshalled["province"] = form.value[0];
            marshalled["city"] = form.value[1];
            marshalled["suburb"] = form.value[2];
          }
          marshalled[form.valueKey] = form.value
        }
        return {marshalled, missings}
      },
      notifyMissings(missings) {
        this.missingDialog.enabled = true;
        this.missingDialog.content = missings;
      },
      submit() {
        const {marshalled, missings} = this.marshalData();
        if (missings.length) return this.notifyMissings(missings);
        console.log(marshalled);
        console.log(api.submitSupplies(marshalled))
      }
    }
  };
</script>
