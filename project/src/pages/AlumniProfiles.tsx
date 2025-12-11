import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  Users,
  Heart,
  MessageCircle,
  ExternalLink,
  X as XIcon,
  Search,
  Briefcase,
  MapPin,
  Calendar,
  ArrowRight,
  Building2,
  Store,
  UtensilsCrossed,
  Sprout,
  BadgePercent,
  Phone,
  Megaphone,
  Handshake,
  Mail,
  ChevronLeft,
  ChevronRight,
  Hand,
  Sparkles,
  Newspaper,
  Linkedin,
  Facebook,
  Instagram,
  Twitter as TwitterIcon,
} from 'lucide-react';
import { useSwipeCards } from '../hooks/useSwipeCards';
import { alumniTopics } from '../data/alumniTopics';

type TabId = 'career' | 'business' | 'network';

type AlumniProfile = {
  id: number;
  name: string;
  year: string;
  profession: string;
  company: string;
  location: string;
  industry: string;
  image: string;
  achievement: string;
  description: string;
  club: string;
  highlights: string[];
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  x?: string;
};

type BusinessHighlight = {
  id: string;
  name: string;
  owner: string;
  category: string;
  location: string;
  description: string;
  image: string;
  url?: string;
  alumniDiscount?: string;
};

type ProgramHighlight = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  cta?: {
    label: string;
    href: string;
  };
};

type JobOpportunity = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  postedBy: string;
  salary?: string;
  image: string;
};

const tabs: { id: TabId; label: string; description: string }[] = [
  {
    id: 'career',
    label: '卒業生キャリア紹介',
    description: '多彩な領域で活躍する同窓生のキャリアストーリーをチェック',
  },
  {
    id: 'business',
    label: '卒業生の事業・店舗',
    description: '地元や全国で活躍する卒業生ビジネスを応援しましょう',
  },
  {
    id: 'network',
    label: '交流・求人',
    description: 'イベントやメンタリングで新しいつながりを作りましょう',
  },
];

const rawAlumniData: Omit<AlumniProfile, 'club'>[] = [
  {
    id: 1,
    name: '田中 さくら',
    year: '2018',
    profession: 'テクノロジー起業家',
    company: 'イノベートテック・ソリューションズ',
    location: '東京都',
    industry: 'テクノロジー',
    image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    achievement: '5000万ドルの価値を持つAIスタートアップを創設',
    description: 'ヘルスケア分野における人工知能と機械学習ソリューションのイノベーションを主導。',
    highlights: ['Forbes 30 Under 30', 'TechCrunch Disruptor Award', 'MIT Technology Review Innovator'],
  },
  {
    id: 2,
    name: '陳 健太',
    year: '2015',
    profession: '医学研究者',
    company: 'ハーバード医科大学',
    location: '大阪府',
    industry: 'ヘルスケア',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    achievement: '画期的ながん研究プロジェクトを主導',
    description: '免疫療法研究を通じたがん治療の新しいアプローチを開拓。',
    highlights: ['Nature誌論文著者', 'NIH研究助成金受賞', 'アメリカがん学会フェロー'],
  },
  {
    id: 3,
    name: '山田 美咲',
    year: '2012',
    profession: '環境弁護士',
    company: 'グリーン・ジャスティス連合',
    location: '愛知県',
    industry: '法律',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    achievement: '連邦レベルでの気候政策改革を推進',
    description: '環境正義と持続可能な政策実施の推進活動を行う。',
    highlights: ['最高裁判所訴訟勝訴', '環境法研究所賞', '気候政策アドバイザー'],
  },
  {
    id: 4,
    name: '金 大輔',
    year: '2010',
    profession: '投資銀行家',
    company: 'ゴールドマン・サックス',
    location: '神奈川県',
    industry: '金融',
    image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    achievement: '20億ドル以上の取引を監督するマネージングディレクター',
    description: 'テクノロジー分野のM&Aを専門とする。',
    highlights: ['トップ1%パフォーマー', '年間最優秀取引賞', '業界リーダーシップ賞'],
  },
  {
    id: 5,
    name: '佐藤 あまり',
    year: '2014',
    profession: 'ドキュメンタリー映画監督',
    company: '独立系プロデューサー',
    location: '埼玉県',
    industry: 'メディア',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    achievement: '社会正義ドキュメンタリーでエミー賞受賞',
    description: '社会変革と意識向上を推進するインパクトのあるドキュメンタリーを制作。',
    highlights: ['エミー賞受賞', 'サンダンス映画祭選出', 'ヒューマンライツ映画賞'],
  },
  {
    id: 6,
    name: '田村 太郎',
    year: '2008',
    profession: '再生可能エネルギーエンジニア',
    company: 'テスラエナジー',
    location: '千葉県',
    industry: 'エンジニアリング',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    achievement: '革新的バッテリー技術の主任エンジニア',
    description: '持続可能な未来のための次世代エネルギー貯蔵ソリューションを開発。',
    highlights: ['特許保有者（15件以上）', 'IEEEフェロー', 'クリーンエネルギーイノベーション賞'],
  },
  {
    id: 7,
    name: '中村 理沙',
    year: '2016',
    profession: '教育政策ディレクター',
    company: 'ゲイツ財団',
    location: '兵庫県',
    industry: '非営利',
    image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    achievement: '支援の行き届かない地域での教育アクセスを変革',
    description: '世界的に教育成果と公平性を向上させるイニシアティブを主導。',
    highlights: ['グローバル教育リーダー', 'ユネスコパートナーシップディレクター', '教育イノベーション賞'],
  },
  {
    id: 8,
    name: '鈴木 大樹',
    year: '2011',
    profession: 'スポーツ医学医師',
    company: 'オリンピックトレーニングセンター',
    location: '北海道',
    industry: 'ヘルスケア',
    image: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    achievement: '複数のオリンピックチームのチームドクター',
    description: 'エリートアスリートに最先端のスポーツ医学ケアを提供。',
    highlights: ['オリンピックチームドクター', 'スポーツ医学専門医', 'アスレチックパフォーマンス研究者'],
  },
  {
    id: 9,
    name: '小島 真理',
    year: '2013',
    profession: '航空宇宙エンジニア',
    company: 'スペースX',
    location: '福岡県',
    industry: '航空宇宙',
    image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    achievement: '火星ミッション宇宙船の主任エンジニア',
    description: '次世代宇宙探査のための推進システムを設計。',
    highlights: ['火星ミッションチームリーダー', 'NASA共同研究', '航空宇宙イノベーション賞'],
  },
];

const alumniClubMap: Record<number, string> = {
  1: '野球部',
  2: 'ラグビー部',
  3: 'サッカー部',
  4: 'バスケットボール部',
  5: 'テニス部',
  6: 'バレーボール部',
  7: '卓球部',
  8: '陸上競技部',
  9: '水泳部',
};

const alumniData: AlumniProfile[] = rawAlumniData.map((alumni) => ({
  ...alumni,
  club: alumniClubMap[alumni.id] ?? '部活情報は準備中',
  linkedin: 'https://www.linkedin.com/in/example',
  facebook: 'https://www.facebook.com/example',
  instagram: 'https://www.instagram.com/example',
  x: 'https://x.com/example',
}));

