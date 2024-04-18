import { createStore } from 'vuex';

const store = createStore({
  state: {
    products: []
  },
  mutations: {
    addProduct(state, product) {
      state.products.push(product);
    },
    updateProduct(state, { productId, updatedProduct }) {
      const index = state.products.findIndex(p => p.id === productId);
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct);
      }
    },
    deleteProduct(state, productId) {
      state.products = state.products.filter(p => p.id !== productId);
    }
  },
  actions: {
    addProduct({ commit }, product) {
      commit('addProduct', product);
    },
    updateProduct({ commit }, { productId, updatedProduct }) {
      commit('updateProduct', { productId, updatedProduct });
    },
    deleteProduct({ commit }, productId) {
      commit('deleteProduct', productId);
    }
  },
  getters: {
    getAllProducts(state) {
      return state.products;
    },
    getProductById: state => id => {
      return state.products.find(product => product.id === id);
    }
  }
});

export default store;
