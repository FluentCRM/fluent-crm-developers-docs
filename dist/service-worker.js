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
    "revision": "3ed501752a12323cb02c3185aeb1271a"
  },
  {
    "url": "assets/css/0.styles.d0afebfe.css",
    "revision": "4ad19b10ef6ba2eeaf6b2cabbe68ac2d"
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
    "url": "assets/js/1.69405b5c.js",
    "revision": "fe4ac426a4e181adc07fbfdc26bca77d"
  },
  {
    "url": "assets/js/10.1cd0ad7f.js",
    "revision": "c251118698c16d402a89e173254e5fba"
  },
  {
    "url": "assets/js/11.f32c864f.js",
    "revision": "a583db80f1f988de4bb969e49731b1cb"
  },
  {
    "url": "assets/js/12.08c75246.js",
    "revision": "14fb776fcf0bbffa5275bcdb8521dc9b"
  },
  {
    "url": "assets/js/13.ee99093d.js",
    "revision": "16d1168221c112b03e075dc2d253cfbb"
  },
  {
    "url": "assets/js/14.3a0a2a10.js",
    "revision": "7a1427ed31ab17978974637e231d7ca7"
  },
  {
    "url": "assets/js/15.bde4bddd.js",
    "revision": "6f7b757aa42847d2946c87229df15672"
  },
  {
    "url": "assets/js/16.312dfb3b.js",
    "revision": "b0f95f7739ebceacaace093bcb621b66"
  },
  {
    "url": "assets/js/17.7e07a8cc.js",
    "revision": "d764bb363aa6c1db2f6d72b918998552"
  },
  {
    "url": "assets/js/18.30e9f96a.js",
    "revision": "11269480013d7b981ca3df21002ba549"
  },
  {
    "url": "assets/js/19.9d721225.js",
    "revision": "48ca393d7ec1bad751c0d14baa27f2c3"
  },
  {
    "url": "assets/js/20.0810e773.js",
    "revision": "259551367d28ea8e292d5570eccb8b84"
  },
  {
    "url": "assets/js/21.a51f06d0.js",
    "revision": "9b0c501764e0f4d939b3e2cc5e3a0fef"
  },
  {
    "url": "assets/js/22.4b4f1731.js",
    "revision": "26430211c8ba6835e98f5851312380b4"
  },
  {
    "url": "assets/js/23.093867ca.js",
    "revision": "9b2541d4978cd491c8f3d9f4a61fec10"
  },
  {
    "url": "assets/js/24.8a84dcde.js",
    "revision": "dce3bdc9f2b6dc6f8bb58dd4d222a4fe"
  },
  {
    "url": "assets/js/25.3ac1d9da.js",
    "revision": "5e4700b41000516bb84aa15f24b28a0c"
  },
  {
    "url": "assets/js/26.cbb0ef4c.js",
    "revision": "ce5c55f14179ead7ea01554a6ff433b9"
  },
  {
    "url": "assets/js/27.c16e90f9.js",
    "revision": "a8e4cf977a8ff8ca559f56cc380762a5"
  },
  {
    "url": "assets/js/28.79acb935.js",
    "revision": "ddb75e112dc55a7b1e93ebe5ed787b4a"
  },
  {
    "url": "assets/js/29.a2d57755.js",
    "revision": "2374891f15f5cdbc5dcf0951a942f527"
  },
  {
    "url": "assets/js/30.18800f35.js",
    "revision": "922ddae0b6c47d36e82d293518ff7019"
  },
  {
    "url": "assets/js/31.2a59842a.js",
    "revision": "970a9a337103aa131caf25f77df5d22c"
  },
  {
    "url": "assets/js/32.60b55016.js",
    "revision": "cc127f72a29649f4f401509c6f50cc67"
  },
  {
    "url": "assets/js/33.a94e688e.js",
    "revision": "aabbac27834c0cbde4cc8439ab034377"
  },
  {
    "url": "assets/js/34.0ff54db3.js",
    "revision": "22df22fdd19fa3e67a2ab533b8c95973"
  },
  {
    "url": "assets/js/35.19816c3d.js",
    "revision": "85bae4bd7faa093c7641711ffebc5628"
  },
  {
    "url": "assets/js/36.688cda3c.js",
    "revision": "6fe07f076aa54ad927f3c27460fcc913"
  },
  {
    "url": "assets/js/37.e024b175.js",
    "revision": "556272acc164d011a981042d37d1d985"
  },
  {
    "url": "assets/js/38.f05fa44e.js",
    "revision": "40135ee96e0846d1332be7b66798dc12"
  },
  {
    "url": "assets/js/39.737dd831.js",
    "revision": "bd4db65f21611f6baea5d4ca7e44e532"
  },
  {
    "url": "assets/js/4.50f88fe4.js",
    "revision": "f17945b01763b09976d7447bbcd88d61"
  },
  {
    "url": "assets/js/40.19b3e816.js",
    "revision": "f64423ed7e253c540928364b29bbfffe"
  },
  {
    "url": "assets/js/41.70cfbf57.js",
    "revision": "20e598c1547af19ffe1763a92e6d3162"
  },
  {
    "url": "assets/js/42.fd0d0122.js",
    "revision": "28a2076f77609a7729af3478657e76e7"
  },
  {
    "url": "assets/js/43.7205270f.js",
    "revision": "68346563a06c8ace4e5ad63d56147a7b"
  },
  {
    "url": "assets/js/44.fb0ba51f.js",
    "revision": "7c36de3e3ad28fab22ba27eaea0230e4"
  },
  {
    "url": "assets/js/45.27af2ab7.js",
    "revision": "206f62411008d9261f3b5bbe4245c89e"
  },
  {
    "url": "assets/js/46.e6d2b375.js",
    "revision": "5f37d5cd564ec086e7c703d5b14cc309"
  },
  {
    "url": "assets/js/47.a81764e1.js",
    "revision": "107fff5f921d61781cc2d8295d62f1cb"
  },
  {
    "url": "assets/js/48.f13b6329.js",
    "revision": "c1c551567ad3e0a2fe17456715aabd40"
  },
  {
    "url": "assets/js/49.fc10e579.js",
    "revision": "653ec646c5e31403ff4e46f1f8841bb0"
  },
  {
    "url": "assets/js/5.78087223.js",
    "revision": "4ada780ad5d216222c6c06c7722e157d"
  },
  {
    "url": "assets/js/50.80754d7e.js",
    "revision": "91dd9a36b53a5c837e484600bbf9c641"
  },
  {
    "url": "assets/js/51.7acb7f94.js",
    "revision": "339863c9612fdec10a2c8be1cfc2c2c9"
  },
  {
    "url": "assets/js/52.4fd8a6fc.js",
    "revision": "0beec9919a5ae807ab5be2a397d95f6f"
  },
  {
    "url": "assets/js/53.dff9bdbe.js",
    "revision": "b5d2a5a2933e53af7c195b41e4020a33"
  },
  {
    "url": "assets/js/54.12579f14.js",
    "revision": "0c767bad17be55283659280fed8497c2"
  },
  {
    "url": "assets/js/55.77553671.js",
    "revision": "2faabb7502852aad67e6d6be37bd4c1a"
  },
  {
    "url": "assets/js/56.f938766a.js",
    "revision": "3c78ab6097f236a59e7f9c0f4a851d2c"
  },
  {
    "url": "assets/js/57.ffab44b6.js",
    "revision": "426bd6a5094c89990f567ad622cbd23b"
  },
  {
    "url": "assets/js/58.86afc0ff.js",
    "revision": "6a9e950fedfc6ec59984b5b14bbf4a6d"
  },
  {
    "url": "assets/js/59.556634ba.js",
    "revision": "646f32b7da259d57729e81446f06a9d3"
  },
  {
    "url": "assets/js/6.ad1ba60c.js",
    "revision": "cf6b410868b0e1802208fa7032055d60"
  },
  {
    "url": "assets/js/60.0ef6f2e4.js",
    "revision": "1e19feeb3ccc74fcf88c60dde6274574"
  },
  {
    "url": "assets/js/61.a78d359c.js",
    "revision": "8549f48c748406d5481bcd646e460feb"
  },
  {
    "url": "assets/js/62.fae5c1a8.js",
    "revision": "29af0bea663e6302f24b80ac3779ceab"
  },
  {
    "url": "assets/js/63.9dc9086f.js",
    "revision": "e1da19ab91f347c6c12a49e0455ad6f7"
  },
  {
    "url": "assets/js/64.73cd7eb4.js",
    "revision": "82cfe9ffd29de1a11079f0bdfaac0c21"
  },
  {
    "url": "assets/js/65.b19e28af.js",
    "revision": "1e64e09392d420fe6e584393bca2a0eb"
  },
  {
    "url": "assets/js/66.3a0df05f.js",
    "revision": "4877ec14c315de1acf7fcf607fa88cc2"
  },
  {
    "url": "assets/js/67.83a70521.js",
    "revision": "85c51a56d492b82b9ad8a906dee88701"
  },
  {
    "url": "assets/js/68.4fe511df.js",
    "revision": "c8c65c01451b3a8c9933795d35d09f38"
  },
  {
    "url": "assets/js/69.0d9d886a.js",
    "revision": "2fbd11d03638cebb321ceb4e79f38ac5"
  },
  {
    "url": "assets/js/7.3fc70b38.js",
    "revision": "1d64049f12da5d8c58799a394d76ed8d"
  },
  {
    "url": "assets/js/70.cb2ba26c.js",
    "revision": "97563e5c1450bd1ccbdc73e6bae557e2"
  },
  {
    "url": "assets/js/71.09bc5865.js",
    "revision": "6b8c9e6f6b1527e9404c09db26d67c48"
  },
  {
    "url": "assets/js/72.48fc84e2.js",
    "revision": "deb312db36d778a8a0665602f6557252"
  },
  {
    "url": "assets/js/73.04fef0ac.js",
    "revision": "795b7fd74dc0af81be5472d4df766797"
  },
  {
    "url": "assets/js/74.ea56a005.js",
    "revision": "b816bf1c7c5b649aed1e215df9397220"
  },
  {
    "url": "assets/js/75.6c899132.js",
    "revision": "12a16f6c6a92374fb87e790fb302d4aa"
  },
  {
    "url": "assets/js/76.12b268c1.js",
    "revision": "de7176e74611f9b3bf21b0e8043c8596"
  },
  {
    "url": "assets/js/77.aca7ddfa.js",
    "revision": "86601665d0148bd6af43a9020a74064c"
  },
  {
    "url": "assets/js/78.46ada3cf.js",
    "revision": "75979d69d8fb83d86a9a61c9b0f3bde0"
  },
  {
    "url": "assets/js/79.b5fa8919.js",
    "revision": "2b060b457f0b030447d1e7ec3d4e85e6"
  },
  {
    "url": "assets/js/8.a925eb1e.js",
    "revision": "47c019b2f3e324d370587af7b73cbfbb"
  },
  {
    "url": "assets/js/9.485e8673.js",
    "revision": "b41b05b240161d80640cabe4bd1cd85a"
  },
  {
    "url": "assets/js/app.1cc69afb.js",
    "revision": "21bab8acec14bbf69dbdf570ebf6c252"
  },
  {
    "url": "assets/js/vendors~docsearch.d31fbf91.js",
    "revision": "a0550a200b8ca78444504bfad98a2bc4"
  },
  {
    "url": "cli/index.html",
    "revision": "104f57d0a482a843f02d7d07d932dd00"
  },
  {
    "url": "database/_parts/_funnel_schema/index.html",
    "revision": "eb55635fabe1c6b1eaca90d79dfaa960"
  },
  {
    "url": "database/_parts/_subscriber_schema/index.html",
    "revision": "16dc6679e2c514d40011f59a9259cf36"
  },
  {
    "url": "database/index.html",
    "revision": "cde37abee2f208193f665bb7c65f3b41"
  },
  {
    "url": "database/models/campaign-email/index.html",
    "revision": "2b5d1722da6fcfce4ecad1a09034cc89"
  },
  {
    "url": "database/models/campaign-url-matrix/index.html",
    "revision": "4f0ffc8adf575bf7b9b12e68ca477c8b"
  },
  {
    "url": "database/models/campaign/index.html",
    "revision": "1cdc148ae665fa8c1606cca280de6be5"
  },
  {
    "url": "database/models/custom-contact-field/index.html",
    "revision": "9ef78ad8902a4256fa73c07760da3fc3"
  },
  {
    "url": "database/models/funnel/index.html",
    "revision": "6d0045a02aa02a534176a53a8c7716ee"
  },
  {
    "url": "database/models/funnelMetric/index.html",
    "revision": "b2b181c03a0e2bdf5932174af5746b1e"
  },
  {
    "url": "database/models/funnelSequence/index.html",
    "revision": "41b682e01188dbd874f8949d87662ca2"
  },
  {
    "url": "database/models/funnelSubscriber/index.html",
    "revision": "3386cb438e3fb612b7eed2d89397e74d"
  },
  {
    "url": "database/models/index.html",
    "revision": "8170c38c6c896ef536eb70efc27a68f6"
  },
  {
    "url": "database/models/lists/index.html",
    "revision": "213061cbd5b7ccc430de62157fa73605"
  },
  {
    "url": "database/models/meta/index.html",
    "revision": "9436d6c033d2fa7ef84087f5b0a6696c"
  },
  {
    "url": "database/models/subject/index.html",
    "revision": "b0bc34f85146ab4e7d225fc03e29e8d3"
  },
  {
    "url": "database/models/subscriber-meta/index.html",
    "revision": "2e17dd27ad472f82b7f2c8e7b3f160c6"
  },
  {
    "url": "database/models/subscriber-note/index.html",
    "revision": "9867483819a4a7822d365825e68594bd"
  },
  {
    "url": "database/models/subscriber-pivot/index.html",
    "revision": "b95607ad5a561961a1f3e236d98bd5f8"
  },
  {
    "url": "database/models/subscriber/index.html",
    "revision": "a45348a33d2442d708b463bb4d3154aa"
  },
  {
    "url": "database/models/tag/index.html",
    "revision": "effbd46b2316516375c16b17569307a6"
  },
  {
    "url": "database/models/template/index.html",
    "revision": "5964e01058761c7909ef5f1aa91c5c8b"
  },
  {
    "url": "database/models/url-store/index.html",
    "revision": "5321ca3cfdecaf8e0c4c77db56d8f8af"
  },
  {
    "url": "database/models/user/index.html",
    "revision": "0ce02de02ca9f07b98b38a22baaeb5b0"
  },
  {
    "url": "database/models/webhook/index.html",
    "revision": "24cd06ab1afef4965ecdb45ae279b2e6"
  },
  {
    "url": "database/orm/collections/index.html",
    "revision": "348b4aea235a9df8bc73435f8c829e77"
  },
  {
    "url": "database/orm/index.html",
    "revision": "c4e4cd59d660d47acb4ce3e1a1ec198f"
  },
  {
    "url": "database/orm/mutators/index.html",
    "revision": "50501d505b955b074d864856db5f6234"
  },
  {
    "url": "database/orm/relationship/index.html",
    "revision": "745c6e7ed7c975a469b42575f61f84ca"
  },
  {
    "url": "database/orm/serialization/index.html",
    "revision": "24a70783c69a495b9a3a1deb89283f18"
  },
  {
    "url": "database/query-builder/index.html",
    "revision": "6dbac13128c4b634cbe6b6aaacd333a6"
  },
  {
    "url": "extending-rest-api/index.html",
    "revision": "c5e18ce9ab5a1a965714b9edd516da9d"
  },
  {
    "url": "favicon.png",
    "revision": "f1bdbf22fd49e4ac2daaef742e86d488"
  },
  {
    "url": "getting-started/index.html",
    "revision": "0549c093bbc02c695c73b3f56c348fc5"
  },
  {
    "url": "global-functions/contact-api-function/index.html",
    "revision": "f2f8924f25d074caca4f51d70eef6562"
  },
  {
    "url": "global-functions/index.html",
    "revision": "f8bed502b6788fcf5bd6b4c40a768218"
  },
  {
    "url": "global-functions/list-api-function/index.html",
    "revision": "1cb31cd3b19dab3dd8af267adca6fa93"
  },
  {
    "url": "global-functions/tag-api-function/index.html",
    "revision": "d6e66d1b1eb6c849692fcc26fccaa6d6"
  },
  {
    "url": "helpers/arr/index.html",
    "revision": "28db904c533cb50ddda7c1e8c1074b26"
  },
  {
    "url": "helpers/index.html",
    "revision": "8d5c2cd79e387cd31c9c6de29fef0523"
  },
  {
    "url": "helpers/service_helper/index.html",
    "revision": "945a2185cb2b7a4b6f6904af7fa1ed17"
  },
  {
    "url": "helpers/str/index.html",
    "revision": "7dbb6d0c7b2c5142efbc7d394f8154bb"
  },
  {
    "url": "hook_changes/index.html",
    "revision": "03e7bc0a1089b0e1ba3f73b96de52839"
  },
  {
    "url": "hooks/actions/_campaign_hooks/index.html",
    "revision": "5003a7098b5c8f757421b2a87f8b2243"
  },
  {
    "url": "hooks/actions/_contact_activity_hooks/index.html",
    "revision": "559264ec5121b4cf26f6836f7a140726"
  },
  {
    "url": "hooks/actions/_contact_hooks/index.html",
    "revision": "06442680c71eb2e61c6774161cc171ab"
  },
  {
    "url": "hooks/actions/_double_optin_page/index.html",
    "revision": "f836b81fd84d9f9df8c34852615b93ec"
  },
  {
    "url": "hooks/actions/_list_hooks/index.html",
    "revision": "48b55185e67f4b82be06a326f9fadf69"
  },
  {
    "url": "hooks/actions/_manage_subscription_page/index.html",
    "revision": "7042cf14c34e27618c52aff5667874d0"
  },
  {
    "url": "hooks/actions/_tag_hooks/index.html",
    "revision": "210d22bff31f88fd0ab2e5ff4e92df7a"
  },
  {
    "url": "hooks/actions/_template_hooks/index.html",
    "revision": "68aea58876416d7d2ceea0171e591687"
  },
  {
    "url": "hooks/actions/_unsubscribe_page_actions/index.html",
    "revision": "7c989c4b2cbe74f56f363fbbd488cf0f"
  },
  {
    "url": "hooks/actions/_view_on_browser_page_actions/index.html",
    "revision": "d5e33ec7271987a11f7d7c0cc76628ce"
  },
  {
    "url": "hooks/actions/index.html",
    "revision": "5a7b52c15761868c1112b9bd3150a292"
  },
  {
    "url": "hooks/filters/_dashboard_filters/index.html",
    "revision": "e6006a0887bf990c20096d937b3d6f58"
  },
  {
    "url": "hooks/filters/_frontend_filters/index.html",
    "revision": "3977b5cbc75cc719d07a8e920072e68b"
  },
  {
    "url": "hooks/filters/_general_filters/index.html",
    "revision": "661f95036a49b0f51366e5bf7b57f701"
  },
  {
    "url": "hooks/filters/_other_filters/index.html",
    "revision": "f457af7b8478be4421e6068535536a1d"
  },
  {
    "url": "hooks/filters/_webhook_filters/index.html",
    "revision": "1c2f446fb5cc490faba0fbf45f03a15c"
  },
  {
    "url": "hooks/filters/index.html",
    "revision": "e0820c1991ae7f681cdc7551d6d1b33d"
  },
  {
    "url": "index.html",
    "revision": "128848be5a9b22cce3b90eb6cd7905e9"
  },
  {
    "url": "modules/action/index.html",
    "revision": "a93c152d76614cf0fe3290678f597436"
  },
  {
    "url": "modules/automation/index.html",
    "revision": "2df0a8fbf14dbc95d62995c65cdd1761"
  },
  {
    "url": "modules/benchmark/index.html",
    "revision": "df142fc4b07360795391c13f58818f06"
  },
  {
    "url": "modules/contact-profile-section/index.html",
    "revision": "cdd3fbb74853c03dc5abbc2acb0501c5"
  },
  {
    "url": "modules/form-field-code-structure/index.html",
    "revision": "21be4cb5b74e1623378000d723796177"
  },
  {
    "url": "modules/index.html",
    "revision": "a518ca5896594133992b732c823f4322"
  },
  {
    "url": "modules/navigation-modules/index.html",
    "revision": "a76c16438b96589fe9b5c406d2695115"
  },
  {
    "url": "modules/smart-code/index.html",
    "revision": "f27305a4cc2610018929c132942bae25"
  },
  {
    "url": "modules/trigger/index.html",
    "revision": "cef402a1e31fc490d956eb0e1c254650"
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
