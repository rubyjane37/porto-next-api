-- DROP semua tabel jika ada (urutan harus perhatikan foreign key, jika ada)
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS profile CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS education CASCADE;

-- CREATE ulang tabel projects
CREATE TABLE projects (
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

-- CREATE ulang tabel profile
CREATE TABLE profile (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  headline TEXT,
  bio TEXT,
  about TEXT,
  philosophy TEXT,
  photo_url TEXT
);

-- CREATE ulang tabel experiences
CREATE TABLE experiences (
  id SERIAL PRIMARY KEY,
  title TEXT,
  company TEXT,
  year TEXT,
  description TEXT
);

-- CREATE ulang tabel education
CREATE TABLE education (
  id SERIAL PRIMARY KEY,
  year TEXT,
  degree TEXT,
  school TEXT,
  description TEXT
);

-- CREATE ulang tabel contacts
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT
); 