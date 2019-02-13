/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "2f8a5abb252f243ce5d09451e7bb2a1e"
  },
  {
    "url": "assets/css/1.styles.cbe77d76.css",
    "revision": "af2fd06ca730b7d451838b7444dfe3aa"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/0.b52efd74.js",
    "revision": "041e277d82193151722ef7fcbd2cd72c"
  },
  {
    "url": "assets/js/app.3e9115c0.js",
    "revision": "d4cd7f49a99765d923167f263d456d32"
  },
  {
    "url": "index.html",
    "revision": "c68f0f2b230834e19493eeddb24f27d3"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
