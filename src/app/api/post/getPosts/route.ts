import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
    const { method } = req;

    if (method !== 'GET') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        const posts = await prisma.post.findMany();

        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
    }
}
