import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SignOut from './signout';
import Link from 'next/link';
export default async function ProtectedPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }
  return (
    <div className="flex h-screen">
      Welcome to the dashboard, {session?.user?.name}!
      <Link href="/protected/agenda" className="ml-4 text-blue-600 hover:underline">
        Go to Agendas
      </Link>
    </div>
  );
}
