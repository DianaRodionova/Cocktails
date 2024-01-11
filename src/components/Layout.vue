<script setup>
  import { computed } from 'vue';
  import { Back } from '@element-plus/icons-vue';
  import { useRoute, useRouter } from 'vue-router';
  import { ROUTER_PATHS } from '../constants/router.js';

  const props = defineProps({
  imgUrl: {
    type: String,
    required: true,
  },
  backFunction: {
    type: Function,
  },
  isBackButtonVisible: {
    type: Boolean,
    default: true,
  },
  })

  const route = useRoute();
  const router = useRouter();

  const routeName = computed(() => route.name);

  function goRandomCocktail() {
    if(routeName.value === ROUTER_PATHS.COCKTAIL_RANDOM) {
      router.go();
    }

    router.push(ROUTER_PATHS.COCKTAIL_RANDOM);
  }

  function goBack() {
    props.backFunction ? props.backFunction() : router.go(-1);
  }
</script>

<template>
  <div class="layout">
    <section class="layout__image" :style="`background-image: url(${imgUrl});`" />

    <section class="layout__main">
      <el-button v-if="isBackButtonVisible" class="layout__back" :icon="Back" circle @click="goBack"/>

      <el-button class="layout__button" @click="goRandomCocktail">Get random cocktail</el-button>
      <slot /> 
    </section> 
  </div>
</template>

<style lang="scss" scoped>
  .layout {
    display: flex;

    min-height: 100vh;

    &__image {
      width: 50%;

      background-color: $cod-gray;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: cover;
    }

    &__main {
      position: relative;

      width: 50%;
    }

    &__back {
      position: absolute;
      top: 36px;
      left: 36px;

      width: 53px;
      height: 53px;

      color: $white;
      border-color: $white;
      background-color: transparent;

      &:hover {
        color: $rose;
        border-color: $rose;
        background-color: transparent;
      }
    }

    &__button {
      font-family: $font-family;
      font-size: 16px;
      line-height: 17px;

      position: absolute;
      top: 32px;
      right: 40px;

      width: 182px;
      height: 32px;

      color: $white;
      border: none;
      border-radius: 4px;
      background-color: $rose;

      &:hover,
      &:active {
        background-color: darken($rose, 10%);
      }
    }
  }
</style>