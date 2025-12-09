import { cookies } from 'next/headers';
import { compare } from 'bcrypt-ts';
import { getUser } from '@/app/db';

export interface Session {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  
  if (!sessionCookie) {
    return null;
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    return session;
  } catch {
    return null;
  }
}

export async function createSession(userId: string, email: string, name: string) {
  const cookieStore = await cookies();
  const session: Session = {
    user: {
      id: userId,
      email,
      name,
    },
  };

  cookieStore.set('session', JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, 
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function verifyCredentials(email: string, password: string) {
  const user = await getUser(email);
  if (!user || !user.password) {
    return null;
  }

  const passwordsMatch = await compare(password, user.password);
  if (!passwordsMatch) {
    return null;
  }

  return {
    id: user.id,
    email: user.email!,
    name: user.name,
  };
}

