import { useNavigate, useParams } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';
import { useCreateProduct, useProduct, useUpdateProduct } from '../hooks/useProducts';

export function ProductFormPage() {
  const { id } = useParams();
  const productId = id ? Number(id) : undefined;
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(productId);
  const create = useCreateProduct();
  const update = useUpdateProduct();
  const goHome = () => navigate('/');

  if (productId === undefined) {
    return (
      <>
        <h2>Thêm sản phẩm</h2>
        <ProductForm
          initial={{ title: '', price: 0 }}
          submitting={create.isPending}
          onSubmit={(values) => create.mutate(values, { onSuccess: goHome })}
        />
      </>
    );
  }

  if (isLoading) return <p>Đang tải...</p>;
  if (isError || !product) return <p className="error">Không tìm thấy sản phẩm.</p>;

  return (
    <>
      <h2>Sửa sản phẩm</h2>
      <ProductForm
        key={product.id}
        initial={product}
        submitting={update.isPending}
        onSubmit={(values) => update.mutate({ id: product.id, ...values }, { onSuccess: goHome })}
      />
    </>
  );
}
