<script setup>
import { ref, computed } from 'vue'
import ItemList from '@/components/ItemList.vue'
import ItemCart from '@/components/ItemCart.vue'
import ItemOrder from '@/components/ItemOrder.vue'

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

const deleteItem = (item) => {
  const index = orders.value.findIndex((k) => k.id == item.id)
  orders.value.splice(index, 1)
}

const orderCreated = ref({
  orders: [],
  comment: '',
  total: 0
})

const submitOrder = (comment) => {
  orderCreated.value = {
    id: new Date().getTime(),
    orders: orders.value,
    comment: comment,
    total: total.value
  }
  orders.value = []
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
        <ItemList :items="items" @updateOrder="updateOrder" />

        <ItemCart
          :orders="orders"
          :total="total"
          @submitOrder="submitOrder"
          @deleteItem="deleteItem"
        />
      </div>
      <hr />
      <ItemOrder :orderCreated="orderCreated" />
    </div>
  </div>
</template>
