import pool from "./db.js";

async function seed() {
  // Reset semua tabel (truncate + restart identity)
  await pool.query("TRUNCATE TABLE contacts RESTART IDENTITY CASCADE");
  await pool.query("TRUNCATE TABLE experiences RESTART IDENTITY CASCADE");
  await pool.query("TRUNCATE TABLE profile RESTART IDENTITY CASCADE");
  await pool.query("TRUNCATE TABLE projects RESTART IDENTITY CASCADE");

  // Projects
  await pool.query(`
    INSERT INTO projects (title, description, image, technologies, liveurl, githuburl, category, is_featured) VALUES
      ('Platform E-Commerce', 'Platform e-commerce modern berbasis Next.js, fitur katalog produk, keranjang belanja, autentikasi pengguna, dan integrasi pembayaran Stripe.', 'https://placehold.co/600x400/png?text=E-Commerce+Platform', ARRAY['React', 'Next.js', 'Stripe', 'TailwindCSS', 'MongoDB'], 'https://contoh.com', 'https://github.com/contoh', 'Full Stack', TRUE),
      ('Aplikasi Manajemen Tugas', 'Aplikasi kolaborasi manajemen tugas dengan update real-time.', 'https://placehold.co/600x400/png?text=Task+App', ARRAY['React', 'Firebase', 'TailwindCSS'], 'https://tugas.com', 'https://github.com/tugas', 'Frontend', TRUE),
      ('Dashboard Cuaca', 'Dashboard cuaca dengan prediksi berbasis lokasi dan tampilan menarik.', 'https://placehold.co/600x400/png?text=Weather+Dashboard', ARRAY['JavaScript', 'API', 'CSS3'], 'https://cuaca.com', 'https://github.com/cuaca', 'Frontend', TRUE),
      ('Blog Pribadi', 'Platform blog pribadi dengan dukungan markdown dan optimasi SEO.', 'https://placehold.co/600x400/png?text=Blog', ARRAY['Next.js', 'Markdown', 'SEO'], 'https://blogpribadi.com', 'https://github.com/blogpribadi', 'Full Stack', FALSE),
      ('Website Portfolio', 'Website portfolio untuk menampilkan projek dan skill.', 'https://placehold.co/600x400/png?text=Portfolio', ARRAY['React', 'TailwindCSS'], 'https://portfolio.com', 'https://github.com/portfolio', 'Frontend', FALSE);
  `);

  // Profile
  try {
    await pool.query(`
      INSERT INTO profile (name, headline, bio, about, philosophy, photo_url) VALUES
        ('Natsrul Ulum', 'Junior Web Developer & UI/UX Enthusiast', 'Saya seorang junior web developer yang antusias membangun website modern, fungsional, dan mudah digunakan.', 'Saya berpengalaman lebih dari 3 tahun membangun aplikasi web modern. Spesialisasi di React, Next.js, dan JavaScript modern, selalu mengikuti perkembangan teknologi dan best practice terbaru.', 'Saya percaya aplikasi yang baik harus berpusat pada pengguna, mudah diakses, dan memiliki performa optimal. Saya suka menulis kode bersih, maintainable, dan kolaborasi tim untuk hasil terbaik.', '/photo-profile/photo-profile.jpg');
    `);
  } catch (err) {
    console.error(
      "Gagal insert ke tabel profile. Pastikan sudah menjalankan setup.sql agar kolom headline, bio, about, philosophy, photo_url tersedia. Error:",
      err.message
    );
    process.exit(1);
  }

  // Experiences
  await pool.query(`
    INSERT INTO experiences (title, company, year, description) VALUES
      ('Frontend Developer', 'PT. Web Inovasi', '2022 - Sekarang', 'Mengembangkan dan memelihara aplikasi web modern menggunakan React, Next.js, dan TailwindCSS.'),
      ('UI/UX Designer', 'Freelance', '2021 - 2022', 'Merancang antarmuka dan pengalaman pengguna untuk berbagai projek web dan mobile.'),
      ('Magang Web Developer', 'Startup XYZ', '2020', 'Membantu membangun dan menguji fitur web untuk platform SaaS.');
  `);

  // Education
  await pool.query(`
    INSERT INTO education (year, degree, school, description) VALUES
      ('2023 - Sekarang', 'Sarjana Ilmu Komputer', 'Universitas Amikom Yogyakarta', 'Fokus pada rekayasa perangkat lunak dan pengembangan web.');
  `);

  // Contacts (dummy)
  await pool.query(`
    INSERT INTO contacts (name, email, subject, message) VALUES
      ('Budi Santoso', 'budi@example.com', 'Kolaborasi', 'Halo, saya tertarik untuk kolaborasi projek.'),
      ('Siti Aminah', 'siti@example.com', 'Penawaran Kerja', 'Kami ingin menawarkan posisi junior web developer.'),
      ('Andi Wijaya', 'andi@example.com', 'Feedback', 'Website portofolionya sangat inspiratif!');
  `);

  console.log(
    "Seeder selesai! Data dummy sudah masuk ke database dengan gambar placeholder."
  );
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeder error:", err);
  process.exit(1);
});
