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
    "revision": "d7ae3e8bcad36ec0d286986d30b24c8f"
  },
  {
    "url": "assets/css/0.styles.bc50b8d2.css",
    "revision": "db33f4c7aabec658d53167ced31e4a10"
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
    "url": "assets/js/10.8412f2bb.js",
    "revision": "7612074aedec90b2e5751bbea4fb4428"
  },
  {
    "url": "assets/js/11.0cfb9489.js",
    "revision": "debcd2d1209d5eaa6917e3dc4ba11e0f"
  },
  {
    "url": "assets/js/12.17e70bd9.js",
    "revision": "4933f8035da8a30b0f61e67781b3c59e"
  },
  {
    "url": "assets/js/13.01a9800c.js",
    "revision": "f9656ce52baa44389dc0e0bfe88e2a83"
  },
  {
    "url": "assets/js/14.c1188623.js",
    "revision": "bf149a72dd9089722882faee0106ee00"
  },
  {
    "url": "assets/js/15.04f6d473.js",
    "revision": "4302564a7df8c32dd064a55f49c42e61"
  },
  {
    "url": "assets/js/16.2ba4476d.js",
    "revision": "517d072199a23583f0d0e330e865147f"
  },
  {
    "url": "assets/js/17.a4fbfcbb.js",
    "revision": "6388a0c563561c5deda5cee75b55a52b"
  },
  {
    "url": "assets/js/18.d32b560f.js",
    "revision": "b110ced4cd7434e7c322f64baaf8e78e"
  },
  {
    "url": "assets/js/19.0b7df0b6.js",
    "revision": "913bf77788db6b71e01077cc4dcfcc8c"
  },
  {
    "url": "assets/js/2.4f111dfd.js",
    "revision": "43bd627fc7c3063b2d7c247f614d0906"
  },
  {
    "url": "assets/js/20.8e2e9dc5.js",
    "revision": "5a9bd5f9c0fc7146205313754ef3dc62"
  },
  {
    "url": "assets/js/21.a61e21d4.js",
    "revision": "6e5ac8b1f41a5a63bab94ae60744cc4c"
  },
  {
    "url": "assets/js/22.505c5704.js",
    "revision": "2749c5236d784e3b801a8af55b24fcbf"
  },
  {
    "url": "assets/js/23.2a12787a.js",
    "revision": "7b1f2cbd0386a0db1325b37dc3437326"
  },
  {
    "url": "assets/js/24.741c10dd.js",
    "revision": "954788aeffb796a6a9efa69e7af0142c"
  },
  {
    "url": "assets/js/25.eee5ee71.js",
    "revision": "df6619b544d8e0cea129d6dfa303a97e"
  },
  {
    "url": "assets/js/26.61305d7f.js",
    "revision": "9a09569c730b6f8559c0947f7432b42a"
  },
  {
    "url": "assets/js/27.364c1ba6.js",
    "revision": "3c9037edef78ca517593875906799cff"
  },
  {
    "url": "assets/js/28.0df1bc74.js",
    "revision": "cbc1a994da10fe52d872e39479f0f03d"
  },
  {
    "url": "assets/js/29.9c98822f.js",
    "revision": "43e80600afb5336112b0ea57c54c6f3c"
  },
  {
    "url": "assets/js/3.75af8818.js",
    "revision": "ddf7879f86e7a7d86cd3e52840904aad"
  },
  {
    "url": "assets/js/30.d799f70c.js",
    "revision": "9a27dbf7a3f73802c54dc0e37e552c64"
  },
  {
    "url": "assets/js/31.a43e461e.js",
    "revision": "e00b8107b3598112533d7f2b54d287d5"
  },
  {
    "url": "assets/js/32.3bf8140e.js",
    "revision": "1c4be9787662ebc3ba7437014576e433"
  },
  {
    "url": "assets/js/33.b566dd44.js",
    "revision": "83baac0e4c6457acaa71c7d0e7d1d779"
  },
  {
    "url": "assets/js/34.1f855e2f.js",
    "revision": "772b8467ca4a399a7f367a2218422ff5"
  },
  {
    "url": "assets/js/35.9db20d39.js",
    "revision": "52254c4f207a30d06210901112682831"
  },
  {
    "url": "assets/js/36.48fedd83.js",
    "revision": "0e71e447ce6aa7d13979f813dcd9ae83"
  },
  {
    "url": "assets/js/37.6c73138b.js",
    "revision": "204f89127a41e18a149e9a292cec98f6"
  },
  {
    "url": "assets/js/38.930db20e.js",
    "revision": "bc663dc206b4ccca6b6304f5fe791a88"
  },
  {
    "url": "assets/js/39.98ffc1dc.js",
    "revision": "614058d4cfb002ac6b3c9dcedbcf48e4"
  },
  {
    "url": "assets/js/4.56283c55.js",
    "revision": "f9a1ef6011ecf458e985fc783b82500c"
  },
  {
    "url": "assets/js/40.e751fdeb.js",
    "revision": "82b209b171a8b0acbecfad5103ff5297"
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
    "url": "assets/js/43.af7697be.js",
    "revision": "46f3d6b3aaec76f5c4324a5ab11f6afe"
  },
  {
    "url": "assets/js/44.e3b4c90b.js",
    "revision": "55c677a2ca849b637cd95e1781d2afc7"
  },
  {
    "url": "assets/js/45.ff7d6abb.js",
    "revision": "5c53786e6720e5828a9488abd33c5c2c"
  },
  {
    "url": "assets/js/46.44193caf.js",
    "revision": "a8bb77e28ca0265da86e58b78140b8c2"
  },
  {
    "url": "assets/js/47.9056062b.js",
    "revision": "8b59324089851f64b416fe8294dcba06"
  },
  {
    "url": "assets/js/48.ba130b6f.js",
    "revision": "23cb3fb63ff7828ce626d1cd4a94eac9"
  },
  {
    "url": "assets/js/49.2eec9e3c.js",
    "revision": "8ba79bfc370d453363117d40a5745d72"
  },
  {
    "url": "assets/js/5.ecc7bc3c.js",
    "revision": "2508bbc666c083eb03b1e3189bf3d0e6"
  },
  {
    "url": "assets/js/50.359ee858.js",
    "revision": "733cf98684ee005b8c72d51c63a0c34d"
  },
  {
    "url": "assets/js/51.1f2b6805.js",
    "revision": "352ab1878ac9e15aad3f1bf5ad0ec9e9"
  },
  {
    "url": "assets/js/52.cf1b4544.js",
    "revision": "482a62cb566740378957be73b38c60df"
  },
  {
    "url": "assets/js/53.83d9cc5f.js",
    "revision": "07b47ef9e8e77386f1cb84edd9124f35"
  },
  {
    "url": "assets/js/54.1f0b161c.js",
    "revision": "de76dd9f0e2d1d3ec51699207c37ac60"
  },
  {
    "url": "assets/js/55.5f18e26c.js",
    "revision": "bd60a0c37d6d257e0689312502531306"
  },
  {
    "url": "assets/js/56.fd61fdbb.js",
    "revision": "d5e9466fd366b838dbcec720b21274b0"
  },
  {
    "url": "assets/js/57.1ccfd9aa.js",
    "revision": "a98dcbc5c5e2f190113a0eb0b0f3ae44"
  },
  {
    "url": "assets/js/58.ab020537.js",
    "revision": "7962080ca2a48884c31f3d11db778294"
  },
  {
    "url": "assets/js/59.02dc8160.js",
    "revision": "ddd6d8f7d583c159c61dbce551588adf"
  },
  {
    "url": "assets/js/6.4c104003.js",
    "revision": "9e6ea6bb955d4a4a7faecd2b67bd4371"
  },
  {
    "url": "assets/js/60.7c195977.js",
    "revision": "b64d15a155c93cb535e21fcc38bd4903"
  },
  {
    "url": "assets/js/61.28adf7d8.js",
    "revision": "9551d4c560ee62b35c9317b550327b9a"
  },
  {
    "url": "assets/js/62.508e15d2.js",
    "revision": "1bd27225f745b9cb5e47f582f82ca280"
  },
  {
    "url": "assets/js/63.89da0af2.js",
    "revision": "3ea943a28280f30dfe9a149b0a4a0365"
  },
  {
    "url": "assets/js/64.d3b8b8d1.js",
    "revision": "331c3fe10947d0db6c7215fac7dce523"
  },
  {
    "url": "assets/js/65.1110f393.js",
    "revision": "425e784fd067b3e07cb1b2a8db565dc8"
  },
  {
    "url": "assets/js/66.dc5c55ec.js",
    "revision": "b5bd8a9110233c43f3362e21b9e16ab9"
  },
  {
    "url": "assets/js/67.7215b2b8.js",
    "revision": "c7c7cebf553304cf39dd8bca1a72bf50"
  },
  {
    "url": "assets/js/68.90eb7c71.js",
    "revision": "3ba5f2756410a89b8c32e65734b903c7"
  },
  {
    "url": "assets/js/69.676d756e.js",
    "revision": "e03cf5ee729322998bac3ececda8bfdc"
  },
  {
    "url": "assets/js/7.1f29de13.js",
    "revision": "cd25140854e6801b88df361629b05fa9"
  },
  {
    "url": "assets/js/70.e7f344eb.js",
    "revision": "08c84282ded92775c96d09c9a6eef822"
  },
  {
    "url": "assets/js/71.8f4b0a3f.js",
    "revision": "5a6c72e6d66d3e38d6458b274a322c8c"
  },
  {
    "url": "assets/js/72.f629983f.js",
    "revision": "3efc25140bb0e55da00b9c98ea28e310"
  },
  {
    "url": "assets/js/73.ed9d6de2.js",
    "revision": "9aee2b596000357f49a0191573fd31e9"
  },
  {
    "url": "assets/js/74.9cf5c2dd.js",
    "revision": "d0f44e47af17a7fc18584026b6f67927"
  },
  {
    "url": "assets/js/75.1095367c.js",
    "revision": "194f809bae15d52d5a95caff5eb09f55"
  },
  {
    "url": "assets/js/76.d8a09321.js",
    "revision": "6bf549d7770d3414b1efd18299128a94"
  },
  {
    "url": "assets/js/77.3abd4486.js",
    "revision": "411c157efe2179d4da94b0dae9809663"
  },
  {
    "url": "assets/js/78.72c77583.js",
    "revision": "a474e41a746e7c4d332ad41e68052451"
  },
  {
    "url": "assets/js/8.31640024.js",
    "revision": "3e7835e4ecdfee051525236c4c4b9175"
  },
  {
    "url": "assets/js/9.024e47ee.js",
    "revision": "53beca208dccabcd02ca552f59ff1b0a"
  },
  {
    "url": "assets/js/app.c7c2a59b.js",
    "revision": "7781674ae57f2d48e0897e18ce08858d"
  },
  {
    "url": "cli/index.html",
    "revision": "5180ad4dd8f40997d3a5068f0a61d07f"
  },
  {
    "url": "database/_parts/_funnel_schema/index.html",
    "revision": "2231051df4901ed1bc6d6098aaa7a52f"
  },
  {
    "url": "database/_parts/_subscriber_schema/index.html",
    "revision": "295372db6967f0e87a1608953cfa0dda"
  },
  {
    "url": "database/index.html",
    "revision": "956abe0a48662942d3e000eeaae902bf"
  },
  {
    "url": "database/models/campaign-email/index.html",
    "revision": "417bc6f2a4c38a2298c8f9f5b6ab159f"
  },
  {
    "url": "database/models/campaign-url-matrix/index.html",
    "revision": "a0194e8ee70662d21bc09162f169015d"
  },
  {
    "url": "database/models/campaign/index.html",
    "revision": "828dec34672490d18e6a0a7088061517"
  },
  {
    "url": "database/models/custom-contact-field/index.html",
    "revision": "fef3da603324aae2fcbd5911f6c9aad3"
  },
  {
    "url": "database/models/funnel/index.html",
    "revision": "bb01342c527e903ff7100a0c92622405"
  },
  {
    "url": "database/models/funnelMetric/index.html",
    "revision": "e2b53c5785d5a39ec2a8275579df480f"
  },
  {
    "url": "database/models/funnelSequence/index.html",
    "revision": "fb32d64add880c4c16e205c318b417f6"
  },
  {
    "url": "database/models/funnelSubscriber/index.html",
    "revision": "5414b21e62f5bd84f21bba095d247663"
  },
  {
    "url": "database/models/index.html",
    "revision": "5cf7def48fb39f30c8feb66fa047de5d"
  },
  {
    "url": "database/models/lists/index.html",
    "revision": "ab4802fd4094f0c45da244ed31b1bc56"
  },
  {
    "url": "database/models/meta/index.html",
    "revision": "b6f79ab811d03d225d3a3560b027299d"
  },
  {
    "url": "database/models/subject/index.html",
    "revision": "d310ef7a85e0e85f9020030ad1d6bf45"
  },
  {
    "url": "database/models/subscriber-meta/index.html",
    "revision": "bf40bd4ab47c850012c3094860fe26e1"
  },
  {
    "url": "database/models/subscriber-note/index.html",
    "revision": "a6135b01a0b0fa9a1c2f1ae00ca14662"
  },
  {
    "url": "database/models/subscriber-pivot/index.html",
    "revision": "3be1c35023ecf03785754a02812af5a8"
  },
  {
    "url": "database/models/subscriber/index.html",
    "revision": "aba4d7531b711b2a4753dcddc586dd62"
  },
  {
    "url": "database/models/tag/index.html",
    "revision": "786d5972ed3486a7c74568b93bfbd6d2"
  },
  {
    "url": "database/models/template/index.html",
    "revision": "f40f182a0b272fef2ba323ee8d65eea1"
  },
  {
    "url": "database/models/url-store/index.html",
    "revision": "dcbcb506675ac06f6c8b940996a89cfc"
  },
  {
    "url": "database/models/user/index.html",
    "revision": "3590a60b686cf9c9ca4609a009fb1910"
  },
  {
    "url": "database/models/webhook/index.html",
    "revision": "a728fee1508a55c498cb6abc7abd9e71"
  },
  {
    "url": "database/orm/collections/index.html",
    "revision": "223b442da6556debf8f7119db4be68a7"
  },
  {
    "url": "database/orm/index.html",
    "revision": "3f41cbad88f68188c6ee7a2ac3619842"
  },
  {
    "url": "database/orm/mutators/index.html",
    "revision": "38e0dfdf295a6a6b16eb6dbc7321afad"
  },
  {
    "url": "database/orm/relationship/index.html",
    "revision": "9e569018a4c981450196f8ffb4df1f24"
  },
  {
    "url": "database/orm/serialization/index.html",
    "revision": "9e2bbe5c0a9da0b4f85933cf66f91410"
  },
  {
    "url": "database/query-builder/index.html",
    "revision": "6ab19e7a35bc4fc0c8190d24f577ada5"
  },
  {
    "url": "extending-rest-api/index.html",
    "revision": "2c40592263587593a3a2bb4ba72d814c"
  },
  {
    "url": "favicon.png",
    "revision": "f1bdbf22fd49e4ac2daaef742e86d488"
  },
  {
    "url": "getting-started/index.html",
    "revision": "466f46d034056f75badd68c85a03e28c"
  },
  {
    "url": "global-functions/contact-api-function/index.html",
    "revision": "45687876a22fb96bba9ced9ea584f8b7"
  },
  {
    "url": "global-functions/index.html",
    "revision": "520ed012f1803d6ad78b2f7609d314c7"
  },
  {
    "url": "global-functions/list-api-function/index.html",
    "revision": "6a866e3ccfd26ca6b93d8702de9da4c0"
  },
  {
    "url": "global-functions/tag-api-function/index.html",
    "revision": "afc8eff12f82481095fb7feb1c877bfa"
  },
  {
    "url": "helpers/arr/index.html",
    "revision": "327a27d81dfd22aa362bd309391e3011"
  },
  {
    "url": "helpers/index.html",
    "revision": "9837e983eb4f5169adb0089ae831f5f6"
  },
  {
    "url": "helpers/service_helper/index.html",
    "revision": "0a9dc203346a3199a7dca6f3c49b264a"
  },
  {
    "url": "helpers/str/index.html",
    "revision": "325729f6fe674108cf09b45f3da28e35"
  },
  {
    "url": "hook_changes/index.html",
    "revision": "3bc60233a78f162c96682cfbcce3112b"
  },
  {
    "url": "hooks/actions/_campaign_hooks/index.html",
    "revision": "f152437da39cfe6102143637d37e1f1e"
  },
  {
    "url": "hooks/actions/_contact_activity_hooks/index.html",
    "revision": "50ce146338b847cfecdd2e2af8aace10"
  },
  {
    "url": "hooks/actions/_contact_hooks/index.html",
    "revision": "85cab3408eb38546ad7e7b102792f32f"
  },
  {
    "url": "hooks/actions/_double_optin_page/index.html",
    "revision": "cd8a4ae5f517edcd817e18f273bdc386"
  },
  {
    "url": "hooks/actions/_list_hooks/index.html",
    "revision": "95b76fb96c57940f5608a585c43758fc"
  },
  {
    "url": "hooks/actions/_manage_subscription_page/index.html",
    "revision": "7d1175af17bad08ad501b0e7b3705267"
  },
  {
    "url": "hooks/actions/_tag_hooks/index.html",
    "revision": "eda415c602b206c3687678f93931c389"
  },
  {
    "url": "hooks/actions/_template_hooks/index.html",
    "revision": "490612af0b16ab956241ff6cede63e3a"
  },
  {
    "url": "hooks/actions/_unsubscribe_page_actions/index.html",
    "revision": "89fd1219cf2f584377ae7f1b2167a515"
  },
  {
    "url": "hooks/actions/_view_on_browser_page_actions/index.html",
    "revision": "33d22abd7ed74b5d9d62005e0022147c"
  },
  {
    "url": "hooks/actions/index.html",
    "revision": "6bb241f3e5f198b25e298340d9af0ea7"
  },
  {
    "url": "hooks/filters/_dashboard_filters/index.html",
    "revision": "069914db89f81b1158555a4c743b5024"
  },
  {
    "url": "hooks/filters/_frontend_filters/index.html",
    "revision": "49c3d9adf614a2a32821aab750f7147b"
  },
  {
    "url": "hooks/filters/_general_filters/index.html",
    "revision": "047389a5e3fa371f392407bc2d863d6d"
  },
  {
    "url": "hooks/filters/_other_filters/index.html",
    "revision": "354ded25bee78c057da4ed7bc6fd4364"
  },
  {
    "url": "hooks/filters/_webhook_filters/index.html",
    "revision": "6e9d247c74ac9ee5e703d6aff9224b6b"
  },
  {
    "url": "hooks/filters/index.html",
    "revision": "45149e9836aaa1308ba7133157f0f4a4"
  },
  {
    "url": "index.html",
    "revision": "1a7e4c0920c275cb323dc88963adfde2"
  },
  {
    "url": "modules/action/index.html",
    "revision": "89726009c5423479d3dacfcbe9b5e27f"
  },
  {
    "url": "modules/automation/index.html",
    "revision": "145443808f85c4d1d774280e9aad0e61"
  },
  {
    "url": "modules/benchmark/index.html",
    "revision": "7deac2c70db4713c9cea810ec4fcb764"
  },
  {
    "url": "modules/contact-profile-section/index.html",
    "revision": "5d310cff7cdcde11a1ee97c74528ccd0"
  },
  {
    "url": "modules/form-field-code-structure/index.html",
    "revision": "6564ea8e823cb526460d45ead91eb08a"
  },
  {
    "url": "modules/index.html",
    "revision": "d756420082801eb06a1ec1fbd50a845b"
  },
  {
    "url": "modules/navigation-modules/index.html",
    "revision": "19c393db100794ac29d476b843711cad"
  },
  {
    "url": "modules/smart-code/index.html",
    "revision": "31818e02639bd56d1c26c7d436fad612"
  },
  {
    "url": "modules/trigger/index.html",
    "revision": "a2ae75ee4c5a82ee6bebfabb69bf9dba"
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
