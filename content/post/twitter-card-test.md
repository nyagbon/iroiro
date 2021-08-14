---
title: "Twitter Card のテスト"
date: 2021-08-13T21:12:00+09:00
slug: twitter-card-test
categories: [ Site ]
tags: [ Hugo, Twitter ]
archives: [ 2021-08 ]
thumbnail: "img/bluebird_baka.png"
#draft: true
---
Hugo の Twitter Card の情報を自分で作るようにしてみたのでテスト。

```go-html-template {name=my_twitter_card.html}
<meta name="twitter:card" content="{{ .Site.Params.my_twitter_card_type }}" />
<meta name="twitter:site" content="@{{ .Site.Params.widgets.social.twitter }}" />
<meta name="twitter:creator" content="@{{ .Site.Params.widgets.social.twitter }}" />
<meta property="og:url" content="{{ .Permalink }}" />
<meta property="og:title" content="{{ .Title }}" />
<meta property="og:description" content="{{ .Summary }}" />
<meta property="og:image" content="{{ .Site.BaseURL }}{{ if (isset .Params "thumbnail") }}{{ .Params.Thumbnail }}{{ else }}{{ index .Site.Params.Images 0 }}{{ end }}" />
```

```toml {name=config.toml}
[Params]
  twitter_cards = false # デフォルトの Twitter Card の定義を disable
  my_twitter_cards = true # オレオレのを enable
  my_twitter_card_type = "summary"
```

```go-html-template {name=baseof.html,hl_lines=["5-9"]}
...
{{- if .Site.Params.twitter_cards }}
	{{ template "_internal/twitter_cards.html" . }}
{{- end }}
<!-- ↓ここから追加 -->
{{- if .Site.Params.my_twitter_cards }}
	{{ template "_default/my_twitter_cards.html" . }}
{{- end }}
<!-- ↑ここまで追加 -->
...
```

## Twitter Card とは？

Twitter でつぶやくときに URL を貼り付けると、

{{< tweet 1426123054363549698 >}}

こんな感じにその URL の画像と文書がボボーンと表示されるじゃないスか。それっスよ。

Hugo のデフォルトだと画像が常に「サイトの画像（ここだと赤い猫）」になってしまうので、せっかく各記事に [いらすとや](https://www.irasutoya.com/) さんのほんわかした画像を選んで貼り付けてるのに、それが反映されない…

**んだよ！ (#ﾟДﾟ)ｺﾞﾙｧ!!**

ってことで。ちょっとお試しでーす。

## ちゃんと本家ドキュメント読めと

**(・ω<) てへぺろ**

いい加減な情報と勘でやっちゃダメね！

- [Cards - Getting Started Guide - Twitter Developer Platform](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started)
- [Card validator - Twitter Developer](https://cards-dev.twitter.com/validator)

ええと、"Getting Started Guide" によると…

- `twitter:card` - 「カードタイプ」:`summary`, `summary_large_image`, `app`, `player` のどれか
- `twtter:site` - カードの footer に使われる「@username」を指定 (なくても良い)
- `twtter:creator` - コンテンツの作者・著者の「@username」を指定 (なくても良い)

で、Card vaildator で Twitter Card が正しく設定されているか確認できる。

とりあえずここまででやってみる。

## でーきーたー

やったぜ！ 良い子のみんなもちゃんとドキュメントを読もうな！ v(・ω<)-☆ ｷｭﾋﾟｰﾝ

こんな感じー。

{{< twitter 1426168763318030338 >}}

良いね、コレで行きましょう！
