<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
export default defineComponent({
    setup() {
      const state = reactive({
        count: 0
      })
      return {
        ...toRefs(state)
      }
    }
})

</script>

<template>
  {{count}}
  <button @click="count++">点我</button>
  <p>index</p>
</template>

<style lang="less" scoped>
  button{
    width: 50px;
  }
</style>