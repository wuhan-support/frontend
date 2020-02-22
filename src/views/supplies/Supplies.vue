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

            <v-list-item
              v-for="[i, contact] in contacts.entries()"
              :key="i"
              v-bind="contact.link"
            >
              <v-list-item-avatar>
                <v-icon>mdi-contact-phone</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ contact.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ contact.content }}</v-list-item-subtitle>
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
                联系人：{{ dialog.contact.name }}
                <br>
                电话：{{ dialog.contact.content }}
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
            医疗机构物资需求 — 需求列表
          </div>
          <br>
          <div
            class="headline font-weight-bold d-block"
            style="width: 100%"
          >
            {{ supplies.content.name }}
          </div>
        </v-card-title>
        <v-card-text>
          <v-row
            align="start"
            justify="start"
          >
            <v-col
              v-for="[index, supply] in supplies.content.supplies.entries()"
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
                    <small>#{{ index + 1 }}</small>
                    <span class="font-weight-bold">{{ supply.n }}</span>
                  </div>
                  <div v-if="supply.abbr">
                    又名：{{ supply.abbr }}
                  </div>
                  <div
                    class="font-weight-bold red--text"
                    :class="{'display-1': typeof supply.a === 'number', 'headline': typeof supply.a !== 'number'}"
                  >
                    {{ typeof supply.a === "number" ? `&times; ${supply.a.toLocaleString()} ${supply.u ? supply.u : ''}` : supply.a }}
                  </div>
                  <div v-if="supply.r">
                    物资要求：
                    <span class="font-weight-bold">{{ supply.r }}</span>
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

    <v-col
      cols="12"
      class="mx-3"
    >
      <h1 class="heading">
        医疗机构物资需求
      </h1>
      <v-card class="elevation-0">
        <v-card-text class="subtitle-1 red font-weight-bold white--text my-2">
          本列表中的所有医院均存在
          <span class="font-weight-black title">非常紧急</span>的物资缺口状况，急需社会各界紧急援助！若您身边有相关资源（包括物流资源、消耗品资源等）请速与这些医院进行联系！
        </v-card-text>
      </v-card>
      <v-card class="elevation-0">
        <v-card-text
          class="subtitle-2 green white--text my-2"
        >
          为保证需求真实性，本列表中大部分数据均通过【真人电话/微信视频/带相片工作证照片/医院官方电话】的方式核验联系人信息；同时已通过标签方式标明需求核验状况，便于各位捐赠者查验
        </v-card-text>
      </v-card>

      <v-card class="elevation-0">
        <v-card-text class="caption grey white--text my-2">
          若您发现信息有不完整、已过期等情况，请点击相应数据卡片右下角的
          <v-icon
            small
            color="grey lighten-3"
            style="margin-top: -4px;"
          >
            mdi-file-document-box-remove
          </v-icon>纠错按钮发起纠错请求，我们将再次与医院进行二次审核，以保证消息时效性。
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
                    class="mb-2"
                    :class="{'darken-1 white--text': o.meta.urge <= 1, 'red red-breathe': o.meta.urge === 0, 'deep-orange warning-breathe': o.meta.urge === 1, 'grey lighten-3': o.meta.urge >= 2}"
                    :style="{'animation-delay': `-${i * 0.75}s`}"
                  >
                    <span class="title font-weight-black">
                      <small class="font-weight-regular">#{{ o._index + 1 }}</small>
                      {{ o.urge === '裸奔' ? "[库存为零] ": "" }}{{ o.name }}
                    </span>
                  </v-card-title>
                  <span class="float-right surplusInfo">
                    <div class="content">
                      <template v-if="o.supplies.length">
                        <span class="number">{{ o.supplies.length }}种</span>
                        种类
                        <br>
                      </template>
                      <template v-if="o.suppliesCount">
                        <span
                          class="number"
                        >{{ o.suppliesCount }}{{ o.suppliesCountBias ? "+" : "" }}</span>
                        数量
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
                      地址：{{ o.address ? o.address : "（暂无详细地址，可点击下方搜索）" }}
                    </div>

                    <div
                      v-if="o.alert"
                      class="caption red--text"
                    >
                      特别备注：{{ o.alert }}
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
                        {{ o.address ? "查看" : "搜索" }}地图
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
                      :disabled="!o.supplies.length"
                      @click="() => {supplies.enabled = true; supplies.content = o}"
                    >
                      <v-divider style="opacity: 0.3" />
                      <span class="mx-4">
                        <v-icon left>mdi-fullscreen</v-icon>
                        展开详细需求{{ o.supplies.length ? "" : " (无需求数据)" }}
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
        <a
          href="https://mp.weixin.qq.com/s/U_IAuov_AR13S87cJYjlSg"
          target="_blank"
          style="text-decoration: none"
        >WeStar 公益团队</a>
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
          content: ""
        },
        address: ""
      },
      report: {
        enabled: false,
        cause: "",
        causes: [
          "地址不存在/未找到",
          "联系不上医院方",
          "物资被拒收或拦截",
          "物资已够用",
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
      // const sortMap = {
      //   urge: {
      //     '裸奔': 0,
      //     '紧缺': 1,
      //     '': 2  // 匹配没有填入 urge 的情况；必要
      //   },
      //   trueness: {
      //     "已核实": 0,
      //     "待核实": 1
      //   }
      // };

      const suppliesMap = {
        "n95口罩（9132/1860）": {
          n: "医用防护口罩",
          abbr: "N95",
          u: "个",
          r: "符合或高于标准 GB19083-2010"
        },
        医用外科口罩: {
          n: "医用外科口罩",
          abbr: "医用手术口罩",
          u: "个",
          r: "符合或高于标准 YY0469-2011"
        },
        医用防护口罩: {
          n: "一次性使用医用口罩",
          abbr: "医用防护口罩",
          u: "个",
          r: "符合或高于标准 YY/T 0969-2013"
        },
        防护服: {
          n: "医用一次性防护服",
          u: "个",
          r: "符合或高于标准 GB19082-2009"
        },
        护目镜: {
          n: "个人用眼护具",
          abbr: "护目镜",
          u: "副",
          r: "符合或高于标准 GB14866-2006"
        },
        医用手套: {
          n: "一次性使用医用橡胶检查手套",
          abbr: "医用手套",
          u: "双",
          r: "符合或高于标准 GB10213-2006"
        },
        手术衣: {
          n: "手术衣",
          u: "个",
          r: "符合或高于标准 YY/T 0506.2-2016"
        },
        鞋套: {
          u: "个"
        },
        面罩: {
          u: "个"
        }
      };

      return this.data
        .map(el => {
          const result = {
            supplies: [],
            suppliesCount: 0,
            suppliesCountBias: false
          };

          for (const [key, value] of Object.entries(el)) {
            if (value === "　") continue;
            const keys = key.split(" ");
            if (keys.length === 2) {
              // information
              result[keys[0]] = value;
            } else {
              // supplies list
              if (value) {
                const amount = value === "Y" ? "需要" : value;
                if (key in suppliesMap) {
                  const merged = Object.assign(
                    {
                      n: key,
                      a: amount
                    },
                    suppliesMap[key]
                  );
                  result.supplies.push(merged);
                } else {
                  result.supplies.push({
                    n: key,
                    a: amount
                  });
                }

                if (typeof value === "number") {
                  result.suppliesCount += value;
                } else {
                  result.suppliesCountBias = true;
                }
              }
            }
          }

          if (!result.urge) result.urge = "";

          return result;
        })
        .map(el => {
          el.tags = [];
          el.meta = {};
          if (
            !(
              !el.trueness ||
              el.trueness.includes("未") ||
              el.trueness.includes("需确认")
            )
          ) {
            if (el.trueness === "已核实" || el.trueness === "核实") {
              el.tags.push({ c: "green", t: `已核实` });
            } else {
              el.tags.push({ c: "green", t: `已核实：${el.trueness}` });
            }
            el.meta.trueness = 0;
          } else if (el.trueness) {
            el.tags.push({ c: "grey", t: `${el.trueness}` });
            el.meta.trueness = 1;
          } else {
            el.tags.push({ c: "grey", t: `暂未与官方核实` });
            el.meta.trueness = 1;
          }

          if (el.urge) {
            if (el.urge === "裸奔") {
              el.tags.push({ c: "red darken-2", t: "非常紧急：库存为零" });
              el.meta.urge = 0;
            } else if (el.urge === "紧缺") {
              el.tags.push({ c: "red", t: "紧缺" });
              el.meta.urge = 1;
            } else {
              el.tags.push({ c: "deep-orange", t: el.urge });
              el.meta.urge = 2;
            }
          } else {
            el.meta.urge = 3;
          }

          return el;
        })
        .sort(function(a, b) {
          return a.meta.urge - b.meta.urge;
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
      api.supplies().then(({ data }) => {
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
      this.dialog.contact.content = o.phone;
      this.dialog.address = o.address ? o.address : "暂无详细地址，可点击搜索";
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
