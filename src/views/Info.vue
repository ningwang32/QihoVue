<template>
  <div>
    <el-button type="primary" @click="goBack">返回</el-button>
    <el-form ref="form" :model="form" label-width="80px">
      <div v-for="(item,index) in infoData" :key="index">
        <!-- 如果是text -->
        <el-form-item v-if="item.type=='text'" :label="item.name">
          <el-input v-model="item.value"></el-input>
        </el-form-item>
        <!-- 如果是select -->
        <el-form-item v-if="item.type=='select'" :label="item.name">
          <el-select v-model="form.region">
            <el-option :label="item.selectValue" :value="item.selectValue" v-for="(item,index) in item.value"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
        <!-- 滑动开关 -->
        <el-form-item v-if="item.type=='switch'" :label="item.name">
          <el-switch v-model="item.value"></el-switch>
        </el-form-item>
        <!-- 多选 -->
        <el-form-item v-if="item.type=='checkbox'" :label="item.name">
          <el-checkbox-group v-model="form.type">
            <el-checkbox v-for="(item,index) in item.value" :label="item.checkboxValue" name="type" :key="index">
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 单选 -->
        <el-form-item v-if="item.type=='radio'" :label="item.name">
          <el-radio-group v-model="form.resource">
            <el-radio :label="item.radioValue" v-for="(item,index) in item.value" :key="index"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="item.type=='textarea'" :label="item.name">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'info',
  components: {

  },
  data () {
    return {
      infoData: null,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  mounted () {
    axios
      .get("alalog/success.json")
      .then(response => {
        this.infoData = response.data.data
      })
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
li {
  list-style: none;
}
</style>