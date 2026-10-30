import { useState, type FormEvent } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useAuthStore } from '../store/authStore';

export function LoginPage() {
  const token = useAuthStore((s) => s.accessToken);
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/';

  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const { mutate, isPending, isError } = useLogin();

  if (token) return <Navigate to={from} replace />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ username, password });
  };

  return (
    <div className="container">
      <h2>Đăng nhập</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
        />
        <button type="submit" disabled={isPending}>
          {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
        {isError && <p className="error">Sai tài khoản hoặc mật khẩu</p>}
      </form>
    </div>
  );
}
