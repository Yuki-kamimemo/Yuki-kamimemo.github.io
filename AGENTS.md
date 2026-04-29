# Repository Guidelines for Codex

このリポジトリは、GitHub Pagesで公開する個人運営の「ウマ娘 レース攻略メモ」サイトである。Codexは新しいページ作成や既存ページ改修時に、この方針・構造・デザインを優先して参照する。

## 基本方針

- サイトは個人用の非公式攻略メモとして、軽量な静的HTML/CSSで作る。
- 多機能化しない。フォーム、会員機能、広告、アクセス解析、Cookie利用は追加しない。
- 公開サイトなので、最低限のSEO、アクセシビリティ、引用元導線、非公式表記を必ず入れる。
- 日本語ページとして作り、`<html lang="ja">` を使う。
- CSSは既存の `assets/css/home.css` と `assets/css/guide.css` の設計に合わせる。新しいページで大きく違う見た目を作らない。
- デザインは明るい攻略メモ調にする。カード、表、バッジ、コールアウト、ページ内ナビを使い、情報をスキャンしやすくする。
- UI文言は短く具体的にする。攻略メモとしてすぐ読める構成を優先する。

## コメント欄運用

- ガイドページのコメント欄は `giscus` を使い、GitHub Discussions に保存する。
- サイト側に独自の投稿フォーム、DB、会員機能、コメント保存APIは追加しない。
- コメント欄は記事ごとに分けるため、`data-mapping="pathname"` を使う。
- コメント欄は情報源リンクの後、フッターの前に置く。
- セクションは `<section class="section" id="comments" aria-labelledby="comments-heading">` を使い、見出しは `コメント` にする。
- giscusの基本設定は、現在のガイドページにある `data-repo`、`data-repo-id`、`data-category`、`data-category-id`、`data-theme="preferred_color_scheme"`、`data-lang="ja"` を維持する。
- giscusのスクリプトは外部読み込みだが、コメント投稿にはGitHubログインとgiscus認可が必要であることを前提にする。

## 公開サイト要件

各HTMLの `<head>` には以下を入れる。

- `meta charset="utf-8"`
- `meta name="viewport" content="width=device-width, initial-scale=1"`
- ページ固有の `<title>`
- ページ固有の `meta name="description"`
- `meta name="theme-color"`
- `link rel="canonical"` に公開URLを入れる
- `og:title`
- `og:description`
- `og:type`
- `og:url`
- `og:site_name` は `ウマ娘 レース攻略メモ`
- `meta name="twitter:card" content="summary"`
- `link rel="icon"` はルートからの相対パスで `assets/favicon.svg` を参照する

ガイド記事では可能な限り以下も入れる。

- `meta property="article:published_time"`
- `meta property="article:modified_time"`

外部リンクで `target="_blank"` を使う場合は、必ず `rel="noopener noreferrer"` を付ける。

## 画像利用方針

- 画像は分かりやすさのために利用してよい。
- 画像の近く、またはページ末尾の情報源欄に、ユーザーが引用元へ辿れる通常リンクを必ず置く。
- 画像の `alt` は「何の画像か」が分かる説明にする。
- 画像を大量転載・ギャラリー化しない。攻略理解の補助に必要な範囲で使う。
- 画像出典には、サイト名、参照URL、確認日を残す。
- 現在の主な画像引用元は `GameTora Support Card DB`。
- 詳細なローカル運用メモは `.codex-local/image-usage.md` にある。ただし `.codex-local/` はGit管理外なので、GitHubには上げない。

## トップページ構造

トップページは `index.html` と `assets/css/home.css` を使う。構造は現在の `index.html` を基準にする。

1. `skip-link`
   - `<a class="skip-link" href="#main">本文へスキップ</a>` を置く。
2. `<main class="page" id="main">`
3. `.hero`
   - `.hero-inner`
   - `.eyebrow`
   - `h1`
   - `.lead`
   - `.hero-tags`
   - 背景画像を使う場合は `.image-credit` で引用元リンクを置く。
4. 攻略ページ一覧
   - `<section class="section" aria-labelledby="guides-heading">`
   - `.guide-list`
   - `.guide-card`
   - ページへのリンクは `.button`
5. 公式リンク
   - `.link-grid`
   - `.link-card.official`
