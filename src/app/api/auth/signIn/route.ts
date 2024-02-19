import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt';

export const POST = async (req: Request) => {
    const { method, body } = req;

    if (method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // You can generate a token here for authentication purposes if needed

        return NextResponse.json({ message: 'Sign in successful', user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error signing in' }, { status: 500 });
    }
}
