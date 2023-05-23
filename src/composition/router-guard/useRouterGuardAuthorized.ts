import { FCompositionUseRouterGuard } from 'src/types/type-composition';
import ServiceAuth from 'src/api/service/ServiceAuth';
import { useAuthUserStore } from 'stores/models/auth-user-store';

const useRouterGuardAuthorized: FCompositionUseRouterGuard = () => {
  const { user, create } = useAuthUserStore();

  async function getAuthUser() {
    const authUser = await ServiceAuth.authUser();
    if (!authUser) return;
    create(authUser);
    return authUser;
  }

  function check() {
    return !!user;
  }

  async function guard() {
    if (check()) return true;
    const authUser = await getAuthUser();
    return !!authUser;
  }

  return { guard };
};

export default useRouterGuardAuthorized;
