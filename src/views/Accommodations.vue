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
                  {{ dialog.contact.name }}
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
    <v-card
      v-for="o in data"
      :key="o.name"
      class="mx-3 my-1"
    >
      <v-card-title>
        <span class="title">
          {{ o.name }}
        </span>
      </v-card-title>
      <v-card-text>
        <span class="subtitle-1">
          {{ o.province }} {{ o.city }} {{ o.suburb }}
        </span>
        <span class="float-right">
          床位数：{{ o.beds ? o.beds : "暂未知" }}<br>房间数：{{ o.room ? o.room : "暂未知" }}
        </span>
        <br>
      </v-card-text>
      <v-card-actions>
        <v-btn
          outlined
          @click="openDialog(o)"
        >
          联系方式
        </v-btn>
      </v-card-actions>
    </v-card>
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
      this.update()
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
