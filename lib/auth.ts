import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'igaak-admin-secret-key-change-in-production';

export function verifyAuth(req: Request): { valid: boolean; error?: string } {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return { valid: false, error: 'No token provided' };

    const token = authHeader.split(' ')[1];
    if (!token) return { valid: false, error: 'No token provided' };

    try {
        jwt.verify(token, JWT_SECRET);
        return { valid: true };
    } catch {
        return { valid: false, error: 'Invalid token' };
    }
}

export function unauthorized(message: string = 'Unauthorized') {
    return NextResponse.json({ error: message }, { status: 401 });
}
