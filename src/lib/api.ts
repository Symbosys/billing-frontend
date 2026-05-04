const BASE_URL = 'http://localhost:3000';

function getToken(): string | null {
  return localStorage.getItem('auth_token');
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  auth = false
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || `Request failed with status ${res.status}`);
  }

  return data;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: { user: AuthUser; token: string };
}

export interface MeResponse {
  success: boolean;
  message: string;
  data: { user: AuthUser };
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateEmailPayload {
  email: string;
  password: string;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    request<LoginResponse>('POST', '/auth/login', payload),

  me: () => request<MeResponse>('GET', '/auth/me', undefined, true),

  updatePassword: (payload: UpdatePasswordPayload) =>
    request<{ success: boolean; message: string }>('PATCH', '/auth/me/password', payload, true),

  updateEmail: (payload: UpdateEmailPayload) =>
    request<{ success: boolean; message: string; data: { user: AuthUser } }>(
      'PATCH', '/auth/me/email', payload, true
    ),
};

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardStat {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  detail: string;
}

export interface DashboardTransaction {
  id: string;
  customer: string;
  amount: string;
  date: string;
  status: string;
  type: string;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: {
    stats: DashboardStat[];
    recentTransactions: DashboardTransaction[];
  };
}

export const dashboardApi = {
  getStats: () => request<DashboardResponse>('GET', '/dashboard', undefined, true),
};

// ─── Customer count (public-friendly summary) ────────────────────────────────

export const customerApi = {
  count: () =>
    request<{ success: boolean; data: { count: number } }>('GET', '/customer', undefined, true),
};
