<script setup>
import { ref, defineProps, defineEmits } from 'vue'

defineProps(['orders', 'total'])
const emit = defineEmits(['deleteItem', 'submitOrder'])

const comment = ref('')

const sendOrder = () => {
  emit('submitOrder', comment.value)
  comment.value = ''
}
</script>

<template>
  <div class="col-md-8">
    <table class="table">
      <thead>
        <tr>
          <th scope="col" width="50">Remove</th>
          <th scope="col">Item</th>
          <th scope="col">Description</th>
          <th scope="col" width="90">Amount</th>
          <th scope="col">Price</th>
          <th scope="col">SubTotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>
            <button type="button" class="btn btn-sm" @click="emit('deleteItem', item)">x</button>
          </td>
          <td>{{ item.title }}</td>
          <td>
            <small>{{ item.description }}</small>
          </td>
          <td>
            <select class="form-select" v-model="item.amount">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </td>
          <td>${{ item.price }}</td>
          <td>${{ item.amount * item.price }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="orders.length === 0" class="alert alert-primary text-center" role="alert">
      Please Select Item
    </div>
    <div v-else>
      <div class="text-end mb-3">
        <h5>
          Total: <span>{{ total }}</span>
        </h5>
      </div>
      <textarea
        class="form-control mb-3"
        rows="3"
        placeholder="Comment"
        v-model="comment"
      ></textarea>
      <div class="text-end">
        <button class="btn btn-primary" @click="sendOrder()">Submit</button>
      </div>
    </div>
  </div>
</template>
