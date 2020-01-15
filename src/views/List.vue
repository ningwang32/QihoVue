
<template>
  <div class="list">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option v-for="item in formInline.selectOp" :key="item.id" size="small" :label="item.name"
            :value="item.id"></el-option>
          <!-- <el-option size="small" label="区域二" value="beijing"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="getsList(20,1)">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="paginationData.tableList" style="width: 100%" height="500" border
      :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column label="标题" prop="TITLE" width="300">
        <template slot-scope="scope">
            <div :title="scope.row.TITLE" class="td-title">
              {{ scope.row.TITLE  }}
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="RANK" label="权重" width="60">
      </el-table-column>
      <el-table-column prop="CREATEDATE" label="发布时间" width="160">
      </el-table-column>
      <el-table-column prop="DRAFTER" label="发布人" width="120">
      </el-table-column>
      <el-table-column prop="CONTENT" label="内容">
      </el-table-column>
    </el-table>
    <Pagination :paginationData="paginationData" :totalData="totalData"></Pagination>
  </div>
</template>

<script>
// @ is an alias to /src
import Pagination from '../components/Pagination'
//import ajax from '../network/request'
// import ListHeader from '../components/ListHeader/ListHeader.vue'
// import ListHeaderItem from '../components/ListHeader/ListHeaderItem.vue'
import { getsList } from '../network/request'
export default {
  name: 'home',
  components: {
    Pagination
  },
  data () {
    return {
      formInline: {
        user: '',
        region: '',
        selectOp: [
          { id: 1, name: '区域一' },
          { id: 2, name: '区域二' },
          { id: 3, name: '区域三' }
        ]
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
          this.getsList(this.paginationData.currentPage,val)
        },
        handleCurrentChange: val => {
          this.getsList(this.paginationData.pageSize,val)
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
    // var that = this
    // this.$axios({
    //   url: 'web/urs/ptdt/jl'
    // }).then(res => {
    //   that.tableData = res.data
    //   that.paginationData.tableList = that.tableData
    //   that.totalData = parseInt(res.code)
    //   return that.tableData + that.totalData + that.paginationData.tableList
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  created:function(){
    this.getsList(20,1)
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    goInfo () {
      this.$router.push('/info')
    },
    getsList(size,current){
      var that = this
      that.$ajax.posturl(
        "http://27.223.18.246:11310/web/urs/ptdt/jl?_anyline_page_rows=" +size +"&_anyline_page=" +current
      ).then(res => {
        var newData = new Array();
        that.tableData = res.data.data[0]
        
        newData = that.tableData;
        that.tableData.map(item => {
            var con = item.CONTENT
            item.CONTENT = con.replace(/<[^>]+>/g,"").replace(/&nbsp;/ig,"")
            return item
        })
        that.paginationData.tableList = that.tableData
        that.totalData = parseInt(res.data.data[1])
        return that.tableData + that.totalData + that.paginationData.tableList
      }).catch(err => {
        console.log(err)
      });
    }
  }
}
</script>
<style scoped>
.list .el-form-item {
  margin-right: 10px;
  font-size: 12px;
}
.list .el-form-item__label {
  color: #666;
  font-size: 12px;
}
.list-header-item .el-input {
  width: 200px;
}
.list .el-input__inner {
  height: 30px;
  padding: 0 10px;
  border-radius: 3px;
  font-size: 12px;
  line-height: 30px;
}
.el-select-dropdown .el-select-dropdown__item {
  font-size: 12px;
}
.list .el-button {
  height: 30px;
  line-height: 30px;
  color: #fff;
  padding: 0 10px;
  background: #37b0ff;
  font-size: 12px;
}
.list .el-table td,
.list .el-table th {
  padding: 0px;
}
.list .el-table .cell,.td-title{
  line-height: 30px;
  font-size: 12px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.list .el-table--border td,
.list .el-table--border th,
.list .el-table__body-wrapper .el-table--border.is-scrolling-left  ~ .el-table__fixed {
  border-color: #e6e6e6;
}
.list .el-table thead {
  color: #666;
}
.list .el-popover{
  padding: 0px 10px;
  line-height: inherit;
  font-size: 12px;
}
</style>
