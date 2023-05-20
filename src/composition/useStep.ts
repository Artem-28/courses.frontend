import { computed, ref } from 'vue';
import { FCompositionStep } from 'src/types/type-composition';
import { IStep } from 'src/types/type-component-props';

const useStep: FCompositionStep = (stepsData, startStep?) => {
  const steps = computed(() => {
    return stepsData.map(step => {
      if (typeof step === 'string') return step;
      return step.value;
    });
  });

  const stepData = computed(() => {
    const idx = steps.value.indexOf(step.value);
    const currentStep = stepsData[idx];
    if (typeof currentStep === 'string') {
      return { value: currentStep } as IStep;
    }
    return currentStep;
  });

  const stepInfo = computed(() => {
    const idx = steps.value.indexOf(step.value);
    const stepCount = steps.value.length;
    return {
      start: idx === 0,
      end: idx === stepCount - 1,
      count: stepCount,
      current: idx + 1,
      stepValue: step.value
    };
  });

  const step = ref(startStep && steps.value.includes(startStep) ? startStep : steps.value[0]);

  function nextStep() {
    if (stepInfo.value.end) return stepData.value;
    const currentIndex = steps.value.indexOf(step.value);
    step.value = steps.value[currentIndex + 1];
    return stepData.value;
  }

  function prevStep() {
    if (stepInfo.value.start) return stepData.value;
    const currentIndex = steps.value.indexOf(step.value);
    step.value = steps.value[currentIndex - 1];
    return stepData.value;
  }

  function setStep(value: string) {
    if (!steps.value.includes(value)) return stepData.value;
    step.value = value;
    return stepData.value;
  }

  return {
    step: stepData,
    nextStep,
    prevStep,
    setStep,
    stepInfo
  };
};

export default useStep;
