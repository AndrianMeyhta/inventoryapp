'use client';

import { useState, useEffect } from 'react';
import { productApi, Product } from '@/lib/api';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product;
}

export default function ProductDialog({ open, onClose, onSuccess, product }: ProductDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        stock: product.stock.toString(),
      });
      setImagePreview(product.image_url || '');
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
      });
      setImagePreview('');
    }
    setImageFile(null);
    setErrors({});
  }, [product, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('stock', formData.stock);
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      if (product) {
        await productApi.update(product.id, formDataToSend);
      } else {
        await productApi.create(formDataToSend);
      }

      onSuccess();
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('Terjadi kesalahan saat menyimpan produk');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="backdrop-blur-xl bg-white/90 dark:bg-black/90 border border-white/20 dark:border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {product ? 'Edit Produk' : 'Tambah Produk Baru'}
          </DialogTitle>
          <DialogDescription>
            {product ? 'Perbarui informasi produk' : 'Isi informasi produk yang ingin ditambahkan'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Gambar Produk</Label>
            <div className="flex flex-col items-center gap-4">
              {imagePreview && (
                <div className="w-full h-48 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="w-full">
                <label
                  htmlFor="image"
                  className="flex items-center justify-center gap-2 w-full h-12 px-4 border-2 border-dashed border-input rounded-lg cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>{imageFile ? imageFile.name : 'Pilih Gambar'}</span>
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </div>
            </div>
            {errors.image && (
              <p className="text-sm text-red-600">{errors.image[0]}</p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Nama Produk <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Masukkan nama produk"
              className="bg-white/50 dark:bg-black/50"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name[0]}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Masukkan deskripsi produk"
              rows={4}
              className="bg-white/50 dark:bg-black/50"
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description[0]}</p>
            )}
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">
                Harga <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0"
                className="bg-white/50 dark:bg-black/50"
              />
              {errors.price && (
                <p className="text-sm text-red-600">{errors.price[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">
                Stok <span className="text-red-500">*</span>
              </Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="0"
                className="bg-white/50 dark:bg-black/50"
              />
              {errors.stock && (
                <p className="text-sm text-red-600">{errors.stock[0]}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="rounded-full"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full"
            >
              {loading ? 'Menyimpan...' : product ? 'Update' : 'Simpan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
