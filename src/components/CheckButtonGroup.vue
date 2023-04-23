<script setup lang="ts">
defineProps<{
  items: object
}>()
</script>

<template>
  <a-button-group size="small">
    <a-button v-for="(label, value) of items">
      {{ label }}
    </a-button>
  </a-button-group>
</template>