'use client';

import { Suspense, useState, useEffect } from 'react';
import ProductList from './products/page';
import Layout from '@/components/Layout';
import { ProtectedRoute } from '@/hooks/useProtectedRoute';
import SplashScreen from '@/components/SplashScreen';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Hide splash screen after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ProtectedRoute>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Layout>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Suspense fallback={<div>Loading...</div>}>
              <ProductList />
            </Suspense>
          </main>
        </Layout>
      )}
    </ProtectedRoute>
  );
}