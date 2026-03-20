/*
  # Create Homepage Content Tables

  1. New Tables
    - `hero`
      - `id` (uuid, primary key)
      - `tagline` (text) - Small text above main heading
      - `heading` (text) - Main hero heading
      - `subheading` (text) - Text below main heading
      - `button_text` (text) - CTA button text
      - `background_image` (text) - Hero background image URL
      - `is_active` (boolean) - Whether this hero is currently active
      - `created_at` (timestamptz)
    
    - `about`
      - `id` (uuid, primary key)
      - `heading` (text) - Section heading
      - `tagline` (text) - Short tagline
      - `description` (text) - Main description text
      - `button_text` (text) - CTA button text
      - `image_url` (text) - About section image
      - `is_active` (boolean)
      - `created_at` (timestamptz)
    
    - `services`
      - `id` (uuid, primary key)
      - `title` (text) - Service title
      - `image_url` (text) - Service image
      - `sort_order` (int) - Display order
      - `is_active` (boolean)
      - `created_at` (timestamptz)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `text` (text) - Testimonial content
      - `author` (text) - Author name
      - `role` (text) - Author role/project
      - `rating` (int) - Star rating (1-5)
      - `sort_order` (int)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
    
    - `brands`
      - `id` (uuid, primary key)
      - `name` (text) - Brand name
      - `logo_text` (text) - Text to display as logo
      - `sort_order` (int)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
    
    - `projects`
      - `id` (uuid, primary key)
      - `image_url` (text) - Project image
      - `category` (text) - Interior or Exterior
      - `sort_order` (int)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
    
    - `stats`
      - `id` (uuid, primary key)
      - `number` (int) - Stat value
      - `suffix` (text) - Text after number (e.g., "+")
      - `label` (text) - Stat description
      - `sort_order` (int)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
    
    - `blog_banner`
      - `id` (uuid, primary key)
      - `heading` (text) - Banner heading
      - `button_text` (text) - CTA button text
      - `background_image` (text) - Background image URL
      - `is_active` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (data is public on website)
*/

-- Hero table
CREATE TABLE IF NOT EXISTS hero (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tagline text NOT NULL DEFAULT '',
  heading text NOT NULL DEFAULT '',
  subheading text NOT NULL DEFAULT '',
  button_text text NOT NULL DEFAULT '',
  background_image text NOT NULL DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE hero ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to hero"
  ON hero FOR SELECT
  TO anon
  USING (is_active = true);

-- About table
CREATE TABLE IF NOT EXISTS about (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  heading text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  button_text text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE about ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to about"
  ON about FOR SELECT
  TO anon
  USING (is_active = true);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to services"
  ON services FOR SELECT
  TO anon
  USING (is_active = true);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  rating int DEFAULT 5,
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to testimonials"
  ON testimonials FOR SELECT
  TO anon
  USING (is_active = true);

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  logo_text text NOT NULL DEFAULT '',
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to brands"
  ON brands FOR SELECT
  TO anon
  USING (is_active = true);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Interior',
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to projects"
  ON projects FOR SELECT
  TO anon
  USING (is_active = true);

-- Stats table
CREATE TABLE IF NOT EXISTS stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number int DEFAULT 0,
  suffix text NOT NULL DEFAULT '',
  label text NOT NULL DEFAULT '',
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to stats"
  ON stats FOR SELECT
  TO anon
  USING (is_active = true);

-- Blog Banner table
CREATE TABLE IF NOT EXISTS blog_banner (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  heading text NOT NULL DEFAULT '',
  button_text text NOT NULL DEFAULT '',
  background_image text NOT NULL DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_banner ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to blog_banner"
  ON blog_banner FOR SELECT
  TO anon
  USING (is_active = true);