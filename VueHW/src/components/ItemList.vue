<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps(['items'])
const emit = defineEmits(['updateOrder'])
</script>

<template>
  <a
    href="#"
    class="list-group-item list-group-item-action"
    v-for="item in items"
    :key="item.id"
    @click="emit('updateOrder', item)"
    ><div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ item.title }}</h5>
      <small>${{ item.price }}</small>
    </div>
    <p class="mb-1">{{ item.description }}</p></a
  >
</template>
