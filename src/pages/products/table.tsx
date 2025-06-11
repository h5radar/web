import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { z } from "zod";

import { RADAR_API_URL } from "@/constants/application";

import { productSchema } from "@/schemas/product";

export default function ProductsPage() {
  const auth = useAuth();
  const [products, setProducts] = useState<z.infer<typeof productSchema>[]>([]);
  useEffect(() => {
    fetch(`${RADAR_API_URL}/products`, {
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

  return (
    <>
      <h1 className="text-3xl font-bold underline">Products</h1>
      <div>{products.length}</div>
    </>
  );
}
