import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
    const { method } = req;

    if (method !== 'GET') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        const uniqueCategoriesWithTitles = await prisma.post.groupBy({
            by: ['category'],
          });

        return NextResponse.json({ categories: uniqueCategoriesWithTitles }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error fetching unique categories' }, { status: 500 });
    }
}
