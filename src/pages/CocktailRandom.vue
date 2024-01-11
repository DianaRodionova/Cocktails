<script setup>
  import axios from 'axios';
  import { ref, computed } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import { COCKTAIL_RANDOM, INGREDIENT_PIC } from '@/constants';
  import Layout from '@/components/Layout.vue';

  const cocktail = ref(null);

  const ingredients = computed(() => {
    const ingredients = [];

    for (let i = 1; i <= 15; i++) {
      if (!cocktail.value[`strIngredient${i}`]) break;

      const ingredient = cocktail.value[`strIngredient${i}`];

      ingredients.push(ingredient);
    }

    return ingredients;
  });

  async function getCocktailRandom() {
    const data = await axios.get(COCKTAIL_RANDOM);
    cocktail.value = data?.data?.drinks[0];
  }

  getCocktailRandom();
</script>

<template>
  <Layout :imgUrl="cocktail.strDrinkThumb">
    <div class="cocktail-random">
      <h1 class="cocktail-random__title">{{ cocktail.strDrink }}</h1>

      <div class="cocktail-random__line" />

      <swiper
        class="cocktail-random__ingredients"
        :slides-per-view="3"
        :space-between="50"
      >
        <swiper-slide
          class="cocktail-random__ingredient" 
          v-for="(item, key) in ingredients" 
          :key="key"
        >
          <img class="cocktail-random__img" :src="`${INGREDIENT_PIC}${item}-Small.png`" width="100" height="100" :alt="item">

          <span>{{ item }}</span>
        </swiper-slide>
      </swiper>

      <p class="cocktail-random__instructions">{{ cocktail.strInstructions }}</p>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
.cocktail-random {
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
    width: 586px;
    margin-bottom: 50px;
  }


  &__ingredient {
    line-height: 22px;

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 156px;

    text-align: center;
    letter-spacing: 1.6px;
  }

  &__instructions {
    font-size: 20px;
    line-height: 30px;

    max-width: 516px;

    text-align: center;
    letter-spacing: 2px;
  }

  &__img {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }
}
</style>
