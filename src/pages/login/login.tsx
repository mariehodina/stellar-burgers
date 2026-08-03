import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { loginBurgerUser } from '../../services/slices/burgerUserSlice';

export const Login: FC = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const authError = useSelector((state) => state.burgerUser.authError);
  const isAuthLoading = useSelector((state) => state.burgerUser.isAuthLoading);

  const handleLoginSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginBurgerUser({ email: userEmail, password: userPassword }))
      .unwrap()
      .then(() => {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log('Ошибка входа:', err);
      });
  };

  return (
    <LoginUI
      errorText={authError || ''}
      email={userEmail}
      setEmail={setUserEmail}
      password={userPassword}
      setPassword={setUserPassword}
      handleSubmit={handleLoginSubmit}
    />
  );
};
