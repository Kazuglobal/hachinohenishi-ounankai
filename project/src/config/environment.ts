/**
 * 環境設定ファイル
 * アプリケーション全体で使用する環境変数とデフォルト値を管理
 */

// 環境変数の型定義
interface EnvironmentConfig {
  appTitle: string;
  appVersion: string;
  apiUrl?: string;
  apiKey?: string;
  emailjsServiceId?: string;
  emailjsTemplateId?: string;
  emailjsPublicKey?: string;
  debug: boolean;
  logLevel: 'error' | 'warn' | 'info' | 'debug';
}

// 環境変数から値を取得（Viteの場合はimport.meta.envを使用）
const getEnvVar = (key: string, defaultValue?: string): string | undefined => {
  return import.meta.env[key] || defaultValue;
};

// 環境設定オブジェクト
export const environment: EnvironmentConfig = {
  // アプリケーション基本設定
  appTitle: getEnvVar('VITE_APP_TITLE', '大南会'),
  appVersion: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  
  // API設定
  apiUrl: getEnvVar('VITE_API_URL'),
  apiKey: getEnvVar('VITE_API_KEY'),
  
  // EmailJS設定
  emailjsServiceId: getEnvVar('VITE_EMAILJS_SERVICE_ID'),
  emailjsTemplateId: getEnvVar('VITE_EMAILJS_TEMPLATE_ID'),
  emailjsPublicKey: getEnvVar('VITE_EMAILJS_PUBLIC_KEY'),
  
  // 開発設定
  debug: getEnvVar('VITE_DEBUG', 'false') === 'true',
  logLevel: (getEnvVar('VITE_LOG_LEVEL', 'info') as EnvironmentConfig['logLevel']) || 'info',
};

// 開発環境かどうかの判定
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

// フィーチャーフラグ
export const featureFlags = {
  // 本番では非表示。VITE_ENABLE_AD_GALLERY=true を設定すれば明示的に有効化可能
  advertisementGalleryEnabled: import.meta.env.DEV || import.meta.env.VITE_ENABLE_AD_GALLERY === 'true',
  // ギャラリーは本番では準備中。VITE_ENABLE_GALLERY=true で明示的に有効化
  galleryEnabled: import.meta.env.DEV || import.meta.env.VITE_ENABLE_GALLERY === 'true',
} as const;

// 環境設定の検証
export const validateEnvironment = (): void => {
  if (isDevelopment) {
    console.log('🔧 開発環境で実行中');
    console.log('📋 環境設定:', environment);
  }
  
  // 必須環境変数のチェック
  const requiredVars = ['VITE_APP_TITLE'];
  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn('⚠️ 必須環境変数が設定されていません:', missingVars);
  }
};

// 環境設定の初期化
if (isDevelopment) {
  validateEnvironment();
}
