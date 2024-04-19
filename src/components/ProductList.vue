<template>
  <div class="container">
    <div v-if="products.length > 0">
      <div v-for="product in products" :key="product.id" class="product-item">
        <div class="product-header">
          <h3 class="product-name">{{ product.name }}</h3>
          <div>
            <button @click="editProduct(product)" class="btn btn-warning btn-sm">✎ Edit</button>
            <button @click="deleteProduct(product)" class="btn btn-danger btn-sm">🗑️ Delete</button>
          </div>
        </div>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">{{ product.price }}</p>
        <!-- Edit form for each product -->
        <form v-if="product.editMode" @submit.prevent="updateProduct(product)" class="update-form">
          <div class="form-group">
            <label for="edit-name">Product Name</label>
            <input type="text" v-model="product.editedName" required class="form-control">
          </div>
          <div class="form-group">
            <label for="edit-description">Product Description</label>
            <input type="text" v-model="product.editedDescription" required class="form-control">
          </div>
          <div class="form-group">
            <label for="edit-price">Product Price</label>
            <input type="number" v-model.number="product.editedPrice" required min="0" class="form-control">
          </div>
          <div class="buttons-container">
            <button type="submit" class="btn btn-primary">Update</button>
            <button type="button" @click="cancelEdit(product)" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    <div v-else>
      <p>No products added yet.</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.getters.getAllProducts;
    }
  },
  methods: {
    editProduct(product) {
      product.editMode = true;
      product.editedName = product.name;
      product.editedDescription = product.description;
      product.editedPrice = product.price;
    },
    updateProduct(product) {
      product.name = product.editedName;
      product.description = product.editedDescription;
      product.price = product.editedPrice;
      product.editMode = false;
    },
    cancelEdit(product) {
      product.editedName = '';
      product.editedDescription = '';
      product.editedPrice = 0;
      product.editMode = false;
    },
    deleteProduct(product) {
      this.$store.dispatch('deleteProduct', product.id);
    }
  }
};
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}

.container {
  padding: 20px;
}

.product-item {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.product-description {
  font-size: 16px;
  color: #666;
}

.product-price {
  font-size: 18px;
  color: #4caf50;
}

.buttons-container {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
}

.btn {
  margin-right: 10px;
  font-weight: bold;
  font-size: 14px;
}
</style>
