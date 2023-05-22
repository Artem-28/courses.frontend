<script setup lang="ts">
import { ref } from 'vue';
import ServiceAuth from 'src/api/service/ServiceAuth';

/* Composition */
// import you composition api...
import { useAuthUserStore } from 'stores/models/auth-user-store';
import { useRouter } from 'vue-router';

/* Components */
// import you components...
import LoginForm from 'components/form/LoginForm.vue';
import RegistrationForm from 'components/form/RegistrationForm.vue';

/* Types */
// declare components component...
import { ILoginForm, IRegistrationForm } from 'src/types/type-component-props';

/* Props */
// property default value...

/* Emits */

/* Data */
// declare reactive variables...
const tab = ref<string>('login');
const loading = ref<boolean>(false);

/* Composition */
// declare you composition api...
const router = useRouter();
const { create: createUser } = useAuthUserStore();

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
function toggleLoading(value: boolean) {
  loading.value = value;
}

async function loginHandle(payload: ILoginForm) {
  toggleLoading(true);
  const user = await ServiceAuth.login(payload);
  if (user) {
    createUser(user);
    await router.push('/');
  }
  toggleLoading(false);
}

async function registrationHandle(payload: IRegistrationForm) {
  toggleLoading(true);
  const success = await ServiceAuth.registration(payload);
  if (success) {
    await loginHandle(payload);
  }
  toggleLoading(false);
}

async function checkExistsLoginHandle(login: string) {
  const data = await ServiceAuth.checkExistsEmail(login);
  return data && data.exists;
}

</script>

<template>
  <div v-loading="loading" class="auth-page">
    <q-tabs
      v-model="tab"
      class="text-body-secondary"
      no-caps
      active-color="primary"
      indicator-color="primary"
      align="justify"
    >
      <q-tab
        name="login"
        :ripple="false"
        :label="$t('auth.login')"
      />
      <q-tab
        name="registration"
        :ripple="false"
        :label="$t('auth.registration')"
      />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="login" class="tab-login">
        <LoginForm @submit="loginHandle" />
      </q-tab-panel>

      <q-tab-panel name="registration" class="tab-registration">
        <RegistrationForm
          :check-login-method="checkExistsLoginHandle"
          @loading-form="toggleLoading"
          @submit="registrationHandle"
        />
      </q-tab-panel>
    </q-tab-panels>

  </div>
</template>

<style lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.auth-page {
  position: relative;
  padding: 16px 0 32px;
  background: white;
  border-radius: 8px;
  .q-tab {
    width: 50%;
    box-shadow: 0px -4px 0px 0px $primary-10 inset;
    &__label {
      font-size: 16px;
      font-weight: 700;
    }
  }
  .tab-login {
    padding: 40px 104px 0;
  }
  .tab-registration {
    padding: 16px 16px 0;
  }
  .q-panel {
    overflow: hidden;
  }
}
</style>
