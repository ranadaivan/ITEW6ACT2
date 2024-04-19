<template>
  <div class="container">
    <div v-if="products.length > 0">
      <transition-group name="fade">
      <div v-for="product in products" :key="product.id" class="product-item">
        <div class="product-header">
          <h3 class="product-name">{{ product.name }}</h3>
          <div>
            <button @click="editProduct(product)" class="btn btn-warning btn-sm">✎ Edit</button>
            <button @click="confirmDelete(product)" class="btn btn-danger btn-sm">🗑️ Delete</button> <!-- Modified click event -->
          </div>
        </div>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">{{ product.price }}</p>
        <!-- Edit form for each product -->
        <form v-if="product.editMode" @submit.prevent="confirmUpdate(product)" class="update-form"> <!-- Added confirmUpdate call on form submit -->
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
            <input type="number" v-model.number="product.editedPrice" required min="0" class="input-field">
          </div>
          <div class="buttons-container">
            <button type="submit" class="submit-button">Update</button>
            <button type="button" @click="cancelEdit(product)" class="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </transition-group>
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
      // Confirm update
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
      // Update product
      product.name = product.editedName;
      product.description = product.editedDescription;
      product.price = product.editedPrice;
      product.editMode = false;

      // Show SweetAlert2 notification after successfully updating the product
      Swal.fire({
        icon: 'success',
        title: 'Product Updated Successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    },
    cancelEdit(product) {
      // Cancel editing
      product.editMode = false;
    },
    confirmDelete(product) {
      // Confirm delete
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
      // Delete product
      this.$store.dispatch('deleteProduct', product.id);
    }
  }
};
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
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