6. 攻略サイトリンク
   - `.link-grid`
   - `.link-card.strategy`
7. このサイトについて
   - `.notice`
   - 非公式サイトであること、権利元と関係ないこと、AI利用、確認時点の攻略メモであること、最終更新日を書く。

## ガイドページ構造

ガイドページは公開URLと同じ `guides/<event>/<slug>/index.html` に置き、`assets/css/guide.css` を使う。構造は現在の `guides/loh/2026-05-kyoto-1200/index.html` を基準にする。

### Jekyll front matter 必須ルール

- ガイドページは `_race/` などのcollectionだけに置かない。GitHub Pagesで出力されずリンク先が404になる事故があったため、公開したい記事は必ず公開URLと同じ `guides/<event>/<slug>/index.html` に置く。
- `guides/<event>/<slug>/index.html` のfront matterには `layout: guide` と `css: guide` を必ず明示する。通常ページにはcollection defaultsが効かないため、これを忘れると本文だけが出たり `home.css` が読み込まれたりする。
- `permalink` は公開URLと一致させる。例: `permalink: /guides/loh/2026-05-kyoto-1200/`。
- front matterファイルはUTF-8 BOMなしで保存する。BOM付きだとJekyllが先頭の `---` をfront matterとして認識せず、YAMLが本文にそのまま表示される。
- PowerShellでファイルを書き換える場合、BOMが入ることがある。日本語ファイルを編集した後は `scripts/validate_jekyll_structure.ps1` でBOM禁止チェックを通す。
- 公開前後の確認では、ページ本文だけでなく生成HTMLに `<!doctype html>`、`/assets/css/guide.css`、`.hero` が含まれることを確認する。

1. `skip-link`
   - `<a class="skip-link" href="#main">本文へスキップ</a>` を置く。
2. `<main class="page" id="top">`
3. `.page-actions.page-actions-top`
   - トップページへ戻るリンクを置く。
4. `.hero#main`
   - `.hero-inner`
   - `.eyebrow`
   - `h1`
   - `.lead`
   - `.tags` と `.tag`
   - 画像を使う場合は `.hero-deck`、`.hero-card`、`.image-source` を使って引用元リンクを画像付近に置く。
5. `.blog-nav`
   - ページ内ナビゲーションを置く。
   - 基本項目は `結論`、`コース`、`脚質`、`サポカ`、`因子`、`ローテ`、`情報源`。
6. 結論セクション
   - `.summary-grid`
   - `.summary-card` を3つ程度並べる。
   - 現在ページでは `最重要`、`おすすめ編成`、`因子方針` を掲載している。
   - 新規ページでも、読者が最初に判断したい「必須条件」「推奨編成・方針」「育成や因子の大枠」を短くまとめる。
7. コース条件セクション
   - `.two-column`
   - 表と `.callout` を組み合わせる。
   - 現在ページでは `レース条件`、`終盤開始`、`最終直線`、`上り坂`、それぞれの `攻略上の意味` を表で掲載している。
   - 新規ページでも、距離、バ場、向き、季節、レース場、コース形状、終盤開始位置、有効な緑スキル、有効加速に関わる地点を整理する。
   - 根拠リンクとして、コース解説や攻略記事への `.mini-source` を置く。
8. 脚質別攻略セクション
   - `.style-grid`
   - `.style-card` を使う。
   - 現在ページでは `逃げ`、`先行`、`差し`、`追込` の4カードを掲載している。
   - 各カードには、その脚質の評価ラベル、主な立ち回り、重要スキル、安定度や注意点を箇条書きで入れる。
   - LoHやチャンミなどイベント形式によって、安定重視か上振れ重視かを明記する。
9. サポートカード情報セクション
   - `.callout`
   - 画像を使う場合は `.card-gallery`、`.card-tile`、`.support-grid`、`.support-card` を使う。
   - 各画像に引用元リンクを置く。
   - 現在ページでは、最新サポカの扱い、本育成の土台、逃げ/先行の実用枠、ぱかライブ最新カード、因子周回で優先したいサポカを掲載している。
   - 新規ページでも、サポカを `本育成の軸`、`脚質別スキル枠`、`最新カード/新情報枠`、`因子周回用` に分ける。
   - 表では `枠`、`候補`、`目的`、`注意点` を基本列にする。
   - 因子周回サポカ表では `サポカ`、`主な狙い`、`向いている脚質`、`評価` を基本列にする。
