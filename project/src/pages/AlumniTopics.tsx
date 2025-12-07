import React, { useMemo, useState } from 'react';
import { X, Tag, Calendar, ArrowRight } from 'lucide-react';
import { alumniTopics, AlumniTopic } from '../data/alumniTopics';

const AlumniTopics: React.FC = () => {
  const [selected, setSelected] = useState<AlumniTopic | null>(null);

  const topics = useMemo(
    () => [...alumniTopics].sort((a, b) => (a.date > b.date ? -1 : 1)),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase">
            Alumni Topics
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">卒業生トピックス</h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            架空の卒業生による近況・インタビュー・特集記事のサンプルです。カードをクリックすると本文を閲覧できます。
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelected(topic)}
              className="group text-left rounded-3xl bg-white shadow-md ring-1 ring-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
            >
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={topic.thumbnail}
                  alt={topic.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-blue-700 font-semibold">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1">
                    <Tag className="h-4 w-4" />
                    {topic.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {topic.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{topic.title}</h3>
                <p className="text-sm text-gray-700 font-medium">
                  {topic.name} / {topic.gradYear} / {topic.department}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{topic.lead}</p>
                <div className="flex flex-wrap gap-2">
                  {topic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                  続きを読む
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <button
              aria-label="閉じる"
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
              onClick={() => setSelected(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <div className="h-64 w-full overflow-hidden rounded-t-3xl">
              <img
                src={selected.thumbnail}
                alt={selected.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-blue-700 font-semibold">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1">
                  <Tag className="h-4 w-4" />
                  {selected.category}
                </span>
                <span className="inline-flex items-center gap-1 text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {selected.date}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{selected.title}</h2>
              <div className="text-gray-700 space-y-1 text-sm">
                <p className="font-semibold">{selected.name}</p>
                <p>{selected.gradYear} / {selected.department}</p>
                <p className="text-gray-600">{selected.role}</p>
              </div>
              <p className="text-gray-700 leading-relaxed">{selected.lead}</p>
              <div className="space-y-3 text-gray-800 leading-relaxed">
                {selected.body.split('。').map((chunk, idx) => {
                  const text = chunk.trim();
                  if (!text) return null;
                  return <p key={idx}>{text}。</p>;
                })}
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniTopics;


