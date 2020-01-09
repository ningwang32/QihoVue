<template>
  <div class="list-header-item">
    <div>
      <span>{{headerItemData.lableName}}</span>：
      <slot name="item-type">
        <el-input
          :placeholder="headerItemData.placeholder"
          v-model="headerItemData.labelType"
          size="small"
          clearable
        ></el-input>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listHeaderItem',
  components: {},
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'blue'
    },
    headerItemData: {
      labelType: {
        type: String,
        default: 'input'
      },
      placeholder: {
        type: String,
        default: '请输入'
      }
    }
  },
  data() {
    return {
      input: ''
    }
  },
  watch: {},
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    gogo() {
      this.$router.replace(this.path)
    }
  },
  created() { },
  mounted() { }
}
</script>
<style>
.list-header-item {
  display: inline-block;
  margin-right: 10px;
  font-size: 12px;
}
.list-header-item span {
  color: #666;
}
.list-header-item .el-input {
  width: 200px;
}
.list-header-item .el-input__inner {
  height: 30px;
  padding: 0 10px;
  border-radius: 3px;
  font-size: 12px;
}
</style>
