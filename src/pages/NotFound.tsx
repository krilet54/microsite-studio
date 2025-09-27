export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">The page you are looking for may have moved or no longer exists.</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a href="/" className="bg-[#FF2B2B] hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors">Return Home</a>
        <a href="/services" className="border border-gray-300 dark:border-neutral-600 hover:border-[#FF2B2B] text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg font-semibold text-sm transition-colors">Browse Services</a>
      </div>
    </div>
  );
}
