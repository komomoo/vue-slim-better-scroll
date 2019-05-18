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
    "revision": "1ed6dc0726fd3d2039fdcfd4ad998597"
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
    "url": "assets/js/0.df19ffd8.js",
    "revision": "44194fd75db7f3406460b2a8b40e21bf"
  },
  {
    "url": "assets/js/app.c3b317d3.js",
    "revision": "3146d4a5473f81c5af1f0d1252e4b7d0"
  },
  {
    "url": "index.html",
    "revision": "22383d8ae119bd1c1f4c4c541956e5c4"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
