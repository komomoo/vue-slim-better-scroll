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
    "revision": "81b8965882ab5679f2815ff964592a44"
  },
  {
    "url": "assets/css/1.styles.8b1259b1.css",
    "revision": "00e50c824143587381b49aaba9dadc80"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/0.ef69fbeb.js",
    "revision": "b1ecf83fdba1a4feac78f708efd3c6b9"
  },
  {
    "url": "assets/js/app.2ecf2d24.js",
    "revision": "caa4ab049c93d6e1cdac016fdde0ca5e"
  },
  {
    "url": "index.html",
    "revision": "c3c316bb4c7302f1234e0c698842eed7"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
