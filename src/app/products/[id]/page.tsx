'use client';

import { ProtectedRoute } from '@/hooks/useProtectedRoute';
import ProductDetailComponent from './ProductDetailComponent';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <ProductDetailComponent id={params.id} />
    </ProtectedRoute>
  );
}