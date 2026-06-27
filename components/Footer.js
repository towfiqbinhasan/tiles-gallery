import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content mt-10">
      <div className="footer p-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <span className="text-2xl font-bold text-primary">🧱 TilesGallery</span>
          <p className="mt-2 text-sm opacity-70">
            Discover the finest tiles for your perfect aesthetic. Premium quality, modern designs.
          </p>
        </div>

        <div>
          <span className="footer-title">Quick Links</span>
          <Link href="/" className="link link-hover">Home</Link>
          <Link href="/all-tiles" className="link link-hover">All Tiles</Link>
          <Link href="/login" className="link link-hover">Login</Link>
          <Link href="/register" className="link link-hover">Register</Link>
        </div>

        <div>
          <span className="footer-title">Contact Us</span>
          <p className="text-sm">📧 support@tilesgallery.com</p>
          <p className="text-sm">📞 +880 1234-567890</p>
          <div className="flex gap-3 mt-3">
            <a href="https://facebook.com" target="_blank" className="btn btn-sm btn-circle btn-outline">f</a>
            <a href="https://twitter.com" target="_blank" className="btn btn-sm btn-circle btn-outline">t</a>
            <a href="https://instagram.com" target="_blank" className="btn btn-sm btn-circle btn-outline">in</a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-sm opacity-50 border-t border-neutral-700">
        © 2024 TilesGallery. All rights reserved.
      </div>
    </footer>
  );
}