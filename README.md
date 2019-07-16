# slider3k5
Simple JS slider that is fed by a JSON file.

**Info:**

One page can have unlimited sliders working as long as every slider has a different container.
Check slides.json file for the slide structure.
When offline the URL scheme of slidesFile must be http/https otherwise the CORS request is blocked by browser.

**Usage:**

```javascript
createSlider("slider-container-id", {
    slidesFile: "./slides.json", // must be specified
    hasArrows: true, //default true;
    hasDots: true, //default true;
    autoplayMode: false, //default falseg
    autoplaySpeed: 1000, //default 3000
    autoplayDirection: 'rtl', //default ltr
    animationStyle: 1 //default 0, max 5
});
```

**TODO:**

* Responsivness accross all browsers and devices.
* Touch/Drag feature.
* ~~Load content on slide via json data.~~ 