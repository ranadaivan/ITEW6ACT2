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
      // Your notification logic
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
  background: linear-gradient(to right, #ffecd2, #ffb74d);
  border-radius: 20px;
  padding: 30px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 30px;
}

.label {
  font-weight: bold;
  font-size: 18px;
  color: #ff3d00;
  margin-bottom: 12px;
}

.input {
  width: calc(100% - 20px);
  padding: 15px;
  border: 2px solid #ff3d00;
  border-radius: 10px;
  box-sizing: border-box;
  color: #ff6f00;
  font-size: 16px;
}

.button {
  width: 100%;
  padding: 18px;
  background: linear-gradient(to right, #ffffff, #ff6f00);
  color: #ff3d00;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;
}

.button:hover {
  background: linear-gradient(to right, #ffffff, #ff9500);
}

.button:active {
  background: linear-gradient(to right, #ffffff, #ff3d00);
}
</style>
