export default {
  base: {
    i_agree: 'Я соглашаюсь',
    with: 'c',
    and: 'и',
    privacy_policy: 'Политикой конфиденциальности',
    terms_use: 'Условиями пользования',
    service: 'сервиса',
    step: 'Шаг {current} из {count}',
    code_valid_until: 'Код действителен до: '
  },
  error: {
    registration: {
      login_exists: 'Пользователь с таким email уже зарегистрирован.',
      login_check: 'Возникла ошибка при проверке email'
    }
  },
  auth: {
    login: 'Вход',
    registration: 'Регистрация',
    forgot_password: 'Забыли пароль?'
  },
  forgot_password: {
    base: {
      header: 'Восстановление пароля',
      message: 'Введите ваш email который вы использовали при регистрации, для отправки инструкции по восстановлению пароля.'
    },
    confirm: {
      header: 'Подтвердите электронную почту',
      message: 'На вашу почту был отправен код для восстановления пароля.'
    },
    reset: {
      header: 'Изменение пароля',
      message: 'Придумайте ваш новый пароль. После изменения пароля выш старый пароль будет недействителен.'
    },
    success: {
      header: 'Выполнено',
      message: 'Ваш пароль был успешно изменен, старый пароль теперь недействителен.'
    }
  },
  button: {
    login: 'Вход',
    send_code: 'Отправить код',
    registration: 'Зарегистрироваться',
    continue: 'Продолжить',
    confirm: 'Подтвердить',
    change_password: 'Изменить пароль',
    ok: 'Ок'
  },
  input: {
    label: {
      email: 'Email',
      password: 'Пароль',
      confirm_password: 'Подтверждение пароля',
      confirm_code: 'Код подтверждения'
    },
    placeholder: {
      email: 'введите ваш email',
      password: 'введите ваш пароль',
      confirm_password: 'введите пароль еще раз',
      confirm_code: 'введите код'
    }
  },
  validate_message: {
    email: {
      required: 'поле email обязательно для заполнения',
      email: 'некорректный email'
    },
    password: {
      required: 'поле пароль обязательно для заполнения',
      min_length: 'пароль должен содержать не менее {num} символов'
    },
    confirm_password: {
      same_as: 'пароли не совпадают'
    }
  },
  confirm_message: {
    registration: 'На вашу почту был отправен код для подтверждения регистрации.',
    forgot_password: 'На вашу почту был отправен код для восстановления пароля.'
  }

};
