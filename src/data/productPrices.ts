interface ProductData {
  price: number;
  rating: number;
  reviews: number;
  size: string;
  material: string;
}

const productData: Record<number, ProductData> = {
  1: { price: 16.99, rating: 4.8, reviews: 452, size: "51x41 cm", material: "Polyester" },
  2: { price: 32.99, rating: 4.7, reviews: 85, size: "M", material: "Stahl, Stoff" },
  3: { price: 20.60, rating: 4.4, reviews: 21198, size: "50L x 50B x 13D cm", material: "Polyester" },
  4: { price: 15.29, rating: 4.6, reviews: 229, size: "50L x 50B x 18D cm", material: "PV Plush Fabric" },
  5: { price: 20.19, rating: 4.5, reviews: 3008, size: "51L x 48B x 15D cm", material: "Polyester" },
  6: { price: 18.99, rating: 4.5, reviews: 4230, size: "65L x 65B x 22D cm", material: "Plüsch, PP-Füllung" },
  7: { price: 11.89, rating: 4.4, reviews: 499, size: "90L x 28B x 2D cm", material: "Polyester" },
  8: { price: 18.69, rating: 4.3, reviews: 1473, size: "73L x 39B x 63H cm", material: "PVC" },
  9: { price: 32.99, rating: 5.0, reviews: 5, size: "M", material: "Metall, Stoff" },
  10: { price: 9.99, rating: 4.6, reviews: 177, size: "60 x 24 cm", material: "" },
  11: { price: 11.87, rating: 4.4, reviews: 1648, size: "25L x 18B x 10D cm", material: "" },
  12: { price: 19.99, rating: 4.7, reviews: 559, size: "90L x 28B cm", material: "" },
  13: { price: 17.99, rating: 4.5, reviews: 3395, size: "40L x 40B x 40D cm", material: "" },
  14: { price: 16.82, rating: 4.4, reviews: 1766, size: "70L x 70B x 20D cm", material: "Schaumstoff" },
  15: { price: 14.44, rating: 4.4, reviews: 21198, size: "50L x 50B x 13D cm", material: "Polyester" },
  16: { price: 39.99, rating: 4.4, reviews: 230, size: "42L x 42B x 38H cm", material: "Metall, Plüsch, Polyester" },
  17: { price: 24.18, rating: 4.2, reviews: 1043, size: "65L x 36B x 27D cm", material: "Leinen, Plüsch" },
  18: { price: 22.99, rating: 4.0, reviews: 652, size: "50L x 50B x 15D cm", material: "Stoff" },
  19: { price: 34.99, rating: 4.2, reviews: 255, size: "48L x 10B x 30D cm", material: "Metall, Polycotton" },
  20: { price: 21.24, rating: 4.9, reviews: 39, size: "51L x 51B x 20D cm", material: "Kunstfaser" },
  21: { price: 17.84, rating: 4.4, reviews: 1164, size: "67L x 57B x 18D cm", material: "" },
  22: { price: 23.75, rating: 4.8, reviews: 425, size: "46T x 38B x 26H cm", material: "Filz" },
  23: { price: 10.99, rating: 4.2, reviews: 261, size: "61L x 51B x 3D cm", material: "Polyester" },
  24: { price: 28.05, rating: 4.8, reviews: 334, size: "M", material: "Baumwolle" },
  25: { price: 21.21, rating: 4.5, reviews: 76485, size: "110L x 65B x 19D cm", material: "Eisenrohr, Textilene" },
  26: { price: 15.31, rating: 4.3, reviews: 94, size: "60L x 60B x 18D cm", material: "Stoff/Schaum" },
  27: { price: 11.89, rating: 4.4, reviews: 169, size: "35L x 30B x 8D cm", material: "Baumwolle" },
  28: { price: 15.95, rating: 4.4, reviews: 1568, size: "37T x 33B x 33H cm", material: "Filz" },
  29: { price: 42.99, rating: 4.7, reviews: 36, size: "59L x 48B x 10D cm", material: "Baumwolle, Faux Pelz, Metall" },
  30: { price: 28.72, rating: 4.5, reviews: 701, size: "45L x 37B x 60H cm", material: "Hochwertiger Filz" },
};

export const getProductPrice = (rang: number): number | undefined => productData[rang]?.price;
export const getProductRating = (rang: number): number | undefined => productData[rang]?.rating;
export const getProductReviews = (rang: number): number | undefined => productData[rang]?.reviews;
export const getProductSize = (rang: number): string | undefined => productData[rang]?.size;
export const getProductMaterial = (rang: number): string | undefined => productData[rang]?.material;
