<template>
  <form class="product-form" @submit.prevent="addProduct">
    <div class="form-group">
      <label for="name" class="label">Product Name</label>
      <input type="text" v-model="name" id="name" placeholder="Enter product name" required class="input">
    </div>
    <div class="form-group">
      <label for="description" class="label">Product Description</label>
      <input type="text" v-model="description" id="description" placeholder="Enter product description" required class="input">
    </div>
    <div class="form-group">
      <label for="price" class="label">Product Price</label>
      <input type="number" v-model.number="price" placeholder="Enter product price" required min="0" class="input">
    </div>
    <button type="submit" class="button">Add Product</button>
  </form>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      name: '',
      description: '',
      price: '',
    };
  },
  methods: {
    addProduct() {
      // Price Validation
      if (parseFloat(this.price) < 0) {
        window.alert("Invalid Input Error: Price cannot be negative.");
        return;
      }

      // Create a new product object
      const newProduct = {
        id: Math.random().toString(36).substr(2, 9),
        name: this.name,
        description: this.description,
        price: parseInt(this.price)
      };

      // Dispatch action to add the new product to Vuex store
      this.$store.dispatch('addProduct', newProduct);

      // Show notification
      this.showNotification();

      // Clear input fields
      this.clearFields();
    },
    showNotification() {
      Swal.fire({
        title: 'Success!',
        text: 'Product has been added successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    },
    clearFields() {
      this.name = '';
      this.description = '';
      this.price = '';
    }
  }
}
</script>

<style>
.product-form {
  background: linear-gradient(to right, #ffdaab, #ff9e4d);
  border-radius: 20px;
  padding: 40px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.form-group {
  margin-bottom: 40px;
}

.label {
  font-weight: bold;
  font-size: 20px;
  color: #ff5722;
  margin-bottom: 16px;
}

.input {
  width: calc(100% - 30px);
  padding: 20px;
  border: 2px solid #ff5722;
  border-radius: 12px;
  box-sizing: border-box;
  color: #ff9800;
  font-size: 18px;
}

.button {
  width: 100%;
  padding: 22px;
  background: linear-gradient(to right, #ffffff, #ff9800);
  color: #ff5722;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s;
}

.button:hover {
  background: linear-gradient(to right, #ffffff, #ffa726);
}

.button:active {
  background: linear-gradient(to right, #ffffff, #ff5722);
}
</style>
