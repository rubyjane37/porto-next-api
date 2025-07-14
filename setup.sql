-- Tabel projects
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  technologies TEXT[],
  liveurl TEXT,
  githuburl TEXT,
  category TEXT,
  is_featured BOOLEAN DEFAULT FALSE
);

-- Tambahan: alter table jika kolom belum ada (untuk migrasi dari struktur lama)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='is_featured') THEN
    ALTER TABLE projects ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profile' AND column_name='headline') THEN
    ALTER TABLE profile ADD COLUMN headline TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profile' AND column_name='bio') THEN
    ALTER TABLE profile ADD COLUMN bio TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profile' AND column_name='about') THEN
    ALTER TABLE profile ADD COLUMN about TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profile' AND column_name='philosophy') THEN
    ALTER TABLE profile ADD COLUMN philosophy TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profile' AND column_name='photo_url') THEN
    ALTER TABLE profile ADD COLUMN photo_url TEXT;
  END IF;
END$$;

INSERT INTO projects (title, description, image, technologies, liveurl, githuburl, category, is_featured) VALUES
  ('E-Commerce Platform', 'A modern e-commerce platform built with Next.js, featuring product catalog, shopping cart, user authentication, and Stripe payment integration.', '/project1.jpg', ARRAY['React', 'Next.js', 'Stripe', 'TailwindCSS', 'MongoDB'], 'https://example.com', 'https://github.com/example', 'Full Stack', TRUE),
  ('Task Management App', 'A collaborative task management application with real-time updates.', '/project2.jpg', ARRAY['React', 'Firebase', 'TailwindCSS'], 'https://taskapp.com', 'https://github.com/taskapp', 'Frontend', TRUE),
  ('Weather Dashboard', 'A beautiful weather dashboard with location-based forecasts.', '/project3.jpg', ARRAY['JavaScript', 'API', 'CSS3'], 'https://weather.com', 'https://github.com/weather', 'Frontend', TRUE),
  ('Personal Blog', 'A personal blog platform with markdown support and comments.', '/project4.jpg', ARRAY['Next.js', 'Prisma', 'PostgreSQL'], 'https://blog.com', 'https://github.com/blog', 'Full Stack', FALSE),
  ('Portfolio Website', 'A portfolio website to showcase projects and skills.', '/project5.jpg', ARRAY['React', 'Next.js', 'TailwindCSS'], 'https://portfolio.com', 'https://github.com/portfolio', 'Frontend', FALSE)
ON CONFLICT DO NOTHING;

-- Tabel profile
CREATE TABLE IF NOT EXISTS profile (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  headline TEXT,
  bio TEXT,
  about TEXT,
  philosophy TEXT,
  photo_url TEXT
);

-- Tambahan: alter table jika kolom belum ada (untuk migrasi dari struktur lama)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profile' AND column_name='headline') THEN
    ALTER TABLE profile ADD COLUMN headline TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profile' AND column_name='bio') THEN
    ALTER TABLE profile ADD COLUMN bio TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profile' AND column_name='about') THEN
    ALTER TABLE profile ADD COLUMN about TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profile' AND column_name='philosophy') THEN
    ALTER TABLE profile ADD COLUMN philosophy TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profile' AND column_name='photo_url') THEN
    ALTER TABLE profile ADD COLUMN photo_url TEXT;
  END IF;
END$$;

INSERT INTO profile (name, title, bio, photo) VALUES
  ('Natsrul Ulum', 'Frontend Developer', 'Frontend developer passionate about creating beautiful and functional web experiences.', '/photo-profile/photo-profile.jpg'),
ON CONFLICT DO NOTHING;

-- Tabel experiences
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  title TEXT,
  company TEXT,
  year TEXT,
  description TEXT
);

INSERT INTO experiences (company, role, start_date, end_date, description) VALUES
  ('PT. Contoh', 'Frontend Developer', '2022-01-01', NULL, 'Membangun aplikasi web modern dengan React dan Next.js.'),
  ('CV. Digital Karya', 'UI/UX Designer', '2021-06-01', '2022-01-01', 'Mendesain dan menguji prototipe aplikasi mobile.'),
  ('Startup XYZ', 'Web Developer', '2020-03-01', '2021-05-01', 'Mengembangkan landing page dan dashboard admin.')
ON CONFLICT DO NOTHING;

-- Tabel contacts
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT
);

INSERT INTO contacts (name, email, subject, message) VALUES
  ('zulfan', 'zulfan@mail.com', 'Tanya Project', 'Apakah Anda menerima freelance untuk pembuatan aplikasi?'),
  ('dita', 'dita@mail.com', 'Feedback', 'Website portofolionya keren dan inspiratif!')
ON CONFLICT DO NOTHING; 