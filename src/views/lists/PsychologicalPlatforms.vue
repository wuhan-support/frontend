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
        线上心理咨询平台
      </h1>
      <v-card class="elevation-0">
        <v-card-text class="alertRedCardText white--text my-2">
          点开这个页面的小可爱你好呀～ 下面有一些可以帮助到你的哥哥姐姐们，一定要联系他们哦！加油！
        </v-card-text>
      </v-card>
      <!-- <p class="subtitle-1">
                图例：<v-icon small>
                    mdi-bed-empty
                </v-icon> 表示床位剩余，<v-icon small>
                    mdi-home-circle
                </v-icon> 表示房间剩余
            </p> -->
      <v-skeleton-loader
        :loading="$store.getters.ajaxLoading && !data.length"
        type="card@4"
      >
        <div>
          <!-- <v-row justify="space-between" align="center" class="mx-3">
                        <v-checkbox v-model="filters.available" class="d-inline-flex" label="只看有房" />
                        <v-checkbox v-model="filters.linBaoRuZhu" class="d-inline-flex" label="不需自带三件套" />
                    </v-row> -->
          <DataTable
            :items="dataset"
            disable-region-selector
            search-text="平台名称、地区或咨询方式"
          >
            <template v-slot:default="{ items }">
              <v-card
                v-for="[i, o] in items.entries()"
                :key="i"
                class="viewCard redBorder"
              >
                <v-card-title>
                  <span class="title font-weight-black">
                    {{ o.organization }}
                  </span>
                </v-card-title>
                <v-card-text class="pb-0">
                  <v-chip
                    v-for="tag in o.tags"
                    :key="tag.t"
                    class="ma-2"
                    color="#a20002"
                    text-color="white"
                  >
                    <v-icon
                      left
                      small
                    >
                      {{ tag.i }}
                    </v-icon>
                    {{ tag.t }}
                  </v-chip>
                  <p
                    class="subtitle-1 font-weight-bold mt-3"
                  >
                    开放时间：{{ o.opentime }}
                  </p>
                  <p
                    class="subtitle-2 font-weight-bold"
                  >
                    服务群体：{{ o.group ? o.group : "无指定服务群体，所有人均可咨询" }}
                  </p>
                  <p class="subtitle-1">
                    地方性：{{ o.regional }}{{ regionalText(o) }}
                  </p>
                  <v-card-text class="alertRedCardText white--text my-2">
                    咨询方式：{{ o.contact }}
                  </v-card-text>
                  <p
                    v-if="o.notes"
                    class="caption"
                  >
                    备注：{{ o.notes }}
                  </p>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-col class="text-center d-flex justify-space-between">
                      <v-btn
                        tile
                        small
                        text
                        :href="o.source"
                        target="_blank"
                      >
                      <v-icon class="iconRed" left>mdi-open-in-new</v-icon>查看信息来源
                      </v-btn>
                      <v-btn
                        tile
                        text
                        small
                        @click="openReport(o)"
                      >
                      <v-icon class="iconRed" left>wsicon wsicon-info</v-icon>信息纠错
                      </v-btn>
                  </v-col>
                </v-card-actions>
              </v-card>
            </template>
          </DataTable>
        </div>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import api from "../../apis/api";
import DataTable from "../../components/DataTable";

export default {
    name: "PsychologicalPlatforms",
    components: { DataTable },
    data () {
        return {
            data: [],
            page: 1,
            search: "",
            selectedRegion: null,
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
            },
            filters: {
                available: true,
                linBaoRuZhu: true
            }
        }
    },
    computed: {
        dataset () {
            return this.data.map(el => {
              const tags = [];
              if (el.onlineoffline && el.onlineoffline.includes("线上")) tags.push({i: "mdi-monitor-cellphone", c: "green lighten-1", t: "线上"});
              if (el.onlineoffline && el.onlineoffline.includes("线下")) tags.push({i: "mdi-account", c: "green lighten-1", t: "线下"});
              if (el.onlineoffline && el.onlineoffline.includes("电话")) tags.push({i: "mdi-phone", c: "green", t: "电话"});
              if (el.onlineoffline && el.onlineoffline.includes("网上")) tags.push({i: "mdi-web", c: "green", t: "网上"});
              if (el.commercial && el.commercial.includes("有偿")) tags.push({i: "mdi-currency-usd", c: "green darken-1", t: "有偿"});
              if (el.commercial && el.commercial.includes("无偿")) tags.push({i: "mdi-currency-usd-off", c: "green darken-1", t: "无偿"});
              el.tags = tags;
              return el;
            })
        },
        xs () {
            return this.$vuetify.breakpoint.xsOnly
        }
    },
    beforeMount () {
        if (!this.data.length) {
            this.update()
        }
    },
    methods: {
        update () {
            api.psychologicalPlatform().then(({ data }) => {
                this.data = data
            })
        },
        doReport () {
            api.reportIncorrect({
                type: "psychologicalPlatform",
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
        openDialog (o) {
            this.dialog.enabled = true;
            this.dialog.contact.name = o.contacts;
            this.dialog.contact.content = o.phone;
            this.dialog.address = o.address;
        },
        openReport (o) {
            this.report.enabled = true;
            this.report.content = JSON.stringify(o)
        },
      regionalText(o) {
          const suffix = [];
          if (o.regional.includes("地方")) {
            if (o.province) suffix.push(o.province);
            if (o.city) suffix.push(o.city);
            if (o.suburb) suffix.push(o.suburb)

            return `（${suffix.join(" ")}）`
          } else {
            return ""
          }
      }
    },
}
</script>

<style scoped>
.card-border {
    border-top: 4px solid rgba(104, 172, 91, 0.7) !important;
}
  .v-card__text > p {
    margin-bottom: 8px;
  }
</style>
