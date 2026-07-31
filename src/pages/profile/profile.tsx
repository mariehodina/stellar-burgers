import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
<<<<<<< HEAD
import { updateBurgerUserData } from '../../services/slices/burgerUserSlice';

export const Profile: FC = () => {
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [profileForm, setProfileForm] = useState({
=======
import { updateUser } from '../../services/slices/userSlice';

export const Profile: FC = () => {
  const user = useSelector((state) => state.user.user);

  const [formValue, setFormValue] = useState({
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
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

<<<<<<< HEAD
  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateBurgerUserData(profileForm))
      .unwrap()
      .then(() => {
        setProfileForm((prev) => ({
=======
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue))
      .unwrap()
      .then(() => {
        setFormValue((prev) => ({
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
          ...prev,
          password: ''
        }));
      })
      .catch(() => {});
  };

  const handleFormCancel = (e: SyntheticEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    setProfileForm({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
=======
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
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
