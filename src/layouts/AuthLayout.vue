<script setup lang="ts">

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...

/* Props */
// property default value...

/* Emits */

/* Data */
// declare reactive variables...

/* Composition */
// declare you composition api...

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
</script>

<template>
  <q-layout view="lhr lpr lfr" class="auth-layout">
    <q-page-container class="auth-layout__content">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.auth-layout {
  background: $app-bg;
 &__content {
    padding: 180px calc(50% - 304px);
  }
}
</style>
