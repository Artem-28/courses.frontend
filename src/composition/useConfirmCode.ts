import { computed, ref } from 'vue';
import moment from 'moment/moment';
import BaseConfirmCode from 'src/models/confirm-code/BaseConfirmCode';
import { ICodePayload } from 'src/types/type-api';
import { FCompositionUseConfirmCode } from 'src/types/type-composition';
import confirmCodeFactory from 'src/factories/confirm-code-factory';
import ServiceConfirmCode from 'src/api/service/ServiceConfirmCode';

const useConfirmCode: FCompositionUseConfirmCode = (type) => {
  const factory = confirmCodeFactory;

  const code = ref<BaseConfirmCode>(factory.create(type));

  const confirmDelay = computed(() => {
    if (!code.value.delay.valid) return 0;
    return code.value.delay.time;
  });

  const codeTime = computed(() => {
    const live = moment(moment().unix() + code.value.live.time, 'X').format('DD.MM HH:mm');
    const delay = moment(moment().unix() + code.value.delay.time, 'X').format('DD.MM HH:mm');
    return { live, delay };
  });

  async function sendCode(data: { email: string }) {
    const payload: ICodePayload = { ...data, type };
    // Запрос на проверку случае если код был отправлен ранее
    code.value = await ServiceConfirmCode.checkCode(payload);
    // Если получили ошибку или если код еще валидный
    if (code.value.live.valid) return;
    // Отправляем запрос на получение нового кода
    code.value = await ServiceConfirmCode.sendCode(payload);
  }

  return {
    code,
    confirmDelay,
    codeTime,
    sendCode
  };
};

export default useConfirmCode;
