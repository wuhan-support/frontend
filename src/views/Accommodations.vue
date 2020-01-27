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
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  地址
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ dialog.address }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item :href="`tel://${dialog.contact.content}`">
              <v-list-item-content>
                <v-list-item-title>
                  {{ dialog.contact.name ? dialog.contact.name : "电话" }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ dialog.contact.content }}
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
      </v-card>
    </v-dialog>
    <v-col cols="12">
      <v-skeleton-loader
        v-if="!data.length"
        type="card@4"
      />
      <h1 class="heading mx-3">
        住宿信息
      </h1>
      <p class="subtitle-1 mx-3">
        图例：<v-icon
          small
        >
          mdi-bed-empty
        </v-icon> 表示床位剩余，<v-icon
          small
        >
          mdi-home-circle
        </v-icon> 表示房间剩余
      </p>
      <v-card
        v-for="[i, o] in data.filter(el => el.name.length).entries()"
        :key="i"
        class="mx-3 my-3 pb-2"
      >
        <v-card-title>
          <span class="title font-weight-black">
            {{ o.name }}
          </span>
        </v-card-title>
        <v-card-text>
          <span class="float-right ml-4">
            <v-icon
              class="mr-1"
              small
            >mdi-bed-empty</v-icon> {{ o.beds ? o.beds : "未知" }}
            <br>
            <v-icon
              class="mr-1"
              small
            >mdi-home-circle</v-icon> {{ o.room ? o.room : "未知" }}
          </span>
          <span class="subtitle-1">
            {{ o.province }} {{ o.city }} {{ o.suburb }}<br>地址：{{ o.address }}
          </span>
          <br>
          <span
            v-if="o.notes.length"
            class="subtitle-2 red--text"
          >
            备注：{{ o.notes }}
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
              mdi-map
            </v-icon>
            搜索高德地图
          </v-btn>
          <v-btn
            outlined
            color="green"
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
            color="error darken-1"
            @click="report(o)"
          >
            <v-icon>
              mdi-flag
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import api from "../apis/api";

  export default {
    name: "Accommodations",
    data () {
      return {
        data: [],
        dialog: {
          enabled: false,
          contact: {
            name: "",
            content: ""
          },
          address: ""
        }
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
          this.data = data["工作表1"]
        })
      },
      openDialog(o) {
        this.dialog.enabled = true;
        this.dialog.contact.name = o.contacts;
        this.dialog.contact.content = o.phone;
        this.dialog.address = o.address;
      }
    },
  }
</script>

<style scoped>

</style>
