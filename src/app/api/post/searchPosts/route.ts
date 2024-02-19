import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
    const { method } = await req.json();

    if (method !== 'GET') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        const { keyword } = await req.json();;

        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    { title: { contains: keyword } },
                    { content: { contains: keyword } },
                    { category: { contains: keyword } },
                ],
            },
        });

        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error searching posts' }, { status: 500 });
    }
}
