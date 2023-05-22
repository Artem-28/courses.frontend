<script setup lang="ts">
import { ref, reactive, computed, onUnmounted } from 'vue';
import ServiceAuth from 'src/api/service/ServiceAuth';

/* Composition */
// import you composition api...
import { useAppMessageStore } from 'stores/app-message-store';
import useValidateChangePasswordForm from 'src/composition/validate/useValidateChangePasswordForm';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import useConfirmCode from 'src/composition/useConfirmCode';

/* Components */
// import you components...
import BaseInputWrapper from 'components/base/BaseInputWrapper.vue';
import ConfirmCodeForm from 'components/form/ConfirmCodeForm.vue';
import BaseStepTemplate from 'components/base/BaseStepTemplate.vue';
import BaseInputPassword from 'components/base/BaseInputPassword.vue';

/* Types */
// declare components component...
import { IChangePasswordForm } from 'src/types/type-component-props';

/* Props */
// property default value...

/* Emits */

/* Data */
// declare reactive variables...
const steps = ['base', 'confirm', 'reset'];
const currentStep = ref<string>('base');
const loading = ref<boolean>(false);
const formVisible = ref<boolean>(true);
const formData = reactive<IChangePasswordForm>({
  email: '',
  password: '',
  confirmPassword: '',
  code: ''
});

/* Composition */
// declare you composition api...
const router = useRouter();
const {
  code,
  sendCode,
  checkCode,
  logCheckCode,
  codeTime,
  confirmDelay
} = useConfirmCode('change_password');
const { validate, errorMessage } = useValidateChangePasswordForm(formData);
const { getMessage, clear: clearError } = useAppMessageStore();
const { t: $t } = useI18n();

/* Life hooks */
// life cycle hooks...
onUnmounted(() => {
  clearError();
});

/* Computed */
// you computational properties...
const errorResponse = computed(() => {
  const errors = { email: '', code: '' };
  const loginError = getMessage('login_not_exist');
  const confirmCodeError = getMessage('confirm_code', 'confirm_code_live', 'confirm_code_match');
  if (loginError) {
    errors.email = $t(loginError.value);
  }
  if (confirmCodeError) {
    errors.code = $t(confirmCodeError.value);
  }
  return errors;
});

/* Methods */
// promote your methods...
// Запрос на проверку регистрации email в системе
async function checkExistsLoginHandle() {
  const data = await ServiceAuth.checkExistsEmail(formData.email);
  return data && data.exists;
}

async function sendCodeHandle() {
  loading.value = true;
  await sendCode({ email: formData.email });
  loading.value = false;
  return code.value;
}

// Обработка 1 Шага смены пароля
async function continueBaseHandler() {
  // Очищаем ошибки
  clearError();
  const { email } = validate.value;
  email.$touch();
  // Валидируем email
  if (email.$error) return;

  loading.value = true;
  // Проверяем зарегистрирован ли такой email
  const isValidLogin = await checkExistsLoginHandle();

  // Если email зарегистрирован
  if (isValidLogin) {
    // Проверяем был ли ранее отправлен код подтвердления
    await checkCode({ email: formData.email });
  }

  // Если срок жизни кода подтверждения истек отправляем код еще раз
  if (isValidLogin && !code.value.live.valid) {
    await sendCodeHandle();
  }

  // Если под был отправлен переходим и email зарегистрирован
  if (isValidLogin && code.value) {
    // Переходим к следующиму шагу
    currentStep.value = 'confirm';
  }

  loading.value = false;
}

// Обработка 2 Шага смены пароля
async function continueConfirmHandler() {
  // Очищаем ошибки
  clearError();
  validate.value.code.$touch();
  // Валидируем код подтверждения
  if (validate.value.code.$error) return;

  loading.value = true;
  // Проверяем введенный код подтверждения
  await checkCode({ email: formData.email, code: formData.code });
  // Логируем результаты проверки (локируются во vuex app-message)
  logCheckCode();
  // Валидация кода подтвержденя
  const isValidCode = code.value.live.valid && code.value.matches;

  // Если код валидный переходим к следубщиму шагу
  if (isValidCode) {
    currentStep.value = 'reset';
  }

  loading.value = false;
}

async function continueResetHandler() {
  // Очищаем ошибки
  clearError();
  validate.value.$touch();
  // Валидируем форму
  if (validate.value.$error) return;
  loading.value = true;
  // Отправляем запрос на изменение пароля
  const success = await ServiceAuth.changePassword(formData);
  loading.value = false;
  // Если пароль успешно изменен
  if (success) {
    formVisible.value = false;
    return;
  }
  // Если возникла ошибка с типам email
  if (errorResponse.value.email) {
    // переходим на шаг ввода email
    currentStep.value = 'base';
    return;
  }
  // Если возникла ошибка с типом 'confirm_code'
  if (errorResponse.value.code) {
    // Сбрасываем задержку отправки кода подтверждения
    code.value.resetDelay();
    // Переходим на вкладку кода подтверждения
    currentStep.value = 'confirm';
  }
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
        <span
          class="forgot-password-page__step"
          v-text="$t('base.step', { current: step.current, count: step.count })"
        />
      </template>

      <template v-slot:base>
        <h5 class="forgot-password-page__title" v-text="$t('forgot_password.base.header')" />
        <p class="forgot-password-page__message" v-text="$t('forgot_password.base.message')" />
        <div class="forgot-password-page__form">
          <base-input-wrapper :label="$t('input.label.email')">
            <q-input
              v-model="formData.email"
              :error="validate.email.$error || !!errorResponse.email"
              :error-message="errorMessage.email || errorResponse.email"
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
          <ConfirmCodeForm
            v-model="formData.code"
            :send-code-method="sendCodeHandle"
            :delay="confirmDelay"
            :error="validate.code.$error || !!errorResponse.code"
            :error-message="errorMessage.code || errorResponse.code"
          />
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
            :error="validate.password.$error"
            :error-message="errorMessage.password"
            outline
            :label="$t('input.label.password')"
            :placeholder="$t('input.placeholder.password')"
          />
          <base-input-password
            v-model="formData.confirmPassword"
            :error="validate.confirmPassword.$error"
            :error-message="errorMessage.confirmPassword"
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
