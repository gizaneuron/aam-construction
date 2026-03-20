import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Hero {
  id: string;
  tagline: string;
  heading: string;
  subheading: string;
  button_text: string;
  background_image: string;
  is_active: boolean;
  created_at: string;
  video_url?: string;
}

export interface About {
  id: string;
  heading: string;
  tagline: string;
  description: string;
  button_text: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  rating: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Brand {
  id: string;
  name: string;
  logo_text: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  image_url: string;
  category: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Stat {
  id: string;
  number: number;
  suffix: string;
  label: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface BlogBanner {
  id: string;
  heading: string;
  button_text: string;
  background_image: string;
  is_active: boolean;
  created_at: string;
}
