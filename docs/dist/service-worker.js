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
    "revision": "d81256346bb0e14ac0f6ce16e270375e"
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
    "url": "assets/js/0.7c7da7d7.js",
    "revision": "afaa99593b35d1102c42fa74d5db2943"
  },
  {
    "url": "assets/js/app.f003b2b7.js",
    "revision": "5105fce8e64b69277733f0a5161e92d1"
  },
  {
    "url": "index.html",
    "revision": "680738409eade1935e63c706bce08e1e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
