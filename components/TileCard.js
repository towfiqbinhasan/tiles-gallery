import Link from "next/link";

export default function TileCard({ tile }) {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <figure className="h-48 overflow-hidden">
        <img
          src={tile.image}
          alt={tile.title}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg">{tile.title}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">{tile.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="badge badge-primary">{tile.category}</span>
          <span className="font-bold text-primary">${tile.price}</span>
        </div>
        <div className="flex gap-1 flex-wrap mt-1">
          {tile.tags?.map((tag) => (
            <span key={tag} className="badge badge-outline badge-sm">{tag}</span>
          ))}
        </div>
        <div className="card-actions mt-3">
          <Link
            href={`/tile/${tile.id}`}
            className="btn btn-primary btn-sm w-full text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}