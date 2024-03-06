<script setup lang="ts">
import Navbar from '@/components/Navbar/Navbar.vue'
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.content">
      <Navbar />
      <router-view></router-view>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  position: fixed;
}

.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
}
</style>
