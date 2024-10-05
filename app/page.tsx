import React from "react";
import { Product } from "../types";
import ProductList from "@/Component/ProductList";

async function getProducts(): Promise<Product[]> {
  // In a real application, you would fetch this data from an API
  // For this example, we'll return static data
  return [
    { id: 1, name: "Smartphone", price: 499.99 },
    { id: 2, name: "Laptop", price: 999.99 },
    { id: 3, name: "Headphones", price: 129.99 },
    { id: 4, name: "Smartwatch", price: 199.99 },
    { id: 5, name: "Tablet", price: 349.99 },
    { id: 6, name: "Camera", price: 599.99 },
  ];
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Welcome to E-Shop</h1>
      <ProductList products={products} />
    </>
  );
}
