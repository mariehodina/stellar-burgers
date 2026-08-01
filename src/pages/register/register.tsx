import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { registerBurgerUser } from '../../services/slices/burgerUserSlice';

export const Register: FC = () => {
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authError = useSelector((state) => state.burgerUser.authError);
  const isAuthLoading = useSelector((state) => state.burgerUser.isAuthLoading);

  const handleRegisterSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerBurgerUser({
        name: registerName,
        email: registerEmail,
        password: registerPassword
      })
    )
      .unwrap()
      .then(() => {
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log('Ошибка регистрации:', err);
      });
  };

  return (
    <RegisterUI
      errorText={authError || ''}
      email={registerEmail}
      setEmail={setRegisterEmail}
      userName={registerName}
      setUserName={setRegisterName}
      password={registerPassword}
      setPassword={setRegisterPassword}
      handleSubmit={handleRegisterSubmit}
    />
  );
};