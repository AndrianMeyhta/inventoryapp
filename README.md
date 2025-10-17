# Inventory App - Full Stack CRUD Application

Aplikasi manajemen inventori dengan fitur CRUD lengkap untuk produk, termasuk upload gambar.

## Tech Stack

### Backend
- Laravel 11
- PostgreSQL
- API RESTful

### Frontend
- Next.js 15
- TailwindCSS v4
- Shadcn UI
- Liquid Glass Theme

## Features

✅ **CRUD Operations**
- Create, Read, Update, Delete produk
- Upload dan manage gambar produk
- Validasi form
- Error handling

✅ **Product Management**
- Nama produk
- Deskripsi
- Harga
- Stok
- Gambar/Cover produk

✅ **Modern UI**
- Liquid Glass theme dengan backdrop blur
- Responsive design
- Beautiful gradients
- Smooth animations

## Setup Instructions

### Prerequisites
- PHP 8.2+
- Composer
- PostgreSQL
- Node.js 18+
- npm atau yarn

### Backend Setup

1. Masuk ke folder backend:
```bash
cd backend
```

2. Install dependencies:
```bash
composer install
```

3. Copy file .env:
```bash
cp .env.example .env
```

4. Konfigurasi database PostgreSQL di `.env`:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=inventory_app
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

5. Generate application key:
```bash
php artisan key:generate
```

6. Buat symbolic link untuk storage:
```bash
php artisan storage:link
```

7. Jalankan migrasi:
```bash
php artisan migrate
```

8. Jalankan server Laravel:
```bash
php artisan serve
```

Server akan berjalan di `http://localhost:8000`

### Frontend Setup

1. Masuk ke folder frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Buat file `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. Jalankan development server:
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Request Format (Create/Update)

```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 10000,
  "stock": 50,
  "image": "file (multipart/form-data)"
}
```

## Database Schema

### Products Table

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| name | string | Product name |
| description | text | Product description (nullable) |
| price | decimal(10,2) | Product price |
| stock | integer | Stock quantity |
| image | string | Image path (nullable) |
| created_at | timestamp | Creation time |
| updated_at | timestamp | Last update time |

## CORS Configuration

Backend sudah dikonfigurasi untuk menerima request dari:
- `http://localhost:3000`
- `http://localhost:3001`

Jika menggunakan port lain, update file `backend/config/cors.php`

## File Upload

- Gambar disimpan di `backend/storage/app/public/products/`
- Accessible via symbolic link di `backend/public/storage/products/`
- Maksimum ukuran: 2MB
- Format yang didukung: jpeg, png, jpg, gif, webp

## Development Notes

### Backend
- Migration file: `database/migrations/2025_10_16_140536_create_products_table.php`
- Model: `app/Models/Product.php`
- Controller: `app/Http/Controllers/ProductController.php`
- Routes: `routes/api.php`

### Frontend
- API Client: `src/lib/api.ts`
- Product Page: `src/app/products/page.tsx`
- Product Dialog: `src/components/products/ProductDialog.tsx`
- UI Components: `src/components/ui/`

## Troubleshooting

### CORS Error
Pastikan Laravel server berjalan dan CORS sudah dikonfigurasi dengan benar di `backend/config/cors.php`

### Image Upload Error
Pastikan symbolic link sudah dibuat dengan `php artisan storage:link`

### Database Connection Error
Pastikan PostgreSQL berjalan dan kredensial di `.env` sudah benar

### Port Already in Use
Ubah port dengan:
- Laravel: `php artisan serve --port=8001`
- Next.js: `npm run dev -- -p 3001`

## License

MIT License
