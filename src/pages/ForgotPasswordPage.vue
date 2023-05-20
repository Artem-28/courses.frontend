<script setup lang="ts">
import { defineEmits, defineProps, withDefaults, ref, reactive } from 'vue';

/* Composition */
// import you composition api...

/* Components */
// import you components...
import BaseInputWrapper from 'components/base/BaseInputWrapper.vue';
import ConfirmCodeForm from 'components/form/ConfirmCodeForm.vue';
import BaseStepTemplate from 'components/base/BaseStepTemplate.vue';
import { useRouter } from 'vue-router';
import { IRegistrationForm } from 'src/types/type-component-props';
import useConfirmCode from 'src/composition/useConfirmCode';
import BaseInputPassword from 'components/base/BaseInputPassword.vue';

/* Types */
// declare components component...

/* Props */
// property default value...

/* Emits */

/* Data */
// declare reactive variables...
const steps = ['base', 'confirm', 'reset'];
const currentStep = ref<string>('base');
const loading = ref<boolean>(false);
const formVisible = ref<boolean>(true);
const formData = reactive<IRegistrationForm>({
  email: 'artem.migkheev.git@gmail.com',
  password: '1',
  confirmPassword: '',
  accept: false
});

/* Composition */
// declare you composition api...
const router = useRouter();
const { code, sendCode, codeTime, confirmDelay } = useConfirmCode('change_password');

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
async function continueBaseHandler() {
  loading.value = true;
  // await sendCode({ email: formData.email });

  // Если под был отправлен переходим к следующиму шагу
  if (code.value) {
    currentStep.value = 'confirm';
  }

  loading.value = false;
}

function continueConfirmHandler() {
  loading.value = true;
  currentStep.value = 'reset';
  loading.value = false;
}

function continueResetHandler() {
  loading.value = true;
  formVisible.value = false;
  loading.value = false;
}
function exitFormHandle() {
  router.push('/auth');
}
</script>

<template>
  <div v-loading="loading" class="forgot-password-page">
    <base-step-template
      v-if="formVisible"
      v-model="currentStep"
      :steps="steps"
      :prev-visible-button-mode="true"
      :next-visible-button-mode="false"
      @exit="exitFormHandle"
    >
      <template v-slot:header="{ step }">
        <span class="forgot-password-page__step" v-text="$t('base.step', { ...step })" />
      </template>

      <template v-slot:base>
        <h5 class="forgot-password-page__title" v-text="$t('forgot_password.base.header')" />
        <p class="forgot-password-page__message" v-text="$t('forgot_password.base.message')" />
        <div class="forgot-password-page__form">
          <base-input-wrapper :label="$t('input.label.email')">
            <q-input
              v-model="formData.email"
              outlined
              :placeholder="$t('input.placeholder.email')"
            />
          </base-input-wrapper>
          <q-btn
            color="primary"
            no-caps
            :label="$t('button.continue')"
            class="forgot-password-page__form__btn"
            @click="continueBaseHandler"
          />
        </div>
      </template>

      <template v-slot:confirm>
        <h5 class="forgot-password-page__title" v-text="$t('forgot_password.confirm.header')" />
        <p class="forgot-password-page__message" v-if="code">
          {{ $t('forgot_password.confirm.message') }} <br/>
          {{ $t('base.code_valid_until') }}
          <strong class="message-time" v-text="codeTime.live" />
        </p>
        <div class="forgot-password-page__form">
          <ConfirmCodeForm :address="formData.email" :delay="confirmDelay" />
          <q-btn
            color="primary"
            no-caps
            :label="$t('button.confirm')"
            class="forgot-password-page__form__btn"
            @click="continueConfirmHandler"
          />
        </div>
      </template>

      <template v-slot:reset>
        <h5 class="forgot-password-page__title" v-text="$t('forgot_password.reset.header')" />
        <p class="forgot-password-page__message" v-text="$t('forgot_password.reset.message')" />
        <div class="forgot-password-page__form">
          <base-input-password
            v-model="formData.password"
            outline
            :label="$t('input.label.password')"
            :placeholder="$t('input.placeholder.password')"
          />
          <base-input-password
            v-model="formData.confirmPassword"
            outline
            :label="$t('input.label.confirm_password')"
            :placeholder="$t('input.placeholder.confirm_password')"
          />
          <q-btn
            color="primary"
            no-caps
            :label="$t('button.change_password')"
            class="forgot-password-page__form__btn"
            @click="continueResetHandler"
          />
        </div>
      </template>
    </base-step-template>
    <div v-if="!formVisible" class="forgot-password-page__success">
      <h5 class="forgot-password-page__title" v-text="$t('forgot_password.success.header')" />
      <p class="forgot-password-page__message" v-text="$t('forgot_password.success.message')" />
      <q-btn
        color="primary"
        no-caps
        :label="$t('button.ok')"
        class="forgot-password-page__success__btn"
        @click="exitFormHandle"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.forgot-password-page {
  position: relative;
  background: white;
  padding: 16px 16px 32px;
  border-radius: 8px;
  &__success {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__success__btn {
    width: 100px;
  }
  &__step {
    text-align: center;
    margin-top: 12px;
    color: $text-body-secondary;
  }
  &__title {
    margin: 24px 0 10px;
    text-align: center;
    width: 100%;
    font-weight: 700;
    color: $primary;
  }
  &__message {
    text-align: center;
    font-size: 14px;
    margin-bottom: 24px;
    padding: 0 40px;
    font-weight: 600;
    color: $text-body-secondary;
    .message-time {
      color: $text-body-primary;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 88px;
  }
  &__form__btn {
    margin-top: 36px;
  }
}
</style>
