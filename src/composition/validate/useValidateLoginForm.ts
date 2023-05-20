import { email, helpers, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useI18n } from 'vue-i18n';
import { FCompositionUseValidate } from 'src/types/type-composition';
import useValidateMessage from 'src/composition/validate/useValidateMessage';

const useValidateLoginForm: FCompositionUseValidate = (formData) => {
  const { t: $t } = useI18n();

  const formRules = {
    email: {
      required: helpers.withMessage($t('validate_message.email.required'), required),
      email: helpers.withMessage($t('validate_message.email.email'), email)
    },
    password: {
      required: helpers.withMessage($t('validate_message.password.required'), required)
    }
  };

  const validate = useVuelidate(formRules, formData);
  const { errorMessage } = useValidateMessage(validate, ['email', 'password']);

  return {
    validate,
    errorMessage
  };
};

export default useValidateLoginForm;
