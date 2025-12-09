import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import SignOut from './signout';

export default async function ProtectedLayout({
	children,
}: {
	children: ReactNode;
}) {
	const session = await getSession();

	if (!session) {
		redirect('/login');
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white shadow-sm">
				<div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
					<div>
						<Link href="/protected" className="text-xl font-bold text-blue-600">
							Meeting Agenda
						</Link>
						<p className="text-sm text-gray-600">Signed in as {session?.user?.email}</p>
					</div>

					<div className="flex items-center gap-3">
						<span className="text-gray-700">Hi, {session?.user?.name}</span>
						<SignOut />
					</div>
				</div>
			</header>

			<main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
		</div>
	);
}

