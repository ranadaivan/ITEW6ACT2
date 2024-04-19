<template>
  <form class="product-form" @submit.prevent="addProduct">
    <div class="form-group mb-4">
      <label for="name" class="label">Product Name</label>
      <input type="text" v-model="name" id="name" placeholder="Enter product name" required class="form-control">
    </div>
    <div class="form-group mb-4">
      <label for="description" class="label">Product Description</label>
      <input type="text" v-model="description" id="description" placeholder="Enter product description" required class="form-control">
    </div>
    <div class="form-group mb-4">
      <label for="price" class="label">Product Price</label>
      <input type="number" v-model.number="price" placeholder="Enter product price" required min="0" class="form-control">
    </div>
    <button type="submit" class="btn btn-primary btn-block">🚀 Add Product</button>
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

      // Show SweetAlert2 notification
      this.showNotification();

      // Clear input fields
      this.clearFields();
    },
    showNotification() {
      Swal.fire({
        icon: 'success',
        title: '🎉 Product Added Successfully!',
        showConfirmButton: false,
        timer: 1500
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
.label {
  font-weight: bold;
}

.input {
  margin-bottom: 20px;
}

.product-form {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: #ff6b6b;
  border-color: #ff6b6b;
  font-size: 18px;
  transition: transform 0.2s ease-in-out;
}

.btn-primary:hover {
  background-color: #ff3e3e;
  border-color: #ff3e3e;
  transform: scale(1.05);
}

.btn-primary:active {
  background-color: #ff2626;
  border-color: #ff2626;
}

body {
  font-family: 'Roboto', sans-serif;
}
</style>
