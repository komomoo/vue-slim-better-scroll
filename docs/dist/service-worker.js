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
    "revision": "c0cef1f1f29e3093a840c2c64e33e42a"
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
    "url": "assets/js/0.4ea3b883.js",
    "revision": "6c29ff2b40e1cc057b18afc43a3248cf"
  },
  {
    "url": "assets/js/app.3bb1b288.js",
    "revision": "544a764a4584c7e54fe4c3d36c2547cf"
  },
  {
    "url": "index.html",
    "revision": "fffb34257c3e251d0f7a672831edd5d1"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
