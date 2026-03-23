"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // For now, redirect to home with search term in URL
      // In a full app, this would search across providers
      router.push(`/?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search services, providers, or locations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-6 py-4 h-12"
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
