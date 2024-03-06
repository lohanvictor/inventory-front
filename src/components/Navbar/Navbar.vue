<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts"></script>

<template>
  <div :class="$style.wrapper">
    <h1 :class="$style.title">My Inventory</h1>

    <div :class="$style['nav-wrapper']">
      <RouterLink :class="$style.link" to="/home">Home</RouterLink>
      <RouterLink :class="$style.link" to="/search">Procurar albums</RouterLink>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;

  .title {
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
  }

  .nav-wrapper {
    display: flex;
    gap: 32px;
    align-items: center;

    .link {
      text-decoration: none;
      color: #fff;
    }
  }
}
</style>
