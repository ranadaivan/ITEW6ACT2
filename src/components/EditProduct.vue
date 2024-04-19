<template>
  <div class="container">
    <div v-if="products.length > 0">
      <div v-for="product in products" :key="product.id" class="product-item">
        <div class="product-header">
          <h3 class="product-name">{{ product.name }}</h3>
          <div>
            <button @click="editProduct(product)" class="btn btn-warning btn-sm">✎ Edit</button>
            <button @click="confirmDelete(product)" class="btn btn-danger btn-sm">🗑️ Delete</button>
          </div>
        </div>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">{{ product.price }}</p>
        <!-- Edit form for each product -->
        <form v-if="product.editMode" @submit.prevent="confirmUpdate(product)" class="update-form">
          <div class="form-group">
            <label for="edit-name" class="label">Product Name</label>
            <input type="text" v-model="product.editedName" required class="input-field">
          </div>
          <div class="form-group">
            <label for="edit-description" class="label">Product Description</label>
            <input type="text" v-model="product.editedDescription" required class="input-field">
          </div>
          <div class="form-group">
            <label for="edit-price" class="label">Product Price</label>
            <input type="number" v-model.number="product.editedPrice" required min="0" class="input-field">
          </div>
          <div class="buttons-container">
            <button type="submit" class="submit-button">Update</button>
            <button type="button" @click="cancelEdit(product)" class="cancel-button">Cancel</button>
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
import Swal from 'sweetalert2';

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
    confirmUpdate(product) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateProduct(product);
          Swal.fire(
            'Updated!',
            'Your product has been updated.',
            'success'
          )
        }
      });
    },
    updateProduct(product) {
      product.name = product.editedName;
      product.description = product.editedDescription;
      product.price = product.editedPrice;
      product.editMode = false;

      Swal.fire({
        icon: 'success',
        title: 'Product Updated Successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    },
    cancelEdit(product) {
      product.editMode = false;
    },
    confirmDelete(product) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProduct(product);
          Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
          )
        }
      });
    },
    deleteProduct(product) {
      this.$store.dispatch('deleteProduct', product.id);
    }
  }
};
</script>

<style>
.label {
  font-weight: bold;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.update-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.submit-button,
.cancel-button {
  width: 48%;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button {
  background: #007bff;
  border: none;
  color: #fff;
}

.submit-button:hover {
  background: #0056b3;
}

.cancel-button {
  background: #dc3545;
  border: none;
  color: #fff;
}

.cancel-button:hover {
  background: #c82333;
}
</style>
