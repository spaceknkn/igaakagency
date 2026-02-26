import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'igaak-admin-secret-key-change-in-production';
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'igaak2024!';

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();
        if (username === ADMIN_USER && password === ADMIN_PASS) {
            const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
            return NextResponse.json({ token });
        }
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
