import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

export const isUserUnauthorized = (user: any) => {
  return (user && user?.plan && user?.plan.id === 0) || (user && !user?.plan);
};

export const redirectUser = () => {
  const router = useRouter();
  router.push(paths.pricing);
};
