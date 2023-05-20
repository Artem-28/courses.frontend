<script setup lang="ts">
import { computed, reactive } from 'vue';

/* Composition */
// import you composition api...
import useValidateLoginForm from 'src/composition/validate/useValidateLoginForm';

/* Components */
// import you components...
import BaseInputWrapper from 'components/base/BaseInputWrapper.vue';
import BaseInputPassword from 'components/base/BaseInputPassword.vue';

/* Types */
// declare components component...
import { ILoginForm } from 'src/types/type-component-props';
import { useErrorStore } from 'stores/error-store';

interface Emit {
  (e: 'submit', payload: ILoginForm): void;
}

/* Props */
// property default value...

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...
const formData = reactive<ILoginForm>({
  email: 'artem.mikheev.git@gmail.com',
  password: '12345'
});

/* Composition */
// declare you composition api...
const { validate, errorMessage } = useValidateLoginForm(formData);
const { errorMessage: stateErrorMessage, clear: clearError } = useErrorStore();

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...
const errorResponse = computed(() => {
  return stateErrorMessage('login', 'axios-error');
});

/* Methods */
// promote your methods...
async function sendFormHandle() {
  clearError();
  validate.value.$touch();
  if (validate.value.$error) return;
  emit('submit', formData);
}
</script>

<template>
  <div class="login-form">
    <base-input-wrapper :label="$t('input.label.email')">
      <q-input
        v-model="formData.email"
        :error="validate.email.$error || !!errorResponse"
        :error-message="errorMessage.email || errorResponse"
        outlined
        :placeholder="$t('input.placeholder.email')"
      />
    </base-input-wrapper>
    <base-input-password
      v-model="formData.password"
      :error="validate.password.$error"
      :error-message="errorMessage.password"
      outline
      :label="$t('input.label.password')"
      :placeholder="$t('input.placeholder.password')"
    />
    <router-link
      to="auth/forgot"
      class="login-form__forgot-password-link"
    >
      {{ $t('auth.forgot_password') }}
    </router-link>
    <q-btn
      color="primary"
      no-caps
      :label="$t('button.login')"
      @click="sendFormHandle"
    />
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.login-form {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  &__forgot-password-link {
    margin-left: auto;
    margin-bottom: 36px;
    font-size: 16px;
    font-weight: bold;
    color: $text-body-secondary;
    text-decoration: none;
    transition: color 0.2s;
  }
  &__forgot-password-link:active {
    color: $text-body-secondary;
  }
  &__forgot-password-link:hover {
    color: $primary;
  }
}
</style>
