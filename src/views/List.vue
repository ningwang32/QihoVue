
<template>
  <div class="list">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
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
// import ListHeader from '../components/ListHeader/ListHeader.vue'
// import ListHeaderItem from '../components/ListHeader/ListHeaderItem.vue'
import { request } from '../network/request'
export default {
  name: 'home',
  components: {
    Pagination
  },
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      // tableData: [],
      // headerItemData1: {
      //   lableName: '姓名',
      //   placeholder: '请输入姓名'
      // },
      // headerItemData2: {
      //   lableName: '手机号',
      //   placeholder: '请输入手机号'
      // },
      // headerItemData3: {
      //   lableName: '类别',
      //   placeholder: '请选择类别'
      // },
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
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
