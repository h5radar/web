import { useState, useEffect } from "react";
import { z } from "zod";
import { API_URL } from "@/constants";
import { technologyBlipSchema } from "@/schemas/technology-blip";
import { TechnologyBlipTable } from "@/components/technology-blips/table";

export default function ProductsPage() {
  const [technologyBlips, setProducts] = useState<z.infer<typeof technologyBlipSchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/technology-blips`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      });
  }, []);

  if (!technologyBlips.length) return <h1>Loading...</h1>;
  return (
    <>
      <TechnologyBlipTable data={technologyBlips} />
    </>
  );
}
