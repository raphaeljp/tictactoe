<script setup>
import { defineEmits, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits(['close'])

onMounted(() => document.body.style = 'overflow: hidden')
onBeforeUnmount(() => document.body.style = 'overflow: auto')
</script>

<template>
  <div class="c-dialog">
    <div class="dialog-backdrop" @click="emit('close')"></div>
    <div class="dialog-content">
      <slot name="dialog-body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-dialog {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;

  .dialog-backdrop {
    background-color: $clr-blue;
    height: 100%;
    opacity: 0.2;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  .dialog-content {
    background-color: $clr-white;
    border-radius: 8px;
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 30%);
    max-width: 600px;
    width: 90%;
    z-index: 2;
  }
}
</style>