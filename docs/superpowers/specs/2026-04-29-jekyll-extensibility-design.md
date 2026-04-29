# Jekyll 拡張性設計（ウマ娘 レース攻略メモ）

- 作成日: 2026-04-29
- ステータス: 承認済（ユーザー確認 6/6 セクション完了）
- 対象リポジトリ: `yuki-kamimemo.github.io`（GitHub Pages）
- 想定実装者: AI エージェント（複数セッション・複数モデルにまたがる）

## 重要な前提

本プロジェクトは個人運営の非公式攻略メモサイトで、収益化・解析・会員機能を一切持たない。今後の実装は AI エージェントが担当するため、本書と `AGENTS.md` を常に一次情報として参照すること。新規 AI セッションは最初に `AGENTS.md` を読み、必要に応じ本書を参照する想定。

## ブレストで決定した方針サマリ

| 項目 | 決定 |
|---|---|
| 規模想定 | 未確定。拡張前提で設計（Q1=D） |
| 重視点 | 更新の手軽さ・信頼性/正確性（Q2=C+E） |
| ビルド | Jekyll（GitHub Pages 標準・追加 Actions 不要）（Q3=B） |
| 本文記法 | HTML/Markdown ハイブリッド・テンプレ必須（Q4=C） |
| カテゴリ軸 | 内容種別（race/training/support/factor/course）（Q5=B） |
| 一覧軸 | カテゴリ＋タグ（Q6=B） |
| 既存 URL | 全移行・リダイレクト不要（Q7=D） |
| タグ実装 | 案 A（`/tags/` 1 ページ集約）。100 タグ超で案 B 検討 |

## アーキテクチャ

- **ビルド**: GitHub Pages サーバ側 Jekyll。push のみで公開
- **プラグイン**: `jekyll-feed` / `jekyll-sitemap` / `jekyll-seo-tag`（GitHub Pages 公式許可リスト内）
- **コンテンツ管理**: Jekyll Collections（カテゴリごと 1 collection）
- **本文**: HTML（リッチ攻略）・Markdown（シンプル）混在可。layout は共通
- **スタイル**: 既存 `assets/css/{home,guide}.css` 維持。必要に応じ追加
- **コメント**: giscus（攻略記事のみ・layout で自動挿入）

## ディレクトリ構造

```
リポジトリルート/
├── _config.yml
├── Gemfile                  # 任意（ローカル確認用）
├── .gitignore               # _site/, .jekyll-cache/ 追加
│
├── _layouts/
│   ├── default.html         # <head>共通・skip-link・<main>枠
│   ├── home.html            # トップ用
│   ├── guide.html           # 攻略記事用（giscus 含む）
│   ├── category-list.html   # 各カテゴリトップ用
│   └── tag-index.html       # /tags/ 用
│
├── _includes/
│   ├── head.html            # meta/OG/canonical/favicon/SEO
│   ├── footer.html
│   ├── giscus.html
│   ├── sources.html         # 出典セクション（front matter sources 駆動）
│   ├── tags.html            # タグバッジ列
│   ├── card-summary.html    # .summary-card
│   ├── card-style.html      # .style-card
│   ├── card-support.html    # .support-card
│   ├── callout.html         # .callout
│   ├── badge.html           # .badge
│   └── source-card.html     # .source-card
│
├── _race/                   # collection: race
├── _training/               # collection: training（空でも宣言）
├── _support/                # collection: support
├── _factor/                 # collection: factor
├── _course/                 # collection: course
│
├── _data/
│   ├── tags.yml             # タグ slug→表示名/説明
│   └── sources.yml          # 共通参照先（GameTora 等）
│
├── templates/               # 新規ページ雛形（_config.yml exclude で非公開）
│   └── race-guide.html
│
├── assets/
│   ├── css/{home,guide,list}.css
│   └── favicon.svg
│
├── race/index.html          # layout: category-list, category: race
├── training/index.html
├── support/index.html
├── factor/index.html
├── course/index.html
├── tags/index.html          # layout: tag-index
│
├── index.html               # layout: home（最新 N 件自動表示）
├── 404.html                 # layout: default
├── robots.txt
├── AGENTS.md                # 永続運用ルール（本書骨子を反映）
├── README.md
└── docs/
    └── superpowers/specs/2026-04-29-jekyll-extensibility-design.md
```

## `_config.yml` 必須項目

