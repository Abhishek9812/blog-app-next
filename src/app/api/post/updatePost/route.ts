import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server'

export const PUT = async (req: Request) => {
    const { method } = req;

    if (method !== 'PUT') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        let { id, ...postUpdate } = await req.json();

        console.log("update post id ", id);
        id = parseInt(id);
        

        const updatedPost = await prisma.post.update({
            where: { id },
            data: postUpdate,
        });

        return NextResponse.json({ message: 'Post updated successfully', post: updatedPost }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
    }
}
