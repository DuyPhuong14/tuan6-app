import { Link } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import { useCartStore } from '@/features/cart';
import { can } from '@/shared/permissions';
import { DeleteProductButton } from '../components/DeleteProductButton';
import { useProducts } from '../hooks/useProducts';

export function ProductListPage() {
  const { data, isLoading, isError } = useProducts();
  const role = useAuthStore((s) => s.user?.role);
  const addToCart = useCartStore((s) => s.add);

  if (isLoading) return <p>Đang tải...</p>;
  if (isError || !data)
    return <p className="error">Không tải được dữ liệu. API đã chạy chưa (npm run api)?</p>;

  return (
    <>
      <h2>Sản phẩm</h2>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>${p.price}</td>
              <td>
                <button onClick={() => addToCart({ id: p.id, title: p.title, price: p.price })}>
                  Thêm vào giỏ
                </button>{' '}
                {can(role, 'product:update') && <Link to={`/products/${p.id}/edit`}>Sửa</Link>}{' '}
                <DeleteProductButton product={p} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
