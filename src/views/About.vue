
<template>
  <div class="about">
    <el-table :data="paginationData.tableList" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column prop="TITLE" label="标题" width="300">
      </el-table-column>
      <el-table-column  prop="RANK"  label="权重">
      </el-table-column>
      <el-table-column  prop="CREATEDATE"  label="发布时间">
      </el-table-column>
      <el-table-column  prop="DRAFTER"  label="发布人">
      </el-table-column>
    </el-table>
    <Pagination :paginationData="paginationData" :totalData="totalData"></Pagination>
  </div>
</template>

<script>
// @ is an alias to /src
import Pagination from '../components/Pagination'
import { request } from '../network/request'
export default {
  name: 'home',
  components: {
    Pagination
  },
  data () {
    return {
      tableData: [],
      paginationData: {
        pageSize: 20,
        currentPage: 1,
        tableList: [],
        handleSizeChange: val => {
          this.paginationData.pageSize = val
          this.paginationData.handleCurrentChange(this.paginationData.currentPage)
        },
        handleCurrentChange: val => {
          this.paginationData.currentPage = val
          this.paginationData.currentChangePage(this.paginationData.tableList, val, this.tableData)
        },
        currentChangePage (list, currentPage, data) {
          var that = this
          console.log(list, currentPage, data)
          let from = (currentPage - 1) * that.pageSize
          let to = currentPage * that.pageSize
          that.tableList = []
          for (; from < to; from++) {
            if (data[from]) {
              that.tableList.push(data[from])
            }
          }
        }
      },
      totalData: 10
    }
  },
  mounted: function () {
    var that = this
    request({
      url: 'web/urs/ptdt/jl'
    }).then(res => {
      that.tableData = res.data
      that.paginationData.tableList = that.tableData
      that.totalData = parseInt(res.code)
      console.log(that.paginationData.tableList[0])
      return that.tableData + that.totalData + that.paginationData.tableList
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
