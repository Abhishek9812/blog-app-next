import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
    const { method } = req;

    if (method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        let data: any = await req.json();


        const post = await prisma.post.create({ data });

        return NextResponse.json({ message: 'Post created successfully', post }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
    }
}
