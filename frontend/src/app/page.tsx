import Link from "next/link";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
      <div className="text-center space-y-8">
        {/* Liquid Glass Card */}
        <div className="backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-3xl p-12 shadow-2xl shadow-purple-500/10">
          <div className="flex justify-center mb-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <Package className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Inventory App
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Kelola produk Anda dengan mudah. Sistem manajemen inventori yang modern dan efisien.
          </p>
          
          <Link href="/products">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Lihat Produk
            </Button>
          </Link>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Built with Laravel + Next.js + TailwindCSS v4
        </p>
      </div>
    </div>
  );
}

