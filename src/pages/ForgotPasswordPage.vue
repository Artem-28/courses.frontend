<script setup lang="ts">
import { defineEmits, defineProps, withDefaults, ref } from 'vue';

/* Composition */
// import you composition api...

/* Components */
// import you components...
import BaseInputWrapper from 'components/base/BaseInputWrapper.vue';
import ConfirmCodeForm from 'components/form/ConfirmCodeForm.vue';

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
const email = ref<string | null>(null);
const step = ref<string>('email');

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
  <div class="forgot-password-page">
    <div class="forgot-password-page__title">
      <span v-text="$t('auth.restore_password')"/>
    </div>
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
      class="forgot-password-page__stepper"
    >
      <q-step
        :title="$t('forgot_password_step.email')"
        name="email"
        icon="settings"
        class="forgot-password-page__step"
      >
        <base-input-wrapper :label="$t('input.label.email')">
          <q-input
            v-model="email"
            outlined
            :placeholder="$t('input.placeholder.email')"
          />
        </base-input-wrapper>
        <ConfirmCodeForm />
        <q-stepper-navigation>
          <q-btn
            color="primary"
            no-caps
            :label="$t('button.send_code')"
          />
        </q-stepper-navigation>
      </q-step>
      <q-step
        title="title"
        name="confirm"
        icon="settings"
      >
        <base-input-wrapper :label="$t('input.label.email')">
          <q-input
            v-model="email"
            outlined
            :placeholder="$t('input.placeholder.email')"
          />
        </base-input-wrapper>
      </q-step>
    </q-stepper>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.forgot-password-page {
  display: flex;
  flex-direction: column;
  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    color: $primary;
    box-shadow: 0px -2px 0px 0px $primary inset;
  }
  &__stepper {
    padding: 0;
    box-shadow: none;
  }
  //&__step-nav {
  //  display: flex;
  //  justify-content: flex-end;
  //}
  &__form {
    padding: 40px 104px 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
</style>
