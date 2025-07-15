# Porto Next API - Backend

Backend API untuk portfolio website menggunakan Express.js, PostgreSQL (Neon), dan Vercel.

## 🚀 Deployment

### Environment Variables di Vercel

Pastikan environment variables berikut sudah diset di Vercel:

```env
DATABASE_URL=postgresql://username:password@host:port/database
CORS_ORIGIN=https://natsrululum37.vercel.app
NODE_ENV=production
```

### API Endpoints

- `GET /api/projects/featured` - Ambil 3 project unggulan
- `GET /api/projects` - Ambil semua project
- `GET /api/profile` - Ambil data profile
- `GET /api/experiences` - Ambil data pengalaman
- `GET /api/education` - Ambil data pendidikan
- `POST /api/contact` - Kirim pesan kontak
- `GET /health` - Health check

### CORS Configuration

Backend sudah dikonfigurasi untuk mengizinkan request dari:
- `http://localhost:3000` (development)
- `https://natsrululum37.vercel.app` (production)
- `https://porto-next-app.vercel.app` (alternative domain)

### Database

Menggunakan Neon PostgreSQL dengan connection pooling yang optimal untuk serverless environment.

## 🔧 Development

```bash
npm install
npm run dev
```

## 📝 Notes

- Semua endpoint menggunakan prefix `/api`
- Error handling yang konsisten
- Validation untuk input data
- Security headers
- CORS protection 