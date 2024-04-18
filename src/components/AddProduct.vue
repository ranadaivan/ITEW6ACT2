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
      if (parseFloat(this.price) <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Input Error',
          text: 'Price cannot be negative or zero.',
        });
        return;
      }

      // Create a new product object
      const newProduct = {
        name: this.name,
        description: this.description,
        price: parseInt(this.price)
      };

      // Emit an event to notify the parent component about the new product
      this.$emit('product-added', newProduct);

      // Show notification
      this.showNotification();

      // Clear input fields
      this.clearFields();
    },
    showNotification() {
      Swal.fire({
        icon: 'success',
        title: 'Product Added',
        text: 'Your product has been successfully added.',
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
  background: linear-gradient(to right, #e6f7ff, #66ccff);
  border-radius: 10px;
  padding: 30px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.input {
  width: calc(100% - 20px);
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  color: #333;
  font-size: 16px;
}

.button {
  width: 100%;
  padding: 15px;
  background: linear-gradient(to right, #33cc33, #009900);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.button:hover {
  background: linear-gradient(to right, #009900, #006600);
}

.button:active {
  background: linear-gradient(to right, #009900, #004d00);
}
</style>