const industries = [
  'all',
  'IT・ソフトウェア',
  'テクノロジー',
  'AI・機械学習',
  'Web開発',
  'ゲーム開発',
  'サイバーセキュリティ',
  '医療・ヘルスケア',
  '製薬',
  'バイオテクノロジー',
  '医療機器',
  '金融',
  '銀行',
  '保険',
  '証券',
  'フィンテック',
  '法律',
  '弁護士',
  '弁理士',
  'コンサルティング',
  '経営コンサルタント',
  '人事コンサルタント',
  '教育',
  '学校・教育機関',
  'Edtech',
  '製造業',
  '自動車',
  '電機・電子',
  '機械',
  '化学',
  '食品製造',
  '建設・不動産',
  '建築',
  '土木',
  '不動産開発',
  '小売・流通',
  'EC・通販',
  '百貨店',
  '専門店',
  '飲食',
  'レストラン',
  'カフェ',
  'ホテル・観光',
  'メディア',
  '広告',
  'マーケティング',
  'PR',
  '出版',
  '放送',
  'エンターテインメント',
  '芸能',
  '音楽',
  'スポーツ',
  'デザイン',
  'グラフィックデザイン',
  'プロダクトデザイン',
  'ファッション',
  '運輸・物流',
  '航空',
  '海運',
  '陸運',
  'エネルギー',
  '電力',
  '石油・ガス',
  '再生可能エネルギー',
  '通信',
  '電気通信',
  'インターネットサービス',
  '農業',
  '林業',
  '水産業',
  '環境',
  'リサイクル',
  '公共・行政',
  '公務員',
  '政治',
  '非営利',
  'NPO',
  'NGO',
  '社会起業',
  '研究・開発',
  '大学研究',
  '民間研究所',
  '人材',
  '人材紹介',
  '人材派遣',
  'その他',
  'フリーランス',
  '個人事業主',
  '起業家',
  '投資家',
  'ベンチャーキャピタル',
  '事業承継',
  'M&A',
  '海外勤務',
  '国際機関',
  '外交官',
  '翻訳・通訳',
  '語学教育',
  '留学支援',
  '国際協力',
  '開発援助',
  '国際NGO',
  '国連',
  '世界銀行',
  'IMF',
  'アジア開発銀行',
  'JICA',
  'JETRO',
  '特許事務所',
  '司法書士',
  '行政書士',
  '税理士',
  '公認会計士',
  '社会保険労務士',
  '中小企業診断士',
  'ファイナンシャルプランナー',
  '不動産鑑定士',
  '土地家屋調査士',
  '測量士',
  '建築士',
  '技術士',
  '情報処理技術者',
  'プロジェクトマネージャー',
  'ITアーキテクト',
  'データサイエンティスト',
  'AIエンジニア',
  'ブロックチェーン',
  'IoT',
  'ロボティクス',
  'ドローン',
  'AR・VR',
  'メタバース',
  'NFT',
  '暗号資産',
  '仮想通貨',
  'DeFi',
  'Web3',
  'クリエイター',
  'YouTuber',
  'インフルエンサー',
  'ブロガー',
  'ライター',
  '編集者',
  'カメラマン',
  '動画編集者',
  '音響エンジニア',
  '照明技術者',
  '舞台監督',
  '演出家',
  '脚本家',
  '小説家',
  '漫画家',
  'イラストレーター',
  'アニメーター',
  '声優',
  'ナレーター',
  'DJ',
  '音楽プロデューサー',
  '作曲家',
  '作詞家',
  'ミュージシャン',
  'バンドマン',
  'クラシック音楽家',
  'オーケストラ',
  '合唱団',
  'ダンサー',
  '振付師',
  'ダンスインストラクター',
  'フィットネスインストラクター',
  'ヨガインストラクター',
  'ピラティスインストラクター',
  'パーソナルトレーナー',
  '栄養士',
  '管理栄養士',
  '調理師',
  'パティシエ',
  'バリスタ',
  'ソムリエ',
  'ワインアドバイザー',
  '日本酒アドバイザー',
  '茶道',
  '華道',
  '書道',
  '陶芸',
  'ガラス工芸',
  '木工',
  '金属工芸',
  '彫刻',
  '絵画',
  '版画',
  '写真家',
  'フォトグラファー',
  '映像作家',
  '映画監督',
  'プロデューサー',
  '俳優',
  '女優',
  'タレント',
  'コメディアン',
  'お笑い芸人',
  '落語家',
  '漫才師',
  'コント師',
  '司会者',
  'MC',
  'アナウンサー',
  'ニュースキャスター',
  '気象予報士',
  'レポーター',
  'ジャーナリスト',
  '記者',
  'コピーライター',
  'コントンツクリエイター',
  'SNSマネージャー',
  'コミュニティマネージャー',
  'カスタマーサクセス',
  'カスタマーサポート',
  'コールセンター',
  'テレマーケティング',
  '営業',
  'セールス',
  '販売',
  '接客',
  'ホテルマン',
  'フロント',
  'コンシェルジュ',
  'ツアーコンダクター',
  '添乗員',
  'ガイド',
  '通訳ガイド',
  '観光案内',
  '旅行代理店',
  '航空会社',
  '空港',
  '鉄道',
  'バス',
  'タクシー',
  'トラック',
  '配送',
  '倉庫',
  '物流',
  '通関',
  '貿易',
  '商社',
  '卸売',
  '小売',
  'EC',
  '通販',
  'ネットショップ',
  'マーケットプレイス',
  'フリマアプリ',
  'シェアリングエコノミー',
  'シェアハウス',
  '民泊',
  'カーシェア',
  'バイクシェア',
  'レンタル',
  'リース',
  'ファイナンス',
  'クレジット',
  'ローン',
  '保険',
  '生命保険',
  '損害保険',
  '自動車保険',
  '火災保険',
  '地震保険',
  '医療保険',
  '介護保険',
  '年金',
  '投資信託',
  '株式',
  '債券',
  'FX',
  '先物',
  'オプション',
  'デリバティブ',
  'ヘッジファンド',
  'プライベートエクイティ',
  'ベンチャーキャピタル',
  'エンジェル投資家',
  'クラウドファンディング',
  'ICO',
  'STO',
  'IPO',
  'M&A',
  '事業承継',
  '経営支援',
  '経営コンサルタント',
  '戦略コンサルタント',
  'ITコンサルタント',
  '人事コンサルタント',
  'マーケティングコンサルタント',
  'ブランディング',
  'CI',
  'VI',
  'ロゴデザイン',
  'パッケージデザイン',
  '空間デザイン',
  'インテリアデザイン',
  '建築デザイン',
  'ランドスケープ',
  '都市計画',
  'まちづくり',
  '地域活性化',
  '地方創生',
  '移住支援',
  '地方移住',
  '田舎暮らし',
  '農業体験',
  'グリーンツーリズム',
  'エコツーリズム',
  'サステナビリティ',
  'ESG',
  'SDGs',
  '環境保護',
  '自然保護',
  '動物保護',
  '海洋保護',
  '森林保護',
  '生物多様性',
  '気候変動',
  '地球温暖化',
  '再生可能エネルギー',
  '太陽光発電',
  '風力発電',
  '水力発電',
  '地熱発電',
  'バイオマス',
  '水素エネルギー',
  '原子力',
  '火力発電',
  '石炭',
  '石油',
  '天然ガス',
  'LNG',
  '電力自由化',
  'スマートグリッド',
  '蓄電池',
  'EV',
  '電気自動車',
  'ハイブリッド車',
  '燃料電池車',
  '自動運転',
  'コネクテッドカー',
  'MaaS',
  'モビリティ',
  'シェアリング',
  'カーシェア',
  'バイクシェア',
  '自転車シェア',
  '電動キックボード',
  '電動自転車',
  'e-bike',
  '電動スクーター',
  '電動バイク',
  '電動車椅子',
  '電動アシスト',
  'パーソナルモビリティ',
  'ロボット',
  'サービスロボット',
  '産業ロボット',
  '医療ロボット',
  '介護ロボット',
  '清掃ロボット',
  '警備ロボット',
  '配送ロボット',
  '農業ロボット',
  '建設ロボット',
  '災害対応ロボット',
  '宇宙ロボット',
  '水中ロボット',
  'ドローン',
  'UAV',
  '空撮',
  '測量',
  '点検',
  '配送',
  '農薬散布',
  '種まき',
  '監視',
  '警備',
  '救助',
  '捜索',
  '調査',
  '研究',
  '実験',
  'テスト',
  '品質管理',
  '検査',
  '測定',
  '分析',
  'データ収集',
  'モニタリング',
  'センサー',
  'IoT',
  'スマートシティ',
  'スマートホーム',
  'スマートビル',
  'スマートファクトリー',
  'インダストリー4.0',
  'デジタルツイン',
  'サイバーセキュリティ',
  '情報セキュリティ',
  'ネットワークセキュリティ',
  'クラウドセキュリティ',
  'モバイルセキュリティ',
  'アプリケーションセキュリティ',
  'データセキュリティ',
  'プライバシー保護',
  '個人情報保護',
  'GDPR',
  '個人情報保護法',
  'サイバー攻撃',
  'マルウェア',
  'ウイルス',
  'ランサムウェア',
  'フィッシング',
  'スパム',
  'ボット',
  'DDoS',
  'ゼロデイ攻撃',
  'APT',
  'インサイダー脅威',
  'ソーシャルエンジニアリング',
  'ペネトレーションテスト',
  '脆弱性診断',
  'セキュリティ監査',
  'コンプライアンス',
  'リスク管理',
  '危機管理',
  'BCP',
  '災害対策',
  '防災',
  '減災',
  '復旧',
  '復興',
  '支援',
  'ボランティア',
  'NPO',
  'NGO',
  '社会貢献',
  '社会起業',
  'ソーシャルビジネス',
  'BOP',
  'ベースオブピラミッド',
  '途上国',
  '開発途上国',
  '新興国',
  'BRICs',
  'VISTA',
  'MINT',
  'Next11',
  'アフリカ',
  'アジア',
  '中南米',
  '中東',
  '東欧',
  '旧ソ連',
  'CIS',
  'ASEAN',
  'EU',
  'NATO',
  'G7',
  'G20',
  'OECD',
  'WTO',
  'IMF',
  '世界銀行',
  '国連',
  'UNESCO',
  'UNICEF',
  'WHO',
  'ILO',
  'FAO',
  'UNDP',
  'UNHCR',
  'その他',
];