```yaml
title: ウマ娘 レース攻略メモ
description: 非公式の対戦レース攻略メモ
url: https://yuki-kamimemo.github.io
lang: ja
timezone: Asia/Tokyo

plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

collections:
  race:
    output: true
    permalink: /guides/race/:path/
  training:
    output: true
    permalink: /guides/training/:path/
  support:
    output: true
    permalink: /guides/support/:path/
  factor:
    output: true
    permalink: /guides/factor/:path/
  course:
    output: true
    permalink: /guides/course/:path/

defaults:
  - scope: { type: race }
    values: { layout: guide, category: race }
  - scope: { type: training }
    values: { layout: guide, category: training }
  - scope: { type: support }
    values: { layout: guide, category: support }
  - scope: { type: factor }
    values: { layout: guide, category: factor }
  - scope: { type: course }
    values: { layout: guide, category: course }

exclude:
  - templates/
  - docs/
  - AGENTS.md
  - README.md
  - .codex-local/
  - Gemfile
  - Gemfile.lock
  - vendor/
```

## front matter スキーマ（攻略記事）

```yaml
---
title: "2026年5月LoH短距離 京都芝1200m攻略"   # 必須
description: "..."                              # 必須（meta description / OG）
date: 2026-04-29                                # 必須（公開日）
modified: 2026-04-29                            # 任意（更新時に書換）
tags: [loh, 短距離, 京都, 芝, 2026-05]          # 推奨
event: loh                                      # 任意（loh/champion/team/daily/training）
status: published                               # 任意（published/draft。draft はビルド除外）
hero_image:                                     # 任意
  src: https://gametora.com/...
  credit_name: "GameTora Support Card DB"
  credit_url: https://gametora.com/umamusume/supports
sources:                                        # 推奨（出典）
  - key: gametora-supports                      # _data/sources.yml 参照キー（任意）
  - name: "神ゲー攻略"                          # 直接記述（key 無いとき）
    url: https://kamigame.jp/...
    note: "コース解説確認"
---
```

| 項目 | 型 | 必須 | 用途 |
|---|---|---|---|
| `title` | string | ○ | `<title>`/OG/`<h1>` |
| `description` | string | ○ | `<meta description>`/OG |
| `date` | date | ○ | 公開日・並び替え |
| `modified` | date | - | 最終更新日 |
| `tags` | string[] | - | タグページ・横断検索 |
| `event` | string | - | 主分類補助 |
| `status` | enum | - | `draft` でビルド除外 |
| `hero_image` | object | - | アイキャッチ画像（引用元必須） |
| `sources` | object[] | - | 出典セクション自動生成 |

`layout` と `category` は `_config.yml` の `defaults` で自動付与されるため front matter に書かない。

## 自動化されるメタデータ

- `<title>` / `<meta description>` / OG / Twitter Card → `jekyll-seo-tag`
- `<link rel="canonical">` → permalink から自動
- `article:published_time` / `article:modified_time` → `date` / `modified` から `_layouts/guide.html` で出力
- 出典セクション（`#sources`）→ `_includes/sources.html` が `page.sources` をループ展開
- タグバッジ → `_includes/tags.html`
- giscus → `_includes/giscus.html`（`data-mapping="pathname"` で記事ごと自動分岐）
- サイトマップ → `jekyll-sitemap` 自動
- RSS → `jekyll-feed` 自動

## タグ運用（案 A：1 ページ集約）

- `_data/tags.yml`:
  ```yaml
  loh:
    label: "LoH"
    description: "リーグ・オブ・ヒーローズ攻略"
  short-distance:
    label: "短距離"
  ```
- `tags/index.html`（layout: tag-index）が `_data/tags.yml` を読み、各タグごとに記事を `where_exp` でフィルタして 1 ページに展開
- 個別タグページ（`/tags/<tag>/`）は当面作らない
- 100 タグ超 or 1 ページが重くなったら案 B（`_tags/` collection）へ移行

## トップページ自動化

- `index.html` の「攻略ページ」セクション内で全 collection を `concat` → `sort: 'date' | reverse | slice: 0,5` で最新 5 件
- 「全カテゴリ一覧へ」ボタンで各 `<category>/index.html` へ
- 公式リンク・攻略サイトリンク・お知らせは現状維持（手動）

## 移行フェーズ

各フェーズは独立して push 可能。

### Phase 0: Jekyll 化準備
- `_config.yml`, `Gemfile`（任意）, `.gitignore` 追加
- 既存 `sitemap.xml` 削除（jekyll-sitemap が代替）
- 既存 HTML はそのまま動作

### Phase 1: layout / include 切り出し
- `_layouts/default.html` / `home.html` / `guide.html` 作成
- `_includes/head.html` / `giscus.html` / `footer.html` 抽出
- `index.html` を `layout: home` 化
- `404.html` を layout 化

### Phase 2: 既存攻略ページ collection 移行
- `guides/loh/2026-05-kyoto-1200/index.html` → `_race/2026-05-kyoto-1200.html` 移動
- front matter 付与（title / description / date / tags / event / sources）
- `<head>` / `<main>` / footer 削除（layout 委譲）
- リッチコンポーネント本文は維持
- 出典セクションを `sources` 駆動に置換
- 旧 URL `/guides/loh/...` は破棄（リダイレクト不要・確認済）
- 旧ディレクトリ `guides/loh/` は削除

