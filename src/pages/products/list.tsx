import { useState, useEffect } from "react";
import { z } from "zod";
import { API_URL } from "@/constants";
import { productSchema } from "@/schemas/product";
import { ProductTable } from "@/components/products/table";

export default function ProductsPage() {
  const [products, setProducts] = useState<z.infer<typeof productSchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      });
  }, []);

  if (!products.length) return <h1>Loading...</h1>;
  return (
    <>
      <ProductTable data={products} />
    </>
  );
}
