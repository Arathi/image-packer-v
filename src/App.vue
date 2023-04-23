<script setup lang="ts">
import { ref } from 'vue';
import ProgressBar from './components/ProgressBar.vue';
import Filter from './components/Filter.vue';
import TaskList from './components/TaskList.vue';
import { unsafeWindow } from '$';
import { ITask, useTaskStore } from './stores/TaskStore';
import TelegraphAdapter from './adapters/TelegraphAdapter';

const appWindowHeight = ref(unsafeWindow.innerHeight - 36);

const statuses = {
  "pending": "等待",
  "submitted": "已提交",
  "created": "已创建",
  "downloading": "执行中",
  "success": "成功",
  "failure": "失败",
};

const taskStore = useTaskStore();

const adapter = new TelegraphAdapter();

unsafeWindow.addEventListener('resize', () => {
  console.info(`窗体大小发生变化：${unsafeWindow.innerWidth} x ${unsafeWindow.innerHeight}`);
  appWindowHeight.value = unsafeWindow.innerHeight - 36;
});

function createTasks() {
  console.info("点击创建任务");
  const appends = adapter.generateTasks();
  taskStore.addTasks(...appends);
}
</script>

<template>
  <div class="imgpk-app">
    <!-- 按钮区 -->
    <a-row class="imgpk-app-row">
      <a-col :span="24">
        <a-space>
          <a-button @click="createTasks">生成任务</a-button>
          <a-button>开始下载</a-button>
          <a-button>开始打包</a-button>
        </a-space>
      </a-col>
    </a-row>

    <!-- 总进度条 -->
    <a-row class="imgpk-app-row">
      <a-col :span="24">
        <progress-bar :loaded="66" :total="1011" :stroke-width="16" />
      </a-col>
    </a-row>

    <!-- 任务状态过滤器 -->
    <a-row class="imgpk-app-row">
      <a-col :span="24">
        <Filter />
      </a-col>
    </a-row>

    <!-- 任务列表 -->
    <a-row class="imgpk-app-row">
      <a-col :span="24">
        <task-list :max-height="appWindowHeight - 92"/>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.imgpk-app {
  position: fixed;
  width: 400px;
  height: v-bind(appWindowHeight + 'px');
  top: 10px;
  left: 10px;
  border-width: 2px;
  background-color: oldlace;
  border-color: black;
  padding: 8px;
  opacity: 0.90;
}

.imgpk-app-row {
  margin-bottom: 8px;
}
</style>