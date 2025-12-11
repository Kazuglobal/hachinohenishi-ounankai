import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Info,
  Mail,
  MapPin
} from 'lucide-react';

type AnnouncementDetail = {
  id: number;
  title: string;
  subtitle?: string;
  category: string;
  categoryColor: string;
  date: string;
  image: string;
  headshot?: string;
  location: string;
  time: string;
  description: string;
  body?: string[];
  fee?: string;
  rsvpEmail?: string;
  organizer?: string;
  deadlines?: { label: string; date: string; note?: string }[];
  schedule?: { time: string; title: string; detail?: string }[];
  signer?: { name: string; title?: string; year?: string };
  highlights?: { title: string; description: string }[];
};

const announcements: Record<string, AnnouncementDetail> = {
  '8': {
    id: 8,
    title: '会長からのご挨拶',
    subtitle: '八戸西高等学校同窓会奧南会の皆様へ',
    category: 'お知らせ',
    categoryColor: 'bg-blue-600',
    date: '2025年12月15日',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200',
    headshot: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=640',
    location: '奥南会公式サイト',
    time: '公開: 10:00',
    description:
      '奥南会公式ホームページ開設にあたり、日頃よりご支援いただいている皆さまへ心より感謝申し上げます。同窓生の皆様との更なる連携強化と情報共有の充実を図るため、公式サイトを開設いたしました。',
    body: [
      '八戸西高等学校同窓会奧南会の皆様におかれましては、各方面においてご活躍のことと心よりお喜び申し上げます。また、日頃より同窓会活動に対してご理解とご協力を賜り、厚く御礼申し上げます。',
      'この度、同窓生の皆様との更なる連携強化と情報共有の充実を図るため、奧南会公式ホームページを開設する運びとなりました。創立以来培われてきた同窓生の絆を、現代の情報技術を活用してより一層深めてまいりたいと考えております。',
      '近年、デジタル化の進展により、情報伝達の手段も大きく変化しております。このホームページを通じて、同窓会の活動報告、各種イベントのご案内、そして同窓生の皆様の近況報告など、タイムリーな情報発信を行ってまいります。また、同窓生同士の交流促進の場としてもご活用いただけるよう、様々なコンテンツを準備しております。',
      '自啓自発の校訓のもと、文武両道を目指して青春を過ごした母校での思い出は、皆様にとってかけがえのない財産であることでしょう。このホームページが、そうした思い出を共有し、新たな交流を生み出す架け橋となることを願っております。',
      '結びに、ホームページ開設にあたりご協力いただきました関係者の皆様に心から感謝申し上げますとともに、同窓生の皆様の益々のご健勝と今後のご活躍を御祈念申し上げます。'
    ],
    organizer: '奥南会 会長',
    signer: {
      name: '松井 正文',
      title: '青森県立八戸西高等学校同窓会奥南会 会長',
      year: '1995年卒'
    },
    highlights: [
      { title: '公式サイト開設の目的', description: '同窓生との連携強化と情報共有の充実を推進' },
      { title: '主な発信内容', description: '活動報告、イベント案内、同窓生の近況をタイムリーに掲載' },
      { title: '交流の場', description: '世代を超えた交流を育むオンラインハブとして活用' }
    ]
  },
  '1': {
    id: 1,
    title: '奥南会 二期生 同期会',
    category: 'イベント',
    categoryColor: 'bg-red-500',
    date: '2026年1月3日（土）',
    image: '/images/ounankai2ki.JPG',
    location: '八戸パークホテル（青森県八戸市吹上1丁目15-90）',
    time: '受付 15:30 ／ 開宴 16:00 ／ 終宴 18:30',
    description:
      '令和8年（2026年）1月3日（土）に八戸パークホテルで二期生同期会を開催します。久しぶりに顔を合わせ、近況報告や思い出話で盛り上がりましょう。',
    fee: 'お一人 8,000円（当日受付で現金払い）',
    organizer: '奥南会二期生 幹事団',
    rsvpEmail: 'nishikou2ki@gmail.com',
    deadlines: [
      { label: '第1次締切', date: '2025年12月5日（金）' },
      { label: '第2次締切', date: '2025年12月19日（金）', note: '人数確定の最終締切' }
    ],
    schedule: [
      { time: '15:30', title: '受付開始', detail: '名札配布・会費受領' },
      { time: '16:00', title: '開宴・オープニング', detail: '開会挨拶と乾杯' },
      { time: '16:15', title: '歓談・写真撮影', detail: 'テーブルラウンドと記念撮影' },
      { time: '17:00', title: '近況共有タイム', detail: '近況スピーチ・告知コーナー' },
      { time: '18:00', title: 'クロージング', detail: '次回予告・締めの挨拶' }
    ]
  }
};

const AnnouncementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const announcement = announcements[id || ''];
  const isGreeting = announcement?.id === 8;

  if (!announcement) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-lg rounded-3xl bg-white p-8 shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">お知らせが見つかりません</h1>
          <p className="text-gray-600 mb-6">指定されたお知らせの詳細は存在しません。</p>
          <Link
            to="/announcements"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
            お知らせ一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const heroGridCols = isGreeting ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3 items-stretch';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_82%_18%,rgba(45,212,191,0.12),transparent_38%)] opacity-80" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(245deg,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[length:32px_32px] opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/10 to-white/0" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <div className="flex items-center justify-between">
            <Link
              to="/announcements"
              className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 shadow-md ring-1 ring-black/5 transition hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
              戻る
            </Link>
          </div>

          <div className={`mt-6 grid gap-6 ${heroGridCols}`}>
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-black/5">
                <span className={`${announcement.categoryColor} h-2 w-2 rounded-full`} />
                {announcement.category}
              </div>
              {!isGreeting && (
                <div className="rounded-3xl bg-white/90 p-6 sm:p-8 shadow-xl ring-1 ring-black/5 backdrop-blur">
                  <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl leading-tight">{announcement.title}</h1>
                  {announcement.subtitle && (
                    <p className="mt-3 text-lg font-semibold text-gray-700">{announcement.subtitle}</p>
                  )}
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-700">
                    <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 ring-1 ring-gray-200">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <span>{announcement.date}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 ring-1 ring-gray-200">
                      <Clock3 className="h-4 w-4 text-gray-600" />
                      <span>{announcement.time}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 ring-1 ring-gray-200">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <span>{announcement.location}</span>
                    </div>
                    {announcement.organizer && (
                      <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 ring-1 ring-gray-200">
                        <Info className="h-4 w-4 text-gray-600" />
                        <span>{announcement.organizer}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {!isGreeting && (
              <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/10 bg-white/80 backdrop-blur">
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/20" />
                <img
                  src={announcement.image}
                  alt={announcement.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-sm font-semibold">奥南会公式ホームページ開設</p>
                </div>
              </div>
            )}
            {isGreeting && announcement.headshot && (
              <div className="relative flex justify-center">
                <div className="relative h-40 w-40 sm:h-48 sm:w-48">
                  <div className="absolute -inset-4 rounded-full bg-white/60 blur-2xl" />
                  <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-white shadow-2xl bg-white">
                    <img
                      src={announcement.headshot}
                      alt={`${announcement.title} 顔写真`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-md space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">Message</p>
                <h2 className="text-xl font-bold text-gray-900">会長メッセージ</h2>
                <p className="text-gray-700 leading-relaxed">{announcement.description}</p>
              </div>

              {announcement.body ? (
                <div className="space-y-4">
                  {announcement.body.map((paragraph, idx) => (
                    <p key={idx} className="text-gray-800 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-800 leading-relaxed">{announcement.description}</p>
              )}

              {announcement.signer && (
                <div className="mt-4 flex items-center gap-4 rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100">
                  {announcement.headshot && (
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-lg bg-white">
                      <img
                        src={announcement.headshot}
                        alt={`${announcement.title} 顔写真`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-bold text-gray-900">{announcement.signer.name}</p>
                    {announcement.signer.title && <p className="text-gray-700">{announcement.signer.title}</p>}
                    {announcement.signer.year && <p className="text-gray-500 text-sm">{announcement.signer.year}</p>}
                  </div>
                </div>
              )}
            </div>

            {!isGreeting && (
              <div className="overflow-hidden rounded-3xl bg-black shadow-md ring-1 ring-gray-900/10">
                <div className="flex items-center justify-center bg-black">
                  <img
                    src={announcement.image}
                    alt={announcement.title}
                    className="w-full max-h-[520px] object-contain"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Sidebar */}
          {!isGreeting && (
            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-6 shadow-md space-y-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Info className="h-5 w-5 text-gray-700" />
                  開催情報
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <CalendarDays className="mt-0.5 h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-semibold text-gray-900">日付</p>
                      <p>{announcement.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock3 className="mt-0.5 h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-semibold text-gray-900">時間</p>
                      <p>{announcement.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-semibold text-gray-900">会場</p>
                      <p>{announcement.location}</p>
                    </div>
                  </div>
                  {announcement.fee && (
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-semibold text-gray-900">参加費</p>
                        <p>{announcement.fee}</p>
                      </div>
                    </div>
                  )}
                  {announcement.organizer && (
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-semibold text-gray-900">主催</p>
                        <p>{announcement.organizer}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {announcement.deadlines && (
                <div className="rounded-3xl bg-white p-6 shadow-md space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Info className="h-5 w-5 text-gray-700" />
                    申込締切
                  </h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    {announcement.deadlines.map((deadline) => (
                      <div key={deadline.label} className="rounded-2xl bg-gray-50 p-3">
                        <p className="font-semibold text-gray-900">{deadline.label}</p>
                        <p>{deadline.date}</p>
                        {deadline.note && <p className="text-xs text-gray-500 mt-1">{deadline.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {announcement.rsvpEmail && (
                <div className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">出欠のご連絡</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    参加可否をメールでお知らせください。ご家族同伴の場合は人数もお知らせいただけると助かります。
                  </p>
                  <a
                    href={`mailto:${announcement.rsvpEmail}?subject=${encodeURIComponent(announcement.title)}参加について`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    <Mail className="h-4 w-4" />
                    {announcement.rsvpEmail}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;

