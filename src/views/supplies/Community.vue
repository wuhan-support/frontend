<template>
  <v-row
    align="center"
    justify="center"
  >
    <!-- 感谢支持，已提交纠错信息 -->
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
      </v-icon>感谢支持，已提交纠错信息
      <v-spacer />
    </v-snackbar>
    <v-dialog
      v-model="dialog.enabled"
      max-width="450px"
    >
      <v-card>
        <v-card-title>联系方式</v-card-title>
        <v-card-text>
          <v-list two-line>
            <v-list-item
              :href="`https://ditu.amap.com/search?query=${encodeURIComponent(dialog.address)}`"
            >
              <v-list-item-avatar>
                <v-icon>mdi-map</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>地址</v-list-item-title>
                <v-list-item-subtitle>{{ dialog.address }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <!--            <v-list-item-->
            <!--              v-if="dialog.contact.content.agentcontactphone"-->
            <!--              :href="`tel://${dialog.contact.content.agentcontactphone}`"-->
            <!--            >-->
            <!--              <v-list-item-avatar>-->
            <!--                <v-icon>mdi-contact-phone</v-icon>-->
            <!--              </v-list-item-avatar>-->
            <!--              <v-list-item-content>-->
            <!--                <v-list-item-title>(联系人)</v-list-item-title>-->
            <!--                <v-list-item-subtitle>{{ dialog.contact.content.agentcontactphone || "" }}</v-list-item-subtitle>-->
            <!--              </v-list-item-content>-->
            <!--              <v-list-item-action>-->
            <!--                <v-icon>mdi-phone</v-icon>-->
            <!--              </v-list-item-action>-->
            <!--            </v-list-item>-->

            <v-list-item :href="`tel://${dialog.contact.content.contactphone}`">
              <v-list-item-avatar>
                <v-icon>mdi-contact-phone</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ dialog.contact.content.name || "" }}</v-list-item-title>
                <v-list-item-subtitle>{{ dialog.contact.content.contactphone || "" }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-btn
            outlined
            small
            @click="dialog.forced = !dialog.forced"
          >
            {{ dialog.forced ? "收起" : "排版有误？" }}
          </v-btn>
          <v-expand-transition>
            <div v-if="dialog.forced">
              <v-divider class="my-3" />
              <h2 class="subtitle-1">
                以下是未经排版的数据
              </h2>
              <div>
                提交人：{{ dialog.contact.content.name || "" }}<br>
                电话：{{ dialog.contact.content.contactphone || "" }}
                <!--                <br>-->
                <!--                联系人：{{ dialog.contact.content.agentname || "" }}<br>-->
                <!--                联系人电话：{{ dialog.contact.content.agentcontactphone || "" }}-->
              </div>
            </div>
          </v-expand-transition>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="closeDialog"
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
        <v-card-title>提交纠错</v-card-title>
        <v-card-text>
          <v-select
            v-model="report.cause"
            label="错误类型"
            placeholder="请选择错误类型"
            :items="report.causes"
            filled
            hide-details
            class="mb-2"
          />收到纠错请求后我们会再次审核此条信息以保证准确性。
          <br>
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

    <v-dialog
      v-model="supplies.enabled"
      overlay-opacity="0.9"
      scrollable
      max-width="calc(max(450px, 80vw))"
    >
      <v-card v-if="supplies.enabled">
        <v-card-title
          class="white--text pb-4 elevation-2"
          style="background: #a14042; line-height: 1.1;"
        >
          <div
            class="overline d-block"
            style="width: 100%"
          >
            社区物资需求 — 需求详细信息
          </div>
          <br>
          <div
            class="headline font-weight-bold d-block"
            style="width: 100%"
          >
            {{ supplies.content.address }}
          </div>
        </v-card-title>
        <v-card-text>
          <v-row
            v-if="supplies.content.medicalsupplies"
            align="start"
            justify="start"
            class="pt-3"
          >
            <v-col
              cols="12"
              class="pa-0"
            >
              <v-subheader>
                医疗物资需求
              </v-subheader>
            </v-col>
            <v-col
              v-for="[index, supply] in supplies.content.medicalsupplies.entries()"
              :key="supply.n"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
              class="align-self-stretch"
            >
              <v-card style="border: 2px solid #cf5355; height: 100%">
                <v-card-text>
                  <div class="title">
                    <small>#{{ index + 1 }}</small>&nbsp;
                    <span class="font-weight-bold">{{ supply.name }}</span>
                  </div>
                  <div
                    v-if="supply.need"
                    class="font-weight-bold red--text display-1"
                  >
                    <small>需要</small> {{ `&times; ${supply.need} ${supply.unit ? supply.unit : ''}` }}
                  </div>
                  <div
                    v-if="supply.daily"
                    class="font-weight-bold red--text title"
                  >
                    <small>每日消耗</small> {{ `&times; ${supply.daily} ${supply.unit ? supply.unit : ''}` }}
                  </div>
                  <div
                    v-if="supply.have"
                    class="font-weight-bold red--text title"
                  >
                    <small>现剩余</small> {{ `&times; ${supply.have} ${supply.unit ? supply.unit : ''}` }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row
            v-if="supplies.content.livesupplies"
            align="start"
            justify="start"
          >
            <v-col
              cols="12"
              class="pa-0"
            >
              <v-subheader>
                生活物资需求
              </v-subheader>
            </v-col>
            <v-col
              v-for="[index, supply] in supplies.content.livesupplies.entries()"
              :key="supply.n"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
              class="align-self-stretch"
            >
              <v-card style="border: 2px solid #cf5355; height: 100%">
                <v-card-text>
                  <div class="title">
                    <small>#{{ index + 1 }}</small>&nbsp;
                    <span class="font-weight-bold">{{ supply.name }}</span>
                  </div>
                  <div
                    v-if="supply.need"
                    class="font-weight-bold red--text display-1"
                  >
                    <small>需要</small> {{ `&times; ${supply.need} ${supply.unit ? supply.unit : ''}` }}
                  </div>
                  <div
                    v-if="supply.have"
                    class="font-weight-bold red--text title"
                  >
                    <small>现剩余</small> {{ `&times; ${supply.have} ${supply.unit ? supply.unit : ''}` }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="elevation-2">
          <v-btn
            text
            color="#a20002"
            block
            large
            @click="supplies.enabled = false"
          >
            <v-divider style="opacity: 0.3" />
            <span class="mx-4">
              <v-icon left>mdi-close</v-icon>收起详细需求
            </span>
            <v-divider style="opacity: 0.3" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn
      fixed
      fab
      bottom
      right
      color="primary"
      :to="{name: 'CommunitySuppliesSubmission'}"
    >
      <v-icon>
        mdi-file-plus
      </v-icon>
    </v-btn>

    <v-col
      cols="12"
      class="mx-3"
    >
      <h1 class="heading">
        社区物资需求列表
      </h1>
      <v-card class="elevation-0">
        <v-card-text class="subtitle-1 warning font-weight-bold white--text my-2">
          本列表中信息均为各用户自行上传，请自行验证真伪。
        </v-card-text>
      </v-card>

      <v-card class="elevation-0">
        <v-card-text class="caption grey white--text my-2">
          若您发现信息有不准确、甚至违法违规等情况，请点击相应数据卡片右下角的
          <v-icon
            small
            color="grey lighten-3"
            style="margin-top: -4px;"
          >
            mdi-file-document-box-remove
          </v-icon>纠错按钮发起纠错请求，我们将审核消息是否正常；同时请发布者放心：我们不会无缘无故删除您的物资请求提交。
        </v-card-text>
      </v-card>

      <!--      <v-card class="elevation-0">-->
      <!--        <v-row-->
      <!--          align="center"-->
      <!--          justify="center"-->
      <!--        >-->
      <!--          <v-col cols="4">-->
      <!--            总计种类<br>{{ data ? Object.keys(this.data[0]).length : "" }}-->
      <!--          </v-col>-->
      <!--          <v-col cols="4">-->
      <!--            总计数量<br>{{ stats }}-->
      <!--          </v-col>-->
      <!--          <v-col cols="4">-->
      <!--            总计医院<br>{{ data ? this.data.length : "" }}-->
      <!--          </v-col>-->
      <!--        </v-row>-->
      <!--      </v-card>-->

      <v-skeleton-loader
        :loading="$store.getters.ajaxLoading && !data.length"
        :types="{ skeleton: 'card, card, card, card' }"
        type="skeleton"
        transition="slide-y-transition"
      >
        <DataTable :items="dataset">
          <template v-slot:default="{ items }">
            <v-row>
              <v-col
                v-for="[i, o] in items.entries()"
                :key="i"
                cols="12"
                sm="6"
                md="6"
                lg="4"
                xl="3"
              >
                <v-card
                  class="viewCard"
                  :class="{'redBorder pb-0': o.meta.urge >= 2}"
                >
                  <v-card-title
                    class="mb-2 grey lighten-3 title"
                  >
                    <small class="mr-2">#{{ o._index + 1 }}</small> {{ o.address }}
                  </v-card-title>
                  <span class="float-right surplusInfo">
                    <div class="content">
                      <template v-if="o.medicalsupplies">
                        <span class="number">&times;{{ o.medicalsupplies.length }}</span>
                        <span>医疗物资<small>需求</small></span>
                      </template>
                      <template v-if="o.livesupplies">
                        <span class="number">&times;{{ o.livesupplies.length }}</span>
                        <span>生活物资<small>需求</small></span>
                      </template>
                    </div>
                    <v-icon class="bgIcon">wsicon wsicon-hospital</v-icon>
                  </span>
                  <v-card-text class="pt-0 pb-6 card-min-height">
                    <template v-if="o.tags.length">
                      <v-chip
                        v-for="tag in o.tags"
                        :key="tag.t"
                        label
                        class="ma-1 font-weight-bold white--text"
                        small
                        :color="tag.c"
                      >
                        {{ tag.t }}
                      </v-chip>
                    </template>

                    <div class="subtitle-1 mt-3">
                      {{ o.province }} {{ o.city }}
                    </div>

                    <div class="subtitle-2">
                      地址：{{ o.address }}
                    </div>

                    <div
                      v-if="o.notes"
                      class="caption deep-orange--text"
                    >
                      备注：{{ o.notes }}
                    </div>
                  </v-card-text>
                  <v-divider />
                  <v-card-actions>
                    <v-col class="text-center d-flex justify-space-between">
                      <v-btn
                        text
                        :href="`https://ditu.amap.com/search?query=${encodeURIComponent(o.name)}`"
                        target="_blank"
                      >
                        <v-icon
                          class="iconRed"
                          left
                        >
                          wsicon wsicon-local
                        </v-icon>
                        查看地图
                      </v-btn>
                      <v-btn
                        text
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
                        text
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
                  <v-divider />
                  <v-card-actions>
                    <v-btn
                      text
                      color="#a20002"
                      block
                      large
                      @click="() => {supplies.enabled = true; supplies.content = o}"
                    >
                      <v-divider style="opacity: 0.3" />
                      <span class="mx-4">
                        <v-icon left>mdi-fullscreen</v-icon>
                        展开详细需求
                      </span>
                      <v-divider style="opacity: 0.3" />
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </DataTable>
      </v-skeleton-loader>
      <div class="text-right grey--text overline mt-4">
        此页面数据合作方
        <br>
        网站内提交系统
      </div>
    </v-col>
  </v-row>
</template>

<script>
import api from "../../apis/api";
import strings from "../../utils/strings";
import DataTable from "../../components/DataTable";

export default {
  name: "Supplies",
  components: { DataTable },
  data() {
    return {
      data: [],
      show: {},
      snackbar: false,
      dialog: {
        enabled: false,
        forced: false,
        contact: {
          name: "",
          content: {}
        },
        address: ""
      },
      report: {
        enabled: false,
        cause: "",
        causes: [
          "联系不上需求人",
          "物资已不需要",
          "地址错误",
          "物资被拦截",
          "信息重复",
          "其他"
        ],
        content: ""
      },
      supplies: {
        enabled: false,
        content: {}
      }
    };
  },
  computed: {
    dataset() {
      return this.data
        .map(el => {
          el.tags = [];
          el.meta = {};
          if (el.age <= 6) el.tags.push({ c: "deep-orange darken-2", t: `婴儿 (${el.age} 岁)` });
          if (el.age > 6 && el.age < 18) el.tags.push({ c: "deep-orange darken-2", t: `未成年人 (${el.age} 岁)` });
          if (el.age > 65) el.tags.push({ c: "deep-orange darken-2", t: `老人 (${el.age} 岁)` });

          return el;
        });
    },
    xs() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    contacts() {
      return strings.contacts(
        this.dialog.contact.name,
        this.dialog.contact.content,
        "、"
      );
    }
  },
  beforeMount() {
    if (!this.data.length) {
      this.update();
    }
  },
  methods: {
    update() {
      api.communitySupplies().then(({ data }) => {
        this.data = data;
      });
    },
    // showOrHideCard(o) {
    //   if (this.show[o.name]) {
    //     this.show[o.name] = !this.show[o.name]
    //   } else {
    //     this.$set(this.show, o.name, true)
    //     // this.show = Object.assign(this.show, {[o.name]: true})
    //   }
    // },
    doReport() {
      api
        .reportIncorrect({
          type: "supplies",
          cause: this.report.cause,
          content: this.report.content
        })
        .then(() => {
          this.snackbar = true;
          this.report.cause = "";
        })
        .finally(() => {
          this.report.enabled = false;
        });
    },
    openDialog(o) {
      this.dialog.enabled = true;
      this.dialog.contact.name = o.contact;
      this.dialog.contact.content = o;
      this.dialog.address = o.address;
    },
    openReport(o) {
      this.report.enabled = true;
      this.report.content = JSON.stringify(o);
    },
    closeDialog() {
      this.dialog.enabled = false;
      this.dialog.forced = false;
    }
  }
};
</script>

<style scoped>
.card-border {
  border-top: 4px solid rgba(226, 82, 66, 1) !important;
}
.red-breathe {
  animation: red-breathe 5s ease-in-out alternate infinite;
}

@keyframes red-breathe {
  from {
    background: #a93c33;
  }
  to {
    background: #65201d;
  }
}

.warning-breathe {
  animation: warning-breathe 5s ease-in-out alternate infinite;
}

@keyframes warning-breathe {
  from {
    background: #cc7400;
  }
  to {
    background: #663c00;
  }
}

.surplusInfo .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 20px;
  font-family: PingFangSC-Medium, "PingFang SC", Roboto, sans-serif;
  font-size: 14px;
  color: #333e48;
  letter-spacing: 0;
  text-align: center;
  min-height: 100px;
  z-index: 2;
}
.card-min-height {
  min-height: 130px;
}
</style>
