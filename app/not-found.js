import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-bold mt-4 mb-2">Page Not Found!</h2>
        <p className="text-gray-500 mb-8">
          Oops! The page you are looking for does not exist.
        </p>
        <Link href="/" className="btn btn-primary btn-lg text-white">
          🏠 Go Back Home
        </Link>
      </div>
    </div>
  );
}