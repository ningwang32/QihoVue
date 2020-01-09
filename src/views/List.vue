
<template>
  <div class="list">
    <list-header>
      <list-header-item :headerItemData="headerItemData1"></list-header-item>
      <list-header-item :headerItemData="headerItemData2"></list-header-item>
      <list-header-item :headerItemData="headerItemData3"></list-header-item>
    </list-header>
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
import ListHeader from '../components/ListHeader/ListHeader.vue'
import ListHeaderItem from '../components/ListHeader/ListHeaderItem.vue'
import { request } from '../network/request'
export default {
  name: 'home',
  components: {
    Pagination, ListHeader, ListHeaderItem
  },
  data () {
    return {
      tableData: [],
      headerItemData1: {
        lableName: '手机号',
        placeholder: '请输入手机号'
      },
      headerItemData2: {
        lableName: '手机号',
        placeholder: '请输入手机号'
      },
      headerItemData3: {
        lableName: '类别',
        placeholder: '请选择类别'
      },
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
