<script setup>
import { ref, computed } from 'vue'
import ItemCard from '@/components/ItemCard.vue'

const items = ref([
  {
    id: '1',
    title: 'Bubble milk tea',
    description: 'Rich milk tea paired with chewy pearls',
    price: 50
  },
  {
    id: '2',
    title: 'Winter melon with lemon',
    description: 'Refreshing winter melon paired with fresh lemon',
    price: 20
  },
  {
    id: '3',
    title: 'Jade Lemon',
    description: 'The perfect combination of green tea and lemon',
    price: 55
  },
  {
    id: '4',
    title: 'Four Seasons Spring Tea',
    description: 'Aromatic Four Seasons Spring Tea with a lingering sweetness',
    price: 45
  },
  {
    id: '5',
    title: 'Assam Milk Tea',
    description: 'Assam black tea with rich fresh milk',
    price: 50
  },
  {
    id: '6',
    title: 'Lemon Iced Tea',
    description: 'A refreshing combination of lemon and iced tea',
    price: 45
  },
  {
    id: '7',
    title: 'Mango Green Tea',
    description: 'The unique flavor of mango and green tea',
    price: 55
  },
  {
    id: '8',
    title: 'Matcha Latte',
    description: 'The perfect match of matcha and fresh milk',
    price: 60
  }
])

const orders = ref([])

const comment = ref('')

const updateOrder = (item) => {
  let exist = orders.value.find((k) => {
    if (k.id == item.id) {
      return k
    }
  })
  if (exist != null) {
    if (exist.amount >= 10) {
      alert('An item cannot be ordered more than 10')
      return
    } else {
      exist.amount++
    }
  } else {
    orders.value.push({
      id: item.id,
      title: item.title,
      amount: 1,
      price: item.price,
      description: item.description
    })
  }
}
const total = computed(() => {
  return orders.value.reduce((pre, next) => {
    return pre + next.price * next.amount
  }, 0)
})
const subTotal = (item) => {
  return item.price * item.amount
}

const deleteItem = (item) => {
  const index = orders.value.findIndex((k) => k.id == item.id)
  orders.value.splice(index, 1)
}

const orderCreated = ref({
  orders: [],
  comment: '',
  total: 0
})

const submitOrder = () => {
  orderCreated.value = {
    id: new Date().getTime(),
    orders: orders.value,
    comment: comment.value,
    total: total.value
  }
  orders.value = []
  comment.value = ''
}

// const submitOrder = () => {
//   orderCreated.value.id = new Date().getTime()
//   orderCreated.value.orders = orders.value
//   orderCreated.value.comment = comment.value
//   orderCreated.value.total = total.value

//   orders.value = []
//   comment.value = ''
// }
</script>

<template>
  <div id="root">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4">
          <div class="list-group">
            <ItemCard :items="items" @updateOrder="updateOrder" />
          </div>
        </div>
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
                  <button type="button" class="btn btn-sm" @click="deleteItem(item)">x</button>
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
                <td>${{ subTotal(item) }}</td>
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
              <button class="btn btn-primary" @click="submitOrder()">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <hr />
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
                    <td>${{ subTotal(item) }}</td>
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
    </div>
  </div>
</template>
