import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
<<<<<<< HEAD
import { registerBurgerUser } from '../../services/slices/burgerUserSlice';

export const Register: FC = () => {
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
=======
import { registerUser } from '../../services/slices/userSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.user.loginUserError);
  const isLoading = useSelector((state) => state.user.loginUserRequest);
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776

  const authError = useSelector((state) => state.user.authError);
  const isAuthLoading = useSelector((state) => state.user.isAuthLoading);

  const handleRegisterSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    dispatch(
      registerBurgerUser({
        name: registerName,
        email: registerEmail,
        password: registerPassword
      })
    )
=======
    dispatch(registerUser({ email, name: userName, password }))
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
      .unwrap()
      .then(() => {
        navigate('/', { replace: true });
      })
      .catch(() => {});
  };

  return (
    <RegisterUI
<<<<<<< HEAD
      errorText={authError || ''}
      email={registerEmail}
      setEmail={setRegisterEmail}
      userName={registerName}
      setUserName={setRegisterName}
      password={registerPassword}
      setPassword={setRegisterPassword}
      handleSubmit={handleRegisterSubmit}
=======
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
    />
  );
};