10. 因子周回、ローテーション、チェックリストなどの攻略本文
    - 表、`.badge`、`.callout`、`.stat-grid`、`.skill-priority` を既存デザインに合わせて使う。
    - 因子周回セクションでは、脚質ごとの `親候補`、`狙いたい白因子`、`メモ` を掲載する。
    - ローテーションセクションでは、時期ごとの `出走候補` と `目的` を掲載する。
    - チェックリストでは、育成完了前に確認する `必須`、`高優先`、`仕上げ` の項目を並べる。
    - ステータス目安が必要な場合は `.stat-grid` で `スピード`、`スタミナ`、`パワー`、`根性`、`賢さ` を掲載する。
    - スキル優先度が必要な場合は `.skill-priority` で、ランク、対象脚質、効果、発動条件、採用理由を掲載する。
11. 情報源リンク
    - `<section class="section" id="sources">`
    - `.sources`
    - `.source-card`
    - 参照元と画像引用元を必ず含める。
    - 現在ページでは、神ゲー攻略、ウマ娘ラボ、Game8、GameTora、公式YouTubeを掲載している。
    - 新規ページでも、コース条件、因子、サポカ、スキル、公式発表、画像引用元を分けて掲載する。
    - 各 `.source-card` には、リンクだけでなく「何の確認に使ったか」を1文で書く。
12. コメント欄
    - `<section class="section" id="comments" aria-labelledby="comments-heading">`
    - `<h2 class="section-title" id="comments-heading">コメント</h2>`
    - giscusの `<script src="https://giscus.app/client.js">` を置く。
    - `data-mapping="pathname"` で記事URLごとにDiscussionを分ける。
    - `data-input-position="top"`、`data-theme="preferred_color_scheme"`、`data-lang="ja"` を使う。
13. フッター
    - トップへ戻るリンク、ページ上部へ戻るリンクを置く。
    - 最新情報は公式・ゲーム内告知・参照元も確認する旨を書く。
    - 非公式サイト、権利元と関係ないこと、AI利用、最終更新日を書く。

## CSSとデザイン

- トップページは `home.css`、ガイドページは `guide.css` に合わせる。
- 新規CSSを作る前に既存クラスを再利用する。
- フォーカス表示として `:focus-visible` を維持する。
- スキップリンクを消さない。
- モバイルでは1カラムに落ちる既存レスポンシブ設計を守る。
- 表はモバイルで `data-label` を使って読める形にする。
- `badge`、`callout`、`summary-card`、`style-card`、`support-card` の色分けは既存の意味に合わせる。
- テキストやリンクが画像上で読めない場合は、背景色や影を足して可読性を優先する。

## 更新時の確認

変更後は最低限以下を確認する。

- `git diff --check`
- `git status --short`
- `.codex-local/` がGit管理対象になっていないこと
- 追加・変更したHTMLに `canonical`、OG、favicon、description があること
- `target="_blank"` の外部リンクに `rel="noopener noreferrer"` があること
- 画像に `alt` と引用元リンクがあること
- `robots.txt` のSitemap URLと、`jekyll-sitemap` による自動生成対象を必要に応じて確認すること
- ブラウザまたはローカルHTTPサーバーで、トップ、追加ページ、404の表示を確認すること

## Jekyll Collection 運用

このサイトは GitHub Pages 標準の Jekyll でビルドする。設計の根拠は `docs/superpowers/specs/2026-04-29-jekyll-extensibility-design.md` を参照する。

### Collection 一覧

- `race`: LoH、チャンピオンズミーティング、対戦イベント向けのレース攻略。
- `training`: 育成シナリオ、育成方針、ステータス目安。
- `support`: サポートカード評価、本育成枠、因子周回枠。
- `factor`: 継承親、白因子、ローテーション、相性周回。
- `course`: レース場、距離、コース形状、有効加速。

### front matter スキーマ

攻略記事は公開URLと同じ `guides/<event>/<slug>/index.html` に置く。`_race/` などのcollectionだけに置く運用は、GitHub Pagesで記事が生成されず404になったため使わない。collectionは将来の一覧生成補助として残しているが、公開記事の実体は `guides/` 配下を正とする。

