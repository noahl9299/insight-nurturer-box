import { Star, ShoppingBag, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Product } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import { getAmazonUrl } from "@/data/productAsins";

interface ProductCardProps {
  product: Product;
  badge?: "bestseller" | "neu" | "tipp" | null;
}

const CAT_BED_COLORS: Record<string, string> = {
  Donut: "from-orange-100 to-amber-100",
  "Katzenhöhle": "from-stone-100 to-zinc-100",
  Orthopädisch: "from-blue-50 to-indigo-50",
  Fensterliege: "from-sky-50 to-cyan-50",
  "Beheizt": "from-red-50 to-orange-50",
  Sofa: "from-emerald-50 to-teal-50",
  default: "from-amber-50 to-orange-50",
};

function PlaceholderImage({ typ, produktname }: { typ: string; produktname: string }) {
  const gradient = CAT_BED_COLORS[typ] || CAT_BED_COLORS.default;
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center`}>
      <div className="text-5xl mb-2">
        {typ.includes("Donut") ? "🍩" :
         typ.includes("Höhle") || typ.includes("Iglu") ? "🏠" :
         typ.includes("Fenster") ? "🪟" :
         typ.includes("Sofa") ? "🛋️" :
         typ.includes("Ortho") || typ.includes("Memory") ? "💙" :
         typ.includes("Beheizt") ? "🔥" :
         typ.includes("Hänge") || typ.includes("Radiator") ? "🪢" :
         "😺"}
      </div>
      <span className="text-xs text-muted-foreground text-center px-2 line-clamp-2">{produktname}</span>
    </div>
  );
}

function ProductImage({ rang, bildUrl, produktname, typ }: { rang: number; bildUrl?: string; produktname: string; typ: string }) {
  const [error, setError] = useState(false);
  const imgSrc = getProductImage(rang) || bildUrl;

  if (imgSrc && !error) {
    return (
      <img
        src={imgSrc}
        alt={produktname}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        referrerPolicy="no-referrer"
        onError={() => setError(true)}
        loading="lazy"
      />
    );
  }
  return <PlaceholderImage typ={typ} produktname={produktname} />;
}

export function StarRating({ rating, count }: { rating: number; count?: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={13}
            className={i <= full ? "star-filled fill-current" : i === full + 1 && half ? "text-yellow-300 fill-current opacity-70" : "text-gray-200 fill-current"}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-foreground">{rating}</span>
      {count && <span className="text-xs text-muted-foreground">({count.toLocaleString("de-DE")})</span>}
    </div>
  );
}

export function ProductCard({ product, badge }: ProductCardProps) {
  const formattedPrice = product.preis.toFixed(2).replace(".", ",");

  return (
    <Link
      to={`/katzenbett/${product.slug}`}
      className="product-card block group"
      aria-label={`${product.produktname} - ${formattedPrice} Euro`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <div className="product-card-image w-full h-full">
          <ProductImage rang={product.rang} bildUrl={product.bildUrl} produktname={product.produktname} typ={product.typ} />
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3">
            {badge === "bestseller" && (
              <span className="badge-bestseller inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full">
                ⭐ Bestseller
              </span>
            )}
            {badge === "neu" && (
              <span className="badge-neu inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full">
                ✨ Neu
              </span>
            )}
            {badge === "tipp" && (
              <span className="badge-tipp inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full">
                💡 Tipp
              </span>
            )}
          </div>
        )}

        {/* Wishlist icon */}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-background hover:text-destructive"
          aria-label="Auf Merkliste"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">{product.marke}</p>
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1.5 leading-snug" style={{ fontFamily: "'Inter', sans-serif" }}>
          {product.produktname}
        </h3>
        {product.besonderheiten && (
          <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{product.besonderheiten}</p>
        )}

        <StarRating rating={product.bewertung} count={product.anzahlBewertungen} />

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-xl font-bold text-foreground">{formattedPrice} €</span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">bei Amazon & weiteren Shops</p>

        {/* CTA */}
        <div className="mt-4">
          {getAmazonLink(product.asin) ? (
            <a
              href={getAmazonLink(product.asin)!}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={(e) => e.stopPropagation()}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground transition-all group-hover:-translate-y-0.5 hover:opacity-90"
            >
              <ShoppingBag size={14} />
              Bei Amazon ansehen
            </a>
          ) : (
            <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground transition-all group-hover:-translate-y-0.5 opacity-70 cursor-default">
              <ShoppingBag size={14} />
              Zum Angebot
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
