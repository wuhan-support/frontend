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
              v-for="[i, contact] in contacts.entries()"
              :key="i"
              v-bind="contact.link"
            >
              <v-list-item-avatar>
                <v-icon>
                  mdi-contact-phone
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ contact.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ contact.content }}
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
        医护人员免费住宿
      </h1>
      <v-card class="elevation-0">
        <v-card-text class="alertRedCardText white--text my-2">
          请注意：大多数住宿地点均要求各位携带相关证件（医护工作证 + 身份证）实名入住；请记得准备好上述证件后，致电相关住宿提供方确认空房情况哦～ 您辛苦啦～
        </v-card-text>
      </v-card>
      <!-- <p class="subtitle-1">
        图例：<v-icon
          small
        >
          mdi-bed-empty
        </v-icon> 表示床位剩余，<v-icon
          small
        >
          mdi-home-circle
        </v-icon> 表示房间剩余
      </p> -->
      <v-skeleton-loader
        :loading="$store.getters.ajaxLoading && !data.length"
        :types="{ skeleton: 'card, card, card, card' }"
        type="skeleton"
        transition="slide-y-transition"
      >
        <div>
          <v-row
            justify="space-between"
            align="center"
            class="mx-3 my-1"
          >
            <v-checkbox
              v-model="filters.available"
              hide-details
              class="d-inline-flex"
              label="只看有房"
            />
            <v-checkbox
              v-model="filters.linBaoRuZhu"
              hide-details
              class="d-inline-flex"
              label="不需自带三件套"
            />
          </v-row>
          <DataTable
            enable-geolocation
            :items="dataset"
          >
            <template v-slot:default="{ items }">
              <v-card
                v-for="[i, o] in items.entries()"
                :key="i"
                class="viewCard redBorder"
              >
                <span class="float-right surplusInfo">
                  <div class="content">
                    <template v-if="o.beds">
                      <span class="number">{{ o.beds }}</span>
                      剩余床位
                      <br>
                    </template>
                    <template v-if="o.room">
                      <span class="number">{{ o.room }}</span>
                      剩余房间
                    </template>

                    <template v-if="o.distance !== null">
                      <v-icon
                        class="mr-1"
                        small
                      >mdi-ruler</v-icon> {{ o.distance.toFixed(1) }}km
                    </template>
                  </div>
                  <v-icon class="bgIcon">wsicon wsicon-hotel</v-icon>
                </span>
                <v-card-title>
                  <span class="cardTitle font-weight-black">
                    {{ o.name }}
                  </span>
                </v-card-title>
                <v-card-text>
                  <span class="subtitle-4">
                    {{ o.province }} {{ o.city }} {{ o.suburb }}<br>地址：{{ o.address }}
                  </span>
                  <br>
                  <span
                    v-if="o.notes"
                    class="subtitle-2 red--text"
                  >
                    备注：{{ o.notes }}
                  </span>
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
                      @click="openDialog(o)"
                    >
                      <v-icon
                        class="iconRed"
                        left
                      >
                        wsicon wsicon-contact
                      </v-icon>联系方式
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
  import strings from "../../utils/strings";
  import DataTable from "../../components/DataTable";

  export default {
    name: "Accommodations",
    components: {DataTable},
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
      dataset() {
        let data = this.data.filter(el => el.name.length).map(el => {
          el.notes = el.notes ? el.notes.toString() : ""
          return el
        })
        if (this.filters.available) data = data.filter(el => !/住满|不接待|征用/.test(el.notes))
        if (this.filters.linBaoRuZhu) data = data.filter(el => !/([34三四])件套/.test(el.notes))
        return data
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
        api.accommodations().then(({data}) => {
          this.data = data
        })
      },
      doReport() {
        api.reportIncorrect({
          type: "accommodations",
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
        this.dialog.contact.name = o.contacts;
        this.dialog.contact.content = o.phone;
        this.dialog.address = o.address;
      },
      openReport(o) {
        this.report.enabled = true;
        this.report.content = JSON.stringify(o)
      }
    },
  }
</script>

<style>
.iconRed {
  color: #a20002 !important;
}
.redBorder {
  border-top: 4px solid #a20002 !important;
}
.viewCard {
  background: #FFFFFF;
  box-shadow: 0 3px 20px 0 rgba(0,0,0,0.10);
  border-radius: 4px;
  border-radius: 4px;
  margin-bottom: 20px;
  overflow: hidden;
}
.alertRedCardText {
  background: #a20002;
  font-size: 15px !important;
}
.cardTitle {
  font-family: PingFangSC-Medium, "PingFang SC", Roboto, sans-serif;
  font-size: 16px;
  color: #333E48;
  letter-spacing: 0;
}
.surplusInfo .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 20px;
  font-family: PingFangSC-Medium, "PingFang SC", Roboto, sans-serif;
  font-size: 14px;
  color: #333E48;
  letter-spacing: 0;
  text-align: center;
  min-height: 100px;
  z-index: 2;
}
.surplusInfo .number {
  font-family: DINPro-Bold, "SF Mono", Helvetica, Futura, sans-serif;
  font-weight: bolder;
  font-size: 20px;
  color: #a20002;
  letter-spacing: 1px;
  text-align: center;
}
.surplusInfo .bgIcon {
  position: absolute;
  top: 10px;
  right: -20px;
  font-size: 150px;
  color: #a20002;
  opacity: .05;
  z-index: 1;
}
</style>
