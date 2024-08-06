<script setup>
  import {ref} from 'vue';

  const items = ref([
    {
      title: 'Bubble milk tea',
      description: 'Rich milk tea paired with chewy pearls',
      price: 50,
      stock: 20
    },
    {
      title: 'Winter melon with lemon',
      description: 'Refreshing winter melon paired with fresh lemon',
      price: 20,
      stock: 15
    },
    {
      title: 'Jade Lemon',
      description: 'The perfect combination of green tea and lemon',
      price: 55,
      stock: 34
    },
    {
      title: 'Four Seasons Spring Tea',
      description: 'Aromatic Four Seasons Spring Tea with a lingering sweetness',
      price: 45,
      stock: 10
    },
    {
      title: 'Assam Milk Tea',
      description: 'Assam black tea with rich fresh milk',
      price: 50,
      stock: 25
    },
    {
      title: 'Lemon Iced Tea',
      description: 'A refreshing combination of lemon and iced tea',
      price: 45,
      stock: 20
    },
    {
      title: 'Mango Green Tea',
      description: 'The unique flavor of mango and green tea',
      price: 55,
      stock: 18
    },
    {
      title: 'Matcha Latte',
      description: 'The perfect match of matcha and fresh milk',
      price: 60,
      stock: 20
    }
  ]);

  const updateStock = (index, amount) =>{
    items.value[index].stock += amount;
  };

  const isEditing = ref(-1);
  const tempTitle = ref("");
  const edit = (index)=>{
    isEditing.value = index;
    tempTitle.value = items.value[index].title;
  }
  
  const confirm = () =>{
    items.value[isEditing.value].title = tempTitle.value;
    cancel();
  }

  const cancel = ()=>{
    tempTitle.value = "";
    isEditing.value = -1;
  }
</script>

<template>
    <table>
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody v-for="(item, index) in items" :key="index">
        <tr>
          <td>
            {{ item.title }}
          </td>
          <td><small>{{ item.description }}</small></td>
          <td>{{ item.price }}</td>
          <td>
            <button @click="updateStock(index, -1);" :disabled="item.stock < 1">-</button>
              {{item.stock}}
            <button @click="updateStock(index, 1);" >+</button>
          </td>
          <td>
            <button @click="edit(index);" v-if="isEditing != index">
              Edit
            </button>

            <div v-else>
              <input :placeholder="item.title" v-model="tempTitle">
              <button @click="confirm()" :disabled="!tempTitle">Confirm</button>
              <button @click="cancel()">Cancel</button>
            </div>
          </td>
        </tr>
      </tbody>

    </table>
</template>

<style>

</style>
