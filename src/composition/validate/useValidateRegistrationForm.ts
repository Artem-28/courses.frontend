import { email, helpers, required, sameAs } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useI18n } from 'vue-i18n';
import { FCompositionUseValidate } from 'src/types/type-composition';
import { IRegistrationForm } from 'src/types/type-component-props';
import useValidateMessage from 'src/composition/validate/useValidateMessage';

const useValidateRegistrationForm: FCompositionUseValidate = (formData) => {
  const { t: $t } = useI18n();

  const formRules = {
    email: {
      required: helpers.withMessage($t('validate_message.email.required'), required),
      email: helpers.withMessage($t('validate_message.email.email'), email)
    },
    password: {
      required: helpers.withMessage($t('validate_message.password.required'), required)
    },
    confirmPassword: {
      sameAsPassword: helpers.withMessage($t('validate_message.confirm_password.same_as'), sameAs(formData.password))
    }
  };

  const validate = useVuelidate(formRules, formData as IRegistrationForm);
  const { errorMessage } = useValidateMessage(validate, ['email', 'password', 'confirmPassword']);

  return {
    validate,
    errorMessage
  };
};

export default useValidateRegistrationForm;
