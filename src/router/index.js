import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/components/ProductList.vue';
import AddProduct from '@/components/AddProduct.vue';
import EditProduct from '@/components/EditProduct.vue';

const routes = [
  { path: '/', redirect: '/add-product' },
  { path: '/product-list', component: ProductList },
  { path: '/add-product', component: AddProduct },
  { path: '/edit-product/:id', component: EditProduct }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
