---
title: "Twitter Card のテスト"
date: 2021-08-13T21:12:00+09:00
slug: twitter-card-test
categories: [ Site ]
tags: [ Hugo ]
archives: [ 2021-08 ]
thumbnail: "img/bluebird_baka.png"
#draft: true
---
Hugo の Twitter Card の情報を自分で作るようにしてみたのでテスト。

```html
my_twitter_card.html:

<meta name="twitter:card" content="{{ .Summary }}" />
<meta name="twitter:site" content="@{{ .Site.Params.widgets.social.twitter }}" />
<meta name="twitter:creator" content="@{{ .Site.Params.widgets.social.twitter }}" />
<meta property="og:url" content="{{ .Permalink }}" />
<meta property="og:title" content="{{ .Title }}" />
<meta property="og:description" content="{{ .Summary }}" />
<meta property="og:image" content="{{ if (isset .Params "thumbnail") }}{{ .Params.Thumbnail }}{{ else }}{{ index .Site.Params.Images 0 }}{{ end }}" />
```

## Twitter Card とは？

Twitter でつぶやくときに URL を貼り付けると、

{{< tweet 1426123054363549698 >}}

こんな感じにその URL の画像と文書がボボーンと表示されるじゃないスか。それっスよ。

Hugo のデフォルトだと、この画像が常に「サイトの画像（ここだと赤い猫）」になってしまうので、せっかく書く記事に [いらすとや](https://www.irasutoya.com/) さんのほんわかした画像を貼り付けてるのに、それが反映されない…

**んだよ！ (#ﾟДﾟ)ｺﾞﾙｧ!!**

ってことで。ちょっとお試しでーす。
