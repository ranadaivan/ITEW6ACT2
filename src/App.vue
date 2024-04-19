<template>
  <div id="app">
    <header class="title">Product Management</header>
    <div class="container">
      <div class="row">
        <div class="col-md-6 mb-2">
          <router-link to="/add-product" class="btn btn-success btn-lg btn-block">➕ Add New Product</router-link>
        </div>
        <div class="col-md-6 mb-2">
          <router-link to="/product-list" class="btn btn-primary btn-lg btn-block">📦 View Product List</router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: #333;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #555;
  display: block;
  font-weight: bold; /* Make the text bold */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Add shadow to the text */
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-success:hover,
.btn-primary:hover {
  filter: brightness(90%);
}
</style>
