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
        实时信息
      </h1>
      <v-card class="elevation-0">
        <v-card-text class="alertRedCardText white--text my-2">
          实时信息更新粒度为5分钟一次；请留意以下内容的消息来源
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
                <!-- id 信息序号 -->
                <!-- <v-card-title>
                                    <span class="title font-weight-black">
                                        {{ o.organization }}
                                    </span>
                                </v-card-title> -->
                <v-card-title>
                  <span class="title font-weight-black">
                    {{ o.title }}
                  </span>
                </v-card-title>
                <v-card-text class="pb-0">
                  <p class="subtitle-1">
                    创建时间：{{ o.createdTime }}
                  </p>
                  <p class="subtitle-2 card-subTitle">
                    信息类别：{{ o.category }}
                  </p>
                  <p
                    class="subtitle-1 card-content"
                    :isShowMore="showMoreList.indexOf(o.id) >= 0"
                  >
                    {{ o.content }}
                    <img
                      v-if="o.image"
                      alt="相关图片"
                      :src="o.image"
                    >
                    <span
                      v-if="showMoreList.indexOf(o.id) < 0"
                      class="showMore"
                      @click="showMoreList.push(o.id)"
                    >展示全文</span>
                  </p>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-col class="text-center d-flex justify-space-between">
                    <v-btn
                      tile
                      small
                      text
                      :href="o.source"
                      target="_blank"
                    >
                      <v-icon
                        class="iconRed"
                        left
                      >
                        mdi-open-in-new
                      </v-icon>查看信息来源
                    </v-btn>
                    <v-btn
                      tile
                      text
                      small
                      @click="openReport(o)"
                    >
                      <v-icon
                        class="iconRed"
                        left
                      >
                        wsicon wsicon-info
                      </v-icon>信息纠错
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
    name: "RealTimeMsgs",
    components: { DataTable },
    data () {
        return {
            showMoreList: [],
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
                causes: ['信息内容错误', '信息来源错误', '信息时间错误', '信息重复', '其他'],
                content: ""
            }
        }
    },
    computed: {
        dataset () {
            return this.data.map(el => {
                const tags = [];
                // if (el.onlineoffline && el.onlineoffline.includes("线上")) tags.push({ i: "mdi-monitor-cellphone", c: "green lighten-1", t: "线上" });
                // if (el.onlineoffline && el.onlineoffline.includes("线下")) tags.push({ i: "mdi-account", c: "green lighten-1", t: "线下" });
                // if (el.onlineoffline && el.onlineoffline.includes("电话")) tags.push({ i: "mdi-phone", c: "green", t: "电话" });
                // if (el.onlineoffline && el.onlineoffline.includes("网上")) tags.push({ i: "mdi-web", c: "green", t: "网上" });
                // if (el.commercial && el.commercial.includes("有偿")) tags.push({ i: "mdi-currency-usd", c: "green darken-1", t: "有偿" });
                // if (el.commercial && el.commercial.includes("无偿")) tags.push({ i: "mdi-currency-usd-off", c: "green darken-1", t: "无偿" });
                el.tags = tags;
                return el;
            });
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
            api.realTimeMsgs().then(({ data }) => {
                this.data = data
            });
        },
        doReport () {
            api.reportIncorrect({
                type: "realTimeMsgs",
                cause: this.report.cause,
                content: this.report.content
            }).then(() => {
                this.snackbar = true;
                this.report.cause = ""
            }).finally(() => {
                this.report.enabled = false
            });
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
        regionalText (o) {
            // const suffix = [];
            // if (o.regional.includes("地方")) {
            //     if (o.province) suffix.push(o.province);
            //     if (o.city) suffix.push(o.city);
            //     if (o.suburb) suffix.push(o.suburb)

            //     return `（${suffix.join(" ")}）`
            // } else {
            //     return ""
            // }
        }
    },
}
</script>

<style lang="scss" scoped>
.card-border {
    border-top: 4px solid rgba(104, 172, 91, 0.7) !important;
}
.v-card__text > p {
    margin-bottom: 8px;
}
.card-subTitle {
  color: #999;
}
.card-content {
    text-align: justify;

    &:not([isShowMore="true"]) {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        position: relative;

        .showMore {
            text-align: right;
            color: #587bff;
            position: absolute;
            right: 0;
            bottom: 0;
            background: #fff;
          cursor: pointer !important;

            &:before {
                content: "";
                width: 3em;
                height: 100%;
                position: absolute;
                left: -3em;
                background: linear-gradient(90deg, transparent 0, #fff 100%);
            }
        }
    }
}
</style>
