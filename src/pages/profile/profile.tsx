import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateBurgerUserData } from '../../services/burgerSlices/burgerUserSlice';

export const Profile: FC = () => {
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setProfileForm((prevState) => ({
      ...prevState,
      name: currentUser?.name || '',
      email: currentUser?.email || ''
    }));
  }, [currentUser]);

  const isFormChanged =
    profileForm.name !== currentUser?.name ||
    profileForm.email !== currentUser?.email ||
    !!profileForm.password;

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateBurgerUserData(profileForm))
      .unwrap()
      .then(() => {
        setProfileForm((prev) => ({
          ...prev,
          password: ''
        }));
      })
      .catch(() => {});
  };

  const handleFormCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setProfileForm({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      password: ''
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={profileForm}
      isFormChanged={isFormChanged}
      handleCancel={handleFormCancel}
      handleSubmit={handleFormSubmit}
      handleInputChange={handleFormChange}
    />
  );
};