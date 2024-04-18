<template>
  <div class="container">
    <div v-if="products.length > 0">
      <div v-for="product in products" :key="product.id" class="product-item">
        <div class="product-header">
          <h3 class="product-name">{{ product.name }}</h3>
          <button @click="editProduct(product)" class="edit-button">✎ Edit</button>
        </div>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">{{ product.price }}</p>
        <!-- Edit form for each product -->
        <form v-if="product.editMode" @submit.prevent="updateProduct(product)" class="update-form">
          <div class="form-group">
            <label for="edit-name">Product Name</label>
            <input type="text" v-model="product.editedName" required class="input-field">
          </div>
          <div class="form-group">
            <label for="edit-description">Product Description</label>
            <input type="text" v-model="product.editedDescription" required class="input-field">
          </div>
          <div class="form-group">
            <label for="edit-price">Product Price</label>
            <input type="number" v-model.number="product.editedPrice" required class="input-field">
          </div>
          <div class="buttons-container">
            <button type="submit" class="submit-button">Update</button>
            <button type="button" @click="cancelEdit(product)" class="cancel-button">Cancel</button>
            <button type="button" @click="deleteProduct(product)" class="delete-button">🗑️ Delete</button>
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
// eslint-disable-next-line
import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    return {
      products: [
        // Products data...
      ]
    };
  },
  methods: {
    editProduct(product) {
      product.editMode = true;
      // Assign current values to edited fields
      product.editedName = product.name;
      product.editedDescription = product.description;
      product.editedPrice = product.price;
    },
    updateProduct(product) {
      // Update the product with edited values
      product.name = product.editedName;
      product.description = product.editedDescription;
      product.price = product.editedPrice;
      // Exit edit mode
      product.editMode = false;
    },
    cancelEdit(product) {
      // Reset edited values and exit edit mode
      product.editedName = '';
      product.editedDescription = '';
      product.editedPrice = 0;
      product.editMode = false;
    },
    confirmDelete(product) {
      const isConfirmed = window.confirm("Are you sure you want to delete this product?");
      if (isConfirmed) {
        this.deleteProduct(product);
      }
    },
    deleteProduct(product) {
      const index = this.products.indexOf(product);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
    }
  }
};
</script>

<style>
.container {
  background: linear-gradient(to bottom right, #f0f0f0, #d9d9d9);
  padding: 20px;
}

.product-item {
  background-color: #fff;
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

.edit-button,
.submit-button,
.cancel-button,
.delete-button {
  padding: 10px 16px;
  background-color: #ff9f00;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  font-weight: bold;
  font-size: 14px;
}

.edit-button:hover,
.submit-button:hover,
.cancel-button:hover,
.delete-button:hover {
  background-color: #ffbf69;
}

.edit-button:active,
.submit-button:active,
.cancel-button:active,
.delete-button:active {
  background-color: #ff9933;
}
</style>
