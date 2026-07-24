import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Blog & Inspiration | Offline Living",
  description: "Read our latest articles on photography, memory keeping, and design inspiration.",
};

export default function BlogPage() {
  const posts = [
    {
      id: "how-to-organize-digital-photos",
      title: "How to Organize Your Digital Camera Roll in 5 Steps",
      excerpt: "Stop feeling overwhelmed by your 10,000+ photos. Here's our foolproof method for sorting, selecting, and preparing your images for print.",
      category: "Guides",
      date: "Jul 10, 2026",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=400&fit=crop"
    },
    {
      id: "wedding-album-must-haves",
      title: "10 Must-Have Shots for Your Wedding Album",
      excerpt: "Beyond the portrait session and the first kiss, these are the candid moments you'll want to make sure your photographer captures.",
      category: "Inspiration",
      date: "Jun 28, 2026",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop"
    },
    {
      id: "the-science-of-print",
      title: "Why Printed Photos Make Us Happier",
      excerpt: "New psychological research suggests that physical photos in our environment improve our mood and strengthen family bonds.",
      category: "Culture",
      date: "Jun 15, 2026",
      image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=600&h=400&fit=crop"
    },
    {
      id: "travel-journal-tips",
      title: "Creating the Perfect Travel Journal",
      excerpt: "How to combine your iPhone snaps, professional DSLR shots, and scanned tickets into a beautiful cohesive travel photobook.",
      category: "Guides",
      date: "May 22, 2026",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-theme-ivory pt-40 pb-20">
      <div className="container max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-16">
          
          <h1 className="text-5xl font-serif text-theme-black mb-4">The Offline Blog</h1>
          <p className="text-lg text-theme-black/70 max-w-2xl mx-auto">
            Thoughts, guides, and inspiration for keeping your memories alive.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-20">
          <Link href={`/blog/${posts[0].id}`} className="group block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl overflow-hidden shadow-sm border border-theme-black/10 hover:shadow-md transition-shadow">
              <div className="h-64 md:h-full overflow-hidden">
                <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" data-placeholder="true" />
              </div>
              <div className="p-8 md:pr-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-theme-black px-2 py-1 border border-theme-black/20 rounded">{posts[0].category}</span>
                  <span className="text-sm text-theme-black/50">{posts[0].date}</span>
                </div>
                <h2 className="text-3xl font-serif text-theme-black mb-4 group-hover:underline decoration-1 underline-offset-4">{posts[0].title}</h2>
                <p className="text-theme-black/70 text-lg mb-6 leading-relaxed">{posts[0].excerpt}</p>
                <span className="text-theme-black font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Article &rarr;
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-theme-black/10 hover:shadow-md transition-shadow flex flex-col">
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" data-placeholder="true" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-theme-black/70">{post.category}</span>
                  <span className="text-xs text-theme-black/50">{post.date}</span>
                </div>
                <h3 className="text-xl font-serif text-theme-black mb-3 group-hover:underline decoration-1 underline-offset-4">{post.title}</h3>
                <p className="text-theme-black/70 text-sm mb-6 flex-grow">{post.excerpt}</p>
                <span className="text-theme-black text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                  Read Article &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
           <button className="border border-theme-black text-theme-black px-8 py-3 rounded hover:bg-theme-black hover:text-white transition-colors">
             Load More Articles
           </button>
        </div>

      </div>
    </div>
  );
}
