import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { z } from "zod";

import { API_URL } from "@/constants/application";

import { productSchema } from "@/schemas/product";

import { ProductTable } from "@/components/products/table";

export default function ProductsPage() {
  const auth = useAuth();
  const [products, setProducts] = useState<z.infer<typeof productSchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      });
  }, [auth]);

  if (!products.length) return <h1>Loading...</h1>;
  return (
    <>
      <ProductTable data={products} />
    </>
  );
}
