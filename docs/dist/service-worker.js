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
    "revision": "24bd52633290a04d9dc246c0eb4ea99f"
  },
  {
    "url": "assets/css/1.styles.e3096a38.css",
    "revision": "af2fd06ca730b7d451838b7444dfe3aa"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/0.13c96849.js",
    "revision": "eb42784b385089fa73d670eb6c911669"
  },
  {
    "url": "assets/js/app.5166c210.js",
    "revision": "3ad6a17deaf6a3f422c9bc545fcc61aa"
  },
  {
    "url": "index.html",
    "revision": "361faf184b53e5277e028839a13b3bf0"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
