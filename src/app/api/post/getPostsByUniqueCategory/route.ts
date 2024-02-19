import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
    const { method } = req;

    const category = await req.json();

    if (method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        const posts = await prisma.post.findMany({
            where: {
                category,
            },
        });

        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error fetching unique categories' }, { status: 500 });
    }
}
