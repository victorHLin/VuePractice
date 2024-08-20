<script setup>
import { defineProps } from 'vue'

defineProps(['orderCreated'])
</script>

<template>
  <div class="row justify-content-center">
    <div v-if="!orderCreated.id" class="alert alert-secondary text-center" role="alert">
      Order Not Created
    </div>
    <div v-else class="card">
      <div class="card-body">
        <div class="card-title">
          <h5>Order</h5>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Amount</th>
                <th scope="col">SubTotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in orderCreated.orders" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.amount }}</td>
                <td>${{ item.price * item.amount }}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-end">
            Comment: <span>{{ orderCreated.comment }}</span>
          </div>
          <div class="text-end">
            <h5>
              Total: <span>${{ orderCreated.total }}</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
