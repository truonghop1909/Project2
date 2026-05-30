import { cookies } from 'next/headers';

/**
 * Lấy role từ token trong cookie (server-side)
 * Token được lưu dưới dạng JWT, payload chứa trường `roles` hoặc `role`
 */
export async function getRoleFromToken(): Promise<'ADMIN' | 'STAFF' | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value; // hoặc 'token' tuỳ tên bạn dùng

    if (!token) return null;

    try {
        // Decode JWT payload (không verify, chỉ đọc)
        const base64Payload = token.split('.')[1];
        const payload = JSON.parse(atob(base64Payload));
        const roles = payload.roles || payload.role || payload.authorities || [];
        const rawRole = Array.isArray(roles) ? roles[0] : roles;
        if (rawRole === 'ADMIN' || rawRole === 'ROLE_ADMIN') return 'ADMIN';
        if (rawRole === 'STAFF' || rawRole === 'ROLE_STAFF') return 'STAFF';
        return null;
    } catch {
        return null;
    }
}