import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

import { useAuthStore } from "../../store/auth"
import { fetchCategories, fetchProducts } from "../../utils/api";
import Loading from "../../components/Loading";
import ItemCard from "../../components/ItemCard";
import Categories from "../../components/Categories";
import SearchBar from "../../components/SearchBar";

export default function Browse() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetchCategories()
      .then((data) => setCategories(data));

    fetchProducts(selectedCategory ?? undefined)
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, [selectedCategory])

  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  if (loading) return <Loading />

  return (
    <div className="h-screen">
      <header className="flex items-start">
        {/* Search Bar Component */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <button className="text-white bg-orange-500 rounded-lg" onClick={handleLogout}>Logout</button>
      </header>
      <main className="flex">
        <aside className="w-1/4 min-w-48">
          {/* Categories Sidebar Component */}
          <Categories categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </aside>
        <section className="grid grid-cols-4 gap-4 p-10">
          {products.map((product) => (
            <ItemCard key={product.id} {...product} />
          ))}
        </section>
      </main>

    </div>
  )
}
