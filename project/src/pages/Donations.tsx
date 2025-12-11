import React from 'react';
import { Link, Navigate } from 'react-router-dom';

const Donations: React.FC = () => {
  const isProd = import.meta.env.PROD;

  // 本番デプロイではページを表示せずホームへリダイレクト
  if (isProd) {
    return <Navigate to="/" replace />;
  }

  // 開発・プレビュー環境では「準備中」表示のみ
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl ring-1 ring-gray-200 p-10 text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">寄付ページは準備中です</h1>
        <p className="text-gray-700 leading-relaxed">
          オンライン寄付ページを現在準備しています。公開まで今しばらくお待ちください。
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
};

export default Donations;

