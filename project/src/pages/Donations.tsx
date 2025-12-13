import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Donations: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 rounded-3xl bg-white p-10 text-center shadow-2xl ring-1 ring-gray-200">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          <Heart size={16} className="opacity-80" />
          <span>寄付ページ準備中</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">現在準備中です</h1>
        <p className="max-w-2xl text-gray-700 leading-relaxed">公開まで今しばらくお待ちください。</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            ホームに戻る
          </Link>
          <a
            href="mailto:ounankai@gmail.com"
            className="inline-flex items-center justify-center rounded-full border border-blue-200 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            お問い合わせ
          </a>
        </div>
      </div>
    </div>
  );
};

export default Donations;

