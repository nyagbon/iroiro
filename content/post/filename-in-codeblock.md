---
title: "Hugo のコードブロックにファイル名を表示"
date: 2021-08-14T13:12:03+09:00
slug: filename-in-codeblock
categories: [ Site ]
tags: [ Hugo ]
archives: [ 2021-08 ]
draft: true
---
Qiita のように、Hugo の記事内のコードブロックにファイル名を表示したいな、と思った。

ググったら、まさに同じことを考えているページがあった。シンプルな JavaScript + CSS で実現していようなので、試してみることにする。

- [HugoのコードブロックにQiitaのようなTitleをつける](https://aakira.app/blog/2018/12/code-block-title/)

あれ？ どうも、Chroma という

## Chroma

その前に [Hugo の本家サイトの Syntax Highlighting のページ](https://gohugo.io/content-management/syntax-highlighting/) を見ると、

> # Syntax Highlighting
> ### Hugo comes with really fast syntax highlighting from Chroma.
> Hugo uses [Chroma](https://github.com/alecthomas/chroma) as its code highlighter; it is built in Go and is really, really fast - and for the most important parts compatible with Pygments we used before.
>
> ...(snip)...
>
> ## Generate Syntax Highlighter CSS
> If you run with `pygmentsUseClasses=true` in your site config, you need a style sheet.
>
> You can generate one with Hugo:
> ```
> hugo gen chromastyles --style=monokai > syntax.css
> ```

とか書いてある。要は

- Hugo は Chroma を使ってコードに色付けする。Go 言語で書かれていて超速い。以前 Hugo が使っていた Pygments と重要な部分で互換性がある

とのこと。

今迄この [iroirolab.com](https://iroirolab.com) では、`pygmentsUseClasses=true` なんて指定せずともコードブロックが Syntax Highlighting されていた。デフォルトだと Chroma 以外の方法で色付けをするということなんだろうか？ Hugo のコードを調べれば分かるだろうけど面倒なのスキップ。

## Chroma とは？

おそらくコレ？ [Chroma - GitHub](https://github.com/alecthomas/chroma)


- chromastyle

というのを使っているっぽい。

で、Hugo 本家サイトをあたると、たしかに



ので、

```go {name=hugo.go}
abcde
hoge := 1
```

JavaScript

```javascript {name=code-title.js}
(function () {
    var list = document.body.getElementsByClassName("highlight");
    for(i=0; i <= list.length-1; i++){
        var code = list[i];
        var name = code.getAttribute("name");
        if (name) {
            var div = document.createElement('div');
            div.textContent = name;
            div.classList.add('code-name');
            code.classList.add('with-code-name');
            code.parentNode.insertBefore(div, code);
        }
    }
})()
```

```css {name=code-title.js}
.with-code-name pre.chroma {
  margin-top: -29px;
  padding-top: 40px;
  padding-bottom: 12px;
}

.code-name {
  display: inline-block;
  position: relative;
  padding: 4px 8px;
  margin-left: 1px;
  background-color: #b0a8c0;
  color: #204A40;
  font-size: 13px;
  font-weight: 400;
}
```
