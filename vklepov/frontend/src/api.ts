async function safeFetch<Res>(url: string, ops?: RequestInit): Promise<Res> {
  if (import.meta.env.SSR) {
    return new Promise(() => {});
  }
  const res = await fetch(url, ops);
  if (!res.ok) {
    if (res.status === 401) {
      location.assign('/auth');
      return new Promise(() => {});
    } else {
      throw new Error();
    }
  }
  if (res.status === 204) return {} as never;
  return res.json();
}

export type User = { username: string; password: string };
export type Balance = { balance: number };
export type Model = {
  id: string,
  name: string,
  description: string,
  cost: number
};
export type ShortJob = {
  id: number,
  status: number,
  cost: number,
  created_at: string
};
export type Job = ShortJob & { result: object };

export const register = (user: { email: string; password: string }) => safeFetch<void>('/user/register', { method: 'POST', body: JSON.stringify(user), headers: { 'Content-Type': 'application/json' } });
export const login = (body: FormData) => safeFetch<void>('/auth/login', { method: 'POST', body });

export const balance = () => safeFetch<Balance>('/api/balance')
export const deposit = () => safeFetch<Balance>('/api/balance/deposit', { method: 'POST' });

export const models = () => safeFetch<Model[]>('/api/models');

export const listJobs = () => safeFetch<ShortJob[]>('/api/jobs');
export const getJob = (id: string) => safeFetch<Job>(`/api/jobs/${id}`);
export const startJob = (model: string, file: FormData) => safeFetch<Job>(`/api/jobs?model_id=${model}`, {
  method: 'POST',
  body: file,
});
