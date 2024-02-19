import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Cookies from 'js-cookie';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = Cookies.get('token');
    if (!token) {
        console.log("hello middleware");

        // Redirect to login page if token is not present
        return NextResponse.redirect(new URL('/sign-in', request.url));

    }
    console.log("Bye middleware");

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
}