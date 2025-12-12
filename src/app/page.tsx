import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
      <h1 className="text-5xl font-bold mb-4 text-gray-800">Welcome</h1>
      <p className="text-xl text-gray-600 mb-8">Toastmaster Agenda Builder</p>
      
      <div className="space-y-4">
        <Link
          href="/login"
          className="inline-block bg-blue-500 text-white text-lg font-bold py-3 px-8 rounded hover:bg-blue-600"
        >
          Login
        </Link>
        
        <Link
          href="/register"
          className="inline-block bg-green-500 text-white text-lg font-bold py-3 px-8 rounded hover:bg-green-600 ml-4"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
