import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
<<<<<<< HEAD
import { useDispatch } from '../../services/store';
import { logoutBurgerUser } from '../../services/slices/burgerUserSlice';
=======
import { useDispatch, useSelector } from '../../services/store';
import { logoutUser } from '../../services/slices/userSlice';
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
<<<<<<< HEAD
    dispatch(logoutBurgerUser())
=======
    dispatch(logoutUser())
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch(() => {});
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
