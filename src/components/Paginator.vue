<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col cols="4">
      <v-btn
        outlined
        :small="xs"
        :disabled="page <= 1"
        block
        @click="$emit('change', page - 1)"
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
    >
      <span v-if="xs">
        第 {{ pagination.page }} / {{ pagination.pageCount }} 页
      </span>
      <span v-else>
        第 {{ pagination.page }} 页，共 {{ pagination.pageCount }} 页
      </span>
    </v-col>
    <v-col cols="4">
      <v-btn
        outlined
        :small="xs"
        :disabled="page >= pagination.pageCount"
        block
        @click="$emit('change', page + 1)"
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
      }
    },
    computed: {
      xs () {
        return this.$vuetify.breakpoint.xsOnly
      }
    }
  }
</script>

<style scoped>

</style>
