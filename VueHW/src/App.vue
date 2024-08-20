<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/itemList">Item list</RouterLink> |
        <RouterLink to="/todo">Todo</RouterLink> |
        <RouterLink to="/">Order</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
