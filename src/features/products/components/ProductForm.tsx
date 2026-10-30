import { useState, type FormEvent } from 'react';
import type { ProductInput } from '../types';

interface Props {
  initial: ProductInput;
  submitting: boolean;
  onSubmit: (values: ProductInput) => void;
}

export function ProductForm({ initial, submitting, onSubmit }: Props) {
  const [title, setTitle] = useState(initial.title);
  const [price, setPrice] = useState(String(initial.price));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title: title.trim(), price: Number(price) });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tên sản phẩm"
        required
      />
      <input
        type="number"
        min={0}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit" disabled={submitting}>
        Lưu
      </button>
    </form>
  );
}
