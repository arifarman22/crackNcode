export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  type: "digital" | "package" | "DIGITAL" | "PACKAGE";
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: number;
  tier: "starter" | "pro" | "enterprise";
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  modules: number;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: "monthly" | "yearly";
  features: string[];
  highlighted?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "USER" | "ADMIN";
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "paid" | "completed" | "PENDING" | "PAID" | "COMPLETED" | "CANCELLED";
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}
