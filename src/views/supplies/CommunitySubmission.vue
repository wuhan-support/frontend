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
          <span class="subtitle-1">以下内容是必填的，但被留空了：</span>
          <ul class="my-2">
            <li
              v-for="c in missingDialog.content"
              :key="c.index"
            >
              {{ parseInt(c.index) + 1 }}. {{ c.text }}
            </li>
          </ul>
          <span class="font-weight-bold mt-2">请在检查后重试</span>
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
      社区物资需求提交
    </h1>
    <v-card>
      <v-card-text
        class="subtitle-1 deep-orange font-weight-bold white--text my-2"
      >
        请注意：由于缓存原因，您的需求可能需要最多 5 分钟才能在需求列表中展示。感谢您的理解与配合！
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
        <template v-if="item.valueKey === 'type'">
          <input
            id="nCov"
            v-model="item.value"
            type="radio"
            value="nCov"
          >
          <label for="nCov">新冠肺炎</label>
          <input
            id="others"
            v-model="item.value"
            type="radio"
            value="others"
          >
          <label for="others">其他人群</label>
          <input
            id="normal"
            v-model="item.value"
            type="radio"
            value="normal"
          >
          <label for="normal">普通人群</label>
          <template v-if="['nCov','confirmedPatients','medicalObserve'].includes(item.value)">
            <br>
            <input
              id="confirmedPatients"
              v-model="item.value"
              type="radio"
              name="type"
              value="confirmedPatients"
            >
            <label for="confirmedPatients">确诊病人</label>
            <input
              id="medicalObserve"
              v-model="item.value"
              type="radio"
              value="medicalObserve"
            >
            <label for="medicalObserve">医疗观察</label>
          </template>
          <template v-if="['others','lungDisease','respiratoryDisease'].includes(item.value)">
            <br>
            <input
              id="lungDisease"
              v-model="item.value"
              type="radio"
              name="type"
              value="lungDisease"
            >
            <label for="lungDisease">肺部疾病患者</label>
            <input
              id="respiratoryDisease"
              v-model="item.value"
              type="radio"
              name="type"
              value="respiratoryDisease"
            >
            <label for="respiratoryDisease">呼吸道疾病患者</label>
          </template>

          <br>
        </template>
        <template v-else-if="item.valueKey === 'ifconsistent'">
          <!--          <input-->
          <!--            id="yes"-->
          <!--            v-model="item.value"-->
          <!--            type="radio"-->
          <!--            name="ifconsistent"-->
          <!--            value="yes"-->
          <!--          >-->
          <!--          <label for="yes">是</label>-->
          <!--          <input-->
          <!--            id="no"-->
          <!--            v-model="item.value"-->
          <!--            type="radio"-->
          <!--            name="ifconsistent"-->
          <!--            value="no"-->
          <!--          >-->
          <!--          <label for="no">否</label>-->

          <v-switch
            v-model="item.value"
            :label="`联系人与需求人相同: ${item.value ? '相同' : '不相同'}`"
          />
          <v-text-field
            v-if="!item.value"
            v-model="item.phone"
            dense
            filled
            placeholder="请输入联系人电话"
          />
        </template>
        <template v-else-if="item.valueKey === 'region'">
          <PlaceSelector
            v-model="item.value"
            class="mx-4"
          />
        </template>
        <template v-else-if="item.valueKey === 'notes'">
          <v-textarea
            v-model="item.value"
            filled
            dense
            height="100"
            :placeholder="item.placeholder"
          />
        </template>
        <template v-else-if="item.valueKey === 'medicalSupplies'">
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
                医疗需求物资 <span class="font-weight-bold">{{ `#${index0 + 1}` }} {{ item0["name"] ? `${item0["name"]}` : `(未命名)` }}</span>
                <form-item
                  v-for="(item1, index1) in subFormKeyObj"
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
                  移除此物品
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
                  添加医疗物品
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-else-if="item.valueKey === 'liveSupplies'">
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
                生活需求物资 <span class="font-weight-bold">{{ `#${index0 + 1}` }} {{ item0["name"] ? `${item0["name"]}` : `(未命名)` }}</span>
                <form-item
                  v-for="(item1, index1) in subFormKeyObj"
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
                  移除此物品
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
                  添加生活物品
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <v-text-field
            v-model="item.value"
            hide-details
            dense
            filled
            :placeholder="item.placeholder"
          />
        </template>
      </template>
    </form-item>
    <!-- 确认提交 -->
    <v-btn
      x-large
      block
      color="primary"
      :loading="loading"
      @click="submit"
    >
      <v-icon left>
        mdi-send
      </v-icon>确认提交
    </v-btn>
    <v-dialog
      v-model="submitted"
      persistent
      no-click-animation
      overlay-opacity="0.9"
    >
      <!-- 已成功提交物资需求 -->
      <v-card class="pa-5 py-10">
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
              我们将在审核、确保准确性后以最快速度上线信息！
            </p>
            <v-btn
              outlined
              :to="{name: 'peopleIndex'}"
            >
              返回首页
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- 提交不成功 -->
    <v-dialog v-model="error">
      <v-card class="pa-2 py-5">
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
    input {
      font-size: 14px;
      outline: none;
      width: 100%;
      background: #f8f8f8;
      border-radius: 4px;
      padding: 0 10px;
    }

    &.medicalSupplies, &.liveSupplies {
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

    &.ifconsistent {
      label {
        font-size: 14px;
        margin-right: 10px;
      }
      input {
        font-size: 14px;
        background: #f8f8f8;
        border-radius: 4px;
      }
    }
    &.type {
      label {
        font-size: 14px;
        margin-right: 10px;
      }
    }
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
  name: "CommunitySubmission",
  components: {
    FormItem,
    PlaceSelector
  },
  data() {
    return {
      subFormKeyObj: [{
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
      }].map(item => {
        item.placeholder = (item.placeholder || '').replace('{{label}}', item.label);
        return item;
      }),
      // 表单分类↓
      formKeyObj: [
        // 1需求人姓名↓
        {
          valueKey: "name",
          label: "需求人姓名",
          type: "String",
          placeholder: "请输入{{label}}",
          required: true,
          value: null
        },
        // 2需求人年龄↓
        {
          valueKey: "age",
          label: "需求人年龄",
          type: "Number",
          placeholder: "请输入{{label}}",
          required: true,
          value: null
        },
        // 3需求人求助类别↓
        // {
        //   valueKey: "type",
        //   label: "需求人求助类别",
        //   type: "String",
        //   placeholder: "请输入{{label}}",
        //   required: true,
        //   value: null
        // },
        // 4联系人是否与需求人一样↓
        {
          valueKey: "ifconsistent",
          label: "联系人与需求人相同",
          type: "Boolean",
          placeholder: "请输入{{label}}",
          required: true,
          value: true,
          phone: null
        },
        // 5联系方式↓
        {
          valueKey: "contactPhone",
          label: "联系方式",
          type: "Number",
          placeholder: "请输入{{label}}",
          required: true,
          value: null,
        },
        // 6所在地区↓
        {
          valueKey: "region",
          label: "所在地区",
          type: "Array-Object",
          placeholder: "请选择{{label}}",
          required: true,
          value: null,
          section: []
        },
        // 7详细地址↓
        {
          valueKey: "address",
          label: "详细地址",
          type: "String",
          placeholder: "请输入{{label}}",
          required: true,
          value: null,
          section: []
        },
        // 8物资需求列表↓
        {
          valueKey: "medicalSupplies",
          label: "医疗需求列表",
          type: "Array-Object",
          placeholder: "请输入{{label}}",
          required: true,
          value: [],
          section: []
        },
        {
          valueKey: "liveSupplies",
          label: "生活需求列表",
          type: "Array-Object",
          placeholder: "请输入{{label}}",
          required: true,
          value: [],
          section: []
        },
        // 9其他备注↓
        {
          valueKey: "notes",
          label: "其他备注",
          type: "String",
          placeholder: "(选填) 有无其他备注？",
          required: false,
          value: null,
          section: []
        }
      ].map(item => {
        item.placeholder = (item.placeholder || "").replace(
          "{{label}}",
          item.label
        );
        return item;
      }),
      nullSupply: {
        name: null,
        unit: null,
        need: null,
        daily: null,
        have: null,
        requirements: null
      },
      missingDialog: {
        enabled: false,
        content: []
      },
      submitted: false,
      loading: false,
      error: false
    };
  },
  mounted() {
    this.prefillSupplies();
  },
  methods: {
    marshalData() {
      const marshalled = {};
      const missings = [];
      Console.log(this.formKeyObj);
      for (const [index, form] of Object.entries(this.formKeyObj)) {
        if (form.required && form.type !== "Boolean" && (!form.value || form.value === "")) {
          missings.push({ index, text: form.label });
        } else if (
          form.valueKey === "region" &&
          !(form.value && form.value.length === 3)
        ) {
          missings.push({ index, text: form.label });
        }
        if (
          form.valueKey === "region" &&
          form.value &&
          form.value.length === 3
        ) {
          marshalled["province"] = form.value[0];
          marshalled["city"] = form.value[1];
          marshalled["suburb"] = form.value[2];
        }
        marshalled[form.valueKey] = form.value;
      }

      const isConsistant = this.formKeyObj.find(el => el.valueKey === 'ifconsistent');
      if (!isConsistant.value) {
        marshalled["contact"] = isConsistant.phone
      } else {
        marshalled["contact"] = this.formKeyObj.find(el => el.valueKey === 'contactPhone').value
      }

      try {
        marshalled["age"] = parseInt(marshalled["age"])
      } catch (e) {
        alert("年龄必须是数字")
      }

      return { marshalled, missings };
    },
    notifyMissings(missings) {
      this.missingDialog.enabled = true;
      this.missingDialog.content = missings;
    },
    submit() {
      const { marshalled, missings } = this.marshalData();
      if (missings.length) return this.notifyMissings(missings);
      this.loading = true;
      api
        .submitCommunitySupplies(marshalled)
        .then(() => {
          this.submitted = true;
        })
        .catch(() => {
          this.error = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    prefillSupplies() {
      console.log("prefillSupplies");
    },
    getdisbeld(item) {
      if (item.value === "yes") {
        item.value = null;
        return true;
      }
      return false;
    }
  }
};
</script>
