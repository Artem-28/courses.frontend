<script setup lang="ts">
import { defineEmits, defineProps, withDefaults, ref, onMounted } from 'vue';

/* Composition */
// import you composition api...
import useTimer from 'src/composition/useTimer';

/* Components */
// import you components...
import BaseInputWrapper from 'components/base/BaseInputWrapper.vue';
import useModel from 'src/composition/useModel';
import BaseConfirmCode from 'src/models/confirm-code/BaseConfirmCode';

/* Types */
// declare components component...
interface Props {
  modelValue: string,
  sendCodeMethod: () => Promise<BaseConfirmCode>;
  disable?: boolean,
  delay?: number,
  error?: boolean,
  errorMessage?: string,
}
interface Emit {
  (e: 'update:modelValue', value: string): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  disable: false,
  error: false
});

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...
const code = useModel(props, emit);
const visibleSendCodeBtn = ref<boolean>(false);

/* Composition */
// declare you composition api...
const { formatterTimer, setTimer, startTimer } = useTimer({ stop: stopTimerHandler });

/* Life hooks */
// life cycle hooks...
onMounted(() => {
  if (!props.delay) return;
  startTimerHandle(props.delay);
});

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
function stopTimerHandler() {
  visibleSendCodeBtn.value = false;
}
function startTimerHandle(delay: number) {
  setTimer(delay);
  startTimer();
  visibleSendCodeBtn.value = true;
}

async function sendCodeHandler() {
  const codeModel = await props.sendCodeMethod();
  if (!codeModel.delay.valid) return;
  startTimerHandle(codeModel.delay.time);
}
</script>

<template>
  <div class="confirm-code-form">
    <base-input-wrapper
      :label="$t('input.label.confirm_code')"
      class="confirm-code-form__control"
    >
      <q-input
        v-model="code"
        mask="######"
        :disable="disable"
        :error="error"
        :error-message="errorMessage"
        outlined
        :placeholder="$t('input.placeholder.confirm_code')"
      />
    </base-input-wrapper>
    <q-btn
      v-if="!visibleSendCodeBtn"
      :disable="disable"
      class="confirm-code-form__btn"
      color="primary"
      no-caps
      :label="$t('button.send_code')"
      @click="sendCodeHandler"
    />
    <div v-else class="confirm-code-form__message">
      Отправить повторно через: {{ formatterTimer }}
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.confirm-code-form {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 12px;
  &__control {
    flex-grow: 1;
  }
  &__message {
    text-align: center;
    font-weight: 600;
    color: $text-body-secondary;
    flex-basis: 160px;
    margin-bottom: 24px;
  }
  &__btn {
    padding: 0;
    flex-basis: 160px;
    margin-bottom: 24px;
  }
}
</style>
