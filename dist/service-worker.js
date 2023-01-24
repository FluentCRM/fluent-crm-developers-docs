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
    "revision": "2bd62a00d3c76ec7b7d78ba8d3baca8e"
  },
  {
    "url": "assets/css/0.styles.6c970851.css",
    "revision": "2ba118eb10f635423c7f32e3eca7b859"
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
    "url": "assets/js/1.ccc50939.js",
    "revision": "14f32da86f4a905254abb425e15196ed"
  },
  {
    "url": "assets/js/10.a93ee020.js",
    "revision": "4e2fdec732b99397f9c7885e74a93344"
  },
  {
    "url": "assets/js/11.6de29fb5.js",
    "revision": "baaae31874f69fece6e985b463f1cc44"
  },
  {
    "url": "assets/js/12.8bb2c031.js",
    "revision": "76a32f0de8590f01b16dff01d7415dfb"
  },
  {
    "url": "assets/js/13.8b90f23a.js",
    "revision": "da5abee70d7aa9ea360a5e3a5aea64d4"
  },
  {
    "url": "assets/js/14.fe783837.js",
    "revision": "f775f6fd77cfa3090f8c1a2d261fff30"
  },
  {
    "url": "assets/js/15.b92236f9.js",
    "revision": "91049e1cb6e2a19d2f5baae86ee4d4b6"
  },
  {
    "url": "assets/js/16.c05916cc.js",
    "revision": "4f2f6b03bf6d357c0677159238897b74"
  },
  {
    "url": "assets/js/17.d43d02a0.js",
    "revision": "621fce6670913be87bbe3298f7a9b8db"
  },
  {
    "url": "assets/js/18.3533050d.js",
    "revision": "e778509d76d4973f69a3e5dea6dd49d8"
  },
  {
    "url": "assets/js/19.027ffb1b.js",
    "revision": "fcd98392d570ec1c300a7812a405c49f"
  },
  {
    "url": "assets/js/20.32ea98ef.js",
    "revision": "45a17f700cf91b6cf916a25736d884b3"
  },
  {
    "url": "assets/js/21.78e59a6b.js",
    "revision": "0ac54d2509f73f1b32fc25cdd1f23dd8"
  },
  {
    "url": "assets/js/22.82643910.js",
    "revision": "eb4cc3c8ba72b49988a69ffab2b75ece"
  },
  {
    "url": "assets/js/23.5118c40d.js",
    "revision": "2a7c7b64d2ca1df0320b2d349bc67767"
  },
  {
    "url": "assets/js/24.7d372983.js",
    "revision": "2f5b82fd4b6302fea38e9ad468af7ab3"
  },
  {
    "url": "assets/js/25.0bdb77f4.js",
    "revision": "6ba76eb4a03c394a123eed3ec29c1154"
  },
  {
    "url": "assets/js/26.c32c3ff9.js",
    "revision": "9425d46284c19e5eadbfe1f79f5bdae1"
  },
  {
    "url": "assets/js/27.044ab364.js",
    "revision": "22eb5cc24f86bb17c94c9db41aae10a9"
  },
  {
    "url": "assets/js/28.3b913a8e.js",
    "revision": "ae3ac088992432f9e144d4c75cbdd7e8"
  },
  {
    "url": "assets/js/29.504c4933.js",
    "revision": "db2f2297c057dd80706471d2429bf6ed"
  },
  {
    "url": "assets/js/30.0464ba36.js",
    "revision": "37d77ec5a1f004046653d0e1eee1b5b8"
  },
  {
    "url": "assets/js/31.3231bcf1.js",
    "revision": "34f24d196fe5e938cd31c385bed175b9"
  },
  {
    "url": "assets/js/32.62bf3865.js",
    "revision": "fe05f54dc7f2f2fb80cea21f95314052"
  },
  {
    "url": "assets/js/33.7c677f9d.js",
    "revision": "dde1b380d2194bae619336f27637b62b"
  },
  {
    "url": "assets/js/34.78fc7f36.js",
    "revision": "d1ecc575b4449e9889878f22976e676c"
  },
  {
    "url": "assets/js/35.abc2a4bb.js",
    "revision": "21241444e7b54e6d7d18e8e32e4ec413"
  },
  {
    "url": "assets/js/36.b2d45da2.js",
    "revision": "1cee880d58cff5f6a7378921c93a47ee"
  },
  {
    "url": "assets/js/37.10e05bfc.js",
    "revision": "01f342987d7024c95c3a94756b1b36eb"
  },
  {
    "url": "assets/js/38.67de45a5.js",
    "revision": "600421b4942ce729dffb995c54ea84d4"
  },
  {
    "url": "assets/js/39.02647e0c.js",
    "revision": "9140501d4d0335030f526303ec982866"
  },
  {
    "url": "assets/js/4.202d7228.js",
    "revision": "0d7b1555dc85482b77f3191224fc6905"
  },
  {
    "url": "assets/js/40.f6d5ebcf.js",
    "revision": "7f14454e93fd66242432e350bc6b1857"
  },
  {
    "url": "assets/js/41.b93e1d1c.js",
    "revision": "d96069f2aaf6b756b1c633331df7857e"
  },
  {
    "url": "assets/js/42.3613ef44.js",
    "revision": "3842e76a79042bba1ae967e2c7a6b841"
  },
  {
    "url": "assets/js/43.a3e3a2b2.js",
    "revision": "2f38beba1d286d2d4af7e4f6ca2861e3"
  },
  {
    "url": "assets/js/44.6c1d679f.js",
    "revision": "3b3551111fe69bc051aa68ceeefe28cd"
  },
  {
    "url": "assets/js/45.caa29800.js",
    "revision": "b39e1db3bb0922212316fabb72e76fe4"
  },
  {
    "url": "assets/js/46.b05d1d62.js",
    "revision": "2977d6dcb4e3a1092c3a00825a57a098"
  },
  {
    "url": "assets/js/47.8a57019c.js",
    "revision": "b0ec3042447b471d83114abe60a7bc40"
  },
  {
    "url": "assets/js/48.cf65302a.js",
    "revision": "5f239c88960200d3fc5155541f0c7d72"
  },
  {
    "url": "assets/js/49.bc869897.js",
    "revision": "2c28bf8c20ed4007782c845474541bb9"
  },
  {
    "url": "assets/js/5.36d7588c.js",
    "revision": "dd26b87c0ab86120fdbde6acb6e41364"
  },
  {
    "url": "assets/js/50.74233c86.js",
    "revision": "ec157531290d297255e1bd8e018cc186"
  },
  {
    "url": "assets/js/51.4092c465.js",
    "revision": "6602f0d33617935e8d4808b5cd051946"
  },
  {
    "url": "assets/js/52.e0648eb3.js",
    "revision": "2886005ac9ee23baf8425bd76ba82db7"
  },
  {
    "url": "assets/js/53.36094df0.js",
    "revision": "38d8b658678397789cee5ff5305954f2"
  },
  {
    "url": "assets/js/54.e1c05629.js",
    "revision": "890b3bd7b3bc57f27784d39c52655230"
  },
  {
    "url": "assets/js/55.bbd54bbb.js",
    "revision": "e88aa671530d58aaf56846ca4d76b7e0"
  },
  {
    "url": "assets/js/56.1fb2a423.js",
    "revision": "b6557616b809776a76615ea5b35bd0ce"
  },
  {
    "url": "assets/js/57.22199256.js",
    "revision": "9fb0cf9352321d6fcc492353f8f254a5"
  },
  {
    "url": "assets/js/58.7eb15f0c.js",
    "revision": "d1ea4335033d5529d0a047e683300a04"
  },
  {
    "url": "assets/js/59.c3612d84.js",
    "revision": "5bbb7dc78c7fa876cbc996592a2fdd2f"
  },
  {
    "url": "assets/js/6.25d6c35f.js",
    "revision": "0ba58f2ff3bafefca33ace23b9a36ed5"
  },
  {
    "url": "assets/js/60.018202f2.js",
    "revision": "d1eb28584ed37c029446eb8b0d847962"
  },
  {
    "url": "assets/js/61.a92bd38c.js",
    "revision": "1afcadd0197da61fd79e3bcdbdd5b6b8"
  },
  {
    "url": "assets/js/62.c7d01b92.js",
    "revision": "438207985ea5c3c02e9cd9e6202a2e1a"
  },
  {
    "url": "assets/js/63.e1481903.js",
    "revision": "fca3c549743e33179f1b03add739e6ae"
  },
  {
    "url": "assets/js/64.b40f70c8.js",
    "revision": "b252cac0dd0bb7239e3d285f0eef3618"
  },
  {
    "url": "assets/js/65.7ccf9ed5.js",
    "revision": "985a7d22a0de956171f79e44f0bf40e4"
  },
  {
    "url": "assets/js/66.9286d4d1.js",
    "revision": "181121a811da891a82d5c7785603db54"
  },
  {
    "url": "assets/js/67.c20526c6.js",
    "revision": "61f9c70a9cf5e45901768a64bb3c4690"
  },
  {
    "url": "assets/js/68.fe196dcb.js",
    "revision": "3ad61582af78e6f7efe5ef2cce5027fb"
  },
  {
    "url": "assets/js/69.21684ea4.js",
    "revision": "f5e8a46e0dc2a3c46b48e01a6f47c486"
  },
  {
    "url": "assets/js/7.28dee799.js",
    "revision": "e11a4985640666305c20a88f80733706"
  },
  {
    "url": "assets/js/70.15c0a79d.js",
    "revision": "ac561cfb4fe0b86e5225643fb4df11dc"
  },
  {
    "url": "assets/js/71.841dedc1.js",
    "revision": "bebad71cf0974af11e949c9c535d082b"
  },
  {
    "url": "assets/js/72.3cb42c08.js",
    "revision": "1349aad28ce973485c27d19c4dcfe1b8"
  },
  {
    "url": "assets/js/73.23e90daf.js",
    "revision": "98d8171534ea0d1945e45a7caa14c82e"
  },
  {
    "url": "assets/js/74.0656a71e.js",
    "revision": "75f37107b43441cb97abe6a5b83f290b"
  },
  {
    "url": "assets/js/75.52e77de1.js",
    "revision": "f6a9b24742c7512632c6202c3af6a51d"
  },
  {
    "url": "assets/js/76.b14e2b95.js",
    "revision": "6e44bc05a0b431143b7f477841b1a1d6"
  },
  {
    "url": "assets/js/77.8e45f1ab.js",
    "revision": "1ab245bc6e2e9fe6cce22f83099e3818"
  },
  {
    "url": "assets/js/78.ebb6457f.js",
    "revision": "9cc60447b0819eb38bef6621aebe7fda"
  },
  {
    "url": "assets/js/79.24736f95.js",
    "revision": "e264054ede273ba9dffd051b9721d738"
  },
  {
    "url": "assets/js/8.a42d882d.js",
    "revision": "14c48b844a3040894381ca2ef414c2cb"
  },
  {
    "url": "assets/js/9.58f3ec84.js",
    "revision": "0d9a8b39967845b3bfe871a9729412ad"
  },
  {
    "url": "assets/js/app.54af8faa.js",
    "revision": "9c965bc9220dbf707c59136e9c8d2fed"
  },
  {
    "url": "assets/js/vendors~docsearch.e9e545df.js",
    "revision": "4d038f055e6aaf00168ac6f0b3ae1f40"
  },
  {
    "url": "cli/index.html",
    "revision": "ddee07d3b081ec6ddcc5c3f92d73a0b1"
  },
  {
    "url": "database/_parts/_funnel_schema/index.html",
    "revision": "66913d3a84a25333ab43435ef54a0b46"
  },
  {
    "url": "database/_parts/_subscriber_schema/index.html",
    "revision": "fbec0590e7666059f1e540270726d52f"
  },
  {
    "url": "database/index.html",
    "revision": "08bd8e4f7aa5e81c1830be8f60967742"
  },
  {
    "url": "database/models/campaign-email/index.html",
    "revision": "b5deba2b3eed20fab2f76ec12d3f0762"
  },
  {
    "url": "database/models/campaign-url-matrix/index.html",
    "revision": "7a9e34afb81ad7e0f411d67bff16ac38"
  },
  {
    "url": "database/models/campaign/index.html",
    "revision": "cb519c3b1156d1a836c3056f91a60078"
  },
  {
    "url": "database/models/custom-contact-field/index.html",
    "revision": "d65e2a59b95243584f32b53a30db93a9"
  },
  {
    "url": "database/models/funnel/index.html",
    "revision": "8dfe0a1b5a6ed573ed6b8faa84a133c4"
  },
  {
    "url": "database/models/funnelMetric/index.html",
    "revision": "25420ea2dacad221c8166a69e720f5e6"
  },
  {
    "url": "database/models/funnelSequence/index.html",
    "revision": "d93c3ee43d8577bf156757c7d5808ab0"
  },
  {
    "url": "database/models/funnelSubscriber/index.html",
    "revision": "818d1a24b7d8d081c08202d5911e64c0"
  },
  {
    "url": "database/models/index.html",
    "revision": "4b7df1c7a3e1d216b3cc46ebb08b0d44"
  },
  {
    "url": "database/models/lists/index.html",
    "revision": "63cb8054aaa6b55b1d8b3c8ae4c2146e"
  },
  {
    "url": "database/models/meta/index.html",
    "revision": "7d2ed11d51ffebd77adefee224ce39df"
  },
  {
    "url": "database/models/subject/index.html",
    "revision": "967f2847347492abdcae512d3d3c9a8d"
  },
  {
    "url": "database/models/subscriber-meta/index.html",
    "revision": "6da0057f07ec567c5c30b1c50c3495f3"
  },
  {
    "url": "database/models/subscriber-note/index.html",
    "revision": "b408154cad9af4e0c466cb3ee07b2f05"
  },
  {
    "url": "database/models/subscriber-pivot/index.html",
    "revision": "f13259dc8ff15fd94aff2bf7e307fa77"
  },
  {
    "url": "database/models/subscriber/index.html",
    "revision": "92ffb1b00b4cc92620ea2cc563677c87"
  },
  {
    "url": "database/models/tag/index.html",
    "revision": "a9edcee8eaf4be61540cc5feb88b16c1"
  },
  {
    "url": "database/models/template/index.html",
    "revision": "d3af070704838eaedc82182555a826e0"
  },
  {
    "url": "database/models/url-store/index.html",
    "revision": "f6c21811878e14de2d51b7a9733c992b"
  },
  {
    "url": "database/models/user/index.html",
    "revision": "f3819999d17f40dab2bdc65d5fbc3088"
  },
  {
    "url": "database/models/webhook/index.html",
    "revision": "298d52351fd55f9db11ecbc6b1023be4"
  },
  {
    "url": "database/orm/collections/index.html",
    "revision": "7d628becdedbb58fb170f6b0d7810606"
  },
  {
    "url": "database/orm/index.html",
    "revision": "667c21f87bfc64631be2b1ea4d2d4417"
  },
  {
    "url": "database/orm/mutators/index.html",
    "revision": "99b79777234b9f3d0f75b18c0ac06209"
  },
  {
    "url": "database/orm/relationship/index.html",
    "revision": "78106cac3588f7a420688d63929caba2"
  },
  {
    "url": "database/orm/serialization/index.html",
    "revision": "468ff273e1fbbc8583f0ea36d731790d"
  },
  {
    "url": "database/query-builder/index.html",
    "revision": "d7d09b48e3ab33caca6f423d3a67812b"
  },
  {
    "url": "extending-rest-api/index.html",
    "revision": "5fd6457652c45a16ec20aa0ab227292d"
  },
  {
    "url": "favicon.png",
    "revision": "f1bdbf22fd49e4ac2daaef742e86d488"
  },
  {
    "url": "getting-started/index.html",
    "revision": "0c5aa39a54918c7d27936ec55fb8b1aa"
  },
  {
    "url": "global-functions/contact-api-function/index.html",
    "revision": "37056ae8e36d110733255d1d486c7ba3"
  },
  {
    "url": "global-functions/index.html",
    "revision": "7da79260d2ab27f660bde4ab50959ac6"
  },
  {
    "url": "global-functions/list-api-function/index.html",
    "revision": "ce36e62ee134d3c2079d612e84990af6"
  },
  {
    "url": "global-functions/tag-api-function/index.html",
    "revision": "9239402615d4c31d838cd6ef3c846711"
  },
  {
    "url": "helpers/arr/index.html",
    "revision": "710f435554231e759e5d0b9bcd95398a"
  },
  {
    "url": "helpers/index.html",
    "revision": "6a81874941797a8903fa8a8e55c34297"
  },
  {
    "url": "helpers/service_helper/index.html",
    "revision": "9254270cf73e161c1311d89dd29f226d"
  },
  {
    "url": "helpers/str/index.html",
    "revision": "011941cc593c2bf3d1df50b55d501cff"
  },
  {
    "url": "hook_changes/index.html",
    "revision": "b3642bb7dbacb596ab54412a4ff6bb10"
  },
  {
    "url": "hooks/actions/_campaign_hooks/index.html",
    "revision": "7f3a4bc59d707cab9bb8df31bb5ad14f"
  },
  {
    "url": "hooks/actions/_contact_activity_hooks/index.html",
    "revision": "0e9c48599abc408e0eaf5a2ab0c8b6e4"
  },
  {
    "url": "hooks/actions/_contact_hooks/index.html",
    "revision": "312e263ae6a866632efed11d726faf6e"
  },
  {
    "url": "hooks/actions/_double_optin_page/index.html",
    "revision": "8bd6a3d957b81e9eb6c64c98fad921bf"
  },
  {
    "url": "hooks/actions/_list_hooks/index.html",
    "revision": "2c41536cf74aca779e7954d0c2e22f90"
  },
  {
    "url": "hooks/actions/_manage_subscription_page/index.html",
    "revision": "4a12da10b2618f2028e7f580c54e0376"
  },
  {
    "url": "hooks/actions/_tag_hooks/index.html",
    "revision": "66613704723f5fe713734819da09ce01"
  },
  {
    "url": "hooks/actions/_template_hooks/index.html",
    "revision": "d86cea36d55242b32dab41b08ee6e822"
  },
  {
    "url": "hooks/actions/_unsubscribe_page_actions/index.html",
    "revision": "45aaa9993446002acbb6942fac6082bf"
  },
  {
    "url": "hooks/actions/_view_on_browser_page_actions/index.html",
    "revision": "1e331018ebb8175632bff808a3eef9da"
  },
  {
    "url": "hooks/actions/index.html",
    "revision": "26c2ceeaf6aac7bffef8d7973aea69f4"
  },
  {
    "url": "hooks/filters/_dashboard_filters/index.html",
    "revision": "1d4ddd01d06ba0dd2bdd03c52f740438"
  },
  {
    "url": "hooks/filters/_frontend_filters/index.html",
    "revision": "bbd8410b445f946ae485cfc1c1990fb2"
  },
  {
    "url": "hooks/filters/_general_filters/index.html",
    "revision": "47e265f7c32c211c27f4d19fa3c8dd04"
  },
  {
    "url": "hooks/filters/_other_filters/index.html",
    "revision": "0bb67dbbdcd2f5929c16db87f17223cd"
  },
  {
    "url": "hooks/filters/_webhook_filters/index.html",
    "revision": "1ed39c179a5b1b97654db57091fb80a9"
  },
  {
    "url": "hooks/filters/index.html",
    "revision": "487af50d3a0a27edc37caf66484cbc35"
  },
  {
    "url": "index.html",
    "revision": "b766239f0461e07582d4d5d370b2df5a"
  },
  {
    "url": "modules/action/index.html",
    "revision": "f4c8687391eba41dc990dd188a401d06"
  },
  {
    "url": "modules/automation/index.html",
    "revision": "4faacaf6cb3056119b23071a3d12e11f"
  },
  {
    "url": "modules/benchmark/index.html",
    "revision": "609bbc2b0abf9645564534bcf0403aa9"
  },
  {
    "url": "modules/contact-profile-section/index.html",
    "revision": "7b7c3e52f62d1641c913a87b73b7679c"
  },
  {
    "url": "modules/form-field-code-structure/index.html",
    "revision": "44b85e6c28b5a676bdb02ebd5d4cd113"
  },
  {
    "url": "modules/index.html",
    "revision": "0c93c69ef0992d667c2549afa74fa5c2"
  },
  {
    "url": "modules/navigation-modules/index.html",
    "revision": "9be9035850fb92c92960d44661ef310c"
  },
  {
    "url": "modules/smart-code/index.html",
    "revision": "402acebba73ee0da9e70fc2c60b5ee6b"
  },
  {
    "url": "modules/trigger/index.html",
    "revision": "8d85d73b830ad5c150b320079cabf8e2"
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
