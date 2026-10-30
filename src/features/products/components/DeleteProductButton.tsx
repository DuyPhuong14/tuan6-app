import { withPermission } from '@/features/auth';
import { Modal } from '@/shared/components/Modal';
import { useDeleteProduct } from '../hooks/useProducts';
import type { Product } from '../types';

interface Props {
  product: Product;
}

function BaseDeleteButton({ product }: Props) {
  const { mutate, isPending } = useDeleteProduct();

  return (
    <Modal>
      <Modal.Trigger>
        <button>Xóa</button>
      </Modal.Trigger>
      <Modal.Content>
        <h3>Xóa &quot;{product.title}&quot;?</h3>
        <Modal.Close>
          <button>Hủy</button>
        </Modal.Close>{' '}
        <button disabled={isPending} onClick={() => mutate(product.id)}>
          Xác nhận xóa
        </button>
      </Modal.Content>
    </Modal>
  );
}

// Áp HOC ở đây, nhưng export một function component thật để Fast Refresh nhận diện được
const GuardedDeleteButton = withPermission(BaseDeleteButton, 'product:delete');

export function DeleteProductButton(props: Props) {
  return <GuardedDeleteButton {...props} />;
}