const locations = [
  'all',
  '海外',
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県',
];

const businessHighlights: BusinessHighlight[] = [
  {
    id: 'cafe',
    name: 'Cafe Ounan',
    owner: '佐藤 優子（1999年卒／23回卒 普通科）',
    category: 'カフェ・コミュニティスペース',
    location: '青森県八戸市',
    description: '地元の食材を活かしたクラフトコーヒーとスイーツで人気のカフェ。月１回の同窓生交流イベントを開催中。',
    image: 'https://images.pexels.com/photos/5591677/pexels-photo-5591677.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    url: 'https://example.com/cafe-ounan',
    alumniDiscount: '同窓生証提示でドリンク10%OFF',
  },
  {
    id: 'agri',
    name: '遠野グリーンファーム',
    owner: '田村 亮（2005年卒）',
    category: 'スマート農業',
    location: '岩手県遠野市',
    description: 'ICTを活用した次世代農業で全国から視察が絶えない農園。季節の野菜セットをオンライン販売。',
    image: 'https://images.pexels.com/photos/14438674/pexels-photo-14438674.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    url: 'https://example.com/tono-green-farm',
  },
  {
    id: 'design',
    name: '北の風デザインスタジオ',
    owner: '小林 彩乃（2012年卒）',
    category: 'デザイン・ブランディング',
    location: '東京都渋谷区',
    description: '地方創生プロジェクトを中心にブランディング支援を行うクリエイティブスタジオ。青森県内企業のDX支援も。',
    image: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    url: 'https://example.com/kitakaze-design',
    alumniDiscount: '同窓生の新規案件は初回相談無料',
  },
  {
    id: 'dining',
    name: '炭火ダイナー燈(あかり)',
    owner: '三浦 健人（2008年卒）',
    category: 'ダイニング・居酒屋',
    location: '東京都中野区',
    description: '青森食材を使った炭火焼きと郷土料理が評判のダイナー。週末は津軽三味線のミニライブも開催。',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    url: 'https://example.com/sumibi-akari',
    alumniDiscount: '同窓生は料理代10%OFF＋乾杯ドリンクサービス',
  },
];

type ProgramHighlightWithImage = ProgramHighlight & { image: string };

const networkingPrograms: ProgramHighlightWithImage[] = [
  {
    id: 'mentoring',
    title: 'キャリアメンタリング',
    description: '先輩卒業生が就職・転職・起業をサポート。オンライン面談の調整も可能です。',
    icon: Handshake,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    cta: { label: 'メンター登録・相談', href: '/contact' },
  },
  {
    id: 'events',
    title: '交流イベント & オンラインサロン',
    description: '年3回のリアル交流会と、月1回のオンライン勉強会で全国の同窓生と交流。',
    icon: Megaphone,
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    cta: { label: 'イベント情報を見る', href: '/announcements' },
  },
  {
    id: 'support',
    title: '同窓会サポートデスク',
    description: '転居・転職・起業などのお知らせや、母校へのサポートについてお気軽にご相談ください。',
    icon: Mail,
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    cta: { label: 'お問い合わせ', href: '/contact' },
  },
];

const jobOpportunities: JobOpportunity[] = [
  {
    id: 'job1',
    title: 'Webデザイナー',
    company: '株式会社デザインラボ',
    location: '東京都渋谷区（リモート可）',
    type: '正社員',
    description: 'UI/UXデザインの経験者歓迎。同窓生が経営するスタートアップで、地方創生プロジェクトに携われます。',
    postedBy: '小林 彩乃（2012年卒）',
    salary: '年収400〜600万円',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  },
  {
    id: 'job2',
    title: 'ソフトウェアエンジニア',
    company: 'テックイノベート株式会社',
    location: '大阪府（フルリモート）',
    type: '正社員・契約社員',
    description: 'AIプロダクト開発に興味のある方を募集。同窓生チームと一緒に最先端技術に挑戦できます。',
    postedBy: '田中 さくら（2018年卒）',
    salary: '年収500〜800万円',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  },
  {
    id: 'job3',
    title: '農業スタッフ',
    company: '遠野グリーンファーム',
    location: '岩手県遠野市',
    type: '正社員・アルバイト',
    description: 'スマート農業に興味のある方歓迎。未経験でも丁寧に指導します。地域おこし協力隊との連携も可能。',
    postedBy: '田村 亮（2005年卒）',
    salary: '月給20万円〜（経験による）',
    image: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  },
];

