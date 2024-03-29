import { defineStore } from 'pinia';
import axios from 'axios';
import { INGREDIENTS_URL, COCKTAILS_BY_INGR_URL } from '../constants';

export const useRootStore = defineStore('root', {
  state: () => ({
    ingredients: [],
    ingredient: null,
    cocktails: [],
    filter: null,
  }),

  actions: {
    setIngredient(ingredient) {
      this.ingredient = ingredient;
    },

    setFilter(filter) {
      this.filter = filter;
    },

    async getIngredients() {
      const data = await axios.get(INGREDIENTS_URL);
      this.ingredients = data?.data?.drinks;
    },

    async getCocktails(ingredient) {
      const data = await axios.get(`${COCKTAILS_BY_INGR_URL}${ingredient}`);
      this.cocktails = data?.data?.drinks;
    },

    async getCocktailsByFilter(url) {
      const data = await axios.get(url);
      this.cocktails = data?.data?.drinks;
    },
  }
})
