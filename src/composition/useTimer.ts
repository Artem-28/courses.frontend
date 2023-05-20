import { ref, computed } from 'vue';
import moment from 'moment';
// eslint-disable-next-line no-undef
import Timeout = NodeJS.Timeout
import { FCompositionUseTimer } from 'src/types/type-composition';

const useTimer: FCompositionUseTimer = (hook?) => {
  const timer = ref<number>(0);
  let interval: Timeout | null = null;

  const formatterTimer = computed(() => {
    return moment(timer.value, 'X').format('mm:ss');
  });

  const stopTimer = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    timer.value = 0;
    if (hook && hook.stop) hook.stop();
  };

  const pauseTimer = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  const startTimer = () => {
    if (interval) return;
    interval = setInterval(() => {
      timer.value--;
      if (hook && hook.change) hook.change(timer.value);
      if (timer.value === 0) stopTimer();
    }, 1000);
  };

  const setTimer = (time: number) => {
    stopTimer();
    timer.value = time;
  };

  return {
    timer,
    formatterTimer,
    setTimer,
    stopTimer,
    startTimer,
    pauseTimer
  };
};

export default useTimer;
