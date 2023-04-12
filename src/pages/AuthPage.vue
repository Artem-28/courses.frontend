<script setup lang="ts">
import { ref } from 'vue';

/* Composition */
// import you composition api...

/* Components */
// import you components...
import LoginForm from 'components/form/LoginForm.vue';

/* Types */
// declare components component...

/* Props */
// property default value...

/* Emits */

/* Data */
// declare reactive variables...
const tab = ref<string>('login');

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
  <div class="auth-page">
    <q-tabs
      v-model="tab"
      class="text-body-secondary"
      no-caps
      active-color="primary"
      indicator-color="primary"
      align="justify"
    >
      <q-tab name="login" :ripple="false" :label="$t('auth.login')" />
      <q-tab name="registration" :ripple="false" :label="$t('auth.registration')" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="login" class="auth-page__tab-content">
        <LoginForm />
      </q-tab-panel>
      <q-tab-panel name="registration">Login</q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<style lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.auth-page {
  .q-tab {
    box-shadow: 0px -2px 0px 0px $primary-10 inset;
    &__label {
      font-size: 16px;
      font-weight: 700;
    }
  }
  &__tab-content {
    padding: 40px 104px 0;
  }
}
</style>
