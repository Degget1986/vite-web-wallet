!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/webview/",n(n.s="HSfu")}({"644g":function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return o}));var i=navigator.userAgent,r=null!=i.match(/vite/i),o=(i.match(/iPhone|iP(o|a)d/i),i.match(/android/i),null!=i.match(/micromessage/i))},HSfu:function(t,e,n){"use strict";n.r(e);n("h5TI");var i,r,o=n("m8P/"),u=n("644g"),c=n("m3rI"),l="".concat(c.c,"?vitex_invite_code=").concat(o.a.vitex_invite_code),a="viteapp://open?url=".concat(encodeURI(l));u.a?location.href=l:u.b||(i=a,r=0,document.addEventListener("visibilitychange",(function(){document.hidden&&clearTimeout(r)}),!1),location.href=i,r=window.setTimeout((function(){console.log("download")}),3e3))},h5TI:function(t,e,n){},m3rI:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"e",(function(){return r})),n.d(e,"d",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"b",(function(){return c}));var i="https://premainnet.vitewallet.com/test/ios",r="https://vite-wallet-test.netlify.com/vitex_invite_outer/index.html",o="https://vite-wallet-test.netlify.com/webview/vitex_invite_middle/index.html",u="https://vite-wallet-test.netlify.com/webview/vitex_invite_inner/index.html",c="https://vitex.vite.net/test/api/v1/inviter"},"m8P/":function(t,e,n){"use strict";function i(t){var e={vitex_invite_code:""};return 0===t.length?e:("?"===t[0]&&(t=t.slice(1)),0===t.length?e:(t.split("&").forEach((function(t){var n=t.split("=");n.length>1&&(e[n[0]]=n[1])})),e))}n.d(e,"b",(function(){return i})),e.a=i(location.search)}});