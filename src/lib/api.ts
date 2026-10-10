export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  tags: string[];
  stage: 'lead' | 'customer' | 'inactive';
  createdAt: string;
}

export interface Activity {
  id: string;
  contactId: string;
  type: 'note' | 'call' | 'email' | 'meeting';
  body: string;
  createdAt: string;
}

const BASE = '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  listContacts: () => request<Contact[]>('/contacts'),
  createContact: (c: Omit<Contact, 'id' | 'createdAt'>) =>
    request<Contact>('/contacts', { method: 'POST', body: JSON.stringify(c) }),
  listActivities: (contactId: string) =>
    request<Activity[]>(`/contacts/${contactId}/activities`),
};
