---
layout: post
author: bachadam
---

<script src="https://unpkg.com/unmute" data-add-button="true"></script>
<script src="https://unpkg.com/tone@13.8.25/build/Tone.js"></script>
<script src="{{ base.url | prepend: site.url }}/assets/js/20200405_orbitFlutterSynth.js"></script>

<style media="screen">

    body {
        padding: 0;
        margin: 0;
    }

    #unmute-button {
        background: rgba(147, 218, 223, .51);
        width: 40px;
        height: 40px;
        position: absolute;
        top: 25px;
        left: 25px;
    }

    #unmute-button.muted {
        background: rgba(247, 54, 11, 0.26);
    }

</style>


<div id="controls"></div>
<div id="reverb-controls"></div>
