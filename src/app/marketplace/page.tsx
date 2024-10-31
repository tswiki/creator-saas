

"use client";

import { useState, useEffect } from "react";

export default function MarketplacePage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Digital Marketing Mastery Course",
      description: "Comprehensive guide to modern digital marketing strategies",
      price: 199.99,
      category: "Course",
      author: "John Smith",
      rating: 4.8,
      students: 1250,
      thumbnail: "/images/digital-marketing.jpg"
    },
    {
      id: 2, 
      title: "Content Creation Toolkit",
      description: "Templates and resources for content creators",
      price: 49.99,
      category: "Resource",
      author: "Sarah Johnson",
      rating: 4.6,
      students: 830,
      thumbnail: "/images/content-toolkit.jpg"
    },
    {
      id: 3,
      title: "Business Growth Blueprint",
      description: "Step-by-step guide to scaling your online business",
      price: 299.99,
      category: "Course",
      author: "Mike Wilson",
      rating: 4.9,
      students: 2100,
      thumbnail: "/images/business-growth.jpg"
    }
  ]);

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen p-8 bg-gray-50">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Digital Product Marketplace</h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button 
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-indigo-600 text-white" : "bg-white text-gray-600"}`}
            >
              All Products
            </button>
            <button
              onClick={() => setFilter("Course")} 
              className={`px-4 py-2 rounded-md ${filter === "Course" ? "bg-indigo-600 text-white" : "bg-white text-gray-600"}`}
            >
              Courses
            </button>
            <button
              onClick={() => setFilter("Resource")}
              className={`px-4 py-2 rounded-md ${filter === "Resource" ? "bg-indigo-600 text-white" : "bg-white text-gray-600"}`}
            >
              Resources
            </button>
          </div>
          <div className="relative">
            <input
              type="search"
              placeholder="Search products..."
              className="px-4 py-2 border rounded-md w-64"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products
          .filter(product => filter === "all" || product.category === filter)
          .map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">{product.title}</h2>
                  <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-gray-600">{product.rating}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-600">{product.students} students</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">${product.price}</div>
                </div>
                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
