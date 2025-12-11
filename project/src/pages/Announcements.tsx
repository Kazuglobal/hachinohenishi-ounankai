import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';

const Announcements: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const announcements = [
    {
      id: 8,
      title: '会長からのご挨拶',
      category: 'お知らせ',
      categoryColor: 'bg-blue-600',
      date: '2025年12月15日',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=640',
      summary: '奥南会公式ホームページ開設に寄せた会長メッセージを掲載しました。'
    },
    {
      id: 1,
      title: '奥南会 二期生 同期会',
      category: 'イベント',
      categoryColor: 'bg-red-500',
      date: '2026年1月3日',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=640',
      summary: '令和8年（2026年）1月3日（土）午後4時開宴、八戸パークホテルにて開催。会費8,000円。第1次締切：令和7年12月5日（金）、第2次締切：令和7年12月19日（金）。出欠はnishikou2ki@gmail.comまで。'
    }
  ];

  const categories = [
    { id: 'all', name: 'すべて' },
    { id: 'イベント', name: 'イベント' },
    { id: '募集', name: '募集' },
    { id: 'お知らせ', name: 'お知らせ' },
    { id: '寄付支援', name: '寄付支援' }
  ];

  const filteredAnnouncements = activeCategory === 'all'
    ? announcements
    : announcements.filter(a => a.category === activeCategory);
  const activeCategoryName = categories.find((c) => c.id === activeCategory)?.name ?? 'お知らせ';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="px-4 py-6">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">お知らせ</h1>
          </div>

          {/* Category Tabs */}
          <div className="mb-6 -mx-4 overflow-x-auto px-4">
            <div className="flex gap-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                    activeCategory === category.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Announcements List */}
          <div className="space-y-4">
            {filteredAnnouncements.length === 0 ? (
              <div className="w-full rounded-2xl border border-dashed border-gray-200 bg-white/80 p-6 text-center text-sm text-gray-600">
                現在、{activeCategoryName}のお知らせはありません。
              </div>
            ) : (
              filteredAnnouncements.map((announcement) => (
                <Link
                  key={announcement.id}
                  to={`/announcements/${announcement.id}`}
                  className="block w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-98 text-left"
                >
                  <div className="flex gap-3 p-3">
                    <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
                      <img
                        src={announcement.image}
                        alt={announcement.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        <span className={`${announcement.categoryColor} text-white text-xs font-bold px-2 py-0.5 rounded`}>
                          {announcement.category}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0 ml-auto mt-0.5" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                        {announcement.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{announcement.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 pb-3">
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                      {announcement.summary}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                      続きを読む
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">お知らせ</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              同窓生コミュニティの最新情報、イベント、ニュースをお届けします
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeCategory === category.id
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Announcements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnnouncements.length === 0 ? (
              <div className="col-span-full rounded-3xl border border-dashed border-gray-200 bg-white/80 p-10 text-center text-gray-600">
                現在、{activeCategoryName}のお知らせはありません。
              </div>
            ) : (
              filteredAnnouncements.map((announcement) => (
                <Link
                  key={announcement.id}
                  to={`/announcements/${announcement.id}`}
                  className="block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={announcement.image}
                      alt={announcement.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`${announcement.categoryColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                        {announcement.category}
                      </span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                      {announcement.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{announcement.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {announcement.summary}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                      続きを読む
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
