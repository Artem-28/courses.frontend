<script setup lang="ts">
import { computed, defineEmits, defineProps, onUnmounted, reactive, ref, withDefaults } from 'vue';

/* Composition */
// import you composition api...
import useValidateRegistrationForm from 'src/composition/validate/useValidateRegistrationForm';
import useConfirmCode from 'src/composition/useConfirmCode';
import { useAppMessageStore } from 'stores/app-message-store';
import { useI18n } from 'vue-i18n';

/* Components */
// import you components...
import BaseInputWrapper from 'components/base/BaseInputWrapper.vue';
import BaseInputPassword from 'components/base/BaseInputPassword.vue';
import ConfirmCodeForm from 'components/form/ConfirmCodeForm.vue';

/* Types */
// declare components component...
import { IRegistrationForm } from 'src/types/type-component-props';
import BaseStepTemplate from 'components/base/BaseStepTemplate.vue';

interface Props {
  checkLoginMethod?: (login: string) => Promise<boolean> | boolean,
}

interface Emit {
  (e: 'loadingForm', value: boolean): void;
  (e: 'submit', payload: IRegistrationForm): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  checkLoginMethod: () => false
});

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...
const formData = reactive<IRegistrationForm>({
  email: '',
  password: '',
  confirmPassword: '',
  code: '',
  licenseAgreement: false
});
const steps = ['base', 'confirm'];
const currentStep = ref<string>('base');

/* Composition */
// declare you composition api...
const { validate, errorMessage } = useValidateRegistrationForm(formData);
const { code, sendCode, checkCode, codeTime, confirmDelay } = useConfirmCode('registration');
const { getMessage, clear: clearError } = useAppMessageStore();
const { t: $t } = useI18n();

/* Life hooks */
// life cycle hooks...
onUnmounted(() => {
  clearError('login', 'confirm_code');
});

/* Computed */
// you computational properties...
const errorResponse = computed(() => {
  const errors = { email: '', code: '' };
  const loginError = getMessage('login', 'login_exists');
  const confirmCodeError = getMessage('confirm_code');
  if (loginError) {
    errors.email = $t(loginError.value);
  }
  if (confirmCodeError) {
    errors.code = $t(confirmCodeError.value);
  }
  return errors;
});

const disableSubmitBtn = computed(() => {
  return !formData.licenseAgreement;
});

/* Methods */
// promote your methods...
async function validateLoginHandle() {
  const exists = await props.checkLoginMethod(formData.email);
  if (typeof exists === 'boolean') return !exists;
  return false;
}

async function sendCodeHandle() {
  emit('loadingForm', true);
  await sendCode({ email: formData.email });
  emit('loadingForm', false);
  return code.value;
}

async function continueHandler() {
  clearError('login', 'confirm_code');

  const { email, password, confirmPassword } = validate.value;
  email.$touch();
  password.$touch();
  confirmPassword.$touch();
  const isErrorForm = email.$error || password.$error || confirmPassword.$error;

  if (isErrorForm) return;

  emit('loadingForm', true);
  // Отправляем код подтверждения
  const isValidLogin = await validateLoginHandle();

  if (isValidLogin) {
    await checkCode({ email: formData.email });
  }

  if (isValidLogin && !code.value.live.valid) {
    await sendCodeHandle();
  }
  // Если под был отправлен переходим к следующиму шагу
  if (isValidLogin && code.value) {
    currentStep.value = 'confirm';
  }

  emit('loadingForm', false);
}

async function sendFormHandle() {
  clearError('login', 'confirm_code');
  validate.value.$touch();
  if (validate.value.$error) return;
  emit('submit', formData);
}
</script>

<template>
  <base-step-template
    v-model="currentStep"
    :next-visible-button-mode="false"
    :steps="steps"
  >
    <template v-slot:base >
      <div class="registration-form">
        <base-input-wrapper :label="$t('input.label.email')">
          <q-input
            v-model="formData.email"
            outlined
            :error="validate.email.$error || !!errorResponse.email"
            :error-message="errorMessage.email || errorResponse.email"
            :placeholder="$t('input.placeholder.email')"
          />
        </base-input-wrapper>
        <base-input-password
          v-model="formData.password"
          outline
          :error="validate.password.$error"
          :error-message="errorMessage.password"
          :label="$t('input.label.password')"
          :placeholder="$t('input.placeholder.password')"
        />
        <base-input-password
          v-model="formData.confirmPassword"
          outline
          :error="validate.confirmPassword.$error"
          :error-message="errorMessage.confirmPassword"
          :label="$t('input.label.confirm_password')"
          :placeholder="$t('input.placeholder.confirm_password')"
        />
        <q-btn
          color="primary"
          no-caps
          :label="$t('button.continue')"
          class="registration-form__send-button"
          @click="continueHandler"
        />
      </div>
    </template>

    <template v-slot:confirm >
      <div class="registration-form confirm-form">
        <span class="confirm-form__message" v-if="code">
          {{ $t('confirm_message.registration') }}
          {{ $t('base.code_valid_until') }}
          <strong class="message-time" v-text="codeTime.live" />
        </span>

        <ConfirmCodeForm
          v-model="formData.code"
          :send-code-method="sendCodeHandle"
          :delay="confirmDelay"
          :error="validate.code.$error || !!errorResponse.code"
          :error-message="errorMessage.code || errorResponse.code"
        />

        <div class="confirm-form__accept">
          <q-checkbox size="24px" v-model="formData.licenseAgreement" />
          <div class="accept-message">
            {{ $t('base.i_agree') }}
            {{ $t('base.with') }}
            <a href="#" class="accept-message__link" v-text="$t('base.terms_use')" />
            {{ $t('base.and') }}
            <a href="#" class="accept-message__link" v-text="$t('base.privacy_policy')" />
            {{ $t('base.service') }}
          </div>
        </div>
        <q-btn
          color="primary"
          :disable="disableSubmitBtn"
          no-caps
          :label="$t('button.registration')"
          @click="sendFormHandle"
        />
      </div>
    </template>

  </base-step-template>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.registration-form {
  display: flex;
  flex-direction: column;
  padding: 24px 88px 0;
  gap: 4px;
  &__send-button {
    margin-top: 36px;
  }
}
.confirm-form {
  gap: 24px;
  &__message {
    font-size: 14px;
    font-weight: 600;
    color: $text-body-secondary;
  }
  &__accept {
    margin-top: 36px;
    display: flex;
    gap: 8px;
  }
  .accept-message {
    color: $text-body-secondary;
    font-weight: 400;
    &__link {
      text-decoration: none;
      color: $text-body-secondary;
      transition: all 0.3s;
    }
    &__link:hover {
      color: $primary;
    }
  }
  .message-time {
    color: $text-body-primary;
  }
}
</style>
