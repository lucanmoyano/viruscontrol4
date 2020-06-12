import { getLoggedUser } from '../user';

const isLoggedUserGuard = () => {
  return getLoggedUser() !== null;
};

export default isLoggedUserGuard;
