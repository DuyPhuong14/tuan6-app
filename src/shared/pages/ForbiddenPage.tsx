import { Link } from 'react-router-dom';

export function ForbiddenPage() {
  return (
    <div className="container">
      <h2>403 - Bạn không có quyền truy cập trang này</h2>
      <Link to="/">Về trang chủ</Link>
    </div>
  );
}
