<script setup>
  import { useRootStore } from '@/stores/root';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';
  import Layout from '@/components/Layout.vue';
  import CocktailThumb from '@/components/CocktailThumb.vue';

  const filters = [
    {
      name:'Alcoholic',
      url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic',
    },
    {
      name:'Non-alcoholic',
      url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic',
    },
    {
      name:'Ordinary Drink',
      url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink',
    },
    {
      name:'Cocktail',
      url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail',
    },
  ];

  const rootStore = useRootStore();
  rootStore.getIngredients();

  const { ingredients, ingredient, cocktails, filter } = storeToRefs(rootStore);

  function getCocktails() {
    rootStore.getCocktails(rootStore.ingredient);
  }

  function removeList() {
    if (rootStore.ingredient) {
      rootStore.setIngredient(null);
      return;
    }

    rootStore.setFilter(null);
  }

  function getCocktailsByFilter(val) {
    rootStore.setFilter(val.name);
    rootStore.getCocktailsByFilter(val.url);
  }
</script>

<template>
  <Layout imgUrl="/src/assets/img/cocktail.jpg" :is-back-button-visible="!!ingredient || !!filter" :backFunction="removeList">
    <div v-if="!ingredient && !filter" class="home">
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

      <div class="home__filters">
        <el-button 
          class="home__filter" 
          v-for="(filter, key) in filters"
          :key="key" 
          round 
          @click="getCocktailsByFilter(filter)"
          >
          {{ filter.name }}
        </el-button>
      </div>

      <p class="home__text">Try our delicious cocktail recipes for every occasion. Find delicious cocktail recipes by ingredient through our cocktail generator.</p>

      <img class="home__image" src="/src/assets/img/cocktails.png" width="345" height="120" alt="Пять разных коктейлей">
    </div>

    <div v-else class="home">
      <h1 v-if="ingredient" class="home__title">Cocktails with {{ ingredient }}</h1>

      <h1 v-else class="home__title">Cocktails {{ filter }}</h1>

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

  &__filters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    max-width: 477px;
    margin-right: -12px;
    margin-bottom: 30px;
  }

  &__filter {
    margin-bottom: 20px;
    margin-left: 0;

    &:not(:last-child) {
      margin-right: 12px;
    }

    &:hover {
      color: $rose;
      border-color: $rose;
    }
  }
}
</style>
