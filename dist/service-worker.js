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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "f1ad5abea866bf82116c76d7d9fa2a09"
  },
  {
    "url": "assets/css/0.styles.d4bd75a4.css",
    "revision": "dea830bd8e77359f98d48ca021ddce34"
  },
  {
    "url": "assets/img/checkboxes.png",
    "revision": "b14988f2a024ce899695686c695194de"
  },
  {
    "url": "assets/img/condition-block-groups-1.png",
    "revision": "b18b7adf10275c6c6e2aaa96d54aceef"
  },
  {
    "url": "assets/img/condition-block-groups-2.png",
    "revision": "e884fe0703fc8b3a7ef6e2672144ae5c"
  },
  {
    "url": "assets/img/custom-sender-config.png",
    "revision": "9005dd05a1b6ce7d9361da9245f8b914"
  },
  {
    "url": "assets/img/email-campaign-composer.png",
    "revision": "14bbc650cab7dd96dd7ab52f1104af15"
  },
  {
    "url": "assets/img/form-group-mapper.png",
    "revision": "d1d926c795a7d804d203f25ff6307383"
  },
  {
    "url": "assets/img/form-many-drop-down-mapper.png",
    "revision": "ec3be0ff3498fd0eadf3a7c368406488"
  },
  {
    "url": "assets/img/grouped-select.png",
    "revision": "e06db52562c7b43ee7e41bef2df5226c"
  },
  {
    "url": "assets/img/html-editor.png",
    "revision": "7ee25a845d3e49610375e84d737d4e8d"
  },
  {
    "url": "assets/img/icon.svg",
    "revision": "cf1a5e0bed276d9f3ec0bc4ed8542902"
  },
  {
    "url": "assets/img/input-value-pair-properties.png",
    "revision": "aee09d6452a7d78f99fd65ea2693f44e"
  },
  {
    "url": "assets/img/logo.svg",
    "revision": "af678bf5aa60cee111b8e291f2e58584"
  },
  {
    "url": "assets/img/modules/custom_profile_section.jpg",
    "revision": "5fc9c867e5ce130fa629a1013160f8d6"
  },
  {
    "url": "assets/img/multi-text-options.png",
    "revision": "9c1b84ece04abe7277cd48769e83f210"
  },
  {
    "url": "assets/img/number-input.png",
    "revision": "84911515fda46861d055d5414604b43e"
  },
  {
    "url": "assets/img/option-selectors.png",
    "revision": "2a4cc554f6133c8540b01355bfd62c71"
  },
  {
    "url": "assets/img/radio-buttons.png",
    "revision": "2f8b1c3c08001870e2348ed6318c0082"
  },
  {
    "url": "assets/img/radio.png",
    "revision": "7adf880ee105e0961c0fd570ab39d85b"
  },
  {
    "url": "assets/img/reload-field-selection.png",
    "revision": "5a1ead9c9330dfc43dc3f37685d66aad"
  },
  {
    "url": "assets/img/rest-selector.png",
    "revision": "52af9bb5edcd3165b7f20a79bd6f26e8"
  },
  {
    "url": "assets/img/schema-design.png",
    "revision": "7ca76bb6e6cda33001a5b8225655ef3f"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/single-or-multi-select.png",
    "revision": "aa27c414f5009806b6f96b7e570e1bd4"
  },
  {
    "url": "assets/img/text-input-popper.png",
    "revision": "5bb0148aa8295551519afe776d6a4ac1"
  },
  {
    "url": "assets/img/text-input.png",
    "revision": "aaedd6b8122500a5c9e749f170e0224e"
  },
  {
    "url": "assets/img/text-value-multi-properties.png",
    "revision": "643464fc50a1954de4bd28fde02b6cd5"
  },
  {
    "url": "assets/img/time-selector.png",
    "revision": "0b8ee3986acd05446239cc81f06ff61b"
  },
  {
    "url": "assets/img/url-selector.png",
    "revision": "2a43f9ccf424c68ec91814e8fcde4b8d"
  },
  {
    "url": "assets/img/yes-no-check.png",
    "revision": "3d1c8090d707c208206578a8b57497d6"
  },
  {
    "url": "assets/js/1.aeb898bf.js",
    "revision": "104b306586a9a1a023c288d27cb454db"
  },
  {
    "url": "assets/js/10.8412f2bb.js",
    "revision": "7612074aedec90b2e5751bbea4fb4428"
  },
  {
    "url": "assets/js/11.fd5d82bc.js",
    "revision": "e8d9c5da979d0e3749556fae4fceaa65"
  },
  {
    "url": "assets/js/12.0b218a79.js",
    "revision": "9894ddf2a24c5c1afda925263a575631"
  },
  {
    "url": "assets/js/13.01a9800c.js",
    "revision": "f9656ce52baa44389dc0e0bfe88e2a83"
  },
  {
    "url": "assets/js/14.a960b78f.js",
    "revision": "26983793b1d43a54f4d0a0c99234c26a"
  },
  {
    "url": "assets/js/15.493ed14f.js",
    "revision": "cfcf4f66182c7902f2e9de15864bb73a"
  },
  {
    "url": "assets/js/16.3e6b8a77.js",
    "revision": "b3cc956f76bc6960c7ce0eb3ba828fce"
  },
  {
    "url": "assets/js/17.84ae10a9.js",
    "revision": "8019c722e8f1acb67b0375e1d805dc05"
  },
  {
    "url": "assets/js/18.ec01cdab.js",
    "revision": "0222bc1e620e47d1fe843e704274a548"
  },
  {
    "url": "assets/js/19.0b7df0b6.js",
    "revision": "913bf77788db6b71e01077cc4dcfcc8c"
  },
  {
    "url": "assets/js/20.8e2e9dc5.js",
    "revision": "5a9bd5f9c0fc7146205313754ef3dc62"
  },
  {
    "url": "assets/js/21.b1e3a006.js",
    "revision": "d81a6c9f8d90dacb223595f55a7985ed"
  },
  {
    "url": "assets/js/22.9ab488af.js",
    "revision": "cdd6734810792634335dba2765f198c2"
  },
  {
    "url": "assets/js/23.e893d23a.js",
    "revision": "65fbc367dd5cf7d233705351928c0da9"
  },
  {
    "url": "assets/js/24.b38b211e.js",
    "revision": "f1adb90b8b23e5131ecbe8a713943da9"
  },
  {
    "url": "assets/js/25.78847c63.js",
    "revision": "915ac648b4c71f69c41a1faecb9a6d74"
  },
  {
    "url": "assets/js/26.c56c7b7a.js",
    "revision": "f42482e730aa4583953a5f6cf31977a2"
  },
  {
    "url": "assets/js/27.9de6b1eb.js",
    "revision": "2bc648fe80d556b203e350206e76b4a3"
  },
  {
    "url": "assets/js/28.bdf61b79.js",
    "revision": "80930f8b4bdedad5f93f237ce9cd4dc1"
  },
  {
    "url": "assets/js/29.28d46ce0.js",
    "revision": "db82fbff15772d74e5cebf6b3ec3f324"
  },
  {
    "url": "assets/js/3.f7e18642.js",
    "revision": "04a8d75d201faa0d925fcdd39f39b7e8"
  },
  {
    "url": "assets/js/30.d799f70c.js",
    "revision": "9a27dbf7a3f73802c54dc0e37e552c64"
  },
  {
    "url": "assets/js/31.dae5909d.js",
    "revision": "48dc1e3f8612a3685412fa73611e9592"
  },
  {
    "url": "assets/js/32.0bcd6dc5.js",
    "revision": "35817eefb7a92d614cf2e308dac40183"
  },
  {
    "url": "assets/js/33.24d3d269.js",
    "revision": "33a0c758902de1cee899069acfe5a05d"
  },
  {
    "url": "assets/js/34.fba9827c.js",
    "revision": "29237d3808fc3d24f79d7daac344b7db"
  },
  {
    "url": "assets/js/35.e0d02d40.js",
    "revision": "e40dd87853ba893ee4832104c3d421cb"
  },
  {
    "url": "assets/js/36.1cc53744.js",
    "revision": "42f9c68278389c32f0d1ccd6c8c9b06e"
  },
  {
    "url": "assets/js/37.74dad1cc.js",
    "revision": "22be90f06412c0f76e69ccd8dc0b05ff"
  },
  {
    "url": "assets/js/38.d354b356.js",
    "revision": "b5b12c04a4fdf5c613a927482f32fd7d"
  },
  {
    "url": "assets/js/39.b8b450a1.js",
    "revision": "249d17b90bd5bd008e7dd249d7417dac"
  },
  {
    "url": "assets/js/4.cc85449c.js",
    "revision": "2c84b60242ba0140ec43232391167833"
  },
  {
    "url": "assets/js/40.b9f16147.js",
    "revision": "38317554c48c8ba201b4f17ad909b0f1"
  },
  {
    "url": "assets/js/41.0057869e.js",
    "revision": "046727c4534ce4d0f2c65534b3a967f7"
  },
  {
    "url": "assets/js/42.2fe70bcc.js",
    "revision": "54521cd6f0b6620bd7db4e9a62a22ca6"
  },
  {
    "url": "assets/js/43.e78961a0.js",
    "revision": "63283cdedab40e01fa171c14be309ab6"
  },
  {
    "url": "assets/js/44.4148e9a8.js",
    "revision": "51f9d11ca3f1fe277dbc051bb427693d"
  },
  {
    "url": "assets/js/45.ff7d6abb.js",
    "revision": "5c53786e6720e5828a9488abd33c5c2c"
  },
  {
    "url": "assets/js/46.5669b338.js",
    "revision": "c26edf14fceba732705e9349baa419d8"
  },
  {
    "url": "assets/js/47.9056062b.js",
    "revision": "8b59324089851f64b416fe8294dcba06"
  },
  {
    "url": "assets/js/48.a13535e2.js",
    "revision": "135df15c7bc6d138e15296ff44e6d009"
  },
  {
    "url": "assets/js/49.b05bead4.js",
    "revision": "6aecd72acbd78051f57a72082036d796"
  },
  {
    "url": "assets/js/5.0d7168b5.js",
    "revision": "8ccd2e29fd56b6b9d8713036fe632018"
  },
  {
    "url": "assets/js/50.359ee858.js",
    "revision": "733cf98684ee005b8c72d51c63a0c34d"
  },
  {
    "url": "assets/js/51.de1b6157.js",
    "revision": "c8e25e022fc7ad39e154ed3d5380894b"
  },
  {
    "url": "assets/js/52.1dc5b718.js",
    "revision": "65df625c13f0c87b47921b40aa1fdf1a"
  },
  {
    "url": "assets/js/53.5fb4c13e.js",
    "revision": "49a6ab1dd80c15911f629f45544d586a"
  },
  {
    "url": "assets/js/54.6fad582b.js",
    "revision": "7d45133709af1202ba6d892643fb3c54"
  },
  {
    "url": "assets/js/55.393b2c91.js",
    "revision": "1c66e3af9eafac0fce4c1994207e3252"
  },
  {
    "url": "assets/js/56.e2ce3021.js",
    "revision": "d996f89069f8f2a60f86a027e3ca2ef5"
  },
  {
    "url": "assets/js/57.5c7a83c6.js",
    "revision": "bd925035033c1b7f27590d8f35815af0"
  },
  {
    "url": "assets/js/58.f331705e.js",
    "revision": "0d24afbaf640600286e569d06458d167"
  },
  {
    "url": "assets/js/59.1468d5f7.js",
    "revision": "4dfcaf21c455539d80fee123cccd250a"
  },
  {
    "url": "assets/js/6.0d8b3ef2.js",
    "revision": "502e3d09e93542e04bed3aa4197f2c16"
  },
  {
    "url": "assets/js/60.ac50c7e9.js",
    "revision": "8903fb394945c3232e271103fe1a7a6d"
  },
  {
    "url": "assets/js/61.bf71fc77.js",
    "revision": "24e735196553976d7d7e61ef9d589b88"
  },
  {
    "url": "assets/js/62.eac2b227.js",
    "revision": "e8dbb4e1cf13fd3bc10a0e8830da9878"
  },
  {
    "url": "assets/js/63.4f22b5c1.js",
    "revision": "6919e0366ca9a66cf303dd9641ca1ea3"
  },
  {
    "url": "assets/js/64.d8b15967.js",
    "revision": "a57fe523d9375d59461e785edd42ff60"
  },
  {
    "url": "assets/js/65.15ce8116.js",
    "revision": "26809ce56f6c4d7959062fc0ba4a334d"
  },
  {
    "url": "assets/js/66.6a3ff50a.js",
    "revision": "5f267cb5262a6199065eff9f9c561f91"
  },
  {
    "url": "assets/js/67.50f2d91a.js",
    "revision": "a7865e4d2505a69d243177d742cc88da"
  },
  {
    "url": "assets/js/68.194839c6.js",
    "revision": "7db37de6f320525a51efa69ea5c3e341"
  },
  {
    "url": "assets/js/69.8d96b3b5.js",
    "revision": "b66a2a67b2c0fc36a0ae540dcc77ea4b"
  },
  {
    "url": "assets/js/7.697ef439.js",
    "revision": "e5a2865ce6719d7b138070e59907e0f9"
  },
  {
    "url": "assets/js/70.2649ec65.js",
    "revision": "f348ed7abbfe39d6ef62e60f3d57c10a"
  },
  {
    "url": "assets/js/71.f1f8dbb1.js",
    "revision": "9d7e3fd8860dab8bb31776cf3ff6e1c2"
  },
  {
    "url": "assets/js/72.ea13d360.js",
    "revision": "58367c73d99524f7c86f0a6c36974a10"
  },
  {
    "url": "assets/js/73.6620e514.js",
    "revision": "888b387d18bef80db3c86377a016818e"
  },
  {
    "url": "assets/js/74.55657819.js",
    "revision": "a0f11bbe507e9a38677cbac8262d6229"
  },
  {
    "url": "assets/js/75.1095367c.js",
    "revision": "194f809bae15d52d5a95caff5eb09f55"
  },
  {
    "url": "assets/js/76.5f5175aa.js",
    "revision": "a6c71b1a0537b680317a5db5de8620ba"
  },
  {
    "url": "assets/js/77.347ea1af.js",
    "revision": "3f1ea0700bc72c3e502fa72a586d4857"
  },
  {
    "url": "assets/js/78.72c77583.js",
    "revision": "a474e41a746e7c4d332ad41e68052451"
  },
  {
    "url": "assets/js/8.ae8117b8.js",
    "revision": "1f914dd0781fb49fb6f6bd28a9a3a0de"
  },
  {
    "url": "assets/js/9.bb6eed18.js",
    "revision": "6e11946a94279ebd4c6d9854180db3d2"
  },
  {
    "url": "assets/js/app.dec66d53.js",
    "revision": "4a90f789bf7f82842fdd1240af1396f9"
  },
  {
    "url": "cli/index.html",
    "revision": "a8818d52a641590f34287b38b63f178f"
  },
  {
    "url": "database/_parts/_funnel_schema/index.html",
    "revision": "bb36def95d1c6a909d669c4377ea71a2"
  },
  {
    "url": "database/_parts/_subscriber_schema/index.html",
    "revision": "00caefead30f11869501bef38635142f"
  },
  {
    "url": "database/index.html",
    "revision": "5b3fc45395fa19bcf6339c8406d0d740"
  },
  {
    "url": "database/models/campaign-email/index.html",
    "revision": "4ed7964530ffdd582c2656fe9aeaddd6"
  },
  {
    "url": "database/models/campaign-url-matrix/index.html",
    "revision": "8479d5f8ad0adb4232c88e91426e9a81"
  },
  {
    "url": "database/models/campaign/index.html",
    "revision": "8e707a66d54bf9e7c6d5e817d3e717e2"
  },
  {
    "url": "database/models/custom-contact-field/index.html",
    "revision": "99ee8b474d47240e3f5845e144bf4149"
  },
  {
    "url": "database/models/funnel/index.html",
    "revision": "2cc9914ab7127904d883d9e37b86ae82"
  },
  {
    "url": "database/models/funnelMetric/index.html",
    "revision": "351064f399b00f7bbd40c7ace1ceb77b"
  },
  {
    "url": "database/models/funnelSequence/index.html",
    "revision": "1a4c04afc71286e8d6e7fd39a51cc2a9"
  },
  {
    "url": "database/models/funnelSubscriber/index.html",
    "revision": "4e0091fd4b491a359bca61ec899830ce"
  },
  {
    "url": "database/models/index.html",
    "revision": "3e938174c791a2f420f3e2547589ddd8"
  },
  {
    "url": "database/models/lists/index.html",
    "revision": "17e2d6ce593fba641aa853ea23f2ceac"
  },
  {
    "url": "database/models/meta/index.html",
    "revision": "e64428c69d61d45ebdc13bc77ca78719"
  },
  {
    "url": "database/models/subject/index.html",
    "revision": "b7890e7bf1b9781b183fc5a8d332d46d"
  },
  {
    "url": "database/models/subscriber-meta/index.html",
    "revision": "734e6b1e35fcdcd9135bef0e7b751eae"
  },
  {
    "url": "database/models/subscriber-note/index.html",
    "revision": "825f9c0f903f0323a0bd2184ab4a01f7"
  },
  {
    "url": "database/models/subscriber-pivot/index.html",
    "revision": "153eacf1d1e6524c7b26d36efac6d101"
  },
  {
    "url": "database/models/subscriber/index.html",
    "revision": "fb8a4ed0db3cb3884421907630b2664a"
  },
  {
    "url": "database/models/tag/index.html",
    "revision": "26ba0755f007af237c3893211541daec"
  },
  {
    "url": "database/models/template/index.html",
    "revision": "1db64b47fe7e0af447c8f846264ec701"
  },
  {
    "url": "database/models/url-store/index.html",
    "revision": "20516ae12957cfb4dfca02afd662d9e9"
  },
  {
    "url": "database/models/user/index.html",
    "revision": "fe2f8864800e061d5dd3c9e2a67fc967"
  },
  {
    "url": "database/models/webhook/index.html",
    "revision": "610e293ebf94931097a31425a1909c45"
  },
  {
    "url": "database/orm/collections/index.html",
    "revision": "46ba0ab745213e2698ba60f24d1bd49b"
  },
  {
    "url": "database/orm/index.html",
    "revision": "8b4dc11e6f259f58d8b0a4e82a4d44e7"
  },
  {
    "url": "database/orm/mutators/index.html",
    "revision": "26dbce7cce0b4029c9d120e416fba6c6"
  },
  {
    "url": "database/orm/relationship/index.html",
    "revision": "b11a45e26578bfb1b41cf1c506ad29ab"
  },
  {
    "url": "database/orm/serialization/index.html",
    "revision": "8a4167a1d0cd14de02d118c0927c13f6"
  },
  {
    "url": "database/query-builder/index.html",
    "revision": "00f375e02cf2fdebe624b68e88d55147"
  },
  {
    "url": "extending-rest-api/index.html",
    "revision": "e0a4c8c8528ef7bdaf7c6d8d9ef1bb5e"
  },
  {
    "url": "favicon.png",
    "revision": "f1bdbf22fd49e4ac2daaef742e86d488"
  },
  {
    "url": "getting-started/index.html",
    "revision": "871972848e8db140503c05c53c30d6c3"
  },
  {
    "url": "global-functions/contact-api-function/index.html",
    "revision": "37cb9842e6104d07107a8a608c3d0e45"
  },
  {
    "url": "global-functions/index.html",
    "revision": "bcf9d63450fd698ab732855b40fef84b"
  },
  {
    "url": "global-functions/list-api-function/index.html",
    "revision": "590b43af67717bf1518b693b4cb2a4e6"
  },
  {
    "url": "global-functions/tag-api-function/index.html",
    "revision": "b6b0fd1e0f52bd810a25007911414496"
  },
  {
    "url": "helpers/arr/index.html",
    "revision": "82d2fea4a58f3cb5867b366d2bc8e30f"
  },
  {
    "url": "helpers/index.html",
    "revision": "67559810471d8c10d158cbdd810a3c99"
  },
  {
    "url": "helpers/service_helper/index.html",
    "revision": "65b4d40e8a52fc8892a9e5c9f06b926c"
  },
  {
    "url": "helpers/str/index.html",
    "revision": "74e699139d40994914b6b99cc347927a"
  },
  {
    "url": "hook_changes/index.html",
    "revision": "ecddfad9d4be349dc7f35db96f78d1b7"
  },
  {
    "url": "hooks/actions/_campaign_hooks/index.html",
    "revision": "95d2bdd60ac72643644ab0ff19876411"
  },
  {
    "url": "hooks/actions/_contact_activity_hooks/index.html",
    "revision": "1721d55d25b7ea3fbcd65f48faeae9db"
  },
  {
    "url": "hooks/actions/_contact_hooks/index.html",
    "revision": "3022462a7d2870d2ae964c4f9be58d1a"
  },
  {
    "url": "hooks/actions/_double_optin_page/index.html",
    "revision": "b1c5abab9306badd7e078b0c52b37a79"
  },
  {
    "url": "hooks/actions/_list_hooks/index.html",
    "revision": "2b62d04f0fe36d0adb0dc58c2d30a52d"
  },
  {
    "url": "hooks/actions/_manage_subscription_page/index.html",
    "revision": "a95ffbe6167d83cb6b054b68ba639ac0"
  },
  {
    "url": "hooks/actions/_tag_hooks/index.html",
    "revision": "fa06e73fdc673d06a76ef3ce74617bb2"
  },
  {
    "url": "hooks/actions/_template_hooks/index.html",
    "revision": "3e80980b3708024b03444e2036ea3b10"
  },
  {
    "url": "hooks/actions/_unsubscribe_page_actions/index.html",
    "revision": "810d396add60d3afd65a618a1b858fc6"
  },
  {
    "url": "hooks/actions/_view_on_browser_page_actions/index.html",
    "revision": "0afb738603e99839af8819654ee779f1"
  },
  {
    "url": "hooks/actions/index.html",
    "revision": "3b24093cbe5bddd8699399d5a91b3612"
  },
  {
    "url": "hooks/filters/_dashboard_filters/index.html",
    "revision": "5f389a2891940abc987de2ed2919a19f"
  },
  {
    "url": "hooks/filters/_frontend_filters/index.html",
    "revision": "1defa89d4fe62be88eb36ce1b34444d1"
  },
  {
    "url": "hooks/filters/_general_filters/index.html",
    "revision": "9a5a5247c40a831090b3a056b0108534"
  },
  {
    "url": "hooks/filters/_other_filters/index.html",
    "revision": "89d05f5880b8810feced76cd9ffd257d"
  },
  {
    "url": "hooks/filters/_webhook_filters/index.html",
    "revision": "4767c92aabe5eed16d5377f6de9d6528"
  },
  {
    "url": "hooks/filters/index.html",
    "revision": "2d5ece4d99e2b7046de4274db82827be"
  },
  {
    "url": "index.html",
    "revision": "1dac8e3951d4113555291eae082ad860"
  },
  {
    "url": "modules/action/index.html",
    "revision": "fa423cfd8481526f14ced0c5ab00af5c"
  },
  {
    "url": "modules/automation/index.html",
    "revision": "359168af6635f63bfa31261930ea6132"
  },
  {
    "url": "modules/benchmark/index.html",
    "revision": "45388bb4ec09c110d9ffd66994351734"
  },
  {
    "url": "modules/contact-profile-section/index.html",
    "revision": "422d8acdb32ff4641f4cee7013c3ca23"
  },
  {
    "url": "modules/form-field-code-structure/index.html",
    "revision": "3b8dcfbbb720da798f656b3a428a4bae"
  },
  {
    "url": "modules/index.html",
    "revision": "c8deea6917b9425e9472ad7ae099b0fc"
  },
  {
    "url": "modules/navigation-modules/index.html",
    "revision": "e767b2fb33fd44676a161e12a0c7f331"
  },
  {
    "url": "modules/smart-code/index.html",
    "revision": "e22b61d95bdbe5af551cd933ebd45e77"
  },
  {
    "url": "modules/trigger/index.html",
    "revision": "cd709a462f72650cd977d4457e36fdad"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
