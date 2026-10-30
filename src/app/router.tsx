import { createBrowserRouter } from 'react-router-dom';
import { LoginPage, ProtectedRoute, RoleGuard } from '@/features/auth';
import { CartPage } from '@/features/cart';
import { ProductFormPage, ProductListPage } from '@/features/products';
import { ForbiddenPage } from '@/shared/pages/ForbiddenPage';
import { AppLayout } from './AppLayout';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/403', element: <ForbiddenPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <ProductListPage /> },
          { path: '/cart', element: <CartPage /> },
          {
            element: <RoleGuard allow={['admin']} />,
            children: [{ path: '/products/new', element: <ProductFormPage /> }],
          },
          {
            element: <RoleGuard allow={['admin', 'moderator']} />,
            children: [{ path: '/products/:id/edit', element: <ProductFormPage /> }],
          },
        ],
      },
    ],
  },
]);
