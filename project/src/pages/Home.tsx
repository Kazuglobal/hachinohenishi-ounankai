import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Award,
  MapPin,
  ArrowRight,
  Megaphone,
  Trophy,
  BookOpen,
  Image as ImageIcon,
  Newspaper,
  X
} from 'lucide-react';
import { alumniTopics } from '../data/alumniTopics';
import { featureFlags } from '../config/environment';

// Constants for animations and UI
const PULSE_BAR_COUNT = 4;
const PULSE_BAR_DELAY_STEP = 0.2; // seconds

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const heroSlides = [
    {
      image: '/images/school-building.png'
    },
    {
      image: '/images/school-aerial.png'
    },
    {
      image: '/images/school-emblem-new.png'
    }
  ];

  const featuredAlumni = [
    {
      id: 1,
      name: '田中 さくら',
      year: '2018年卒',
      profession: 'テクノロジー起業家',
      location: '東京都',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      achievement: '5000万ドルの価値を持つAIスタートアップを創設'
    },
    {
      id: 2,
      name: '陳 健太',
      year: '2015年卒',
      profession: '医学研究者',
      location: '大阪府',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      achievement: '画期的ながん研究プロジェクトを主導'
    },
    {
      id: 3,
      name: '山田 美咲',
      year: '2012年卒',
      profession: '環境弁護士',
      location: '愛知県',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      achievement: '連邦レベルでの気候政策改革を推進'
    }
  ];

  const newsItems = [
    {
      id: 5,
      title: '会長からのご挨拶',
      date: '2025年12月15日',
      category: '楓',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=640',
      href: '/announcements/8',
      summary: '公式サイト開設にあたり、会長より感謝と今後の展望をお伝えします。'
    },
    {
      id: 1,
      title: '奥南会 二期生 同期会',
      date: '2026年01月03日',
      category: '会',
      image: '/images/ounankai2ki%20-%20コピー.JPG',
      href: '/announcements',
      summary: '令和8年1月3日、八戸パークホテルで同期会を開催します。',
      details: {
        date: '令和8年（2026年）1月3日（土）午後4時開宴',
        location: '八戸パークホテル（八戸市吹上）',
        fee: '8,000円（当日会場にて）',
        deadlines: ['第1次締切：令和7年12月5日（金）', '第2次締切：令和7年12月19日（金）'],
        contact: 'nishikou2ki@gmail.com',
        contactNote: 'メールで件名「同期会出欠」として①お名前 ②出欠 ③電話番号を送信'
      }
    }
  ];

  const galleryQuickLink = featureFlags.galleryEnabled
    ? {
        title: 'ギャラリー',
        href: '/gallery',
        disabled: false
      }
    : {
        title: '準備中',
        href: undefined,
        disabled: true
      };

  const quickLinks = [
    {
      title: '会長挨拶',
      href: '/announcements/8',
      icon: Award,
      bubbleGradient: 'from-orange-200 via-amber-100 to-yellow-200',
      iconColor: 'text-blue-700',
      iconBg: 'bg-white'
    },
    {
      title: '同窓会活動',
      href: '/alumni-activities',
      icon: Users,
      bubbleGradient: 'from-sky-300 via-cyan-200 to-sky-200',
      iconColor: 'text-blue-700',
      iconBg: 'bg-white'
    },
    {
      title: '部活動報告',
      href: '/club-activities',
      icon: Trophy,
      bubbleGradient: 'from-pink-300 via-pink-200 to-rose-200',
      iconColor: 'text-blue-700',
      iconBg: 'bg-white'
    },
    {
      title: '役員名簿',
      href: '/board-of-directors',
      icon: BookOpen,
      bubbleGradient: 'from-emerald-300 via-teal-200 to-green-200',
      iconColor: 'text-blue-700',
      iconBg: 'bg-white'
    },
    {
      title: galleryQuickLink.title,
      href: galleryQuickLink.href,
      disabled: galleryQuickLink.disabled,
      icon: ImageIcon,
      bubbleGradient: 'from-indigo-300 via-violet-200 to-purple-200',
      iconColor: 'text-blue-700',
      iconBg: 'bg-white'
    },
    {
      title: '準備中',
      href: undefined,
      disabled: true,
      icon: Megaphone,
      bubbleGradient: 'from-amber-200 via-amber-100 to-yellow-200',
      iconColor: 'text-blue-700',
      iconBg: 'bg-white'
    }
  ];

  const showAdvertisementGallery = featureFlags.advertisementGalleryEnabled;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const dismissed = typeof window !== 'undefined' && localStorage.getItem('ounankaiPopupDismissed') === '1';
    if (dismissed) return;
    const timer = setTimeout(() => setShowPopup(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const dismissPopup = () => {
    setShowPopup(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ounankaiPopupDismissed', '1');
    }
  };


  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div>
      {showPopup && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              onClick={dismissPopup}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white shadow-lg transition hover:bg-black"
              aria-label="閉じる"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative bg-white">
              <img
                src="/images/ounankai2ki%20-%20コピー.JPG"
                alt="奥南会 二期生 同期会"
                className="mx-auto h-full w-full max-h-[65vh] max-w-5xl object-contain rounded-2xl bg-transparent shadow-2xl ring-1 ring-black/5"
                loading="lazy"
              />
              <div className="absolute bottom-4 right-4">
                <Link
                  to="/announcements/1"
                  onClick={dismissPopup}
                  className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-blue-700 shadow-lg ring-1 ring-black/5 hover:bg-white"
                >
                  詳細を見る
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="px-4 pb-0 pt-4">
          <section className="relative h-56 overflow-hidden rounded-3xl shadow-lg mb-4">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt="青森県立八戸西高等学校"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`スライド ${index + 1}`}
                />
              ))}
            </div>
          </section>

          {showAdvertisementGallery && (
            <section className="rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-4 shadow-lg mb-4 border border-blue-100">
              <span className="inline-flex items-center rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
                NEW
              </span>
              <h2 className="mt-3 text-lg font-semibold text-gray-900">広告ギャラリー公開中</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                最新広告をまとめました。
              </p>
              <Link
                to="/advertisement-gallery"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                詳細を見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          )}

          <section className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">ニュース</h2>
              <Link
                to="/announcements"
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600"
              >
                もっと見る
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="-mx-4 overflow-x-auto px-4 pb-2">
              <div className="flex snap-x snap-mandatory gap-4">
                {newsItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className="relative w-[234px] shrink-0 snap-center overflow-hidden rounded-[32px] bg-white shadow-[0_16px_32px_rgba(30,64,175,0.08)] ring-1 ring-blue-50 transition-transform duration-200 hover:-translate-y-1"
                >
                   <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  </div>
                  <div className="relative flex min-h-[170px] flex-col justify-end p-6">
                    <h3 className="mt-6 text-sm font-semibold leading-snug text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500">{item.date}</p>
                    {item.summary && (
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {item.summary}
                      </p>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                      続きを読む
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">クイックアクセス</h2>
            <div className="grid grid-cols-3 gap-3">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                const isDisabled = item.disabled || !item.href;
                const cardClasses = `group relative overflow-hidden rounded-[28px] bg-white px-5 pb-6 pt-6 text-left shadow-[0_16px_32px_rgba(30,64,175,0.08)] ring-1 ring-blue-50 transition-all duration-200 ${
                  isDisabled
                    ? 'cursor-not-allowed opacity-70'
                    : 'hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(30,64,175,0.14)]'
                }`;

                const CardBody = () => (
                  <>
                    <div
                      className={`absolute -top-8 right-[-18px] h-32 w-32 rounded-full bg-gradient-to-br ${item.bubbleGradient} opacity-90 transition-transform duration-300 ${
                        isDisabled ? '' : 'group-hover:scale-105'
                      }`}
                    />
                    <div className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_10px_20px_rgba(30,64,175,0.15)]">
                      <Icon className={`h-6 w-6 ${item.iconColor}`} />
                    </div>
                    <p className="relative z-10 mt-5 text-xs font-semibold leading-snug text-slate-800">
                      {item.title}
                    </p>
                    {isDisabled && item.title !== '準備中' && (
                      <span className="relative z-10 mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-gray-500">
                        準備中
                      </span>
                    )}
                  </>
                );

                return (
                  isDisabled ? (
                    <div key={item.title} className={cardClasses} aria-disabled="true">
                      <CardBody />
                    </div>
                  ) : (
                    <Link key={item.title} to={item.href!} className={cardClasses}>
                      <CardBody />
                    </Link>
                  )
                );
              })}
            </div>
          </section>

          <section className="rounded-[20px] bg-white p-2 shadow-lg mb-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md">
                <Newspaper className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">卒業生トピックス</h2>
                <p className="text-xs font-medium uppercase tracking-wider text-blue-600">ALUMNI TOPICS</p>
              </div>
              <Link
                to="/alumni-topics"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600"
              >
                もっと見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-0.5">
              {alumniTopics.map((topic, index) => {
                const isPlaceholder = index >= 2;
                if (isPlaceholder) {
                  return (
                    <div
                      key={`placeholder-${topic.id}`}
                      className="flex items-center gap-2 rounded-[10px] p-2 bg-gray-50 text-gray-500 ring-1 ring-gray-100"
                    >
                      <div className="h-12 w-12 flex-shrink-0 rounded-md bg-gray-200" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-600">準備中</p>
                        <p className="text-xs text-gray-400 truncate">まもなく公開予定です</p>
                      </div>
                      <div className="text-xs font-semibold text-gray-400 px-2 py-1 rounded-full bg-white/60 ring-1 ring-gray-200">
                        Coming Soon
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={topic.id}
                    to={topic.url ?? '/alumni-topics'}
                    className={`group flex items-center gap-2 rounded-[10px] p-2 transition-all duration-300 ${
                      index === 0
                        ? 'bg-blue-50/80 shadow-sm ring-1 ring-blue-100 animate-pulse'
                        : 'hover:bg-gray-100'
                    }`}
                    aria-label={`${topic.title} - ${topic.category}`}
                    title={topic.title}
                  >
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md shadow-sm">
                      <img
                        src={topic.thumbnail}
                        alt={topic.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`truncate text-sm font-semibold ${
                        index === 0 ? 'text-blue-700' : 'text-gray-900'
                      }`}>{topic.title}</h3>
                      <div className="mt-0.5 flex items-center gap-2">
                        <span className={`text-xs font-medium ${
                          index === 0 ? 'text-blue-600' : 'text-gray-500'
                        }`}>{topic.category}</span>
                        <span className="text-xs text-gray-400" aria-hidden="true">•</span>
                        <span className="text-xs text-gray-400">{topic.date}</span>
                      </div>
                    </div>
                    {index === 0 ? (
                      <div className="flex items-center gap-0.5" aria-label="現在注目のトピック" role="status">
                        {Array.from({ length: PULSE_BAR_COUNT }, (_, i) => (
                          <div
                            key={i}
                            className="h-7 w-0.5 rounded-full bg-blue-500"
                            style={{
                              animation: 'pulseBar 1s ease-in-out infinite',
                              animationDelay: `${i * PULSE_BAR_DELAY_STEP}s`
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <div
                        className="flex h-6 w-6 items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                        aria-label="トピックを読む"
                        role="button"
                      >
                        <div className="h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-gray-900" />
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Hero Section with Slideshow */}
        <section className="relative h-[80vh] overflow-hidden rounded-b-3xl">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt="青森県立八戸西高等学校"
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end justify-center pb-20">
          <Link
            to="/announcements"
            className="bg-blue-600/90 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700/90 transition-all duration-200 transform hover:scale-105 shadow-xl"
          >
            今後のイベント
          </Link>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* President's Greeting */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  会長からのご挨拶
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  八戸西高等学校同窓会奧南会の皆様へ
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  八戸西高等学校同窓会奧南会の皆様におかれましては、各方面においてご活躍のことと心よりお喜び申し上げます。また、日頃より同窓会活動に対してご理解とご協力を賜り、厚く御礼申し上げます。
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  この度、同窓生の皆様との更なる連携強化と情報共有の充実を図るため、奧南会公式ホームページを開設する運びとなりました。創立以来培われてきた同窓生の絆を、現代の情報技術を活用してより一層深めてまいりたいと考えております。
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  近年、デジタル化の進展により、情報伝達の手段も大きく変化しております。このホームページを通じて、同窓会の活動報告、各種イベントのご案内、そして同窓生の皆様の近況報告など、タイムリーな情報発信を行ってまいります。また、同窓生同士の交流促進の場としてもご活用いただけるよう、様々なコンテンツを準備しております。
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  自啓自発の校訓のもと、文武両道を目指して青春を過ごした母校での思い出は、皆様にとってかけがえのない財産であることでしょう。このホームページが、そうした思い出を共有し、新たな交流を生み出す架け橋となることを願っております。
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  結びに、ホームページ開設にあたりご協力いただきました関係者の皆様に心から感謝申し上げますとともに、同窓生の皆様の益々のご健勝と今後のご活躍を御祈念申し上げます。
                </p>
                <div className="text-right">
                  <p className="text-2xl font-script text-blue-600 mb-2" style={{fontFamily: 'cursive'}}>
                    松井 正文
                  </p>
                  <p className="text-gray-600 font-medium">青森県立八戸西高等学校同窓会奥南会 会長</p>
                  <p className="text-gray-500 text-sm">1995年卒</p>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop"
                    alt="松井正文 同窓会会長"
                    className="w-80 h-96 object-cover rounded-3xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                    <Award className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">12,000+</h3>
              <p className="text-gray-600 font-medium">卒業生</p>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">50</h3>
              <p className="text-gray-600 font-medium">創立周年</p>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">6</h3>
              <p className="text-gray-600 font-medium">学級数</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Alumni */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              つながりの輪
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              同窓生との新しいつながりを築きましょう
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredAlumni.map((alumni) => (
              <div
                key={alumni.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-square">
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{alumni.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{alumni.year}</p>
                  <p className="text-gray-700 font-medium mb-2">{alumni.profession}</p>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{alumni.location}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{alumni.achievement}</p>
                  <Link
                    to={`/alumni-profiles/${alumni.id}`}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
                  >
                    詳細プロフィールを見る
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/alumni-profiles"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-xl"
            >
              すべての同窓生を見る
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              つながりませんか？
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              同窓生とのつながりが、新たな人脈を築き、転職の機会を広げ、人生の可能性を無限に広げていきます。
              先輩・後輩たちとつながろう！
            </p>
            <div className="flex justify-center">
              <Link
                to="/member-registration"
                className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 border-2 border-white shadow-lg"
              >
                メンバー登録をする
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};

export default Home;
