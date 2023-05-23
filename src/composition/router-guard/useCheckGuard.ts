import { FCompositionUseCheckGuard } from 'src/types/type-composition';

const useCheckGuard: FCompositionUseCheckGuard = (modules) => {
  async function guardModules() {
    if (modules === 'authorized') {
      const guard = await import('src/composition/router-guard/useRouterGuardAuthorized');
      return guard.default();
    }
  }

  async function guard() {
    const module = await guardModules();
    return !!module && await module.guard();
  }

  return { guard };
};

export default useCheckGuard;
