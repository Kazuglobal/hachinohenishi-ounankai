import React, { useState } from 'react';

const MemberRegistration: React.FC = () => {
  const [formTab, setFormTab] = useState<'career' | 'business' | 'network'>('career');

  const [careerForm, setCareerForm] = useState({
    name: '',
    graduationYear: '',
    department: '',
    email: '',
    title: '',
    currentPosition: '',
    workplace: '',
    location: '',
    skills: '',
    description: '',
    imageBase64: '',
    relatedUrl: '',
    instagramUrl: '',
    xUrl: '',
    facebookUrl: '',
    linkedinUrl: '',
  });
  const [careerImagePreview, setCareerImagePreview] = useState<string | null>(null);

  const [businessForm, setBusinessForm] = useState({
    name: '',
    graduationYear: '',
    department: '',
    email: '',
    businessName: '',
    category: '',
    location: '',
    hours: '',
    services: '',
    description: '',
    imageBase64: '',
    relatedUrl: '',
    hasAlumniDiscount: false,
  });
  const [businessImagePreview, setBusinessImagePreview] = useState<string | null>(null);

  const [networkForm, setNetworkForm] = useState({
    name: '',
    graduationYear: '',
    department: '',
    email: '',
    type: 'event',
    title: '',
    eventDate: '',
    deadline: '',
    venue: '',
    conditions: '',
    description: '',
    imageBase64: '',
    relatedUrl: '',
  });
  const [networkImagePreview, setNetworkImagePreview] = useState<string | null>(null);

  const [formSubmitting, setFormSubmitting] = useState<'career' | 'business' | 'network' | null>(null);
  const [formMessages, setFormMessages] = useState<{
    career: { type: 'success' | 'error'; text: string } | null;
    business: { type: 'success' | 'error'; text: string } | null;
    network: { type: 'success' | 'error'; text: string } | null;
  }>({
    career: null,
    business: null,
    network: null,
  });

const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwbL52F5ABG8b0OMxeL5IktiFbE7PGDImXP39ocEPE4emoRA4Mac8pscPGgaBYNBZw/exec';

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleImageUpload = (
    file: File,
    setImageBase64: (base64: string) => void,
    setPreview: (preview: string | null) => void
  ) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('画像サイズは5MB以下にしてください');
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('画像ファイルを選択してください');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImageBase64(base64String);
      setPreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (formType: 'career' | 'business' | 'network') => {
    setFormSubmitting(formType);
    setFormMessages({ ...formMessages, [formType]: null });

    let formData: any;
    if (formType === 'career') {
      if (!careerForm.name || !careerForm.graduationYear || !careerForm.email || !careerForm.title || !careerForm.description) {
        setFormMessages({ ...formMessages, career: { type: 'error', text: '必須項目を入力してください' } });
        setFormSubmitting(null);
        return;
      }
      if (!validateEmail(careerForm.email)) {
        setFormMessages({ ...formMessages, career: { type: 'error', text: '有効なメールアドレスを入力してください' } });
        setFormSubmitting(null);
        return;
      }
      formData = { formType: 'career', ...careerForm };
    } else if (formType === 'business') {
      if (!businessForm.name || !businessForm.graduationYear || !businessForm.email || !businessForm.businessName || !businessForm.description) {
        setFormMessages({ ...formMessages, business: { type: 'error', text: '必須項目を入力してください' } });
        setFormSubmitting(null);
        return;
      }
      if (!validateEmail(businessForm.email)) {
        setFormMessages({ ...formMessages, business: { type: 'error', text: '有効なメールアドレスを入力してください' } });
        setFormSubmitting(null);
        return;
      }
      formData = { formType: 'business', ...businessForm };
    } else {
      if (!networkForm.name || !networkForm.graduationYear || !networkForm.email || !networkForm.title || !networkForm.description) {
        setFormMessages({ ...formMessages, network: { type: 'error', text: '必須項目を入力してください' } });
        setFormSubmitting(null);
        return;
      }
      if (!validateEmail(networkForm.email)) {
        setFormMessages({ ...formMessages, network: { type: 'error', text: '有効なメールアドレスを入力してください' } });
        setFormSubmitting(null);
        return;
      }
      formData = { formType: 'network', ...networkForm };
    }

    try {
      const formDataBody = new FormData();
      formDataBody.append('payload', JSON.stringify(formData));

      const response = await fetch(GAS_ENDPOINT, {
        method: 'POST',
        body: formDataBody,
      });
      if (!response.ok) throw new Error('送信に失敗しました');

      setFormMessages({ ...formMessages, [formType]: { type: 'success', text: '送信が完了しました。ありがとうございます。' } });

      if (formType === 'career') {
        setCareerForm({
          name: '',
          graduationYear: '',
          department: '',
          email: '',
          title: '',
          currentPosition: '',
          workplace: '',
          location: '',
          skills: '',
          description: '',
          imageBase64: '',
          relatedUrl: '',
          instagramUrl: '',
          xUrl: '',
          facebookUrl: '',
          linkedinUrl: '',
        });
        setCareerImagePreview(null);
      } else if (formType === 'business') {
        setBusinessForm({
          name: '',
          graduationYear: '',
          department: '',
          email: '',
          businessName: '',
          category: '',
          location: '',
          hours: '',
          services: '',
          description: '',
          imageBase64: '',
          relatedUrl: '',
          hasAlumniDiscount: false,
        });
        setBusinessImagePreview(null);
      } else {
        setNetworkForm({
          name: '',
          graduationYear: '',
          department: '',
          email: '',
          type: 'event',
          title: '',
          eventDate: '',
          deadline: '',
          venue: '',
          conditions: '',
          description: '',
          imageBase64: '',
          relatedUrl: '',
        });
        setNetworkImagePreview(null);
      }
      setTimeout(() => setFormMessages({ ...formMessages, [formType]: null }), 5000);
    } catch (error) {
      setFormMessages({ ...formMessages, [formType]: { type: 'error', text: '送信に失敗しました。時間をおいて再度お試しください。' } });
      setTimeout(() => setFormMessages({ ...formMessages, [formType]: null }), 5000);
    } finally {
      setFormSubmitting(null);
    }
  };

  return (
    <div className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">掲載申し込み</h1>
          <p className="text-lg text-gray-600">卒業生キャリア・事業・交流/求人の掲載をこちらからお申し込みください。</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap gap-2">
            {(['career', 'business', 'network'] as const).map((tab) => {
              const label =
                tab === 'career'
                  ? '卒業生キャリア掲載'
                  : tab === 'business'
                  ? '卒業生の事業・店舗'
                  : '交流・求人';
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFormTab(tab)}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                    formTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {formTab === 'career' && (
            <div className="space-y-4">
              <div className="mb-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">卒業生キャリア掲載申し込み</h2>
                <p className="text-sm text-gray-600">あなたのキャリアを同窓生に紹介しませんか？</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">氏名 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={careerForm.name}
                    onChange={(e) => setCareerForm({ ...careerForm, name: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="山田 太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">卒業期 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={careerForm.graduationYear}
                    onChange={(e) => setCareerForm({ ...careerForm, graduationYear: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="23期卒"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">学科 <span className="text-red-500">*</span></label>
                  <select
                    value={careerForm.department}
                    onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">選択してください</option>
                    <option value="普通科">普通科</option>
                    <option value="スポーツ科">スポーツ科</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={careerForm.email}
                    onChange={(e) => setCareerForm({ ...careerForm, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="example@email.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">掲載希望タイトル <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={careerForm.title}
                    onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="データサイエンティストとして歩む"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">現職・肩書</label>
                  <input
                    type="text"
                    value={careerForm.currentPosition}
                    onChange={(e) => setCareerForm({ ...careerForm, currentPosition: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="データサイエンティスト"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">勤務地</label>
                  <input
                    type="text"
                    value={careerForm.location}
                    onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="東京都"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">スキル・タグ（カンマ区切り）</label>
                  <input
                    type="text"
                    value={careerForm.skills}
                    onChange={(e) => setCareerForm({ ...careerForm, skills: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Python, 機械学習, データ分析"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">概要・本文 <span className="text-red-500">*</span></label>
                  <textarea
                    value={careerForm.description}
                    onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })}
                    rows={5}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="キャリアの歩みや現在の活動について..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">掲載写真</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(
                          file,
                          (base64) => setCareerForm({ ...careerForm, imageBase64: base64 }),
                          setCareerImagePreview
                        );
                      }
                    }}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <p className="mt-1 text-xs text-gray-500">推奨: 3MB以下（JPEG/PNG）</p>
                  {careerImagePreview && (
                    <div className="mt-3">
                      <img src={careerImagePreview} alt="プレビュー" className="max-w-full h-48 object-contain rounded-xl border border-gray-200" />
                      <button
                        type="button"
                        onClick={() => {
                          setCareerForm({ ...careerForm, imageBase64: '' });
                          setCareerImagePreview(null);
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                      >
                        画像を削除
                      </button>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">関連URL</label>
                  <input
                    type="url"
                    value={careerForm.relatedUrl}
                    onChange={(e) => setCareerForm({ ...careerForm, relatedUrl: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Instagram</label>
                  <input
                    type="url"
                    value={careerForm.instagramUrl}
                    onChange={(e) => setCareerForm({ ...careerForm, instagramUrl: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">X（旧Twitter）</label>
                  <input
                    type="url"
                    value={careerForm.xUrl}
                    onChange={(e) => setCareerForm({ ...careerForm, xUrl: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="https://x.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Facebook</label>
                  <input
                    type="url"
                    value={careerForm.facebookUrl}
                    onChange={(e) => setCareerForm({ ...careerForm, facebookUrl: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={careerForm.linkedinUrl}
                    onChange={(e) => setCareerForm({ ...careerForm, linkedinUrl: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="https://www.linkedin.com/in/..."
                  />
                </div>
              </div>
              {formMessages.career && (
                <div className={`mt-4 rounded-xl p-3 text-sm ${formMessages.career.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {formMessages.career.text}
                </div>
              )}
              <button
                onClick={() => handleFormSubmit('career')}
                disabled={formSubmitting === 'career'}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50"
              >
                {formSubmitting === 'career' ? '送信中...' : '送信する'}
              </button>
            </div>
          )}

          {formTab === 'business' && (
            <div className="space-y-4">
              <div className="mb-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">卒業生の事業・店舗掲載申し込み</h2>
                <p className="text-sm text-gray-600">あなたの事業や店舗を同窓生に紹介しませんか？</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">氏名 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={businessForm.name}
                    onChange={(e) => setBusinessForm({ ...businessForm, name: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="山田 太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">卒業期 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={businessForm.graduationYear}
                    onChange={(e) => setBusinessForm({ ...businessForm, graduationYear: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="23期卒"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">学科 <span className="text-red-500">*</span></label>
                  <select
                    value={businessForm.department}
                    onChange={(e) => setBusinessForm({ ...businessForm, department: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">選択してください</option>
                    <option value="普通科">普通科</option>
                    <option value="スポーツ科">スポーツ科</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={businessForm.email}
                    onChange={(e) => setBusinessForm({ ...businessForm, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="example@email.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">店名・事業名 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={businessForm.businessName}
                    onChange={(e) => setBusinessForm({ ...businessForm, businessName: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Cafe Ounan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">業種・カテゴリー</label>
                  <input
                    type="text"
                    value={businessForm.category}
                    onChange={(e) => setBusinessForm({ ...businessForm, category: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="カフェ・コミュニティスペース"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">所在地</label>
                  <input
                    type="text"
                    value={businessForm.location}
                    onChange={(e) => setBusinessForm({ ...businessForm, location: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="青森県八戸市"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">営業時間・定休日</label>
                  <input
                    type="text"
                    value={businessForm.hours}
                    onChange={(e) => setBusinessForm({ ...businessForm, hours: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="10:00-18:00 定休日：火曜日"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">提供サービス・特徴</label>
                  <textarea
                    value={businessForm.services}
                    onChange={(e) => setBusinessForm({ ...businessForm, services: e.target.value })}
                    rows={3}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="クラフトコーヒー、スイーツ、同窓生交流イベントなど"
                  />
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                  <input
                    id="business-alumni-discount"
                    type="checkbox"
                    checked={businessForm.hasAlumniDiscount}
                    onChange={(e) => setBusinessForm({ ...businessForm, hasAlumniDiscount: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="business-alumni-discount" className="text-sm font-semibold text-gray-700">
                    卒業生割引あり
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">概要・本文 <span className="text-red-500">*</span></label>
                  <textarea
                    value={businessForm.description}
                    onChange={(e) => setBusinessForm({ ...businessForm, description: e.target.value })}
                    rows={5}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="事業や店舗について..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">掲載写真</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(
                          file,
                          (base64) => setBusinessForm({ ...businessForm, imageBase64: base64 }),
                          setBusinessImagePreview
                        );
                      }
                    }}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <p className="mt-1 text-xs text-gray-500">推奨: 5MB以下（JPEG/PNG）</p>
                  {businessImagePreview && (
                    <div className="mt-3">
                      <img src={businessImagePreview} alt="プレビュー" className="max-w-full h-48 object-contain rounded-xl border border-gray-200" />
                      <button
                        type="button"
                        onClick={() => {
                          setBusinessForm({ ...businessForm, imageBase64: '' });
                          setBusinessImagePreview(null);
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                      >
                        画像を削除
                      </button>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">関連URL</label>
                  <input
                    type="url"
                    value={businessForm.relatedUrl}
                    onChange={(e) => setBusinessForm({ ...businessForm, relatedUrl: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              {formMessages.business && (
                <div className={`mt-4 rounded-xl p-3 text-sm ${formMessages.business.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {formMessages.business.text}
                </div>
              )}
              <button
                onClick={() => handleFormSubmit('business')}
                disabled={formSubmitting === 'business'}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50"
              >
                {formSubmitting === 'business' ? '送信中...' : '送信する'}
              </button>
            </div>
          )}

          {formTab === 'network' && (
            <div className="space-y-4">
              <div className="mb-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">交流・求人掲載申し込み</h2>
                <p className="text-sm text-gray-600">イベントや求人情報を同窓生に紹介しませんか？</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">氏名 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={networkForm.name}
                    onChange={(e) => setNetworkForm({ ...networkForm, name: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="山田 太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">卒業期 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={networkForm.graduationYear}
                    onChange={(e) => setNetworkForm({ ...networkForm, graduationYear: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="23期卒"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">学科 <span className="text-red-500">*</span></label>
                  <select
                    value={networkForm.department}
                    onChange={(e) => setNetworkForm({ ...networkForm, department: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">選択してください</option>
                    <option value="普通科">普通科</option>
                    <option value="スポーツ科">スポーツ科</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={networkForm.email}
                    onChange={(e) => setNetworkForm({ ...networkForm, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="example@email.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">種別</label>
                  <select
                    value={networkForm.type}
                    onChange={(e) => setNetworkForm({ ...networkForm, type: e.target.value as 'event' | 'job' })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="event">イベント</option>
                    <option value="job">求人</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">タイトル <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={networkForm.title}
                    onChange={(e) => setNetworkForm({ ...networkForm, title: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="春のオンライン交流会"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">開催日・開始日</label>
                  <input
                    type="text"
                    value={networkForm.eventDate}
                    onChange={(e) => setNetworkForm({ ...networkForm, eventDate: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="2024年3月28日(金)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">締切日</label>
                  <input
                    type="text"
                    value={networkForm.deadline}
                    onChange={(e) => setNetworkForm({ ...networkForm, deadline: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="2024年3月25日(火)"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">会場・勤務場所</label>
                  <input
                    type="text"
                    value={networkForm.venue}
                    onChange={(e) => setNetworkForm({ ...networkForm, venue: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="オンライン / 東京都渋谷区"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">参加条件・待遇など</label>
                  <textarea
                    value={networkForm.conditions}
                    onChange={(e) => setNetworkForm({ ...networkForm, conditions: e.target.value })}
                    rows={3}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="参加費：無料 / 給与：月給30万円〜"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">概要・本文 <span className="text-red-500">*</span></label>
                  <textarea
                    value={networkForm.description}
                    onChange={(e) => setNetworkForm({ ...networkForm, description: e.target.value })}
                    rows={5}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="イベントや求人の詳細について..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">掲載写真</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(
                          file,
                          (base64) => setNetworkForm({ ...networkForm, imageBase64: base64 }),
                          setNetworkImagePreview
                        );
                      }
                    }}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <p className="mt-1 text-xs text-gray-500">推奨: 3MB以下（JPEG/PNG）</p>
                </div>

                {networkImagePreview && (
                  <div className="md:col-span-2">
                    <div className="mt-3">
                      <img src={networkImagePreview} alt="プレビュー" className="max-w-full h-48 object-contain rounded-xl border border-gray-200" />
                      <button
                        type="button"
                        onClick={() => {
                          setNetworkForm({ ...networkForm, imageBase64: '' });
                          setNetworkImagePreview(null);
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                      >
                        画像を削除
                      </button>
                    </div>
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">関連URL</label>
                  <input
                    type="url"
                    value={networkForm.relatedUrl}
                    onChange={(e) => setNetworkForm({ ...networkForm, relatedUrl: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              {formMessages.network && (
                <div className={`mt-4 rounded-xl p-3 text-sm ${formMessages.network.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {formMessages.network.text}
                </div>
              )}
              <button
                onClick={() => handleFormSubmit('network')}
                disabled={formSubmitting === 'network'}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50"
              >
                {formSubmitting === 'network' ? '送信中...' : '送信する'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberRegistration;
