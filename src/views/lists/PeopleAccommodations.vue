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
        武汉在外人员住宿
      </h1>
      <!--      <v-card>-->
      <!--        <v-card-text class="subtitle-2 green white&#45;&#45;text mt-2 mb-4">-->
      <!--          提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字-->
      <!--        </v-card-text>-->
      <!--      </v-card>-->
      <!-- <p class="subtitle-1">
                图例：<v-icon small>
                    mdi-bed-empty
                </v-icon> 表示床位剩余，<v-icon small>
                    mdi-home-circle
                </v-icon> 表示房间剩余
            </p> -->
      <v-skeleton-loader
        :loading="$store.getters.ajaxLoading && !data.length"
        :types="{ skeleton: 'card, card, card, card' }"
        type="skeleton"
        transition="slide-y-transition"
      >
        <DataTable
          search-text="住宿名称、地址"
          :items="dataset"
        >
          <template v-slot:default="{ items }">
            <v-card
              v-for="[i, o] in items.entries()"
              :key="i + '' + o.name"
              class="viewCard redBorder"
            >
              <v-card-title>
                <span class="title font-weight-black">
                  {{ o.name ? o.name : o.address }}
                </span>
              </v-card-title>
              <v-card-text>
                <div
                  v-if="o.status"
                  class="subtitle-1 font-weight-bold"
                >
                  状态：{{ o.status }}
                </div>
                <div class="subtitle-2 mb-2">
                  {{ o.province }} {{ o.city }} {{ o.suburb }}；地址：{{ o.address ? o.address : "暂无。可点击下方【查看地图】前往查看地址" }}
                </div>
                <div
                  v-if="o.tags"
                  class="subtitle-2"
                >
                  备注：{{ o.tags }} {{ o.conditions ? o.conditions : "" }}
                </div>
                <div
                  class="subtitle-2"
                >
                  联系电话：{{ o.phone ? o.phone : "暂无。可点击下方【查看地图】前往查看电话" }}
                </div>
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-col class="text-center d-flex justify-space-between">
                  <v-btn
                    tile
                    small
                    text
                    :href="`https://ditu.amap.com/search?query=${encodeURIComponent(o.name)}`"
                    target="_blank"
                  >
                    <v-icon
                      class="iconRed"
                      left
                    >
                      wsicon wsicon-local
                    </v-icon>查看地图
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
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import api from "../../apis/api";
import DataTable from "../../components/DataTable";

export default {
    name: "MedicalPlatforms",
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
              el.tags = el.tags ? el.tags.replace(el.conditions, "") : null;
              if (el.tags && el.tags.length === 0) el.tags = null;
              return el
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
            api.peopleAccommodations().then(({ data }) => {
                this.data = data
            })
        },
        doReport () {
            api.reportIncorrect({
                type: "peopleAccommodations",
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
        openReport (o) {
            this.report.enabled = true;
            this.report.content = JSON.stringify(o)
        }
    },
}
</script>

<style scoped>
.card-border {
    border-top: 4px solid rgba(0, 0, 0, 0.5) !important;
}
</style>
