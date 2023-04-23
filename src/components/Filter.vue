<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/TaskStore";

const taskStore = useTaskStore();
const { filter } = storeToRefs(taskStore);
</script>

<template>
  <a-checkbox-group v-model="filter">
    <a-checkbox value="pending">等待中</a-checkbox>
    <a-checkbox value="downloading">下载中</a-checkbox>
    <a-checkbox value="success">成功</a-checkbox>
    <a-checkbox value="failure">失败</a-checkbox>
  </a-checkbox-group>
</template>
