const API_BASE = '/api';

export const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      query.append(key, val);
    }
  });

  const res = await fetch(`${API_BASE}/products?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product details');
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${API_BASE}/products/categories/all`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const fetchBrands = async () => {
  const res = await fetch(`${API_BASE}/products/brands/all`);
  if (!res.ok) throw new Error('Failed to fetch brands');
  return res.json();
};

export const createProduct = async (productData) => {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to create product');
  }
  return res.json();
};

export const updateProduct = async (id, productData) => {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to update product');
  }
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
};

export const resetSeedData = async () => {
  const res = await fetch(`${API_BASE}/products/seed`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to reset catalog');
  return res.json();
};

export const createOrder = async (orderData) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to place order');
  }
  return res.json();
};

export const fetchOrders = async () => {
  const res = await fetch(`${API_BASE}/orders`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${API_BASE}/orders/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update status');
  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }
  return data;
};

export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  return data;
};

export const fetchDemoAccounts = async () => {
  const res = await fetch(`${API_BASE}/auth/demo-accounts`);
  if (!res.ok) throw new Error('Failed to fetch demo credentials');
  return res.json();
};

