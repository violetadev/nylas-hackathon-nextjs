import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { nylas } from '../../constants';

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request & NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  try {
    const { accessToken } = await nylas.auth.exchangeCodeForToken({
      code: code || "",
      redirectUri: process.env.NEXT_NYLAS_REDIRECT_URI || "",
      clientId: process.env.NEXT_NYLAS_CLIENT_ID || "",
    });

    // Store the accessToken securely (e.g., in a session or cookie)
    const response = NextResponse.redirect('/');
    response.cookies.set('nylas_access_token', accessToken, { httpOnly: true });

    return response;
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return NextResponse.redirect('/error');
  }
}