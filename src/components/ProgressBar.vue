<script setup lang="ts">
interface Props {
  loaded: number;
  total: number;
  strokeWidth?: number;
}

const props = defineProps<Props>();

function progressHeight() : string | undefined {
  if (props.strokeWidth != undefined) {
    return `${props.strokeWidth}px`;
  }
  return undefined;
}

function getPercent(scale: number = 1) {
  if (props.total <= 0) {
    return 0;
  }
  return props.loaded * scale / props.total;
}
</script>

<template>
  <div class="progress">
    <a-progress class="progress-bar" size="large" :percent="getPercent()" :show-text="false" :stroke-width="strokeWidth" />
    <div class="progress-text">
      {{ loaded }}/{{ total }} ({{ getPercent(100).toFixed(2) }}%)
    </div>
  </div>
</template>

<style scoped>
.progress {
  position: relative;
  display: block;
  height: v-bind(progressHeight());
}

.progress-bar {
  position: absolute;
  left: 0;
  top: 0;
}

.progress-text {
  position: absolute;
  display: block;
  left: 0;
  top: 1px;
  width: 100%;
  font-size: smaller;
  text-align: center;
}
</style>
