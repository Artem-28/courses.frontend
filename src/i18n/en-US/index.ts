export default {
  base: {
    i_agree: 'Я соглашаюсь с',
    with: 'c',
    and: 'и',
    privacy_policy: 'Политикой конфиденциальности',
    terms_use: 'Условиями пользования',
    service: 'сервиса',
    step: 'EN|Шаг {current} из {count}',
    code_valid_until: 'EN|Код действителен до: '
  },
  error: {
    registration: {
      login_exists: 'EN|Пользователь с таким email уже зарегистрирован.',
      login_check: 'EN|Возникла ошибка при проверке email'
    }
  },
  auth: {
    login: 'Sing In',
    registration: 'Sing Up',
    forgot_password: 'Forgot password?'
  },
  forgot_password: {
    base: {
      header: 'EN|Восстановление пароля',
      message: 'EN|Введите ваш email который вы использовали при регистрации, для отправки инструкции по восстановлению пароля.'
    },
    confirm: {
      header: 'EN|Подтвердите электронную почту',
      message: 'EN|На вашу почту был отправен код для восстановления пароля.'
    },
    reset: {
      header: 'Изменение пароля',
      message: 'Придумайте ваш новый пароль'
    },
    success: {
      header: 'EN|Выполнено',
      message: 'EN|Ваш пароль был успешно изменен, старый пароль теперь недействителен.'
    }
  },
  button: {
    login: 'Sing In',
    send_code: 'EN|Отправить код',
    registration: 'EN|Зарегистрироваться',
    continue: 'EN|Продолжить',
    confirm: 'EN|Подтвердить',
    change_password: 'EN|Придумайте ваш новый пароль. После изменения пароля выш старый пароль будет недействителен.',
    ok: 'EN|Ок'
  },
  input: {
    label: {
      email: 'Email',
      password: 'Password',
      confirm_password: 'EN|Подтверждение пароля',
      confirm_code: 'EN|Код подтверждения'
    },
    placeholder: {
      email: 'input your email in here',
      password: 'input your password in here',
      confirm_password: 'EN|введите пароль еще раз',
      confirm_code: 'EN|введите код'
    }
  },
  validate_message: {
    email: {
      required: 'EN|поле email обязательно для заполнения',
      email: 'EN|некорректный email'
    },
    password: {
      required: 'EN|поле пароль обязательно для заполнения',
      min_length: 'EN|пароль должен содержать не менее {num} символов'
    },
    confirm_password: {
      same_as: 'EN|пароли не совпадают'
    }
  },
  confirm_message: {
    registration: 'EN|На вашу почту был отправен код для подтверждения регистрации.',
    forgot_password: 'На вашу почту был отправен код для восстановления пароля.'
  }
};
