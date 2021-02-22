---
layout: post
author: bachadam
---
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🧚‍♀️</title>
  <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet">

  <link src="{{ base.url | prepend: site.url }}/assets/css/abvStyle.css">
  <script src="../../p5.js"></script>
  <!-- <script src="../../addons/p5.sound.min.js"></script> -->
</head>

<body>
    <div id="wrap">
    <div id="title">
        <h1 id="titleText-0"> ABV ASSIST </h1>
        <div id="title-stack1">
            <h1 id="titleText-1"> ABV ASSIST </h1>
        </div>
        <div id="title-stack1">
            <h1 id="titleText-2"> ABV ASSIST </h1>
        </div>
        <!-- <h1 id="title-text1"> ABV ASSIST </h1>
        <h1 id="title-text2"> ABV ASSIST </h1> -->
        <marquee>Now you don't have to remember the Maths! </marquee>
    </div>

    <div id="all-inputs">
        <div id="current">
            <p>Current ABV</p>
            <input type="text" id="currAbvInput" size="10" oninput="currAbvInputEvent(this.value)">
        </div>
        <div id="target">
            <p>Target ABV</p>
            <input type="text" id="targetAbvInput" size="10" oninput="targetAbvInputEvent(this.value)">
        </div>
        <div id="volume">
            <p>Transfered Volume</p>
            <input type="text" id="transferVolInput" size="10" oninput="transferVolInputEvent(this.value)">
        </div>
        <div id="dilution">
        </div>
        <div id="results">
        </div>
        <div id="ekos">
        </div>
    </div>
</div>
</body>
<script src="{{ base.url | prepend: site.url }}/assets/js/20210222_abvAssist.js"></script>
