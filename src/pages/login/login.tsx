import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
<<<<<<< HEAD
import { loginBurgerUser } from '../../services/slices/burgerUserSlice';

export const Login: FC = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
=======
import { loginUser } from '../../services/slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const error = useSelector((state) => state.user.loginUserError);
  const isLoading = useSelector((state) => state.user.loginUserRequest);
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776

  const authError = useSelector((state) => state.user.authError);
  const isAuthLoading = useSelector((state) => state.user.isAuthLoading);
  const handleLoginSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    dispatch(loginBurgerUser({ email: userEmail, password: userPassword }))
=======
    dispatch(loginUser({ email, password }))
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
      .unwrap()
      .then(() => {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      })
      .catch(() => {});
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
