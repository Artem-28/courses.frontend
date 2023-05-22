import { computed } from 'vue';
import { email, helpers, required, sameAs, minLength } from '@vuelidate/validators';
import { FCompositionUseValidateChangePasswordForm } from 'src/types/type-composition';
import useVuelidate from '@vuelidate/core';
import { useI18n } from 'vue-i18n';
import useValidateMessage from 'src/composition/validate/useValidateMessage';

const useValidateChangePasswordForm: FCompositionUseValidateChangePasswordForm = (formData) => {
  const { t: $t } = useI18n();

  const password = computed(() => {
    return formData.password;
  });

  const formRules = {
    email: {
      required: helpers.withMessage($t('validate_message.email.required'), required),
      email: helpers.withMessage($t('validate_message.email.email'), email)
    },
    password: {
      required: helpers.withMessage($t('validate_message.password.required'), required),
      minLength: helpers.withMessage($t('validate_message.password.min_length', { num: 6 }), minLength(6))
    },
    confirmPassword: {
      sameAsPassword: helpers.withMessage($t('validate_message.confirm_password.same_as'), sameAs(password))
    },
    code: {
      required: helpers.withMessage($t('validate_message.confirm_code.required'), required)
    }
  };

  const validate = useVuelidate(formRules, formData);
  const { errorMessage } = useValidateMessage(validate, ['email', 'password', 'confirmPassword', 'code']);

  return {
    validate,
    errorMessage
  };
};

export default useValidateChangePasswordForm;
