---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
slug: {{ .Name }}
categories: []
tags: []
archives: [ {{ dateFormat "2006-01" .Date }} ]
#draft: true
---
