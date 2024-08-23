'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Snackbar, 
  Alert, 
  Grid 
} from '@mui/material';
import { supabase } from '@/lib/supabaseClient';
import Layout from '@/components/Layout';

interface ProductForm {
  id: string;
  name: string;
  brand: string;
  sku: string;
  ean: string;
  inventory: string;
  quantity: number;
  updated_at?: string;
}

export default function ProductDetailComponent({ id }: { id: string }) {
  const router = useRouter();
  const [product, setProduct] = useState<ProductForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      setError('Error fetching product: ' + error.message);
      console.error('Error fetching product:', error);
    } else {
      setProduct(data);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prev => prev ? { ...prev, [name]: name === 'quantity' ? parseInt(value) : value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!product) {
      setError('No product data to update');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('products')
      .update({ 
        ...product, 
        updated_at: new Date().toISOString(),
        quantity: parseInt(product.quantity.toString())
      })
      .eq('id', id)
      .select();

    if (error) {
      setError('Error updating product: ' + error.message);
      console.error('Error updating product:', error);
      setLoading(false);
    } else {
      setSuccessMessage('Product updated successfully');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
  };

  if (loading) return <Layout><Typography>Loading...</Typography></Layout>;
  if (!product) return <Layout><Typography>Product not found</Typography></Layout>;

  return (
    <Layout>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Product
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              label="Product Name"
              value={product.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="brand"
              label="Brand"
              value={product.brand}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="sku"
              label="SKU"
              value={product.sku}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="ean"
              label="EAN"
              value={product.ean}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="inventory"
              label="Warehouse"
              value={product.inventory}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="quantity"
              label="Quantity"
              type="number"
              value={product.quantity}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }} 
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Product'}
        </Button>
      </Box>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage(null)}>
        <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
}