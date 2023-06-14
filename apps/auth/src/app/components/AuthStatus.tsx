import { useNavigate } from 'react-router-dom';

import { useAuth } from '../auth';

export function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  const onSignout = () => {
    auth.signout(() => navigate('/'));
  };

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{' '}
      <button onClick={onSignout}>Sign out</button>
    </p>
  );
}
