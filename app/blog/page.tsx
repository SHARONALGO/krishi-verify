import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: 'How Blockchain Technology is Revolutionizing Agricultural Transparency',
      excerpt: 'Discover how blockchain ensures tamper-proof records and builds unprecedented trust in agricultural transactions.',
      author: 'Dr. Rajesh Kumar',
      date: 'Mar 5, 2026',
      category: 'Technology',
      readTime: '8 min read',
      image: '🔗',
    },
    {
      id: 2,
      title: 'Success Story: How One Farmer Increased Income by 35% Using KRISHI-VERIFY',
      excerpt: 'Meet Harjeet from Punjab who doubled his market access and eliminated middlemen through our platform.',
      author: 'Priya Singh',
      date: 'Mar 3, 2026',
      category: 'Success Stories',
      readTime: '6 min read',
      image: '👨‍🌾',
    },
    {
      id: 3,
      title: 'Understanding MSP: Your Rights as a Farmer',
      excerpt: 'Complete guide to Minimum Support Price, government guarantees, and how to ensure fair pricing.',
      author: 'Arun Singh',
      date: 'Feb 28, 2026',
      category: 'Education',
      readTime: '10 min read',
      image: '📊',
    },
    {
      id: 4,
      title: 'New Features: Real-time Market Analytics Dashboard Released',
      excerpt: 'Track price trends, demand forecasts, and make data-driven decisions with our latest analytics tools.',
      author: 'Technical Team',
      date: 'Feb 25, 2026',
      category: 'Updates',
      readTime: '5 min read',
      image: '📈',
    },
    {
      id: 5,
      title: 'Expanding to 5 New States: KRISHI-VERIFY Reaches 25+ States Milestone',
      excerpt: 'We\'re excited to announce our expansion, bringing transparent trading to even more farmers across India.',
      author: 'Media Team',
      date: 'Feb 20, 2026',
      category: 'News',
      readTime: '4 min read',
      image: '🗺️',
    },
    {
      id: 6,
      title: 'Best Practices: Quality Standards in Agricultural Trading',
      excerpt: 'Learn how to maintain consistent quality and get premium prices for your produce.',
      author: 'Quality Team',
      date: 'Feb 15, 2026',
      category: 'Guides',
      readTime: '7 min read',
      image: '✅',
    },
  ];

  const categories = ['All', 'Technology', 'Success Stories', 'Education', 'Updates', 'News', 'Guides'];

  const getCategoryColor = (category: string) => {
    const colors = {
      Technology: 'bg-blue-100 text-blue-700',
      'Success Stories': 'bg-green-100 text-green-700',
      Education: 'bg-purple-100 text-purple-700',
      Updates: 'bg-emerald-100 text-emerald-700',
      News: 'bg-amber-100 text-amber-700',
      Guides: 'bg-pink-100 text-pink-700',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Resources</h1>
          <p className="text-lg text-emerald-100">
            Expert insights, success stories, and guides for modern farming
          </p>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-12 md:py-16">
        {/* Featured Post */}
        <section className="mb-16">
          <div className="rounded-lg overflow-hidden border border-emerald-200 bg-white hover:shadow-lg transition-shadow">
            <div className="grid gap-8 md:grid-cols-3 items-center">
              <div className="col-span-2 p-8">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${getCategoryColor('Technology')}`}>
                  Featured
                </span>
                <h2 className="text-3xl font-bold text-emerald-900 mb-4">
                  How Blockchain Technology is Revolutionizing Agricultural Transparency
                </h2>
                <p className="text-forest-700 mb-6 text-lg">
                  Discover how blockchain ensures tamper-proof records and builds unprecedented trust in agricultural transactions.
                </p>
                <div className="flex items-center gap-6 mb-6 text-sm text-forest-600">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Dr. Rajesh Kumar
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Mar 5, 2026
                  </span>
                  <span>8 min read</span>
                </div>
                <Link href="#">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="text-6xl flex items-center justify-center h-full bg-emerald-50">
                🔗
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <h3 className="text-lg font-bold text-emerald-900 mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === 'All'
                    ? 'bg-emerald-600 text-white'
                    : 'border border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Posts Grid */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-emerald-900 mb-8">Latest Articles</h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-lg border border-emerald-200 overflow-hidden hover:shadow-lg transition-all hover:border-emerald-400"
              >
                <div className="text-6xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 flex items-center justify-center">
                  {post.image}
                </div>

                <div className="p-6">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-bold mb-3 ${getCategoryColor(post.category)}`}
                  >
                    {post.category}
                  </span>

                  <h3 className="font-bold text-emerald-900 mb-3 line-clamp-2 text-lg">{post.title}</h3>
                  <p className="text-forest-700 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-forest-600 mb-4 pb-4 border-t border-emerald-100 pt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  <Link href="#">
                    <Button variant="outline" className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                      Read More
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="rounded-lg bg-gradient-to-r from-emerald-700 to-emerald-600 text-white p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-emerald-100 mb-6">
              Get weekly updates on farming tips, market trends, and platform features delivered to your inbox.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg text-forest-700 focus:outline-none"
              />
              <Button className="bg-white text-emerald-700 hover:bg-emerald-50">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
