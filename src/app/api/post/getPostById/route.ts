import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
    const { method } = req;

    if (method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        const { id } =await req.json();
        const postId = parseInt(id);

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ post }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
    }
}
