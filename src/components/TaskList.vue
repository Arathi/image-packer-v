<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTaskStore } from '../stores/TaskStore';
import TaskInfo from './TaskInfo.vue';

const taskStore = useTaskStore();

const { tasks, filter } = storeToRefs(taskStore);

const props = defineProps<{
  maxHeight: number;
}>();
</script>

<template>
  <div class="task-list">
    <template v-if="tasks.length == 0">
      <a-empty />
    </template>

    <template v-if="tasks.length > 0">
      <template v-for="task in tasks">
        <task-info :task="task" v-if="filter.find((status) => status == task.status)" />
      </template>
    </template>
  </div>
</template>

<style scoped>
.task-list {
  height: v-bind(maxHeight + "px");
  overflow: auto;
}
</style>