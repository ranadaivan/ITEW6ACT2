<template>
  <div id="app">
    <header class="title">Product Management</header>
    <div class="container">
      <router-link to="/add-product" class="router-link">➕ Add New Product</router-link>
      <router-link to="/product-list" class="router-link">📦 View Product List</router-link>
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
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  display: block;
}

.router-link {
  display: inline-block;
  margin: 20px;
  padding: 12px 24px;
  border-radius: 8px;
  background: linear-gradient(to right, #33cc33, #009900);
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  transition: background 0.3s, color 0.3s;
}

.router-link:hover {
  background: linear-gradient(to right, #009900, #006600);
  color: #fff;
}
</style>
