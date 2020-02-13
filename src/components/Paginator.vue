<template>
  <v-row
    align="center"
    justify="center"
  >
    <!--    <v-dialog :value="dialog.enabled" persistent max-width="300px">-->
    <!--      <v-card>-->
    <!--        <v-card-title>-->
    <!--          跳转到页面-->
    <!--        </v-card-title>-->
    <!--        <v-card-text>-->
    <!--          <div class="text-center mx-auto">-->
    <!--            现在在第 {{ pagination.page }} 页，共 {{ pagination.pageCount }} 页 <small>({{ pagination.itemsLength }} 条记录)</small>-->
    <!--          </div>-->
    <!--          跳转至<v-text-field v-model="dialog.page" dense hide-details type="number" placeholder="页面号码" />-->
    <!--        </v-card-text>-->
    <!--        <v-card-actions>-->
    <!--          <v-spacer />-->
    <!--          <v-btn text color="secondary" @click="dialog.enabled = false">-->
    <!--            关闭-->
    <!--          </v-btn>-->
    <!--          <v-btn text color="primary" @click="setPage">-->
    <!--            跳转-->
    <!--          </v-btn>-->
    <!--        </v-card-actions>-->
    <!--      </v-card>-->
    <!--    </v-dialog>-->
    <v-col cols="4">
      <v-btn
        outlined
        :disabled="page <= 1"
        block
        :large="large"
        @click="$emit('change', {page: page - 1, scroll})"
      >
        <v-icon left>
          mdi-chevron-left
        </v-icon>
        上页
      </v-btn>
    </v-col>
    <v-col
      cols="4"
      class="text-center"
      style="line-height: 1;"
    >
      <span v-if="sm">
        {{ pagination.page }} / {{ pagination.pageCount }} 页<br><span class="caption">(共 {{ pagination.itemsLength }} 条记录)</span>
      </span>
      <span v-else>
        第 {{ pagination.page }} 页，共 {{ pagination.pageCount }} 页 (共 {{ pagination.itemsLength }} 条记录)
      </span>
    </v-col>
    <v-col cols="4">
      <v-btn
        outlined
        :disabled="page >= pagination.pageCount"
        block
        :large="large"
        @click="$emit('change', {page: page + 1, scroll})"
      >
        下页
        <v-icon right>
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: "Paginator",
    props: {
      page: {
        type: Number,
        required: true
      },
      pagination: {
        type: Object,
        required: true
      },
      scroll: {
        type: Boolean,
        default () {
          return false
        }
      },
      large: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    data() {
      return {
        // dialog: {
        //   enabled: false,
        //   page: "",
        //   error: null
        // }
      }
    },
    computed: {
      sm () {
        return this.$vuetify.breakpoint.smAndDown
      }
    },
    watch: {
      pagination(n, o) {
        if (n.itemsLength !== o.itemsLength) {
          this.$emit('change', {
            page: 1,
            scroll: false
          })
        }
      }
    },
    methods: {
      // setPage() {
      //   const page = parseInt(this.dialog.page);
      //   if (Number.isInteger(page)) {
      //     if ()
      //   }
      // }
    }
  }
</script>

<style scoped>

</style>
