---
title:     "Quickly get a logger with IntelliJ live templates"
author:    Matteo Giordano
authorURL: http://twitter.com/malteo
---

IntelliJ IDEA is every Java developer's favourite IDE here at Cloudesire, and amongst its powerful features there are [Live templates](https://www.jetbrains.com/help/idea/creating-and-editing-live-templates.html). Let me show you how they work with a simple example.

Getting a [SLF4J](https://www.slf4j.org/) instance for the current class is a matter of typing

```java
private static final Logger
```

waiting for the import popup to appear, looking for `org.slf4j.Logger` and selecting it, continue typing

```java
private static final Logger log = LoggerFactory
```

... another import...

```java
private static final Logger log = LoggerFactory.getLogger(
```

wait, where am I? Oh, `MyObject`, sure

```java
private static final Logger log = LoggerFactory.getLogger( MyObject.class );
```

done!

I find it a bit slow, don't you? Let's speed it up:

- Open IDEA settings with `Ctrl+Alt+S` and browse to `Editor -> Live Templates`
- Add a new **Template Group** with `Alt+Ins`, choose a nice name
- Add a **Live Template** in your newly created group
- Write `log` in *Abbreviation*
- Paste in *Template text*

      private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger( $CLASS$.class );

- Open **Edit variables** and write in the field *Expression* at the `CLASS` row

      className()

  and press OK

- Set the applicable context by clicking on `Java` in the **No applicable contexts yet. Define** popup

Exit the settings by pressing OK.

Now you can get a logger for a class just by writing `log` and pressing `Tab`! Just 3 keystrokes, isn't it better?

<!--truncate-->