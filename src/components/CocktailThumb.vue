<script setup>
const props = defineProps({
  cocktail: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink :to="`/cocktails/${cocktail.idDrink}`" class="cocktail-thumb">
    <img class="cocktail-thumb__img" :src="`${cocktail.strDrinkThumb}`" width="120" height="120" :alt="`${cocktail.strDrink}`">

    <span class="cocktail-thumb__name"> {{ cocktail.strDrink }} </span>
  </RouterLink>
</template>

<style lang="scss" scoped>
  .cocktail-thumb {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__img {
      width: 120px;
      height: 120px;
      margin-bottom: 15px;

      background-size: cover;
    }

    &__name {
      line-height: 19px;

      text-align: center;
      letter-spacing: 1.6px;
    }
  }
</style>