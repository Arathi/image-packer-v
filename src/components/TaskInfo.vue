<script setup lang="ts">
import ProgressBar from './ProgressBar.vue';
import { Task, useTaskStore} from '../stores/TaskStore';

defineProps<{
  task: Task
}>();

const taskStore = useTaskStore();
</script>

<template>
  <a-row class="task-info">
    <a-col flex="64px">
      {{ task.fileName }}
    </a-col>
    <a-col flex="auto">
      <progress-bar :loaded="task.loaded" :total="task.total" :stroke-width="16"></progress-bar>
    </a-col>
  </a-row>
</template>

<style scoped>
.task-info {
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>