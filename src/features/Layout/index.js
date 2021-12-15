import AppNav from './AppNav';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <AppNav />
      <Outlet />
    </div>
  );
}
