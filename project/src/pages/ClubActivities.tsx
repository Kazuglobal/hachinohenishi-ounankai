import React from 'react';
import { Calendar, Music, Camera, Mic, Award, Trophy } from 'lucide-react';

const ClubActivities: React.FC = () => {
  const recentActivities: any[] = [];

  const achievements: any[] = [];

  const featuredClubs: any[] = [];

  const Placeholder = ({ message }: { message: string }) => (
    <div className="w-full rounded-2xl border border-dashed border-gray-200 bg-white/80 p-6 text-center text-sm text-gray-600">
      {message}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">部活動報告</h1>
            <p className="text-sm text-gray-600">生徒たちの活発な部活動の様子をお伝えします</p>
          </div>

          {/* Recent Activities Section */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">最近の活動</h2>
            <Placeholder message="現在、部活動報告は準備中です。公開までお待ちください。" />
          </section>

          {/* Achievements Section */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">主な成績・受賞</h2>
            <Placeholder message="現在、成績・受賞情報は準備中です。" />
          </section>

          {/* Featured Clubs Section */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">注目の部活動</h2>
            <Placeholder message="現在、注目の部活動は準備中です。" />
          </section>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">部活動報告</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              生徒たちの活発な部活動の様子をお伝えします
            </p>
          </div>

          {/* Recent Activities Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">最近の活動</h2>
            <Placeholder message="現在、部活動報告は準備中です。公開までお待ちください。" />
          </section>

          {/* Achievements Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">主な成績・受賞</h2>
            <Placeholder message="現在、成績・受賞情報は準備中です。" />
          </section>

          {/* Featured Clubs Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">注目の部活動</h2>
            <Placeholder message="現在、注目の部活動は準備中です。" />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClubActivities;
