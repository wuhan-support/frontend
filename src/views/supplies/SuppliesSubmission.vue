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
              :key="c.index"
            >
              {{ parseInt(c.index) + 1 }}. {{ c.text }}
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
          <PlaceSelector
            v-model="item.value"
            class="mx-4"
          />
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
          <!--          <v-btn-->
          <!--            color="accent"-->
          <!--            dark-->
          <!--            depressed-->
          <!--            block-->
          <!--            -->
          <!--          >-->
          <!--            <v-icon left>-->
          <!--              mdi-plus-circle-->
          <!--            </v-icon>-->
          <!--            添加物资-->
          <!--          </v-btn>-->
          <v-alert
            dense
            border="left"
            type="info"
            class="mx-4"
            style="line-height: 1.7"
          >
            为了填写效率考量，我们自动填写了大部分医院都需要的物资信息。还请二次确认是否正确！
          </v-alert>
          <v-row class="mx-2">
            <v-col
              v-for="(item0, index0) in item.value"
              :key="index0"
              cols="12"
              sm="6"
              md="6"
              lg="4"
              xl="3"
            >
              <div
                class="subItem"
              >
                需求物资 <span class="font-weight-bold">{{ `#${index0 + 1}` }} {{ item0["name"] ? `${item0["name"]}` : `(未命名)` }}</span>
                <form-item
                  v-for="(item1, index1) in subFormKeyObj[item.valueKey]"
                  :key="index0 + ',' + index1"
                  :label="item1.label"
                  dense
                  full-width
                  :required="item1.required"
                >
                  <template
                    slot="value"
                  >
                    <input
                      v-model="item0[item1.valueKey]"
                      :placeholder="item1.placeholder + (item1.required ? ' *' : '')"
                      :class="{'red lighten-4 requiredInput': item1.required && !item0[item1.valueKey]}"
                    >
                  </template>
                </form-item>
                <v-btn
                  color="error"
                  class="mt-2"
                  depressed
                  block
                  @click="item.value.splice(index0, 1)"
                >
                  <v-icon left>
                    mdi-minus-circle
                  </v-icon>
                  移除物品
                </v-btn>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
              lg="4"
              xl="3"
              class="align-center"
            >
              <v-btn
                block
                x-large
                color="green white--text"
                @click="$set(item.value, item.value.length, {...nullSupply})"
              >
                <v-icon left>
                  mdi-plus-circle
                </v-icon>
                <span class="font-weight-bold">
                  添加物品
                </span>
              </v-btn>
            </v-col>
          </v-row>
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
      x-large
      block
      color="primary"
      :loading="loading"
      @click="submit"
    >
      <v-icon left>
        mdi-send
      </v-icon>
      确认提交
    </v-btn>
    <v-dialog
      v-model="submitted"
      persistent
      no-click-animation
      overlay-opacity="0.9"
    >
      <v-card
        class="pa-5 py-10"
      >
        <v-row justify="center">
          <v-col
            cols="12"
            class="text-center"
          >
            <v-img
              :src="require('@/assets/logo/red.svg')"
              aspect-ratio="4.4"
              max-width="128"
              contain
              class="mx-auto pt-1 pb-4"
            />
            <v-icon
              x-large
              class="pt-6 pb-2"
              color="green"
            >
              mdi-check-circle
            </v-icon>
            <h1 class="overline">
              Successfully submitted
            </h1>
            <h1 class="title mb-6">
              已成功提交物资需求
            </h1>
            <p class="subtitle-1 mb-4">
              我们将在审核、确保准确性后以最快速度上线信息。感谢提供！
            </p>
            <v-btn
              outlined
              :to="{name: 'volunteerIndex'}"
            >
              返回志愿者首页
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="error"
    >
      <v-card
        class="pa-2 py-5"
      >
        <v-row justify="center">
          <v-col
            cols="12"
            class="text-center"
          >
            <v-icon
              x-large
              class="pt-6 pb-2"
              color="error"
            >
              mdi-close-circle
            </v-icon>
            <h1 class="overline">
              Network Error
            </h1>
            <h1 class="title mb-6">
              提交不成功
            </h1>
            <p class="subtitle-1 mb-4">
              请检查网络连接后
              <v-btn
                small
                outlined
                color="primary"
                @click="() => { error = false; submit() }"
              >
                尝试重新提交
              </v-btn>
            </p>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
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
          .requiredInput {
            transition: all 75ms ease-out;
            box-shadow: 0 0 0px 1px #b00000, 0 0 2px 1px rgba(176, 0, 0, 0.5);
          }
          .requiredInput:focus {
            box-shadow: none;
            background-color: #fff !important;
          }
          .requiredInput::after {
            content: "必填"
          }
        }
        .subItemAdd {
          background: #8cd778;
          border: 2px solid #65bf4c;
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
  import Console from "../../utils/Console";

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
            placeholder: '(选填) 请输入{{label}}',
            required: false,
            value: null
          }, {
            valueKey: 'beds',
            label: '医院现床位数',
            type: 'Number',
            placeholder: '(选填) 请输入现{{label}}',
            required: false,
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
            required: false,
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
            placeholder: '是否接受个人捐赠和/或企业等捐赠渠道？',
            required: true,
            value: null
          }, {
            valueKey: 'logisticStatus',
            label: '现在的物流状况',
            type: 'String',
            placeholder: '如何将物资送抵贵院？有无特殊情况需说明？',
            required: false,
            value: null
          }, {
            valueKey: 'source',
            label: '需求信息数据来源',
            type: 'String',
            placeholder: '链接最快最准，若无也可填文字说明',
            required: true,
            value: null
          },
          //
          {
            valueKey: 'proof',
            label: '需求的官方证明',
            type: 'String',
            placeholder: '链接最快最准，若无也可填文字说明',
            required: false,
            value: null
          }, {
            valueKey: 'notes',
            label: '其他备注',
            type: 'String',
            placeholder: '(选填) 有无其他备注？',
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
            valueKey: 'unit',
            label: '数量单位',
            type: 'Number',
            placeholder: '如：个、20包/箱、500ml/瓶',
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
            required: false,
            value: null
          }, {
            valueKey: 'have',
            label: '库存数量',
            type: 'Number',
            placeholder: '请输入{{label}}',
            required: true,
            value: null
          }, {
            valueKey: 'requirements',
            label: '物资要求',
            type: 'String',
            placeholder: '如国家标准 GBxxxxx-xxxx 等',
            required: false,
            value: null
          }].map(item => {
            item.placeholder = (item.placeholder || '').replace('{{label}}', item.label);
            return item;
          })
        },
        nullSupply: {
          name: null,
          unit: null,
          need: null,
          daily: null,
          have: null,
          requirements: null,
        },
        missingDialog: {
          enabled: false,
          content: []
        },
        submitted: false,
        loading: false,
        error: false,
      };
    },
    mounted() {
      this.prefillSupplies()
    },
    methods: {
      prefillSupplies () {
        const supplies = [
          {
            name: "医用防护口罩（N95）",
            unit: "个",
            requirements: "GB19083-2010"
          },
          {
            name: "医用外科口罩",
            unit: "个",
            requirements: "YY0469-2011"
          },
          {
            name: "一次性使用医用口罩",
            unit: "个",
            requirements: "YY/T 0969-2013"
          },
          {
            name: "医用一次性防护服",
            unit: "个",
            requirements: "GB19082-2009"
          },
          {
            name: "个人用眼护具",
            unit: "副",
            requirements: "GB14866-2006"
          },
          {
            name: "一次性使用医用橡胶检查手套",
            unit: "双",
            requirements: "GB10213-2006"
          },
          {
            name: "手术衣",
            unit: "个",
            requirements: "YY/T 0506.2-2016"
          },

        ];
        const supplyObject = this.formKeyObj.find(el => el.valueKey === "supplies");
        for (const supply of supplies) {
          const merged = {...this.nullSupply, ...supply};
          supplyObject.value = [].concat(supplyObject.value || [], merged)
        }
      },
      marshalData () {
        const marshalled = {};
        const missings = [];
        Console.log(this.formKeyObj)
        for (const [index, form] of Object.entries(this.formKeyObj)) {
          if (form.required && (!form.value || form.value === "")) {
            missings.push({index, text: form.label})
          } else if (form.valueKey === "region" && !(form.value && form.value.length === 3)) {
            missings.push({index, text: form.label});
          }
          if (form.valueKey === "region" && form.value && form.value.length === 3) {
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

        this.loading = true
        api.submitSupplies(marshalled)
          .then(() => {
            this.submitted = true
          })
          .catch(() => {
            this.error = true
          })
        .finally(() => {
          this.loading = false
        })
      }
    }
  };
</script>
