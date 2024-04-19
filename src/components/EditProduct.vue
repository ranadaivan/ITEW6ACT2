<template>
  <form class="update-form" @submit.prevent="updateProduct">
    <div class="form-group">
      <label for="name" class="label">Product Name</label>
      <input type="text" v-model="editedProduct.name" required class="form-control">
    </div>
    <div class="form-group">
      <label for="description" class="label">Product Description</label>
      <input type="text" v-model="editedProduct.description" required class="form-control">
    </div>
    <div class="form-group">
      <label for="price" class="label">Product Price</label>
      <input type="number" v-model.number="editedProduct.price" required class="form-control">
    </div>
    <div class="buttons-container">
      <button type="submit" class="btn btn-primary">Update Product</button>
      <button type="button" @click="cancelEdit" class="btn btn-secondary">Cancel</button>
    </div>
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
    },
    cancelEdit() {
      // Emit an event to notify the parent component to cancel editing
      this.$emit('cancel-edit');
    }
  }
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}

.update-form {
  max-width: 400px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.label {
  font-weight: bold;
  color: #333;
}

.form-control {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-primary {
  padding: 12px;
  background-color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: #fff;
}

.btn-primary:hover {
  background-color: #666;
}

.btn-primary:active {
  background-color: #000;
}

.btn-secondary {
  padding: 12px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: #333;
}

.btn-secondary:hover {
  background-color: #aaa;
}

.btn-secondary:active {
  background-color: #999;
}

.buttons-container {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}
</style>
