<script setup>
  import { useRootStore } from '@/stores/root';
  import { storeToRefs } from 'pinia';
  import Layout from '@/components/Layout.vue';
  import CocktailThumb from '@/components/CocktailThumb.vue';

  const rootStore = useRootStore();
  rootStore.getIngredients();

  const { ingredients, ingredient, cocktails } = storeToRefs(rootStore);

  function getCocktails() {
    rootStore.getCocktails(rootStore.ingredient);
  }

  function removeIngredients() {
    rootStore.setIngredient(null);
  }
</script>

<template>
  <Layout imgUrl="/src/assets/img/cocktail.jpg" :is-back-button-visible="!!ingredient" :backFunction="removeIngredients">
    <div v-if="!ingredient" class="home">
      <h1 class="home__title">Choose your drink</h1>

      <div class="home__line" />

      <el-select 
        class="home__select" 
        v-model="rootStore.ingredient" 
        placeholder="Choose main ingredient" 
        filterable 
        allow-create 
        size="large" 
        effect="dark" 
        @change="getCocktails"
      >
        <el-option
          v-for="item in ingredients"
          :key="item.strIngredient1"
          :label="item.strIngredient1"
          :value="item.strIngredient1"
        />
      </el-select>

      <p class="home__text">Try our delicious cocktail recipes for every occasion. Find delicious cocktail recipes by ingredient through our cocktail generator.</p>

      <img class="home__image" src="/src/assets/img/cocktails.png" width="345" height="120" alt="Пять разных коктейлей">
    </div>

    <div v-else class="home">
      <h1 class="home__title">Cocktails with {{ ingredient }}</h1>

      <div class="home__line" />

      <ul class="home__list">
        <CocktailThumb class="home__item"
          v-for="cocktail in cocktails"
          :key="cocktail.idDrink"
          :cocktail="cocktail"
        />
      </ul>
    </div> 
  </Layout>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;

  &__title {
    @include h1;
  }

  &__line {
    width: 100px;
    height: 3px;
    margin: 29px auto 50px;

    background-color: $rose;
  }

  &__select {
    margin-bottom: 50px;
  }

  &__text {
    max-width: 516px;
    margin-bottom: 60px;

    text-align: center;
    letter-spacing: 1.6px;

    color: $alto;
  }

  &__image {
    width: 345px;
    height: 120px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;

    max-height: 582px;
    padding: 0 79px;

    overflow-y: auto;

    margin-bottom: -41px;
  }

  &__item {
    width: 156px;
    margin-right: 38px;
    margin-bottom: 41px;

    &:nth-child(3n+3),
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