### Phase 3: テンプレ・ドキュメント整備（**重要**）
- `templates/race-guide.html` 作成（front matter 雛形＋本文標準セクション骨組み）
- `_config.yml` `exclude` に `templates/` 追加
- **`AGENTS.md` を本書の骨子で更新**（次節「AGENTS.md 必須記載」参照）
- `README.md` 更新（公開 URL・新構成サマリ）

### Phase 4: 一覧・タグ機能
- `_layouts/category-list.html` / `_layouts/tag-index.html` 作成
- `<category>/index.html` 5 ファイル配置
- `tags/index.html` 配置
- `_data/tags.yml` 整備
- `index.html` 攻略ページセクションを `site.race | concat: ...` に置換
- スタイル追加

### Phase 5: 任意拡張
- RSS（`/feed.xml`）
- JSON-LD `Article` 構造化データ
- OG 画像（hero_image 流用 or 後回し）

### 各フェーズ完了基準
- ローカル `bundle exec jekyll serve` でビルド成功（任意）
- `git diff --check` クリーン
- 既存ページ表示確認
- 各 HTML に canonical / OG / favicon / description 揃い
- 外部リンク `target="_blank"` に `rel="noopener noreferrer"` 揃い
- `.codex-local/` が Git 管理外維持

## AGENTS.md 必須記載（Phase 3 で書き込む内容）

将来の AI エージェントが実装作業時に必ず参照する項目。AGENTS.md の既存「リポジトリ運用方針」を残しつつ、以下セクションを追加する。

1. **Jekyll Collection 一覧と用途**
   - race / training / support / factor / course の対象コンテンツ定義
2. **front matter スキーマ全項目**（本書「front matter スキーマ」節そのまま）
3. **`_layouts/` ・ `_includes/` 部品一覧と使い分け**
   - default / home / guide / category-list / tag-index
   - head / footer / giscus / sources / tags / card-* / callout / badge / source-card
4. **新規ページ作成手順**
   ```
   cp templates/race-guide.html _race/<slug>.html
   # front matter 書換 → 本文埋め
   ```
5. **タグ運用ルール**
   - slug 規約（英小文字 / 数字 / ハイフン）
   - `_data/tags.yml` に未登録タグは slug 表示
   - 案 A 採用中。100 タグ超で案 B 移行検討
6. **`sources` 運用**
   - `_data/sources.yml` の共通参照先キーを優先
   - 直接記述する場合は `name` / `url` / `note` 必須
7. **新カテゴリ追加チェックリスト**
   - `_config.yml` に collection 追加
   - `<category>/index.html` 配置
   - `templates/<category>-guide.html` 作成（任意）
   - `AGENTS.md` 反映
8. **ビルド前確認チェックリスト**
   - `git diff --check` / `git status --short`
   - `.codex-local/` Git 管理外
   - canonical / OG / favicon / description 揃い
   - 外部リンク `rel="noopener noreferrer"` 揃い
   - 画像に `alt` ＋引用元リンク
9. **本書（設計書）への参照リンク**
   - `docs/superpowers/specs/2026-04-29-jekyll-extensibility-design.md` を「設計の根拠」として明記

## 拡張時の追加ルール

### 新カテゴリ追加
1. `_config.yml` `collections` に追加
2. `defaults` に `layout: guide` / `category` 紐付け追加
3. `<category>/index.html` 配置
4. `templates/<category>-guide.html`（任意）
5. `AGENTS.md` のカテゴリ説明更新

### 新タグ追加
1. 記事 front matter `tags` に追加
2. `_data/tags.yml` に label / description 追加（未登録なら slug 表示）

## 禁止事項（既存方針継続）

- フォーム・会員機能・広告・解析・Cookie 追加禁止
- giscus 以外のコメント機構追加禁止
- 大量画像転載・ギャラリー化禁止
- 外部権利物の改変・再配布禁止
- `.codex-local/` を Git にコミット禁止

## YAGNI（当面やらない）

- サイト内検索（Lunr.js 等）→ 100 記事超えたら検討
- ダークモード自前実装 → giscus は preferred_color_scheme なので将来追従
- 多言語（i18n）→ 想定外
- 画像セルフホスト → 必要になったら検討
- jekyll-paginate-v2 等の許可外プラグイン → 使えない（GitHub Pages 制約）

## 参考ドキュメント

- 既存 `AGENTS.md` ：HTML 構造規約・CSS 方針・giscus 運用・画像方針（本書と整合）
- 既存 `.codex-local/image-usage.md` ：ローカル運用メモ（Git 管理外）
- Jekyll 公式: https://jekyllrb.com/
- GitHub Pages 許可プラグイン一覧: https://pages.github.com/versions/