const AlumniProfiles: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('career');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [formTab, setFormTab] = useState<'career' | 'business' | 'network'>('career');
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !localStorage.getItem('ounankai_swipe_hint_seen');
  });
  const handleResetSwipeHint = useCallback(() => {
    setShowSwipeHint(true);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ounankai_swipe_hint_seen');
    }
  }, []);

  // Form states
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

  // GAS endpoint
  const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbx5j_dhM-AMVRIFeOueaDIDIBjzdn9bbcqUVlwbkpqlKQvUlYdK47Bbfal3NIDu-YDm8A/exec';

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

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

      await fetch(GAS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataBody,
      });

      // no-corsモードではレスポンスを読み取れないため、
      // リクエスト送信完了をもって成功とみなす

      setFormMessages({ ...formMessages, [formType]: { type: 'success', text: '送信が完了しました。ありがとうございます。' } });
      
      // Reset form
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

  const filteredAlumni = useMemo(
    () =>
      alumniData.filter((alumni) => {
        const lowerSearch = searchTerm.toLowerCase();
        const matchesSearch =
          alumni.name.toLowerCase().includes(lowerSearch) ||
          alumni.profession.toLowerCase().includes(lowerSearch) ||
          alumni.company.toLowerCase().includes(lowerSearch);
        const matchesIndustry = selectedIndustry === 'all' || alumni.industry === selectedIndustry;
        const matchesLocation = selectedLocation === 'all' || alumni.location === selectedLocation;
        return matchesSearch && matchesIndustry && matchesLocation;
      }),
    [searchTerm, selectedIndustry, selectedLocation],
  );

  // Initialize swipe cards for each tab
  const careerSwipe = useSwipeCards({
    items: filteredAlumni,
    onSwipe: () => {
      setShowSwipeHint(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ounankai_swipe_hint_seen', 'true');
      }
    },
  });
  const businessSwipe = useSwipeCards({
    items: businessHighlights,
    onSwipe: () => {
      setShowSwipeHint(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ounankai_swipe_hint_seen', 'true');
      }
    },
  });
  // Combine networking programs and job opportunities into one array
  const networkAndJobs = useMemo(() => {
    return [
      ...networkingPrograms.map(item => ({ ...item, type: 'network' as const })),
      ...jobOpportunities.map(item => ({ ...item, type: 'job' as const }))
    ];
  }, []);

  const networkSwipe = useSwipeCards({
    items: networkAndJobs,
    onSwipe: () => {
      setShowSwipeHint(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ounankai_swipe_hint_seen', 'true');
      }
    },
  });

  const activeTabMeta = tabs.find((tab) => tab.id === activeTab);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowConnectionModal(true);
    }, 600);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasSeenHint = localStorage.getItem('ounankai_swipe_hint_seen');
    if (hasSeenHint) {
      setShowSwipeHint(false);
    } else {
      setShowSwipeHint(true);
    }
  }, [activeTab]);

  useEffect(() => {
    if (!showConnectionModal) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowConnectionModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [showConnectionModal]);

  // キーボード操作のサポート
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // モーダルが開いている場合はスキップ
      if (showConnectionModal) return;

      if (activeTab === 'career') {
        if (event.key === 'ArrowLeft') {
          careerSwipe.handleManualSwipe('left');
        } else if (event.key === 'ArrowRight') {
          careerSwipe.handleManualSwipe('right');
        } else if (event.key === ' ') {
          event.preventDefault();
          careerSwipe.handleManualSwipe('right');
        } else if (event.key === 'Backspace' && careerSwipe.canUndo) {
          event.preventDefault();
          careerSwipe.handleUndo();
        }
      } else if (activeTab === 'business') {
        if (event.key === 'ArrowLeft') {
          businessSwipe.handleManualSwipe('left');
        } else if (event.key === 'ArrowRight') {
          businessSwipe.handleManualSwipe('right');
        } else if (event.key === ' ') {
          event.preventDefault();
          businessSwipe.handleManualSwipe('right');
        } else if (event.key === 'Backspace' && businessSwipe.canUndo) {
          event.preventDefault();
          businessSwipe.handleUndo();
        }
      } else if (activeTab === 'network') {
        if (event.key === 'ArrowLeft') {
          networkSwipe.handleManualSwipe('left');
        } else if (event.key === 'ArrowRight') {
          networkSwipe.handleManualSwipe('right');
        } else if (event.key === ' ') {
          event.preventDefault();
          networkSwipe.handleManualSwipe('right');
        } else if (event.key === 'Backspace' && networkSwipe.canUndo) {
          event.preventDefault();
          networkSwipe.handleUndo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, showConnectionModal, careerSwipe, businessSwipe, networkSwipe]);

  return (
    <div className="bg-[#F7F3F0] pb-24 pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white shadow-2xl">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDMwaDEybC0yIDRoMTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
          <div className="relative px-5 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide">
                  卒業生を知る
                </span>
                <h1 className="mt-3 text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  卒業生とつながり、歩みを知る
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-blue-100 sm:text-base lg:text-lg">
                  国内外で活躍する卒業生のキャリアを紹介し、互いの歩みを知る場です。メンタリングや交流イベントでつながりを育みます。
                </p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-3">
                  <Link
                    to="/member-registration"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    掲載を希望する
                    <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
                  </Link>
                </div>
              </div>
              <div className="hidden lg:grid w-full max-w-sm grid-cols-2 gap-4 rounded-3xl bg-white/10 p-5 text-sm backdrop-blur-md">
                <div className="rounded-2xl bg-white/20 p-4 text-white shadow-inner">
                  <p className="text-xs uppercase tracking-wide text-blue-100">交流登録数</p>
                  <p className="mt-2 text-3xl font-bold">1,250+</p>
                  <p className="mt-1 text-xs text-blue-100">全国の奥南会メンバー</p>
                </div>
                <div className="rounded-2xl bg-white/20 p-4 text-white shadow-inner">
                  <p className="text-xs uppercase tracking-wide text-blue-100">メンターペア</p>
                  <p className="mt-2 text-3xl font-bold">85</p>
                  <p className="mt-1 text-xs text-blue-100">キャリア支援を実施中</p>
                </div>
                <div className="col-span-2 rounded-2xl bg-white/20 p-4 text-white shadow-inner">
                  <div className="flex items-center gap-3">
                    <Users className="h-10 w-10 rounded-full bg-white/20 p-2" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-blue-100">直近のイベント</p>
                      <p className="text-sm font-semibold">春のオンライン交流会 | 3月28日(金)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Submission Forms Section (tabbed) - 非表示（/member-registration へ誘導） */}
        {false && (
        <section className="mt-12">
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
                  <div className="flex items-center gap-2">
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
                    {networkImagePreview && (
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
                    )}
                  </div>
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
        </section>
        )}

        <section className="mt-12 rounded-3xl bg-white shadow-xl">
          <div className="flex flex-col gap-4 border-b border-gray-100 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                      isActive ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
            {activeTabMeta && <p className="text-sm text-gray-600">{activeTabMeta.description}</p>}
          </div>

          <div className="px-4 py-6 sm:px-8 sm:py-10">
            {activeTab === 'career' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                  <div className="relative lg:col-span-1">
                    <Search className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-blue-500" />
                    <input
                      type="text"
                      placeholder="卒業生・キャリア・企業名で検索"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="relative lg:col-span-1">
                    <Briefcase className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-blue-500" />
                    <select
                      value={selectedIndustry}
                      onChange={(event) => setSelectedIndustry(event.target.value)}
                      className="w-full appearance-none rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-12 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry === 'all' ? 'すべての業界' : industry}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative lg:col-span-1">
                    <MapPin className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-blue-500" />
                    <select
                      value={selectedLocation}
                      onChange={(event) => setSelectedLocation(event.target.value)}
                      className="w-full appearance-none rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-12 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location === 'all' ? 'すべての地域' : location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {filteredAlumni.length > 0 ? (
                  <>
                    <div className="lg:hidden">
                      {!showSwipeHint && (
                        <button
                          type="button"
                          onClick={handleResetSwipeHint}
                          className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-blue-600/90 px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-blue-500"
                        >
                          <Sparkles className="h-4 w-4" />
                          使い方
                        </button>
                      )}
                      {showSwipeHint && (
                        <div
                          onClick={() => {
                            setShowSwipeHint(false);
                            if (typeof window !== 'undefined') {
                              localStorage.setItem('ounankai_swipe_hint_seen', 'true');
                            }
                          }}
                          className="mb-4 cursor-pointer rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-6 text-white shadow-2xl transition hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700"
                        >
                          <div className="flex flex-col items-center gap-4">
                            <div className="text-center">
                              <p className="text-lg font-bold">スワイプして閲覧</p>
                              <p className="mt-1 text-xs text-blue-100">カードを左右にスワイプできます</p>
                            </div>

                            <div className="relative flex items-center justify-center py-6">
                              <ChevronLeft className="absolute left-0 h-8 w-8 animate-bounce text-white/80" style={{ animationDuration: '1s' }} />
                              <div className="relative mx-12">
                                <div className="h-32 w-24 rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl ring-2 ring-white/30 animate-pulse" style={{ animationDuration: '2s' }} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Hand className="h-12 w-12 animate-pulse" style={{ animationDuration: '1.5s' }} />
                                </div>
                              </div>
                              <ChevronRight className="absolute right-0 h-8 w-8 animate-bounce text-white/80" style={{ animationDuration: '1s' }} />
                            </div>

                            <div className="flex items-center gap-4 text-xs">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                                  <ChevronLeft className="h-5 w-5" />
                                </div>
                                <span>スキップ</span>
                              </div>
                              <div className="h-4 w-px bg-white/30" />
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                                  <ChevronRight className="h-5 w-5" />
                                </div>
                                <span>次へ</span>
                              </div>
                            </div>

                            <p className="text-center text-xs text-blue-100 opacity-80">タップして閉じる</p>
                          </div>
                        </div>
                      )}
                      <div className="relative mx-auto mt-2 h-[520px] max-w-sm" aria-live="polite">
                        {careerSwipe.visibleIndices.map((profileIndex, stackPosition) => {
                          const alumni = filteredAlumni[profileIndex];
                          const isTopCard = stackPosition === 0;
                          const depth = stackPosition;
                          const scale = 1 - depth * 0.08;
                          const translateY = depth * 24;
                          const stackedOpacity = isTopCard ? 1 : 0.85 - depth * 0.15;
                          const cardStyle: React.CSSProperties = isTopCard
                            ? {
                                transform: `translateX(${careerSwipe.dragOffset}px) rotate(${careerSwipe.dragOffset * 0.04}deg)`,
                                transition: careerSwipe.isDragging ? 'none' : 'transform 0.35s ease, opacity 0.25s ease',
                                opacity: careerSwipe.isAnimating ? 0 : 1,
                                zIndex: careerSwipe.visibleIndices.length - depth,
                                willChange: 'transform, opacity',
                              }
                            : {
                                transform: `scale(${scale}) translateY(${translateY}px)`,
                                transition: 'transform 0.35s ease, opacity 0.35s ease',
                                opacity: stackedOpacity,
                                zIndex: careerSwipe.visibleIndices.length - depth,
                                willChange: 'auto',
                              };
                          const dragStrength = Math.min(Math.abs(careerSwipe.dragOffset) / 150, 1);
                          const isPositive = careerSwipe.dragOffset > 0;
                          const topHighlights = alumni.highlights.slice(0, 2);

                          return (
                            <article
                              key={`${alumni.id}-${profileIndex}`}
                              ref={
                                isTopCard
                                  ? (node) => {
                                      careerSwipe.topCardRef.current = node;
                                    }
                                  : undefined
                              }
                              role="article"
                              aria-label={`${alumni.name}、${alumni.profession}、${alumni.company}`}
                              className={`absolute inset-0 flex flex-col overflow-hidden rounded-[32px] shadow-[0_25px_60px_rgba(30,64,175,0.18)] ring-1 ring-black/5 ${
                                isTopCard ? 'cursor-grab touch-pan-y active:cursor-grabbing' : 'pointer-events-none'
                              }`}
                              style={cardStyle}
                              onPointerDown={isTopCard ? careerSwipe.handlePointerDown : undefined}
                              onPointerMove={isTopCard ? careerSwipe.handlePointerMove : undefined}
                              onPointerUp={isTopCard ? careerSwipe.handlePointerUp : undefined}
                              onPointerCancel={isTopCard ? careerSwipe.handlePointerCancel : undefined}
                            >
                              <img
                                src={alumni.image}
                                alt=""
                                aria-hidden="true"
                                className="absolute inset-0 h-full w-full transform scale-110 object-cover blur-lg"
                              />
                              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950/95" />
                              {isTopCard && (
                                <div
                                  className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                                  style={{ 
                                    opacity: dragStrength,
                                    transform: `scale(${1 + dragStrength * 0.02})`
                                  }}
                                >
                                  <div
                                    className={`absolute inset-0 rounded-[32px] bg-gradient-to-br ${
                                      isPositive ? 'from-emerald-400/50 via-emerald-400/20 to-transparent' : 'from-rose-500/45 via-rose-500/20 to-transparent'
                                    }`}
                                  />
                                  <div
                                    className={`absolute top-6 ${isPositive ? 'right-6' : 'left-6'} rounded-full bg-white/95 px-5 py-2.5 text-sm font-bold shadow-2xl ${
                                      isPositive ? 'text-blue-600' : 'text-rose-600'
                                    }`}
                                  >
                                    {isPositive ? '✓ 詳細表示' : '✕ スキップ'}
                                  </div>
                                </div>
                              )}
                              <div className="relative z-10 flex h-full flex-col p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-blue-700 shadow">
                                    {alumni.year}年卒
                                  </span>
                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                    <MapPin className="h-3 w-3" />
                                    {alumni.location}
                                  </span>
                                </div>
                                <div className="rounded-xl bg-gradient-to-r from-blue-500/80 to-indigo-500/80 px-3 py-1.5 backdrop-blur-sm mb-3">
                                  <p className="flex items-center justify-center gap-1.5 text-xs font-bold text-white">
                                    <Sparkles className="h-3 w-3" />
                                    {alumni.club}
                                  </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="rounded-3xl bg-white/85 p-3 text-slate-900 shadow-xl backdrop-blur-md ring-1 ring-white/40">
                                    <div className="flex flex-col items-center gap-2 text-center">
                                      <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                                        <img 
                                          src={alumni.image} 
                                          alt={alumni.name} 
                                          className="h-full w-full object-cover"
                                          loading="eager"
                                          onError={(e) => {
                                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg width="400" height="400" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="400" height="400" fill="%23e5e7eb"/%3E%3Ccircle cx="200" cy="150" r="60" fill="%239ca3af"/%3E%3Cpath d="M 200 220 Q 140 240 100 320 L 300 320 Q 260 240 200 220" fill="%239ca3af"/%3E%3C/svg%3E';
                                          }}
                                        />
                                      </div>
                                      <div>
                                        <h3 className="text-lg font-bold text-slate-900">{alumni.name}</h3>
                                        <p className="text-xs font-medium text-blue-600">{alumni.profession}</p>
                                      </div>
                                    </div>
                                    <div className="mt-2">
                                      <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600">
                                        <Briefcase className="h-3 w-3 text-blue-500" />
                                        {alumni.company}
                                      </p>
                                    </div>
                                    <div className="mt-2 rounded-xl bg-slate-900/5 p-2 text-left">
                                      <p className="text-xs font-bold text-blue-600">ハイライト</p>
                                      <p className="mt-1 text-xs text-slate-800 line-clamp-2">{alumni.achievement}</p>
                                    </div>
                                    {alumni.description && (
                                      <div className="mt-2 text-left">
                                        <p className="text-xs leading-relaxed text-slate-600 line-clamp-3">{alumni.description}</p>
                                      </div>
                                    )}
                                    <div className="mt-2 flex flex-col gap-1.5">
                                      <Link
                                        to={`/alumni-profiles/${alumni.id}`}
                                        data-swipe-ignore="true"
                                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-blue-500"
                                      >
                                        詳細を見る
                                        <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
                                      </Link>
                                      <div className="grid grid-cols-2 gap-1.5">
                                        {alumni.linkedin && (
                                          <a
                                            href={alumni.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-swipe-ignore="true"
                                            className="inline-flex items-center justify-center gap-1 rounded-full bg-[#0A66C2] px-2.5 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-[#004182]"
                                          >
                                            <Linkedin className="h-3 w-3" />
                                            LinkedIn
                                          </a>
                                        )}
                                        {alumni.facebook && (
                                          <a
                                            href={alumni.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-swipe-ignore="true"
                                            className="inline-flex items-center justify-center gap-1 rounded-full bg-[#1877F2] px-2.5 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-[#0C63D4]"
                                          >
                                            <Facebook className="h-3 w-3" />
                                            Facebook
                                          </a>
                                        )}
                                        {alumni.instagram && (
                                          <a
                                            href={alumni.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-swipe-ignore="true"
                                            className="inline-flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] px-2.5 py-1.5 text-xs font-semibold text-white shadow transition hover:opacity-90"
                                          >
                                            <Instagram className="h-3 w-3" />
                                            Instagram
                                          </a>
                                        )}
                                        {alumni.x && (
                                          <a
                                            href={alumni.x}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-swipe-ignore="true"
                                            className="inline-flex items-center justify-center gap-1 rounded-full bg-black px-2.5 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-gray-800"
                                          >
                                            <TwitterIcon className="h-3 w-3" />
                                            X
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </article>

                          );
                        })}
                      </div>
                      <div className="mt-6 flex items-center justify-between px-2">
                        <span className="text-xs font-semibold text-blue-600">
                          {careerSwipe.swipeIndex + 1} / {filteredAlumni.length}
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => careerSwipe.handleUndo()}
                            disabled={!careerSwipe.canUndo || careerSwipe.isAnimating}
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg ring-1 ring-blue-100 transition hover:bg-blue-50 disabled:opacity-40"
                            aria-label="戻る"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => careerSwipe.handleManualSwipe('right')}
                            disabled={careerSwipe.isAnimating || filteredAlumni.length === 0}
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-xl ring-4 ring-blue-200/60 transition hover:from-blue-600 hover:to-indigo-500 disabled:opacity-40"
                        aria-label="次へ"
                          >
                        <ArrowRight className="h-7 w-7 flex-shrink-0" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="hidden gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-3">
                      {filteredAlumni.map((alumni) => {
                        const topHighlights = alumni.highlights.slice(0, 2);

                        return (
                          <article
                            key={alumni.id}
                            className="relative flex h-full flex-col overflow-hidden rounded-[32px] shadow-[0_25px_60px_rgba(30,64,175,0.18)] ring-1 ring-black/5"
                          >
                            <img
                              src={alumni.image}
                              alt={alumni.name}
                              className="absolute inset-0 h-full w-full transform scale-110 object-cover blur-lg"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/75 to-slate-950/90" />
                            <div className="relative z-10 flex h-full flex-col gap-5 p-6 text-white">
                              <div className="flex items-center justify-between">
                                <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-blue-700 shadow">
                                  {alumni.year}年卒
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                                  <MapPin className="h-3 w-3" />
                                  {alumni.location}
                                </span>
                              </div>
                              <div className="rounded-xl bg-gradient-to-r from-blue-500/80 to-indigo-500/80 px-3 py-1.5 text-center text-xs font-bold text-white backdrop-blur-sm">
                                <span className="inline-flex items-center gap-1.5">
                                  <Sparkles className="h-3 w-3" />
                                  {alumni.club}
                                </span>
                              </div>

                              <div className="rounded-3xl bg-white/85 p-5 text-slate-900 shadow-xl backdrop-blur-md ring-1 ring-white/40">
                                <div className="flex items-start gap-4">
                                  <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                                    <img
                                      src={alumni.image}
                                      alt={alumni.name}
                                      className="h-full w-full object-cover"
                                      loading="lazy"
                                      onError={(event) => {
                                        event.currentTarget.src =
                                          'data:image/svg+xml,%3Csvg width="400" height="400" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="400" height="400" fill="%23e5e7eb\"/%3E%3Ccircle cx=\"200\" cy=\"150\" r=\"60\" fill=\"%239ca3af\"/%3E%3Cpath d=\"M 200 220 Q 140 240 100 320 L 300 320 Q 260 240 200 220\" fill=\"%239ca3af\"/%3E%3C/svg%3E';
                                      }}
                                    />
                                  </div>
                                  <div className="flex-1 space-y-2">
                                    <div>
                                      <h3 className="text-xl font-bold text-slate-900">{alumni.name}</h3>
                                      <p className="text-sm font-semibold text-blue-600">{alumni.profession}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {topHighlights.map((highlight) => (
                                        <span
                                          key={highlight}
                                          className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100"
                                        >
                                          <Sparkles className="h-3 w-3" />
                                          {highlight}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-4 space-y-2 text-sm text-slate-700">
                                  <p className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-blue-500" />
                                    {alumni.company}
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-blue-500" />
                                    {alumni.achievement}
                                  </p>
                                </div>

                                {alumni.description && (
                                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{alumni.description}</p>
                                )}

                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                  <Link
                                    to={`/alumni-profiles/${alumni.id}`}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-blue-500"
                                  >
                                    詳細を見る
                                    <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
                                  </Link>
                                  {alumni.linkedin && (
                                    <a
                                      href={alumni.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 rounded-full bg-[#0A66C2] px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-[#004182]"
                                    >
                                      <Linkedin className="h-3 w-3" />
                                      LinkedIn
                                    </a>
                                  )}
                                  {alumni.facebook && (
                                    <a
                                      href={alumni.facebook}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 rounded-full bg-[#1877F2] px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-[#0C63D4]"
                                    >
                                      <Facebook className="h-3 w-3" />
                                      Facebook
                                    </a>
                                  )}
                                  {alumni.instagram && (
                                    <a
                                      href={alumni.instagram}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:opacity-90"
                                    >
                                      <Instagram className="h-3 w-3" />
                                      Instagram
                                    </a>
                                  )}
                                  {alumni.x && (
                                    <a
                                      href={alumni.x}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-gray-800"
                                    >
                                      <TwitterIcon className="h-3 w-3" />
                                      X
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="rounded-3xl border border-dashed border-blue-200 bg-blue-50/50 p-10 text-center">
                    <h3 className="text-lg font-semibold text-blue-700">条件に合う卒業生が見つかりませんでした。</h3>
                    <p className="mt-2 text-sm text-blue-600">検索条件を調整するか、メンバー登録フォームで最新情報をお知らせください。</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedIndustry('all');
                        setSelectedLocation('all');
                      }}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500"
                    >
                      <XIcon className="h-4 w-4" />
                      フィルタをクリア
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'business' && (
              <>
                <div className="lg:hidden">
                  {!showSwipeHint && (
                    <button
                      type="button"
                      onClick={handleResetSwipeHint}
                      className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-blue-600/90 px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-blue-500"
                    >
                      <Sparkles className="h-4 w-4" />
                      スワイプのヒントを表示
                    </button>
                  )}
                  {showSwipeHint && (
                    <div
                      onClick={() => setShowSwipeHint(false)}
                      className="mb-4 cursor-pointer rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-6 text-white shadow-2xl transition hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="text-center">
                          <p className="text-lg font-bold">スワイプして閲覧</p>
                          <p className="mt-1 text-xs text-blue-100">カードを左右にスワイプできます</p>
                        </div>

                        <div className="relative flex items-center justify-center py-6">
                          <ChevronLeft className="absolute left-0 h-8 w-8 animate-bounce text-white/80" style={{ animationDuration: '1s' }} />
                          <div className="relative mx-12">
                            <div className="h-32 w-24 rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl ring-2 ring-white/30 animate-pulse" style={{ animationDuration: '2s' }} />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Hand className="h-12 w-12 animate-pulse" style={{ animationDuration: '1.5s' }} />
                            </div>
                          </div>
                          <ChevronRight className="absolute right-0 h-8 w-8 animate-bounce text-white/80" style={{ animationDuration: '1s' }} />
                        </div>

                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                              <ChevronLeft className="h-5 w-5" />
                            </div>
                            <span>スキップ</span>
                          </div>
                          <div className="h-4 w-px bg-white/30" />
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                              <ChevronRight className="h-5 w-5" />
                            </div>
                            <span>次へ</span>
                          </div>
                        </div>

                        <p className="text-center text-xs text-blue-100 opacity-80">タップして閉じる</p>
                      </div>
                    </div>
                  )}
                  <div className="relative mx-auto mt-2 h-[520px] max-w-sm" aria-live="polite">
                    {businessSwipe.visibleIndices.map((businessIndex, stackPosition) => {
                      const business = businessHighlights[businessIndex];
                      const isTopCard = stackPosition === 0;
                      if (!isTopCard) return null;
                      const depth = stackPosition;
                      const scale = 1 - depth * 0.08;
                      const translateY = depth * 24;
                      const stackedOpacity = isTopCard ? 1 : 0.85 - depth * 0.15;
                      const cardStyle: React.CSSProperties = isTopCard
                        ? {
                            transform: `translateX(${businessSwipe.dragOffset}px) rotate(${businessSwipe.dragOffset * 0.04}deg)`,
                            transition: businessSwipe.isDragging ? 'none' : 'transform 0.35s ease, opacity 0.25s ease',
                            opacity: businessSwipe.isAnimating ? 0 : 1,
                            zIndex: businessSwipe.visibleIndices.length - depth,
                            willChange: 'transform, opacity',
                          }
                        : {
                            transform: `scale(${scale}) translateY(${translateY}px)`,
                            transition: 'transform 0.35s ease, opacity 0.35s ease',
                            opacity: stackedOpacity,
                            zIndex: businessSwipe.visibleIndices.length - depth,
                            willChange: 'auto',
                          };
                      const dragStrength = Math.min(Math.abs(businessSwipe.dragOffset) / 150, 1);
                      const isPositive = businessSwipe.dragOffset > 0;

                      return (
                        <article
                          key={`${business.id}-${businessIndex}`}
                          ref={
                            isTopCard
                              ? (node) => {
                                  businessSwipe.topCardRef.current = node;
                                }
                              : undefined
                          }
                          role="article"
                          aria-label={`${business.name}、${business.category}、${business.owner}`}
                          className={`absolute inset-0 flex flex-col overflow-hidden rounded-[32px] shadow-[0_25px_60px_rgba(30,64,175,0.18)] ring-1 ring-black/5 ${
                            isTopCard ? 'cursor-grab touch-pan-y active:cursor-grabbing' : 'pointer-events-none'
                          } relative`}
                          style={cardStyle}
                          onPointerDown={isTopCard ? businessSwipe.handlePointerDown : undefined}
                          onPointerMove={isTopCard ? businessSwipe.handlePointerMove : undefined}
                          onPointerUp={isTopCard ? businessSwipe.handlePointerUp : undefined}
                          onPointerCancel={isTopCard ? businessSwipe.handlePointerCancel : undefined}
                        >
                          <img
                            src={business.image}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 h-full w-full transform scale-110 object-cover blur-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950/95" />
                          {isTopCard && (
                            <div
                              className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                              style={{ 
                                opacity: dragStrength,
                                transform: `scale(${1 + dragStrength * 0.02})`
                              }}
                            >
                              <div
                                className={`absolute inset-0 rounded-[32px] bg-gradient-to-br ${
                                  isPositive ? 'from-emerald-400/50 via-emerald-400/20 to-transparent' : 'from-rose-500/45 via-rose-500/20 to-transparent'
                                }`}
                              />
                              <div
                                className={`absolute top-6 ${isPositive ? 'right-6' : 'left-6'} rounded-full bg-white/95 px-5 py-2.5 text-sm font-bold shadow-2xl ${
                                  isPositive ? 'text-emerald-600' : 'text-rose-600'
                                }`}
                              >
                                {isPositive ? '✓ 応援する' : '✕ スキップ'}
                              </div>
                            </div>
                          )}
                          <div className="relative z-10 flex h-full flex-col">
                            <div className="flex flex-col gap-2 px-4 pt-4 text-white">
                              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                                <Store className="h-3 w-3" />
                                {business.category}
                              </span>
                              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                <MapPin className="h-3 w-3" />
                                {business.location}
                              </span>
                              {business.alumniDiscount && (
                                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-400/80 px-3 py-1 text-xs font-semibold text-emerald-900 shadow-sm backdrop-blur-sm">
                                  <Sparkles className="h-3 w-3" />
                                  卒業生割引あり
                                </span>
                              )}
                            </div>
                            <div className="mt-auto flex flex-col gap-3 p-4 pt-2 pb-6">
                              <div className="rounded-3xl bg-white/85 p-4 text-slate-900 shadow-xl backdrop-blur-md ring-1 ring-white/40">
                                <div className="flex flex-col items-center gap-4">
                                  <div className="h-36 w-36 overflow-hidden rounded-3xl border-[6px] border-white shadow-2xl">
                                    <img 
                                      src={business.image} 
                                      alt={business.name} 
                                      className="h-full w-full object-cover"
                                      loading="eager"
                                      onError={(e) => {
                                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg width="400" height="400" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="400" height="400" fill="%23e5e7eb"/%3E%3Ccircle cx="200" cy="150" r="60" fill="%239ca3af"/%3E%3Cpath d="M 200 220 Q 140 240 100 320 L 300 320 Q 260 240 200 220" fill="%239ca3af"/%3E%3C/svg%3E';
                                      }}
                                    />
                                  </div>
                                  <div className="text-center">
                                    <h3 className="text-2xl font-bold text-slate-900">{business.name}</h3>
                                    <p className="mt-2 text-sm font-medium text-blue-600">{business.owner}</p>
                                  </div>
                                </div>
                                <p className="mt-3 text-xs leading-relaxed text-slate-700">{business.description}</p>
                                {business.alumniDiscount && (
                                  <div className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                                    <BadgePercent className="h-3.5 w-3.5" />
                                    {business.alumniDiscount}
                                  </div>
                                )}
                                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                  <Link
                                    to={`/business/${business.id}`}
                                    data-swipe-ignore="true"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-blue-500"
                                  >
                                    詳細を見る
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex items-center justify-between px-2">
                    <span className="text-xs font-semibold text-blue-600">
                      {businessSwipe.swipeIndex + 1} / {businessHighlights.length}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => businessSwipe.handleUndo()}
                        disabled={!businessSwipe.canUndo || businessSwipe.isAnimating}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg ring-1 ring-blue-100 transition hover:bg-blue-50 disabled:opacity-40"
                        aria-label="戻る"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => businessSwipe.handleManualSwipe('right')}
                        disabled={businessSwipe.isAnimating || businessHighlights.length === 0}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-xl ring-4 ring-blue-200/60 transition hover:from-blue-600 hover:to-indigo-500 disabled:opacity-40"
                        aria-label="次へ"
                      >
                        <ArrowRight className="h-7 w-7" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="hidden gap-6 lg:grid lg:grid-cols-2">
                  {businessHighlights.map((business) => (
                    <article
                      key={business.id}
                      className="flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-50 via-white to-white shadow-md transition hover:-translate-y-1 hover:shadow-2xl"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <img src={business.image} alt={business.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                        <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-600">
                          <Store className="h-4 w-4 text-blue-500" />
                          卒業生の事業
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col gap-4 p-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{business.name}</h3>
                          <p className="text-sm font-medium text-blue-600">{business.owner}</p>
                        </div>
                        <div className="space-y-3 text-sm text-gray-600">
                          <p className="flex items-center gap-3">
                            <Building2 className="h-4 w-4 text-blue-500" />
                            {business.category}
                          </p>
                          <p className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            {business.location}
                          </p>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-600">{business.description}</p>
                        <div className="mt-auto flex flex-wrap gap-2 text-xs font-semibold text-blue-600">
                          {business.alumniDiscount && (
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">
                              <BadgePercent className="h-4 w-4" />
                              卒業生割引あり
                            </span>
                          )}
                          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1">
                            <Sprout className="h-4 w-4" />
                            地域活性プロジェクト
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 pt-2">
                          <span className="flex items-center gap-2 text-xs text-gray-500">
                            <Phone className="h-4 w-4 text-blue-500" />
                            交流会や撮影利用の相談も受付中
                          </span>
                          <Link
                            to={`/business/${business.id}`}
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            詳細を見る
                            <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'network' && (
              <>
                <div className="lg:hidden">
                  {!showSwipeHint && (
                    <button
                      type="button"
                      onClick={handleResetSwipeHint}
                      className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-blue-600/90 px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-blue-500"
                    >
                      <Sparkles className="h-4 w-4" />
                      スワイプのヒントを表示
                    </button>
                  )}
                  {showSwipeHint && (
                    <div
                      onClick={() => setShowSwipeHint(false)}
                      className="mb-4 cursor-pointer rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-6 text-white shadow-2xl transition hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="text-center">
                          <p className="text-lg font-bold">スワイプして閲覧</p>
                          <p className="mt-1 text-xs text-blue-100">カードを左右にスワイプできます</p>
                        </div>

                        <div className="relative flex items-center justify-center py-6">
                          <ChevronLeft className="absolute left-0 h-8 w-8 animate-bounce text-white/80" style={{ animationDuration: '1s' }} />
                          <div className="relative mx-12">
                            <div className="h-32 w-24 rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl ring-2 ring-white/30 animate-pulse" style={{ animationDuration: '2s' }} />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Hand className="h-12 w-12 animate-pulse" style={{ animationDuration: '1.5s' }} />
                            </div>
                          </div>
                          <ChevronRight className="absolute right-0 h-8 w-8 animate-bounce text-white/80" style={{ animationDuration: '1s' }} />
                        </div>

                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                              <ChevronLeft className="h-5 w-5" />
                            </div>
                            <span>スキップ</span>
                          </div>
                          <div className="h-4 w-px bg-white/30" />
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                              <ChevronRight className="h-5 w-5" />
                            </div>
                            <span>次へ</span>
                          </div>
                        </div>

                        <p className="text-center text-xs text-blue-100 opacity-80">タップして閉じる</p>
                      </div>
                    </div>
                  )}
                  <div className="relative mx-auto mt-2 h-[520px] max-w-sm" aria-live="polite">
                    {networkSwipe.visibleIndices.map((itemIndex, stackPosition) => {
                      const item = networkAndJobs[itemIndex];
                      const isJob = item.type === 'job';
                      const Icon = isJob ? Briefcase : item.icon;
                      const isTopCard = stackPosition === 0;
                      const depth = stackPosition;
                      const scale = 1 - depth * 0.08;
                      const translateY = depth * 24;
                      const stackedOpacity = isTopCard ? 1 : 0.85 - depth * 0.15;
                      const cardStyle: React.CSSProperties = isTopCard
                        ? {
                            transform: `translateX(${networkSwipe.dragOffset}px) rotate(${networkSwipe.dragOffset * 0.04}deg)`,
                            transition: networkSwipe.isDragging ? 'none' : 'transform 0.35s ease, opacity 0.25s ease',
                            opacity: networkSwipe.isAnimating ? 0 : 1,
                            zIndex: networkSwipe.visibleIndices.length - depth,
                            willChange: 'transform, opacity',
                          }
                        : {
                            transform: `scale(${scale}) translateY(${translateY}px)`,
                            transition: 'transform 0.35s ease, opacity 0.35s ease',
                            opacity: stackedOpacity,
                            zIndex: networkSwipe.visibleIndices.length - depth,
                            willChange: 'auto',
                          };
                      const dragStrength = Math.min(Math.abs(networkSwipe.dragOffset) / 150, 1);
                      const isPositive = networkSwipe.dragOffset > 0;

                      return (
                        <article
                          key={`${item.type}-${item.id}-${itemIndex}`}
                          ref={
                            isTopCard
                              ? (node) => {
                                  networkSwipe.topCardRef.current = node;
                                }
                              : undefined
                          }
                          role="article"
                          aria-label={isJob ? `${item.title}、求人情報` : `${item.title}、交流・求人プログラム`}
                          className={`absolute inset-0 flex flex-col overflow-hidden rounded-[32px] shadow-[0_25px_60px_rgba(30,64,175,0.18)] ring-1 ring-black/5 ${
                            isTopCard ? 'cursor-grab touch-pan-y active:cursor-grabbing' : 'pointer-events-none'
                          }`}
                          style={cardStyle}
                          onPointerDown={isTopCard ? networkSwipe.handlePointerDown : undefined}
                          onPointerMove={isTopCard ? networkSwipe.handlePointerMove : undefined}
                          onPointerUp={isTopCard ? networkSwipe.handlePointerUp : undefined}
                          onPointerCancel={isTopCard ? networkSwipe.handlePointerCancel : undefined}
                        >
                          <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/85" />
                          {isTopCard && (
                            <div
                              className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                              style={{
                                opacity: dragStrength,
                                transform: `scale(${1 + dragStrength * 0.02})`
                              }}
                            >
                              <div
                                className={`absolute inset-0 rounded-[32px] bg-gradient-to-br ${
                                  isPositive ? 'from-emerald-400/50 via-emerald-400/20 to-transparent' : 'from-rose-500/45 via-rose-500/20 to-transparent'
                                }`}
                              />
                              <div
                                className={`absolute top-6 ${isPositive ? 'right-6' : 'left-6'} rounded-full bg-white/95 px-5 py-2.5 text-sm font-bold shadow-2xl ${
                                  isPositive ? 'text-emerald-600' : 'text-rose-600'
                                }`}
                              >
                                {isPositive ? (isJob ? '✓ 応募する' : '✓ 参加する') : '✕ スキップ'}
                              </div>
                            </div>
                          )}
                          <div className="relative z-10 flex h-full flex-col justify-between p-5 pb-6">
                            <div className="flex items-start justify-between">
                              <span className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-white/85 shadow ${isJob ? 'text-amber-600' : 'text-blue-600'}`}>
                                <Icon className="h-5 w-5" />
                              </span>
                              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                                {isJob ? '求人情報' : 'Network'}
                              </span>
                            </div>
                            <div className="space-y-3 text-white">
                              {isJob ? (
                                <>
                                  <div>
                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                    <p className="mt-1 text-sm font-medium text-amber-100">{item.company}</p>
                                    <div className="mt-1.5 flex flex-wrap gap-2 text-xs">
                                      <span className="rounded-full bg-white/20 px-2 py-0.5 backdrop-blur-sm">{item.location}</span>
                                      <span className="rounded-full bg-white/20 px-2 py-0.5 backdrop-blur-sm">{item.type}</span>
                                      {item.salary && <span className="rounded-full bg-amber-400/30 px-2 py-0.5 backdrop-blur-sm">{item.salary}</span>}
                                    </div>
                                  </div>
                                  <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                                    <p className="text-xs leading-relaxed text-white/90">{item.description}</p>
                                  </div>
                                  <div className="flex flex-nowrap items-center justify-between gap-2">
                                    <div className="text-xs text-white/70">同窓生からの求人</div>
                                    <button
                                      type="button"
                                      data-swipe-ignore="true"
                                      onClick={() => networkSwipe.handleManualSwipe('right')}
                                      className="inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-2 text-xs font-semibold text-amber-600 shadow-lg transition hover:bg-amber-50"
                                    >
                                      <Briefcase className="h-4 w-4" />
                                      応募する
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>
                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-blue-100">Ounan Alumni Network</p>
                                  </div>
                                  <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                                    <p className="text-xs leading-relaxed text-white/90">{item.description}</p>
                                  </div>
                                  <div className="flex flex-nowrap items-center justify-between gap-2">
                                    <div />
                                    <Link
                                      to={item.cta?.href ?? '#'}
                                      data-swipe-ignore="true"
                                      className="inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-2 text-xs font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
                                    >
                                      <Icon className="h-4 w-4" />
                                      詳細を見る
                                    </Link>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex items-center justify-between px-2">
                    <span className="text-xs font-semibold text-blue-600">
                      {networkSwipe.swipeIndex + 1} / {networkAndJobs.length}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => networkSwipe.handleUndo()}
                        disabled={!networkSwipe.canUndo || networkSwipe.isAnimating}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg ring-1 ring-blue-100 transition hover:bg-blue-50 disabled:opacity-40"
                        aria-label="戻る"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => networkSwipe.handleManualSwipe('right')}
                        disabled={networkSwipe.isAnimating || networkAndJobs.length === 0}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-xl ring-4 ring-blue-200/60 transition hover:from-blue-600 hover:to-indigo-500 disabled:opacity-40"
                        aria-label="次へ"
                      >
                        <ArrowRight className="h-7 w-7" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="hidden gap-6 lg:grid lg:grid-cols-2">
                  {networkingPrograms.map((program) => {
                    const Icon = program.icon;
                    return (
                      <article key={program.id} className="flex flex-col gap-4 rounded-3xl border border-blue-100 bg-blue-50/60 p-6 shadow-inner">
                        <div className="flex items-center gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                            <Icon className="h-6 w-6" />
                          </span>
                          <div>
                            <h3 className="text-lg font-semibold text-blue-800">{program.title}</h3>
                            <p className="text-xs font-medium uppercase tracking-wider text-blue-500">Ounan Alumni Network</p>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed text-blue-900">{program.description}</p>
                        {program.cta && (
                          <Link
                            to={program.cta.href}
                            className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
                          >
                            {program.cta.label}
                            <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
                          </Link>
                        )}
                      </article>
                    );
                  })}

                  <article className="col-span-2 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-lg">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg">
                        <Sparkles className="h-6 w-6" />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-amber-900">同窓生からの求人情報</h3>
                        <p className="text-xs font-medium uppercase tracking-wider text-amber-600">Job Opportunities from Alumni</p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      {jobOpportunities.map((job) => (
                        <div key={job.id} className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                          <div className="mb-3">
                            <h4 className="font-semibold text-gray-900">{job.title}</h4>
                            <p className="mt-1 text-xs text-amber-600">{job.company}</p>
                          </div>
                          <div className="space-y-2 text-xs text-gray-600">
                            <p className="flex items-center gap-2">
                              <MapPin className="h-3.5 w-3.5 text-amber-500" />
                              {job.location}
                            </p>
                            <p className="flex items-center gap-2">
                              <Briefcase className="h-3.5 w-3.5 text-amber-500" />
                              {job.type}
                            </p>
                            {job.salary && (
                              <p className="font-medium text-amber-700">{job.salary}</p>
                            )}
                          </div>
                          <p className="mt-3 text-xs leading-relaxed text-gray-600">{job.description}</p>
                          <p className="mt-3 text-xs text-gray-500">掲載: {job.postedBy}</p>
                          <Link
                            to="/contact"
                            className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:from-amber-600 hover:to-orange-600"
                          >
                            応募・問い合わせ
                            <ArrowRight className="ml-2 h-3.5 w-3.5 flex-shrink-0" />
                          </Link>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-center text-xs text-amber-700">
                      求人情報の掲載をご希望の同窓生の方は
                      <Link to="/contact" className="ml-1 font-semibold underline">
                        こちらからお問い合わせください
                      </Link>
                    </p>
                  </article>

                  <article className="col-span-2 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
                          <Newspaper className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-blue-900">卒業生トピックス</h3>
                          <p className="text-xs font-medium uppercase tracking-wider text-blue-600">Alumni Topics</p>
                        </div>
                      </div>
                      <Link
                        to="/announcements"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                      >
                        もっと見る
                        <ArrowRight className="h-4 w-4 flex-shrink-0" />
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {alumniTopics.map((topic) => (
                        <Link
                          key={topic.id}
                          to={topic.url || '/announcements'}
                          className="flex items-start gap-4 rounded-2xl border border-blue-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-md"
                        >
                          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow">
                            <Newspaper className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                {topic.category}
                              </span>
                              <span className="text-xs text-gray-500">{topic.date}</span>
                            </div>
                            <h4 className="font-semibold text-gray-900">{topic.title}</h4>
                            <p className="mt-1 text-sm text-gray-600">{topic.description}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 flex-shrink-0 text-blue-500" />
                        </Link>
                      ))}
                    </div>
                  </article>

                  <article className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white shadow-xl">
                    <h3 className="text-lg font-semibold">卒業生登録フォーム</h3>
                    <p className="mt-3 text-sm text-blue-100">
                      近況報告、イベント情報、キャリア情報をお寄せください。会報やメーリングリストでもご紹介します。
                    </p>
                    <a
                      href="https://keen-whale-2c2.notion.site/2826e2231c40807aa844e554e4404588?pvs=105"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                      卒業生登録フォームを開く
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                    <div className="mt-6 rounded-2xl bg-white/15 p-4 text-sm">
                      <p className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        フォーム記入後は事務局よりご連絡差し上げます。
                      </p>
                      <p className="mt-2 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <a href="mailto:ounankai@gmail.com" className="underline">
                          ounankai@gmail.com
                        </a>
                      </p>
                    </div>
                  </article>
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      {showConnectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowConnectionModal(false)}
              aria-label="閉じる"
              className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
            >
              <XIcon className="h-4 w-4" />
            </button>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
                <Users className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">卒業生とつながろう！</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                卒業生同士のつながりを広げ、互いの歩みを知るための場です。キャリア相談やイベント情報、求人情報も共有できます。
              </p>
              <div className="mt-6 space-y-3">
                <Link
                  to="/member-registration"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-blue-500 hover:to-indigo-500"
                >
                  <Heart className="h-4 w-4" />
                  掲載を希望する
                </Link>
                <button
                  type="button"
                  onClick={() => setShowConnectionModal(false)}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                >
                  あとで見る
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniProfiles;
