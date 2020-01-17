<template>
  <div id="demo-form">
    <el-button type="primary" @click="goBack">返回</el-button>
    <el-form ref="form" :model="form" label-width="80px">
      <div v-for="(item,index) in infoData" :key="index">
        <!-- 如果是text -->
        <el-form-item v-if="item.type=='text'" :label="item.name" :label-width="item.labelWidth">
          <el-input v-model="item.value" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <!-- text加图标 -->
        <el-form-item
          v-if="item.type=='=password'"
          :label="item.name"
          :label-width="item.labelWidth"
        >
          <el-input v-model="item.value" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <!-- 如果是select -->
        <el-form-item v-if="item.type=='select'" :label="item.name" :label-width="item.labelWidth">
          <el-select v-model="form.region">
            <el-option
              :label="item.selectValue"
              :value="item.selectValue"
              v-for="(item,index) in item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 滑动开关 -->
        <el-form-item v-if="item.type=='switch'" :label="item.name" :label-width="item.labelWidth">
          <el-switch v-model="item.value"></el-switch>
        </el-form-item>
        <!-- 多选 -->
        <el-form-item
          v-if="item.type=='checkbox'"
          :label="item.name"
          :label-width="item.labelWidth"
        >
          <el-checkbox-group v-model="form.type">
            <el-checkbox
              v-for="(item,index) in item.value"
              :label="item.checkboxValue"
              name="type"
              :key="index"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 单选 -->
        <el-form-item v-if="item.type=='radio'" :label="item.name" :label-width="item.labelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio :label="item.radioValue" v-for="(item,index) in item.value" :key="index"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 多行文本输入框 -->
        <el-form-item
          v-if="item.type=='textarea'"
          :label="item.name"
          :label-width="item.labelWidth"
        >
          <el-input type="textarea" v-model="form.desc" :rows="1" :autosize="{ minRows: 1}"></el-input>
        </el-form-item>
        <!-- 时间 -->
        <el-form-item
          v-if="item.type=='datetime'"
          :label="item.name"
          :label-width="item.labelWidth"
        >
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
      </div>

      <!-- 图片上传 -->
      <el-upload
        action="123"
        list-type="picture-card"
        :auto-upload="true"
        :file-list="addForm.files"
        :on-success="uploadSuccess"
        :before-upload="beforeAvatarUpload"
        :drag="true"
      >
        <!-- uploadSuccess 上传成功的钩子 -->
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
          <span class="el-upload-list__item-actions" @click="handlePictureCardPreview(file)">
            <span class="el-upload-list__item-preview">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <i class="el-icon-download"></i>
            </span>
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'info',
  components: {

  },
  data() {
    return {
      // 图片上传数据
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      // 
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
      },
      addForm: {
        files: [{ name: 'xxx.jpg', url: 'https://i04picsos.sogoucdn.com/eaf3429de82452cb' }, { name: 'xxx2.jpg', url: 'https://img04.sogoucdn.com/app/a/100520021/673b604374f9bf4d4984e31767be42d8' }]
      }
    }
  },
  mounted() {
    axios
      .get("alalog/success.json")
      .then(response => {
        this.infoData = response.data.data
      })
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    handleRemove(file) {
      for (var i in this.addForm.files) {
        this.addForm.files[i] == file ? this.addForm.files.splice(i, 1) : ""
        //
      }
      //delete file
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    uploadSuccess(response, file, fileList) {
      let files = { name: response, url: response };
      this.addForm.files.push(files);
    },
    // 上传成功之后的回调
    beforeAvatarUpload(file) {
      axios.post('http://file.qnlm.ac/up?token=hWHaBE0DqtCeLSiwZvXrAGiXpRELoufr', {
        file: file
      })
    }
  }
}
</script>
<style>
li {
  list-style: none;
}
#demo-form .line {
  text-align: center;
}
.el-upload > .el-upload-dragger {
  height: 148px;
  width: 148px;
}
</style>