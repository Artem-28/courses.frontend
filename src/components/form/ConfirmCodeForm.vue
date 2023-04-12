<script setup lang="ts">
import { defineEmits, defineProps, withDefaults, ref } from 'vue';

/* Composition */
// import you composition api...
import useTimer from 'src/composition/useTimer';

/* Components */
// import you components...
import BaseInputWrapper from 'components/base/BaseInputWrapper.vue';

/* Types */
// declare components component...
interface Props {
  value?: string;
}
interface Emit {
  (e: 'update:modelValue', value: string): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  value: ''
});

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...
const code = ref<string>('');

/* Composition */
// declare you composition api...
const { timer, setTimer, startTimer } = useTimer({ stop: stopTimerHandler });

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
function stopTimerHandler() {
  console.log('stop');
}

function sendCodeHandler() {
  setTimer(10);
  startTimer();
}
</script>

<template>
  <div class="confirm-code-form">
    {{ timer }}
    <base-input-wrapper
      :label="$t('input.label.confirm_code')"
      class="confirm-code-form__control"
    >
      <q-input
        v-model="code"
        mask="######"
        outlined
        :placeholder="$t('input.placeholder.confirm_code')"
      />
    </base-input-wrapper>
    <q-btn
      class="confirm-code-form__btn"
      color="primary"
      no-caps
      :label="$t('button.send_code')"
      @click="sendCodeHandler"
    />
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
  gap: 24px;
  &__control {
    flex-grow: 1;
  }
  &__btn {
    margin-bottom: 4px;
  }
}
</style>
