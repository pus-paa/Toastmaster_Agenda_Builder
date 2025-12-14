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
		<div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
			{/* Top Navigation */}
			<header className="bg-white border-b border-gray-200 flex-shrink-0 z-20">
				<div className="px-6 py-3.5 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Link href="/protected" className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
							📋 Meeting Agenda
						</Link>
					</div>

					<div className="flex items-center gap-4">
						<div className="text-right hidden sm:block">
							<p className="text-sm font-medium text-gray-700">{session?.user?.name}</p>
							<p className="text-xs text-gray-500">{session?.user?.email}</p>
						</div>
						<SignOut />
					</div>
				</div>
			</header>

			{/* Main Content Area */}
			<main className="flex-1 overflow-hidden">
				{children}
			</main>
		</div>
	);
}

