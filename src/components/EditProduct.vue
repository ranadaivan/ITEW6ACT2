<template>
  <form class="update-form" @submit.prevent="updateProduct">
    <div class="form-group">
      <label for="name" class="label">Product Name</label>
      <input type="text" v-model="editedProduct.name" required class="input-field">
    </div>
    <div class="form-group">
      <label for="description" class="label">Product Description</label>
      <input type="text" v-model="editedProduct.description" required class="input-field">
    </div>
    <div class="form-group">
      <label for="price" class="label">Product Price</label>
      <input type="number" v-model.number="editedProduct.price" required class="input-field">
    </div>
    <button type="submit" class="submit-button">Update Product</button>
  </form>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      editedProduct: { ...this.product }
    };
  },
  methods: {
    updateProduct() {
      // Emit an event to notify the parent component to update the product
      this.$emit('update-product', this.editedProduct);
    }
  }
}
</script>

<style>
.update-form {
  max-width: 400px;
  margin: 0 auto;
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.label {
  display: block;
  font-weight: bold;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #33cc33, #009900);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background: linear-gradient(to right, #009900, #006600);
}

.submit-button:active {
  background: linear-gradient(to right, #006600, #003300);
}
</style>
