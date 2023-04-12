import { ref, computed } from 'vue';
// eslint-disable-next-line no-undef
import Timeout = NodeJS.Timeout
import { TimerHook } from 'src/types/hook';

function useTimer(hook?: TimerHook) {
  const timer = ref<number>(0);
  let interval: Timeout | null = null;

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
    interval = setInterval(() => {
      timer.value--;
      if (hook && hook.change) hook.change(timer.value);
      if (timer.value === 0) stopTimer();
    }, 1000);
  };

  const setTimer = (time: number) => {
    timer.value = time;
  };

  return {
    timer,
    setTimer,
    stopTimer,
    startTimer,
    pauseTimer
  };
}

export default useTimer;
