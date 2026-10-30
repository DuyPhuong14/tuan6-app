import { Link, Outlet } from 'react-router-dom';
import { useAuthStore, useLogout } from '@/features/auth';
import { useCartStore } from '@/features/cart';
import { can } from '@/shared/permissions';

export function AppLayout() {
  const user = useAuthStore((s) => s.user);
  const count = useCartStore((s) => s.items.reduce((sum, i) => sum + i.qty, 0));
  const logout = useLogout();

  return (
    <>
      <header className="header">
        <Link to="/">Sản phẩm</Link>
        <Link to="/cart">
          Giỏ hàng <span className="badge">{count}</span>
        </Link>
        {can(user?.role, 'product:create') && <Link to="/products/new">+ Thêm sản phẩm</Link>}
        <span className="spacer" />
        <span>
          {user?.firstName} ({user?.role})
        </span>
        <button onClick={logout}>Đăng xuất</button>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
