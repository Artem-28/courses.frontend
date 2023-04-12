<script setup lang="ts">
import { defineEmits, defineProps, withDefaults, reactive } from 'vue';
import { LoginForm } from 'src/types/form';

/* Composition */
// import you composition api...

/* Components */
// import you components...
import BaseInputWrapper from 'components/base/BaseInputWrapper.vue';
import BaseInputPassword from 'components/base/BaseInputPassword.vue';

/* Types */
// declare components component...
interface Props {
  value?: string;
}
interface Emit {
  (e: 'update:modelValue', value: string): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  value: ''
});

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...
const loginForm = reactive<LoginForm>({
  email: null,
  password: null
});

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
  <div class="login-form">
    <base-input-wrapper :label="$t('input.label.email')">
      <q-input
        v-model="loginForm.email"
        outlined
        :placeholder="$t('input.placeholder.email')"
      />
    </base-input-wrapper>
    <base-input-password
      v-model="loginForm.password"
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
    <q-btn color="primary" no-caps :label="$t('button.login')" />
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  &__forgot-password-link {
    margin-left: auto;
    margin-bottom: 16px;
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
