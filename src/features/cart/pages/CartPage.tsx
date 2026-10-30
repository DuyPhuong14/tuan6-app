import { useCartStore } from '../store/cartStore';

export function CartPage() {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (items.length === 0) return <p>Giỏ hàng trống.</p>;

  return (
    <>
      <h2>Giỏ hàng</h2>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>SL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td>{i.title}</td>
              <td>${i.price}</td>
              <td>{i.qty}</td>
              <td>
                <button onClick={() => remove(i.id)}>Bỏ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <strong>Tổng: ${total}</strong> <button onClick={clear}>Xóa hết</button>
      </p>
    </>
  );
}
