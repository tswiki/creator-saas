
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  author: string;
  rating: number;
  students: number;
  thumbnail: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function MarketplacePage() {
  const [products] = useState<Product[]>([
    {
      id: 1,
      title: "Digital Marketing Mastery Course",
      description: "Comprehensive guide to modern digital marketing strategies",
      price: 199.99,
      category: "Course",
      author: "John Smith",
      rating: 4.8,
      students: 1250,
      thumbnail: "/images/digital-marketing.jpg",
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
      thumbnail: "/images/content-toolkit.jpg",
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
      thumbnail: "/images/business-growth.jpg",
    },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartItemQuantity = (productId: number, change: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const shouldBlur = activeProduct || isCartOpen || isChatOpen;

  const renderPopoverContent = (product: Product) => {
    switch (product.id) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>by {product.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="space-y-4">
                <h3 className="font-semibold">Course Modules:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Social Media Marketing Fundamentals</li>
                  <li>SEO & Content Strategy</li>
                  <li>Paid Advertising Campaigns</li>
                  <li>Email Marketing Automation</li>
                  <li>Analytics & Performance Tracking</li>
                </ul>
                <div className="flex items-center justify-between mt-2">
                  <span>Rating: {product.rating} ★</span>
                  <span>Students: {product.students}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>Community & Resources by {product.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="space-y-4">
                <h3 className="font-semibold">Community Benefits:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Access to private Discord community</li>
                  <li>Weekly live Q&A sessions</li>
                  <li>Creators' Library</li>
                  <li>Monthly content planning workshops</li>
                  <li>Networking opportunities</li>
                </ul>
                <div className="flex items-center justify-between mt-2">
                  <span>Active Members: {product.students}</span>
                  <span>Rating: {product.rating} ★</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => addToCart(product)}>
                Join Community
              </Button>
            </CardFooter>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>1-on-1 Mentorship with {product.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="space-y-4">
                <h3 className="font-semibold">Program Details:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>12-week intensive mentorship program</li>
                  <li>Weekly 1-on-1 strategy sessions</li>
                  <li>Personalized growth roadmap</li>
                  <li>Direct access to mentor via Discord</li>
                  <li>Limited to 5 students per cohort</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  *Application required. Only serious entrepreneurs will be considered.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => addToCart(product)}>
                Apply Now
              </Button>
            </CardFooter>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen p-8 bg-gray-50 relative items-center justify-center ${shouldBlur ? 'blur-background' : ''}`}>
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Digital Product Marketplace</h1>

      {/* Centered Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-screen-lg">
        {products.map((product) => (
          <Popover 
            key={product.id} 
            modal 
            onOpenChange={(isOpen) => setActiveProduct(isOpen ? product : null)}
          >
            <PopoverTrigger asChild>
              <Card className="cursor-pointer">
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{product.description}</p>
                  <p className="text-xl font-bold">${product.price}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                </CardFooter>
              </Card>
            </PopoverTrigger>
            <PopoverContent align="center" side="top" className="w-96">
              {renderPopoverContent(product)}
            </PopoverContent>
          </Popover>
        ))}
      </div>

      {/* Cart Button in Centered Top */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="fixed left-1/2 top-4 transform -translate-x-1/2 z-50 px-4 py-2"
          >
            Cart ({cart.length}) - ${getTotalPrice()}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-80">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Shopping Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-3 pb-3 border-b"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-600">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => updateCartItemQuantity(item.id, 1)}
                        size="sm"
                      >
                        +
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => updateCartItemQuantity(item.id, -1)}
                        size="sm"
                      >
                        -
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${getTotalPrice()}</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Centered Chat Assistant */}
      <Popover modal>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="fixed bottom-4 right-4 z-50"
          >
            Chat with Assistant
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" side="top" className="w-80 h-96 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            <p className="text-sm text-muted-foreground">
              How can I assist you today?
            </p>
            <div className="mt-4">
              <div className="text-sm text-gray-700">
                <p>Assistant: Welcome! How can I help with your purchase?</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </PopoverContent>
      </Popover>

      <style jsx>{`
        .blur-background {
          filter: blur(5px);
          transition: filter 0.3s ease;
        }
      `}</style>
    </div>
  );
}
