<script setup>
  import axios from 'axios';
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { COCKTAIL_BY_ID } from '@/constants';
  import Layout from '@/components/Layout.vue';

  const route = useRoute();

  const cocktailId = computed(() => route.path.split('/').pop());
  const cocktail = ref(null);

  const ingredients = computed(() => {
    const ingredients = [];

    for (let i = 1; i <= 15; i++) {
      if (!cocktail.value[`strIngredient${i}`]) break;

      const ingredient = {};

      ingredient.name = cocktail.value[`strIngredient${i}`];
      ingredient.measure = cocktail.value[`strMeasure${i}`];

      ingredients.push(ingredient);
    }

    return ingredients;
  });

  async function getCocktail() {
    const data = await axios.get(`${COCKTAIL_BY_ID}${cocktailId.value}`);
    cocktail.value = data?.data?.drinks[0];
  }

  getCocktail();
</script>

<template>
  <Layout :imgUrl="cocktail.strDrinkThumb">
    <div class="cocktail">
      <h1 class="cocktail__title">{{ cocktail.strDrink }}</h1>

      <div class="cocktail__line" />

      <ul class="cocktail__ingredients">
        <li class="cocktail__ingredient" v-for="(item, key) in ingredients" :key="key">
          <img class="cocktail__icon" src="/src/assets/icons/heart.svg" width="17" height="17" alt="Розовое сердце">

          <span>{{ item.name }}</span>

          <span v-if="item.measure"> &nbsp;| {{ item.measure }} </span>
        </li>
      </ul>

      <p class="cocktail__instructions">{{ cocktail.strInstructions }}</p>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
.cocktail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  padding-top: 120px;

  &__title {
    @include h1;
  }

  &__line {
    width: 100px;
    height: 3px;
    margin: 29px auto 50px;

    background-color: $rose;
  }

  &__ingredients {
    width: 560px;
    margin-bottom: 80px;
  }


  &__ingredient {
    font-size: 18px;
    line-height: 27px;

    display: flex;
    align-items: center;

    letter-spacing: 1.8px;

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  &__icon {
    margin-right: 23px;
  }

  &__instructions {
    font-size: 20px;
    line-height: 30px;

    max-width: 516px;

    text-align: center;
    letter-spacing: 2px;
  }
}
</style>
