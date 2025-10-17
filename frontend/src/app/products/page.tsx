'use client';

import { useEffect, useState } from 'react';
import { productApi, Product } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ProductDialog from '@/components/products/ProductDialog';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getAll();
      if (response.success && response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;

    try {
      await productApi.delete(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Gagal menghapus produk');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingProduct(undefined);
  };

  const handleSuccess = () => {
    fetchProducts();
    handleDialogClose();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Liquid Glass Effect */}
        <div className="backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-3xl p-8 mb-8 shadow-2xl shadow-purple-500/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Manajemen Produk
                </h1>
              </div>
            </div>
            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Produk
            </Button>
          </div>
          <p className="text-muted-foreground ml-16">
            Kelola semua produk inventori Anda di sini
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">Memuat produk...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-3xl p-12 text-center shadow-xl">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Belum ada produk</h3>
            <p className="text-muted-foreground mb-6">
              Mulai tambahkan produk pertama Anda
            </p>
            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Produk
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="backdrop-blur-xl bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {product.image_url && (
                  <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description || 'Tidak ada deskripsi'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Harga</span>
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        Rp {Number(product.price).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Stok</span>
                      <span className={`text-lg font-semibold ${product.stock > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
                        {product.stock} pcs
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(product)}
                    variant="outline"
                    className="flex-1 rounded-full border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    variant="outline"
                    className="flex-1 rounded-full border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Hapus
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ProductDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSuccess={handleSuccess}
        product={editingProduct}
      />
    </div>
  );
}
