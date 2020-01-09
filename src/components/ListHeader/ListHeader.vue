<template>
  <div id="list-header">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'listheader',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style scoped>
  #tab-bar{
    background: #ccc;
    position: fixed;
    bottom: 0;
    text-align: center;
    width: 100%;
  }

  #tab-bar div{
    padding: 0 20px;
    display: inline-block;
  }
</style>
