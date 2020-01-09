<template>
  <div class="pagination">
    <el-pagination
      @size-change="paginationData.handleSizeChange"
      @current-change="paginationData.handleCurrentChange"
      :current-page="paginationData.currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="paginationData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalData">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'pagination',
  props: {
    paginationData: {

    },
    totalData: {
      type: Number,
      default: 100
    }
  },
  methods: {
  },
  data () {
    return {
    }
  }
}
</script>
