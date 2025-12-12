export function Form({
  action,
  children,
}: {
  action: any;
  children: React.ReactNode;
}) {
  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-lg font-bold text-gray-700 mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          required
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-lg font-bold text-gray-700 mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="example@email.com"
          autoComplete="email"
          required
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="phoneNumber" className= "block text-lg font-bold text-gray-700 mb-2">
          Phone Number (optional)
            </label>
            <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
            />
      </div>
      <div>
        <label htmlFor="password" className="block text-lg font-bold text-gray-700 mb-2">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
        />
      </div>
      {children}
    </form>
  );
}
