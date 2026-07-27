const API_BASE = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3001';

export async function apiFetch(path: string, init?: RequestInit) {
    return fetch(`${API_BASE}${path}`, {
        ...init,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...init?.headers,
        },
    });
}