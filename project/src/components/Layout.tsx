import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Users, Calendar, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, PlayCircle, PauseCircle } from 'lucide-react';
import { featureFlags } from '../config/environment';
import MobileTabBar from './MobileTabBar';
import MobileHeader from './MobileHeader';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  };

  const navigation = [
    { name: 'ホーム', href: '/' },
    { name: '会則', href: '/bylaws' },
    { name: '役員名簿', href: '/board-of-directors' },
    featureFlags.galleryEnabled
      ? { name: 'ギャラリー', href: '/gallery' }
      : { name: 'ギャラリー（準備中）', href: '/gallery', disabled: true },
    { name: '同窓生とつながる', href: '/alumni-profiles' },
    { name: '同窓会活動', href: '/alumni-activities' },
    { name: 'お知らせ', href: '/announcements' },
    { name: 'お問い合わせ', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3F0]">
      {/* Background Music */}
      <audio
        ref={audioRef}
        src="/background-music.mp3"
        loop
        preload="auto"
      />

      {/* Music Control Button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-28 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/90 text-white shadow-xl transition-all duration-200 hover:bg-blue-700/90 backdrop-blur-sm sm:bottom-auto sm:right-6 sm:top-24"
        aria-label={isPlaying ? '校歌を一時停止' : '校歌を再生'}
      >
        {isPlaying ? <PauseCircle className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
      </button>

      {/* Navigation */}
      <header
        className={`z-50 w-full transition-all duration-300 ${
          isScrolled ? 'lg:bg-white/95 lg:backdrop-blur-sm lg:shadow-lg' : 'lg:bg-transparent'
        } lg:fixed`}
      >
        <div className="hidden lg:block">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-24 items-center justify-between gap-4 xl:h-32">
              <Link to="/" className="flex items-center">
                <img
                  src="/images/logo-ounankai.png"
                  alt="青森県立八戸西高等学校同窓会奥南会"
                  className="h-20 w-auto xl:h-28"
                />
              </Link>
              <div className="flex flex-nowrap items-center space-x-4 xl:space-x-6">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;

                  if (item.disabled) {
                    return (
                      <span
                        key={item.name}
                        className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-gray-400 border border-dashed border-gray-200 cursor-not-allowed"
                        aria-disabled="true"
                        title="準備中です"
                      >
                        {item.name}
                      </span>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-md'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>

        <div className="lg:hidden">
          <div className="relative">
            <MobileHeader />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="absolute right-4 top-4 rounded-2xl bg-white/95 p-2 shadow-md transition hover:bg-white"
              aria-label="メニュー"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-blue-600" /> : <Menu className="h-6 w-6 text-blue-600" />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="space-y-2 bg-white/95 px-4 py-4 shadow-lg backdrop-blur-md">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;

                if (item.disabled) {
                  return (
                    <span
                      key={item.name}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-400 border border-dashed border-gray-200"
                      aria-disabled="true"
                      title="準備中です"
                    >
                      {item.name}
                    </span>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-16 pt-4 sm:pt-6 lg:pb-0 lg:pt-36 xl:pt-40">
        {children}
      </main>

      {/* Mobile Tab Bar */}
      <div className="fixed bottom-0 left-1/2 z-40 w-full -translate-x-1/2 px-4 pb-3 lg:hidden">
        <MobileTabBar />
      </div>

      {/* Footer (desktop only) */}
      <footer className="bg-white rounded-t-3xl mt-8 shadow-2xl hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 lg:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center">
                <img 
                  src="/images/logo-ounankai.png" 
                  alt="青森県立八戸西高等学校同窓会奥南会" 
                  className="h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 w-auto"
                />
              </div>
              <p className="mt-4 text-gray-600 max-w-md">Coming soon</p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-200">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-200">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-200">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-200">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">クイックリンク</h4>
              <ul className="space-y-3">
                <li className="text-gray-600">Coming soon</li>
                <li className="text-gray-600">Coming soon</li>
                <li className="text-gray-600">Coming soon</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">お問い合わせ</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">Coming soon</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">Coming soon</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-600">Coming soon</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

