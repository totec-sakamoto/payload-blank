# payload-blank

Next.jsとPayload CMSによるフルスタックアプリのボイラープレート。

## 主な技術スタック

- Next.js
- Payload CMS
- Playwright
- React
- SQLite
- TypeScript
- Vitest

## クイックスタート

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

本番環境では `.env` の値を変更:

- `PAYLOAD_SECRET`: より安全なランダム文字列
- `DATABASE_URI`: 本番環境でのデータベースURL
- `NEXT_PUBLIC_SERVER_URL`: 本番環境でのルートURL（クライアントサイドで使用）

※ローカル環境は `.env.local` に設定

### 3. TypeScript型の生成

```bash
pnpm generate:types
```

### 4. Import Mapの生成

```bash
pnpm generate:importmap
```

### 5. 開発サーバーの起動

```bash
pnpm dev
```

## アクセス方法

- フロントエンド: [localhost:3000](http://localhost:3000)
- Payload管理画面: [localhost:3000/admin](http://localhost:3000/admin)

## 主なディレクトリ構成

```
media/                 # メディアファイル保存
public/                # 静的アセット
src/
├── app/
│   ├── (frontend)/    # フロントエンドページ
│   └── (payload)/     # Payload管理画面
├── collections/       # Payloadコレクション定義
│   ├── index.ts       # コレクションエクスポート
│   ├── Media.ts       # メディアコレクション
│   ├── Posts.ts       # 投稿コレクション
│   └── Users.ts       # ユーザーコレクション
├── components/        # Reactコンポーネント
└── store/             # 状態管理
tests/                 # E2E・統合テスト
```

## データベース

- 開発環境: SQLite ( `payload.db` )
- 本番環境: 環境変数で設定

※SQLiteファイルは自動生成されるため追加設定は不要

## 利用可能なコマンド

- `pnpm dev` - 開発サーバー起動
- `pnpm build` - 本番ビルド
- `pnpm start` - 本番サーバー起動
- `pnpm generate:types` - Payload型定義生成
- `pnpm generate:importmap` - Import Map生成
- `pnpm payload` - Payload CLIコマンド
- `pnpm lint` - ESLint実行
- `pnpm format` - Prettier実行
- `pnpm test:int` - 統合テスト
- `pnpm test:e2e` - E2Eテスト

## カスタマイズ

### 新しいコレクションの追加

1. `src/collections/` フォルダに新しい `.ts` ファイルを作成
2. `src/collections/index.ts` でエクスポート
3. `payload.config.ts` の `collections` 配列に追加
4. `pnpm generate:types` で型を再生成

### フロントエンドページの追加

`src/app/(frontend)/` フォルダにApp Router形式でページを追加

## トラブルシューティング

### TypeScript型エラー

```bash
pnpm generate:types
```

### Import Mapエラー

```bash
pnpm generate:importmap
```

### データベースのリセット

SQLiteファイルを削除して再起動:

```bash
rm ./src/payload.db
pnpm dev
```
