<i18n>
  {
    "en": {
      "source": "Source: ",
      "view": "Details"
    },
    "zh": {
      "source": "信息来源：",
      "view": "查看详情"
    }
  }
</i18n>

<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-snackbar
      :value="snackbar"
      color="success"
      bottom
      :timeout="4000"
    >
      <v-icon
        left
        color="white"
      >
        mdi-check
      </v-icon>
      感谢支持，已提交纠错信息
      <v-spacer />
    </v-snackbar>
    <v-dialog
      v-model="dialog.enabled"
      max-width="450px"
    >
      <v-card>
        <v-card-title>
          联系方式
        </v-card-title>
        <v-card-text>
          <v-list two-line>
            <v-list-item :href="`https://ditu.amap.com/search?query=${encodeURIComponent(dialog.address)}`">
              <v-list-item-avatar>
                <v-icon>
                  mdi-map
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  地址
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ dialog.address }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              :href="`tel://${dialog.contact.content}`"
            >
              <v-list-item-avatar>
                <v-icon>
                  mdi-contact-phone
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  负责人：{{ dialog.contact.name ? dialog.contact.name : "（暂无姓名）" }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  电话：{{ dialog.contact.content ? dialog.contact.name : "（暂无电话：可选择去官网查询）" }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>
                  mdi-phone
                </v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="dialog.enabled = false"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="report.enabled"
      persistent
      max-width="450px"
    >
      <v-card>
        <v-card-title>
          提交纠错
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="report.cause"
            label="错误类型"
            placeholder="请选择错误类型"
            :items="report.causes"
            filled
            hide-details
            class="mb-2"
          />
          收到纠错请求后我们会再次审核此条信息以保证准确性。<br>
          <span class="red--text">注意：我们的人力资源有限，烦请不要滥用此功能，十分感谢！</span>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click="report.enabled = false"
          >
            取消
          </v-btn>

          <v-spacer />

          <v-btn
            text
            color="primary"
            :loading="$store.getters.ajaxLoading"
            :disabled="report.cause === ''"
            @click="doReport"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-col
      cols="12"
      class="mx-3"
    >
      <h1 class="heading">
        医院需求信息
      </h1>
      <v-card>
        <v-card-text class="subtitle-1 red font-weight-bold white--text my-2">
          本列表中的所有医院均存在<span class="font-weight-black title">非常紧急</span>的物资缺口状况，急需社会各界紧急援助！若您身边有相关资源（包括物流资源、消耗品资源等）请速与这些医院进行联系！
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text class="subtitle-2 green white--text my-2">
          捐赠者请知悉：为保证需求真实性，本列表中几乎所有数据均通过【电话-微信视频-带相片工作证-医院官方电话】的方式核验联系人信息（已通过标签方式标明需求核验状况）
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-text class="caption grey white--text my-2">
          若您发现信息有不完整、已过期等情况，请点击相应数据卡片右下角的 <v-icon
            x-small
            color="red lighten-4"
          >
            mdi-flag
          </v-icon> 纠错按钮提交纠错请求，我们将再次与医院进行二次审核，以保证消息时效性。
        </v-card-text>
      </v-card>

      <v-skeleton-loader
        :loading="$store.getters.ajaxLoading && !data.length"
        type="card@4"
      >
        <div>
          <DataTable
            :items="dataset"
          >
            <template v-slot:default="{ items }">
              <v-card
                v-for="[i, o] in items.entries()"
                :key="i"
                class="my-4 pb-2"
                :class="{'card-border': o.isextremeemergency !== 'Y'}"
              >
                <v-card-title
                  class="mb-2"
                  :class="{'red darken-1 white--text': o.isextremeemergency === 'Y'}"
                >
                  <span
                    class="title font-weight-black"
                  >
                    {{ o.isextremeemergency === 'Y' ? "[紧急]": "" }} {{ o.name }}
                  </span>
                </v-card-title>
                <v-card-text>
                  <span v-if="getTags(o).length">
                    <v-chip
                      v-for="tag in getTags(o)"

                      :key="tag.t"
                      label
                      class="ma-1 font-weight-bold white--text"
                      :color="tag.c"
                    >
                      {{ tag.t }}
                    </v-chip>
                    <br>
                  </span>

                  <span class="subtitle-1">
                    {{ o.province }} {{ o.city }} {{ o.suburb }}<br>地址：{{ o.address }}
                  </span>
                </v-card-text>
                <v-card-actions class="mx-2">
                  <v-btn
                    outlined
                    color="primary"
                    :href="`https://ditu.amap.com/search?query=${encodeURIComponent(o.name)}`"
                    target="_blank"
                  >
                    <v-icon left>
                      mdi-map-marker
                    </v-icon>
                    地图
                  </v-btn>

                  <v-btn
                    outlined
                    color="secondary"
                    @click="openDialog(o)"
                  >
                    <v-icon left>
                      mdi-contact-phone
                    </v-icon>
                    联系方式
                  </v-btn>

                  <v-spacer />
                  <v-btn
                    icon
                    @click="showOrHideCard(o)"
                  >
                    <v-icon>{{ show[o.name] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="error darken-1"
                    @click="openReport(o)"
                  >
                    <v-icon>
                      mdi-flag
                    </v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="show[o.name]">
                    <v-divider />

                    <v-card-text>
                      <div
                        v-for="content in getContent(o)"
                        :key="content.title"
                        class="mb-3"
                      >
                        <h2 class="title">
                          {{ content.title }}
                        </h2>
                        <p>
                          {{ content.content }}
                        </p>
                        <v-divider />
                      </div>
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </template>
          </DataTable>
        </div>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
  import api from "../apis/api";
  import strings from "../utils/strings";
  import DataTable from "../components/DataTable";

  export default {
    name: "Supplies",
    components: {DataTable},
    data () {
      return {
        data: [],
        show: {},
        snackbar: false,
        dialog: {
          enabled: false,
          contact: {
            name: "",
            content: ""
          },
          address: ""
        },
        report: {
          enabled: false,
          cause: "",
          causes: ['地址不存在/未找到', '联系不上', '已被征用', '已住满', '其他原因无法接待', '缺少必需物资无法营业', '信息重复', '其他'],
          content: ""
        }
      }
    },
    computed: {
      dataset() {
        console.log(this.data)
        return this.data.filter(el => el.name.length);
      },
      xs () {
        return this.$vuetify.breakpoint.xsOnly
      },
      contacts () {
        return strings.contacts(
          this.dialog.contact.name,
          this.dialog.contact.content,
        )
      }
    },
    beforeMount() {
      if (!this.data.length) {
        this.update()
      }
    },
    methods: {
      update() {
        api.supplies().then(({data}) => {
          this.data = data
        })
      },
      showOrHideCard(o) {
        if (this.show[o.name]) {
          this.show[o.name] = !this.show[o.name]
        } else {
          this.$set(this.show, o.name, true)
          // this.show = Object.assign(this.show, {[o.name]: true})
        }

      },
      getTags (o) {
        const tags = [];
        const trueness = strings.trueness(o.trueness);
        if (o.isextremeemergency === "Y") tags.push({c: 'red', t: '紧急'});
        if (o.supplies && o.supplies.includes("已无任何库存")) tags.push({c: 'red', t: `已无任何库存`});
        if (trueness.t) tags.push({c: 'green', t: `消息已验真：${trueness.r}`});
        return tags
      },
      getContent(o) {
        const contents = [];
        const map = {
          "supplies": "需求描述",
          "official": "是否为官方信息（官网/官微）",
          "drugs": "急需药品",
          "suppliesv": "备注",
          "suppliesw": "备注物资",

          "suppliesn95": "N95 口罩（个）",
          "suppliesmsm": "医用外科口罩（个）",
          "suppliesa": "一次性医用口罩（个）",
          "suppliesb": "护目镜（个）",
          "suppliesc": "防冲击眼罩（个）",
          "suppliesd": "一次性防水面罩（个）",
          "suppliese": "防护服（套）",
          "suppliesf": "手术衣（件）",
          "suppliesg": "隔离衣（件）",
          "suppliesh": "医用帽（个）",
          "suppliesi": "防水、防污染鞋（长筒）（套）",
          "suppliesj": "乳胶手套（双）",
          "suppliesk": "免洗手消毒液",
          "suppliesl": "红外线体温仪",
          "suppliesm": "酒精",
          "suppliesn": "84 消毒液",
          "suppliesx": "奥司他韦",
          "suppliesy": "连花清瘟胶囊",
          "suppliesz": "移动紫外线消毒车",
          "suppliesaa": "板蓝根",

          "supplieso": "提出日期（到武汉中转站的日期）",
          "suppliesp": "物流编码/线下配送",
          "suppliesr": "物流状态",
          "suppliess": "送货人",
          "suppliest": "交付日期",
          "suppliesu": "签收人",
        };
        for (const [key, value] of Object.entries(map)) {
          if (key in o && o[key] && o[key].length) {
            contents.push({
              title: value,
              content: o[key]
            })
          }
        }
        return contents
      },
      doReport() {
        api.reportIncorrect({
          type: "supplies",
          cause: this.report.cause,
          content: this.report.content
        })
          .then(() => {
            this.snackbar = true;
            this.report.cause = ""
          })
        .finally(() => {
          this.report.enabled = false
        })
      },
      openDialog(o) {
        this.dialog.enabled = true;
        this.dialog.contact.name = o.contactname;
        this.dialog.contact.content = o.contactphone;
        this.dialog.address = o.address;
      },
      openReport(o) {
        this.report.enabled = true;
        this.report.content = JSON.stringify(o)
      }
    },
  }
</script>

<style scoped>
.card-border {
  border-top: 4px solid rgba(226, 82, 66, 1) !important
}
</style>
