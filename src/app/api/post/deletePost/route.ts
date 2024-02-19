import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server'

export const DELETE = async (req: Request) => {
    const { method } = req;

    if (method !== 'DELETE') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        let { id } = await req.json();
        console.log("delete id ", id);
        
        await prisma.post.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
    }
}
