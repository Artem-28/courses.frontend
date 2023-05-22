import { computed, ref } from 'vue';
import moment from 'moment/moment';
import BaseConfirmCode from 'src/models/confirm-code/BaseConfirmCode';
import { ICodePayload } from 'src/types/type-api';
import { FCompositionUseConfirmCode } from 'src/types/type-composition';
import confirmCodeFactory from 'src/factories/confirm-code-factory';
import ServiceConfirmCode from 'src/api/service/ServiceConfirmCode';
import BaseAppMessage from 'src/models/app-messgae/BaseAppMessage';

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

  async function checkCode(data: { email: string }) {
    const payload: ICodePayload = { ...data, type };
    code.value = await ServiceConfirmCode.checkCode(payload);
  }

  function logCheckCode() {
    const appMessage = new BaseAppMessage();
    const { live, matches } = code.value;
    if (!live.valid) {
      appMessage.info('validate_message.confirm_code.live').set('confirm_code_live');
    }
    if (!matches) {
      appMessage.info('validate_message.confirm_code.match').set('confirm_code_match');
    }
  }

  async function sendCode(data: { email: string }) {
    const payload: ICodePayload = { ...data, type };
    // Отправляем запрос на получение нового кода
    code.value = await ServiceConfirmCode.sendCode(payload);
  }

  return {
    code,
    confirmDelay,
    codeTime,
    sendCode,
    checkCode,
    logCheckCode
  };
};

export default useConfirmCode;