```yaml
---
layout: guide
css: guide
title: "2026年5月LoH短距離 京都芝1200m攻略"
description: "..."
date: 2026-04-29
modified: 2026-04-29
tags: [loh, short-distance, kyoto, turf, 2026-05]
event: loh
status: published
permalink: /guides/loh/2026-05-kyoto-1200/
hero_image:
  src: https://gametora.com/...
  credit_name: "GameTora Support Card DB"
  credit_url: https://gametora.com/umamusume/supports
sources:
  - key: gametora-supports
  - name: "神ゲー攻略"
    url: https://kamigame.jp/...
    note: "コース解説確認"
---
```

- `title`: 必須。`<title>`、OG、`h1` の基本値。
- `description`: 必須。meta description と OG に使う。
- `date`: 必須。公開日と並び替えに使う。
- `modified`: 任意。更新時に書き換える。
- `tags`: 推奨。タグ一覧とカード表示に使う。
- `event`: 任意。`loh`、`champion`、`team`、`daily`、`training` など。
- `status`: 任意。`draft` は一覧やトップから除外する。
- `layout`: ガイドページでは必須。必ず `guide`。
- `css`: ガイドページでは必須。必ず `guide`。
- `permalink`: 必須。公開URLと一致させる。
- `hero_image` / `hero_cards`: 任意。画像を使う場合は引用元を必ず入れる。
- `sources`: 推奨。情報源セクションを自動生成する。

### layout / include

- `_layouts/default.html`: 汎用ページ。404や単純な固定ページに使う。
- `_layouts/home.html`: トップページ用。
- `_layouts/guide.html`: 攻略記事用。ヒーロー、出典、giscus、フッターを自動挿入する。
- `_layouts/category-list.html`: `race/` などカテゴリトップ用。
- `_layouts/tag-index.html`: `/tags/` 用。
- `_includes/head.html`: meta、OG、canonical、favicon、CSS。
- `_includes/footer.html`: ガイド共通フッター。
- `_includes/giscus.html`: コメント欄。`data-mapping="pathname"` を維持する。
- `_includes/sources.html`: `page.sources` 駆動の情報源欄。
- `_includes/tags.html`: タグバッジ列。
- `_includes/card-summary.html`、`card-style.html`、`card-support.html`、`callout.html`、`badge.html`、`source-card.html`: 本文部品。

### 新規ページ作成手順

```powershell
New-Item -ItemType Directory -Force -Path guides/<event>/<slug>
Copy-Item templates/race-guide.html guides/<event>/<slug>/index.html
```

その後、front matter の `layout: guide`、`css: guide`、`permalink`、`title`、`description`、`date`、`modified`、`tags`、`sources` を書き換え、本文の標準セクションを埋める。作成後は `powershell -ExecutionPolicy Bypass -File scripts/validate_jekyll_structure.ps1` を通し、公開URLにアクセスしてCSS適用まで確認する。

### タグ運用

- タグ slug は英小文字、数字、ハイフンを基本にする。
- `_data/tags.yml` に `label` と必要なら `description` を追加する。
- 未登録タグは slug がそのまま表示される。
- 現在は `/tags/` 1ページ集約方式。100タグを超えたら個別タグページ方式を検討する。

### sources 運用

- 共通参照先は `_data/sources.yml` の `key` を優先する。
- 直接記述する場合は `name`、`url`、`note` を必須にする。
- 画像引用元は画像付近のリンクと `sources` の両方で辿れるようにする。

### 新カテゴリ追加チェックリスト

- `_config.yml` の `collections` と `defaults` に追加する。
- `<category>/index.html` を `layout: category-list` で作る。
- 必要なら `templates/<category>-guide.html` を作る。
- `AGENTS.md` のカテゴリ説明を更新する。

### ビルド前確認チェックリスト

- `git diff --check`
- `git status --short`
- `powershell -ExecutionPolicy Bypass -File scripts/validate_jekyll_structure.ps1`
- `.codex-local/` が Git 管理対象になっていないこと。
- 生成HTMLに canonical、OG、favicon、description があること。
- ガイドページの生成HTMLに `/assets/css/guide.css` が含まれること。
- ガイドページURLが404ではなく、YAML front matterが本文に表示されていないこと。
- 外部リンク `target="_blank"` に `rel="noopener noreferrer"` があること。
- 画像に `alt` と引用元リンクがあること。
