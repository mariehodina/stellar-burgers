import { FC } from 'react';
import { OrdersList } from '@components';
import { ProfileOrdersUIProps } from './type';
import styles from './profile-orders.module.css';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => (
  <div className={styles.wrap}>
    <OrdersList orders={orders} />
  </div>
);
