'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Box,
  useTheme
} from '@mui/material';
import { supabase } from '../../lib/supabaseClient';

interface Product {
  id: number;
  name: string;
  brand: string;
  sku: string;
  ean: string;
  inventory: string;
  quantity: number;
  updated_at: string;
}

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 3;
  const theme = useTheme();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('updated_at', { ascending: false })
      .range(0, itemsPerPage - 1);

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data as Product[]);
    }
    setLoading(false);
  };

  const handleShowMore = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('updated_at', { ascending: false })
      .range(products.length, products.length + itemsPerPage - 1);

    if (error) {
      console.error('Error fetching more products:', error);
    } else {
      setProducts((prevProducts) => [...prevProducts, ...(data as Product[])]);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh', p: 3 }}>
      <TableContainer component={Paper} sx={{ 
        bgcolor: 'background.paper',
        '& .MuiTableCell-root': {
          borderColor: theme.palette.divider,
        },
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>EAN</TableCell>
              <TableCell>Warehouse</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                <TableCell>
                  <Link href={`/products/${product.id}`} style={{ color: theme.palette.primary.main }}>
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.ean}</TableCell>
                <TableCell>{product.inventory}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{new Date(product.updated_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Button 
          onClick={handleShowMore} 
          disabled={loading}
          variant="contained"
          sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
        >
          {loading ? 'Loading...' : 'Show More'}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductListPage;