﻿(function(){var aa=encodeURIComponent,f=window,n=Math;function Pc(a,b){return a.href=b}
var Qc="replace",q="data",m="match",xc="send",ja="port",u="createElement",id="setAttribute",da="getTime",A="split",B="location",ra="hasOwnProperty",ma="hostname",ga="search",E="protocol",Ab="href",kd="action",G="apply",p="push",h="hash",pa="test",ha="slice",r="cookie",t="indexOf",ia="defaultValue",v="name",y="length",Ga="sendBeacon",z="prototype",la="clientWidth",jd="target",C="call",na="clientHeight",F="substring",oa="navigator",H="join",I="toLowerCase";var $c=function(a){this.w=a||[]};$c[z].set=function(a){this.w[a]=!0};$c[z].encode=function(){for(var a=[],b=0;b<this.w[y];b++)this.w[b]&&(a[n.floor(b/6)]=a[n.floor(b/6)]^1<<b%6);for(b=0;b<a[y];b++)a[b]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[b]||0);return a[H]("")+"~"};var vd=new $c;function J(a){vd.set(a)}var Nd=function(a,b){var c=new $c(Dd(a));c.set(b);a.set(Gd,c.w)},Td=function(a){a=Dd(a);a=new $c(a);for(var b=vd.w[ha](),c=0;c<a.w[y];c++)b[c]=b[c]||a.w[c];return(new $c(b)).encode()},Dd=function(a){a=a.get(Gd);ka(a)||(a=[]);return a};var ea=function(a){return"function"==typeof a},ka=function(a){return"[object Array]"==Object[z].toString[C](Object(a))},qa=function(a){return void 0!=a&&-1<(a.constructor+"")[t]("String")},D=function(a,b){return 0==a[t](b)},sa=function(a){return a?a[Qc](/^[\s\xa0]+|[\s\xa0]+$/g,""):""},ta=function(a){var b=M[u]("img");b.width=1;b.height=1;b.src=a;return b},ua=function(){},K=function(a){if(aa instanceof Function)return aa(a);J(28);return a},L=function(a,b,c,d){try{a.addEventListener?a.addEventListener(b,
c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)}catch(e){J(27)}},wa=function(a,b){if(a){var c=M[u]("script");c.type="text/javascript";c.async=!0;c.src=a;b&&(c.id=b);var d=M.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d)}},Ud=function(){return"https:"==M[B][E]},xa=function(){var a=""+M[B][ma];return 0==a[t]("www.")?a[F](4):a},ya=function(a){var b=M.referrer;if(/^https?:\/\//i[pa](b)){if(a)return b;a="//"+M[B][ma];var c=b[t](a);if(5==c||6==c)if(a=b.charAt(c+a[y]),"/"==a||"?"==a||""==
a||":"==a)return;return b}},za=function(a,b){if(1==b[y]&&null!=b[0]&&"object"===typeof b[0])return b[0];for(var c={},d=n.min(a[y]+1,b[y]),e=0;e<d;e++)if("object"===typeof b[e]){for(var g in b[e])b[e][ra](g)&&(c[g]=b[e][g]);break}else e<a[y]&&(c[a[e]]=b[e]);return c};var ee=function(){this.keys=[];this.values={};this.m={}};ee[z].set=function(a,b,c){this.keys[p](a);c?this.m[":"+a]=b:this.values[":"+a]=b};ee[z].get=function(a){return this.m[ra](":"+a)?this.m[":"+a]:this.values[":"+a]};ee[z].map=function(a){for(var b=0;b<this.keys[y];b++){var c=this.keys[b],d=this.get(c);d&&a(c,d)}};var O=f,M=document,Mc=function(){for(var a=O[oa].userAgent+(M[r]?M[r]:"")+(M.referrer?M.referrer:""),b=a[y],c=O.history[y];0<c;)a+=c--^b++;return La(a)};var Aa=function(a){var b=O._gaUserPrefs;if(b&&b.ioo&&b.ioo()||a&&!0===O["ga-disable-"+a])return!0;try{var c=O.external;if(c&&c._gaUserPrefs&&"oo"==c._gaUserPrefs)return!0}catch(d){}return!1};var Ca=function(a){var b=[],c=M[r][A](";");a=new RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$");for(var d=0;d<c[y];d++){var e=c[d][m](a);e&&b[p](e[1])}return b},zc=function(a,b,c,d,e,g){e=Aa(e)?!1:eb[pa](M[B][ma])||"/"==c&&vc[pa](d)?!1:!0;if(!e)return!1;b&&1200<b[y]&&(b=b[F](0,1200),J(24));c=a+"="+b+"; path="+c+"; ";g&&(c+="expires="+(new Date((new Date)[da]()+g)).toGMTString()+"; ");d&&"none"!=d&&(c+="domain="+d+";");d=M[r];M.cookie=c;if(!(d=d!=M[r]))t:{a=Ca(a);for(d=0;d<a[y];d++)if(b==a[d]){d=!0;break t}d=
!1}return d},Cc=function(a){return K(a)[Qc](/\(/g,"%28")[Qc](/\)/g,"%29")},vc=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,eb=/(^|\.)doubleclick\.net$/i;var oc=function(){return(Ba||Ud()?"https:":"http:")+"//www.google-analytics.com"},Da=function(a){this.name="len";this.message=a+"-8192"},wc=function(a,b,c){var d=ta(a+"?"+b);d.onload=d.onerror=function(){d.onload=null;d.onerror=null;c()}},xd=function(a,b,c){var d;d=O.XDomainRequest;if(!d)return!1;d=new d;d.open("POST",a);d.onerror=function(){c()};d.onload=c;d[xc](b);return!0},wd=function(a,b,c){var d=O.XMLHttpRequest;if(!d)return!1;var e=new d;if(!("withCredentials"in e))return!1;e.open("POST",a,
!0);e.withCredentials=!0;e.setRequestHeader("Content-Type","text/plain");e.onreadystatechange=function(){4==e.readyState&&(c(),e=null)};e[xc](b);return!0},ge=function(a,b,c){1<=100*n.random()||Aa("?")||(a=["t=error","_e="+a,"_v=j33","sr=1"],b&&a[p]("_f="+b),c&&a[p]("_m="+K(c[F](0,100))),a[p]("aip=1"),a[p]("z="+fe()),wc(oc()+"/collect",a[H]("&"),ua))};var Ha=function(){this.t=[]};Ha[z].add=function(a){this.t[p](a)};Ha[z].D=function(a){try{for(var b=0;b<this.t[y];b++){var c=a.get(this.t[b]);c&&ea(c)&&c[C](O,a)}}catch(d){}b=a.get(Ia);b!=ua&&ea(b)&&(a.set(Ia,ua,!0),setTimeout(b,10))};function Ja(a){if(100!=a.get(Ka)&&La(P(a,Q))%1E4>=100*R(a,Ka))throw"abort";}function Ma(a){if(Aa(P(a,Na)))throw"abort";}function Oa(){var a=M[B][E];if("http:"!=a&&"https:"!=a)throw"abort";}
function Pa(a){try{O.XMLHttpRequest&&"withCredentials"in new O.XMLHttpRequest?J(40):O.XDomainRequest&&J(41),O[oa][Ga]&&J(42)}catch(b){}a.set(ld,Td(a),!0);a.set(Ac,R(a,Ac)+1);var c=[];Qa.map(function(b,e){if(e.p){var g=a.get(b);void 0!=g&&g!=e[ia]&&("boolean"==typeof g&&(g*=1),c[p](e.p+"="+K(""+g)))}});c[p]("z="+Bd());a.set(Ra,c[H]("&"),!0)}
function Sa(a){var b=P(a,gd)||oc()+"/collect",c=P(a,Ra),d=a.get(Ia),e=a.get(Vd),d=d||ua;e&&(e=d,O[oa][Ga]?O[oa][Ga](b,c)?(e(),e=!0):e=!1:e=!1);if(!e)if(2036>=c[y])wc(b,c,d);else if(8192>=c[y])wd(b,c,d)||xd(b,c,d)||wc(b,c,d);else throw ge("len",c[y]),new Da(c[y]);a.set(Ia,ua,!0)}function Hc(a){var b=O.gaData;b&&(b.expId&&a.set(Nc,b.expId),b.expVar&&a.set(Oc,b.expVar))}function cd(){if(O[oa]&&"preview"==O[oa].loadPurpose)throw"abort";}
function yd(a){var b=O.gaDevIds;ka(b)&&0!=b[y]&&a.set("&did",b[H](","),!0)}function vb(a){if(!a.get(Na))throw"abort";};var hd=function(){return n.round(2147483647*n.random())},Bd=function(){try{var a=new Uint32Array(1);O.crypto.getRandomValues(a);return a[0]&2147483647}catch(b){return hd()}},fe=hd;function Ta(a){var b=R(a,Ua);500<=b&&J(15);var c=P(a,Va);if("transaction"!=c&&"item"!=c){var c=R(a,Wa),d=(new Date)[da](),e=R(a,Xa);0==e&&a.set(Xa,d);e=n.round(2*(d-e)/1E3);0<e&&(c=n.min(c+e,20),a.set(Xa,d));if(0>=c)throw"abort";a.set(Wa,--c)}a.set(Ua,++b)};var Ya=function(){this.data=new ee},Qa=new ee,Za=[];Ya[z].get=function(a){var b=$a(a),c=this[q].get(a);b&&void 0==c&&(c=ea(b[ia])?b[ia]():b[ia]);return b&&b.n?b.n(this,a,c):c};var P=function(a,b){var c=a.get(b);return void 0==c?"":""+c},R=function(a,b){var c=a.get(b);return void 0==c||""===c?0:1*c};Ya[z].set=function(a,b,c){if(a)if("object"==typeof a)for(var d in a)a[ra](d)&&ab(this,d,a[d],c);else ab(this,a,b,c)};
var ab=function(a,b,c,d){if(void 0!=c)switch(b){case Na:wb[pa](c)}var e=$a(b);e&&e.o?e.o(a,b,c,d):a[q].set(b,c,d)},bb=function(a,b,c,d,e){this.name=a;this.p=b;this.n=d;this.o=e;this.defaultValue=c},$a=function(a){var b=Qa.get(a);if(!b)for(var c=0;c<Za[y];c++){var d=Za[c],e=d[0].exec(a);if(e){b=d[1](e);Qa.set(b[v],b);break}}return b},yc=function(a){var b;Qa.map(function(c,d){d.p==a&&(b=d)});return b&&b[v]},S=function(a,b,c,d,e){a=new bb(a,b,c,d,e);Qa.set(a[v],a);return a[v]},cb=function(a,b){Za[p]([new RegExp("^"+
a+"$"),b])},T=function(a,b,c){return S(a,b,c,void 0,db)},db=function(){};var gb=qa(f.GoogleAnalyticsObject)&&sa(f.GoogleAnalyticsObject)||"ga",Ba=!1,he=S("_br"),hb=T("apiVersion","v"),ib=T("clientVersion","_v");S("anonymizeIp","aip");var jb=S("adSenseId","a"),Va=S("hitType","t"),Ia=S("hitCallback"),Ra=S("hitPayload");S("nonInteraction","ni");S("currencyCode","cu");var Vd=S("useBeacon",void 0,!1);S("dataSource","ds");S("sessionControl","sc","");S("sessionGroup","sg");S("queueTime","qt");var Ac=S("_s","_s");S("screenName","cd");
var kb=S("location","dl",""),lb=S("referrer","dr"),mb=S("page","dp","");S("hostname","dh");var nb=S("language","ul"),ob=S("encoding","de");S("title","dt",function(){return M.title||void 0});cb("contentGroup([0-9]+)",function(a){return new bb(a[0],"cg"+a[1])});var pb=S("screenColors","sd"),qb=S("screenResolution","sr"),rb=S("viewportSize","vp"),sb=S("javaEnabled","je"),tb=S("flashVersion","fl");S("campaignId","ci");S("campaignName","cn");S("campaignSource","cs");S("campaignMedium","cm");
S("campaignKeyword","ck");S("campaignContent","cc");var ub=S("eventCategory","ec"),xb=S("eventAction","ea"),yb=S("eventLabel","el"),zb=S("eventValue","ev"),Bb=S("socialNetwork","sn"),Cb=S("socialAction","sa"),Db=S("socialTarget","st"),Eb=S("l1","plt"),Fb=S("l2","pdt"),Gb=S("l3","dns"),Hb=S("l4","rrt"),Ib=S("l5","srt"),Jb=S("l6","tcp"),Kb=S("l7","dit"),Lb=S("l8","clt"),Mb=S("timingCategory","utc"),Nb=S("timingVar","utv"),Ob=S("timingLabel","utl"),Pb=S("timingValue","utt");S("appName","an");
S("appVersion","av","");S("appId","aid","");S("appInstallerId","aiid","");S("exDescription","exd");S("exFatal","exf");var Nc=S("expId","xid"),Oc=S("expVar","xvar"),Rc=S("_utma","_utma"),Sc=S("_utmz","_utmz"),Tc=S("_utmht","_utmht"),Ua=S("_hc",void 0,0),Xa=S("_ti",void 0,0),Wa=S("_to",void 0,20);cb("dimension([0-9]+)",function(a){return new bb(a[0],"cd"+a[1])});cb("metric([0-9]+)",function(a){return new bb(a[0],"cm"+a[1])});S("linkerParam",void 0,void 0,Bc,db);var ld=S("usage","_u"),Gd=S("_um");
S("forceSSL",void 0,void 0,function(){return Ba},function(a,b,c){J(34);Ba=!!c});var ed=S("_j1","jid"),Hd=S("_j2","gjid");cb("\\&(.*)",function(a){var b=new bb(a[0],a[1]),c=yc(a[0][F](1));c&&(b.n=function(a){return a.get(c)},b.o=function(a,b,g,ca){a.set(c,g,ca)},b.p=void 0);return b});
var Qb=T("_oot"),dd=S("previewTask"),Rb=S("checkProtocolTask"),md=S("validationTask"),Sb=S("checkStorageTask"),Uc=S("historyImportTask"),Tb=S("samplerTask"),Vb=T("_rlt"),Wb=S("buildHitTask"),Xb=S("sendHitTask"),Vc=S("ceTask"),zd=S("devIdTask"),Cd=S("timingTask"),Ld=S("displayFeaturesTask"),V=T("name"),Q=T("clientId","cid"),Ad=S("userId","uid"),Na=T("trackingId","tid"),U=T("cookieName",void 0,"_ga"),W=T("cookieDomain"),Yb=T("cookiePath",void 0,"/"),Zb=T("cookieExpires",void 0,63072E3),$b=T("legacyCookieDomain"),
Wc=T("legacyHistoryImport",void 0,!0),ac=T("storage",void 0,"cookie"),bc=T("allowLinker",void 0,!1),cc=T("allowAnchor",void 0,!0),Ka=T("sampleRate","sf",100),dc=T("siteSpeedSampleRate",void 0,1),ec=T("alwaysSendReferrer",void 0,!1),gd=S("transportUrl"),Md=S("_r","_r");function X(a,b,c,d){b[a]=function(){try{return d&&J(d),c[G](this,arguments)}catch(b){throw ge("exc",a,b&&b[v]),b;}}};var Od=function(a,b,c){this.V=1E4;this.fa=a;this.$=!1;this.B=b;this.ea=c||1},Ed=function(a,b){var c;if(a.fa&&a.$)return 0;a.$=!0;if(b){if(a.B&&R(b,a.B))return R(b,a.B);if(0==b.get(dc))return 0}if(0==a.V)return 0;void 0===c&&(c=Bd());return 0==c%a.V?n.floor(c/a.V)%a.ea+1:0};var ie=new Od(!0,he,5),je=function(a){if(!Ud()&&!Ba){var b=Ed(ie,a);if(b&&(O[oa][Ga]||!(4<=b))){var c=(new Date).getHours(),d=[Bd(),Bd(),Bd()][H](".");a=(3==b||5==b?"https:":"http:")+"//www.google-analytics.com/collect?z=br.";a+=[b,"A",c,d][H](".");var e=1!=b&&4!=b?"https:":"http:",e=e+"//www.google-analytics.com/collect?z=br.",e=e+[b,"B",c,d][H]("."),c=function(){4<=b?O[oa][Ga](e,""):ta(e)};Bd()%2?(ta(a),c()):(c(),ta(a))}}};function fc(){var a,b,c;if((c=(c=O[oa])?c.plugins:null)&&c[y])for(var d=0;d<c[y]&&!b;d++){var e=c[d];-1<e[v][t]("Shockwave Flash")&&(b=e.description)}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),b=a.GetVariable("$version")}catch(g){}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),b="WIN 6,0,21,0",a.AllowScriptAccess="always",b=a.GetVariable("$version")}catch(ca){}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),b=a.GetVariable("$version")}catch(l){}b&&
(a=b[m](/[\d]+/g))&&3<=a[y]&&(b=a[0]+"."+a[1]+" r"+a[2]);return b||void 0};var gc=function(a,b){var c=n.min(R(a,dc),100);if(!(La(P(a,Q))%100>=c)&&(c={},Ec(c)||Fc(c))){var d=c[Eb];void 0==d||Infinity==d||isNaN(d)||(0<d?(Y(c,Gb),Y(c,Jb),Y(c,Ib),Y(c,Fb),Y(c,Hb),Y(c,Kb),Y(c,Lb),b(c)):L(O,"load",function(){gc(a,b)},!1))}},Ec=function(a){var b=O.performance||O.webkitPerformance,b=b&&b.timing;if(!b)return!1;var c=b.navigationStart;if(0==c)return!1;a[Eb]=b.loadEventStart-c;a[Gb]=b.domainLookupEnd-b.domainLookupStart;a[Jb]=b.connectEnd-b.connectStart;a[Ib]=b.responseStart-b.requestStart;
a[Fb]=b.responseEnd-b.responseStart;a[Hb]=b.fetchStart-c;a[Kb]=b.domInteractive-c;a[Lb]=b.domContentLoadedEventStart-c;return!0},Fc=function(a){if(O.top!=O)return!1;var b=O.external,c=b&&b.onloadT;b&&!b.isValidLoadTime&&(c=void 0);2147483648<c&&(c=void 0);0<c&&b.setPageReadyTime();if(void 0==c)return!1;a[Eb]=c;return!0},Y=function(a,b){var c=a[b];if(isNaN(c)||Infinity==c||0>c)a[b]=void 0},Fd=function(a){return function(b){"pageview"!=b.get(Va)||a.I||(a.I=!0,gc(b,function(b){a[xc]("timing",b)}))}};var hc=!1,mc=function(a){if("cookie"==P(a,ac)){var b=P(a,U),c=nd(a),d=kc(P(a,Yb)),e=lc(P(a,W)),g=1E3*R(a,Zb),ca=P(a,Na);if("auto"!=e)zc(b,c,d,e,ca,g)&&(hc=!0);else{J(32);var l;t:{c=[];e=xa()[A](".");if(4==e[y]&&(l=e[e[y]-1],parseInt(l,10)==l)){l=["none"];break t}for(l=e[y]-2;0<=l;l--)c[p](e[ha](l)[H]("."));c[p]("none");l=c}for(var k=0;k<l[y];k++)if(e=l[k],a[q].set(W,e),c=nd(a),zc(b,c,d,e,ca,g)){hc=!0;return}a[q].set(W,"auto")}}},nc=function(a){if("cookie"==P(a,ac)&&!hc&&(mc(a),!hc))throw"abort";},
Yc=function(a){if(a.get(Wc)){var b=P(a,W),c=P(a,$b)||xa(),d=Xc("__utma",c,b);d&&(J(19),a.set(Tc,(new Date)[da](),!0),a.set(Rc,d.R),(b=Xc("__utmz",c,b))&&d[h]==b[h]&&a.set(Sc,b.R))}},nd=function(a){var b=Cc(P(a,Q)),c=ic(P(a,W));a=jc(P(a,Yb));1<a&&(c+="-"+a);return["GA1",c,b][H](".")},Gc=function(a,b,c){for(var d=[],e=[],g,ca=0;ca<a[y];ca++){var l=a[ca];if(l.r[c]==b)d[p](l);else void 0==g||l.r[c]<g?(e=[l],g=l.r[c]):l.r[c]==g&&e[p](l)}return 0<d[y]?d:e},lc=function(a){return 0==a[t](".")?a.substr(1):
a},ic=function(a){return lc(a)[A](".")[y]},kc=function(a){if(!a)return"/";1<a[y]&&a.lastIndexOf("/")==a[y]-1&&(a=a.substr(0,a[y]-1));0!=a[t]("/")&&(a="/"+a);return a},jc=function(a){a=kc(a);return"/"==a?1:a[A]("/")[y]};function Xc(a,b,c){"none"==b&&(b="");var d=[],e=Ca(a);a="__utma"==a?6:2;for(var g=0;g<e[y];g++){var ca=(""+e[g])[A](".");ca[y]>=a&&d[p]({hash:ca[0],R:e[g],O:ca})}return 0==d[y]?void 0:1==d[y]?d[0]:Zc(b,d)||Zc(c,d)||Zc(null,d)||d[0]}function Zc(a,b){var c,d;null==a?c=d=1:(c=La(a),d=La(D(a,".")?a[F](1):"."+a));for(var e=0;e<b[y];e++)if(b[e][h]==c||b[e][h]==d)return b[e]};var od=new RegExp(/^https?:\/\/([^\/:]+)/),pd=/(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)/;function Bc(a){a=a.get(Q);var b=Ic(a,0);return"_ga=1."+K(b+"."+a)}function Ic(a,b){for(var c=new Date,d=O[oa],e=d.plugins||[],c=[a,d.userAgent,c.getTimezoneOffset(),c.getYear(),c.getDate(),c.getHours(),c.getMinutes()+b],d=0;d<e[y];++d)c[p](e[d].description);return La(c[H]("."))}var Dc=function(a){J(48);this.target=a;this.T=!1};
Dc[z].Q=function(a,b){if(a.tagName){if("a"==a.tagName[I]()){a[Ab]&&Pc(a,qd(this,a[Ab],b));return}if("form"==a.tagName[I]())return rd(this,a)}if("string"==typeof a)return qd(this,a,b)};
var qd=function(a,b,c){var d=pd.exec(b);d&&3<=d[y]&&(b=d[1]+(d[3]?d[2]+d[3]:""));a=a[jd].get("linkerParam");var e=b[t]("?"),d=b[t]("#");c?b+=(-1==d?"#":"&")+a:(c=-1==e?"?":"&",b=-1==d?b+(c+a):b[F](0,d)+c+a+b[F](d));return b},rd=function(a,b){if(b&&b[kd]){var c=a[jd].get("linkerParam")[A]("=")[1];if("get"==b.method[I]()){for(var d=b.childNodes||[],e=0;e<d[y];e++)if("_ga"==d[e][v]){d[e][id]("value",c);return}d=M[u]("input");d[id]("type","hidden");d[id]("name","_ga");d[id]("value",c);b.appendChild(d)}else"post"==
b.method[I]()&&(b.action=qd(a,b[kd]))}};
Dc[z].S=function(a,b,c){function d(c){try{c=c||O.event;var d;t:{var g=c[jd]||c.srcElement;for(c=100;g&&0<c;){if(g[Ab]&&g.nodeName[m](/^a(?:rea)?$/i)){d=g;break t}g=g.parentNode;c--}d={}}("http:"==d[E]||"https:"==d[E])&&sd(a,d[ma]||"")&&d[Ab]&&Pc(d,qd(e,d[Ab],b))}catch(w){J(26)}}var e=this;this.T||(this.T=!0,L(M,"mousedown",d,!1),L(M,"touchstart",d,!1),L(M,"keyup",d,!1));if(c){c=function(b){b=b||O.event;if((b=b[jd]||b.srcElement)&&b[kd]){var c=b[kd][m](od);c&&sd(a,c[1])&&rd(e,b)}};for(var g=0;g<M.forms[y];g++)L(M.forms[g],
"submit",c)}};function sd(a,b){if(b==M[B][ma])return!1;for(var c=0;c<a[y];c++)if(a[c]instanceof RegExp){if(a[c][pa](b))return!0}else if(0<=b[t](a[c]))return!0;return!1};var Jd=function(a,b,c,d){this.U=b;this.aa=c;(b=d)||(b=(b=P(a,V))&&"t0"!=b?Wd[pa](b)?"_gat_"+Cc(P(a,Na)):"_gat_"+Cc(b):"_gat");this.Y=b},Rd=function(a,b){var c=b.get(Wb);b.set(Wb,function(b){Pd(a,b);var d=c(b);Qd(a,b);return d});var d=b.get(Xb);b.set(Xb,function(b){var c=d(b);Id(a,b);return c})},Pd=function(a,b){b.get(a.U)||("1"==Ca(a.Y)[0]?b.set(a.U,"",!0):b.set(a.U,""+fe(),!0))},Qd=function(a,b){b.get(a.U)&&zc(a.Y,"1",b.get(Yb),b.get(W),b.get(Na),6E5)},Id=function(a,b){if(b.get(a.U)){var c=new ee,
d=function(a){c.set($a(a).p,b.get(a))};d(hb);d(ib);d(Na);d(Q);d(a.U);c.set($a(ld).p,Td(b));var e=a.aa;c.map(function(a,b){e+=K(a)+"=";e+=K(""+b)+"&"});e+="z="+fe();ta(e);b.set(a.U,"",!0)}},Wd=/^gtm\d+$/;var fd=function(a,b){var c=a.b;if(!c.get("dcLoaded")){Nd(c,29);b=b||{};var d;b[U]&&(d=Cc(b[U]));d=new Jd(c,ed,"https://stats.g.doubleclick.net/collect?t=dc&aip=1&",d);Rd(d,c);c.set("dcLoaded",!0)}};var Sd=function(a){var b;b=a.get("dcLoaded")?!1:"cookie"!=a.get(ac)?!1:!0;b&&(Nd(a,51),b=new Jd(a,ed),Pd(b,a),Qd(b,a),a.get(b.U)&&(a.set(Md,1,!0),a.set(gd,oc()+"/r/collect",!0)))};var Kd=function(a,b){var c=a.b;if(!c.get("_rlsaLoaded")){Nd(c,38);b=b||{};if(b[U])var d=Cc(b[U]);d=new Jd(c,Hd,"https://www.google.com/ads/ga-audiences?t=sr&aip=1&",d);Rd(d,c);c.set("_rlsaLoaded",!0);tc("displayfeatures",a,b)}};var Lc=function(){var a=O.gaGlobal=O.gaGlobal||{};return a.hid=a.hid||fe()};var ad,bd=function(a,b,c){if(!ad){var d;d=M[B][h];var e=O[v],g=/^#?gaso=([^&]*)/;if(e=(d=(d=d&&d[m](g)||e&&e[m](g))?d[1]:Ca("GASO")[0]||"")&&d[m](/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i))zc("GASO",""+d,c,b,a,0),f._udo||(f._udo=b),f._utcp||(f._utcp=c),a=e[1],wa("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(a?"prefix="+a+"&":"")+fe(),"_gasojs");ad=!0}};var wb=/^(UA|YT|MO|GP)-(\d+)-(\d+)$/,pc=function(a){function b(a,b){d.b[q].set(a,b)}function c(a,c){b(a,c);d.filters.add(a)}var d=this;this.b=new Ya;this.filters=new Ha;b(V,a[V]);b(Na,sa(a[Na]));b(U,a[U]);b(W,a[W]||xa());b(Yb,a[Yb]);b(Zb,a[Zb]);b($b,a[$b]);b(Wc,a[Wc]);b(bc,a[bc]);b(cc,a[cc]);b(Ka,a[Ka]);b(dc,a[dc]);b(ec,a[ec]);b(ac,a[ac]);b(Ad,a[Ad]);b(hb,1);b(ib,"j33");c(Qb,Ma);c(dd,cd);c(Rb,Oa);c(md,vb);c(Sb,nc);c(Uc,Yc);c(Tb,Ja);c(Vb,Ta);c(Vc,Hc);c(zd,yd);c(Ld,Sd);c(Wb,Pa);c(Xb,Sa);c(Cd,Fd(this));
Jc(this.b,a[Q]);Kc(this.b);this.b.set(jb,Lc());bd(this.b.get(Na),this.b.get(W),this.b.get(Yb))},Jc=function(a,b){if("cookie"==P(a,ac)){hc=!1;var c;i:{var d=Ca(P(a,U));if(d&&!(1>d[y])){c=[];for(var e=0;e<d[y];e++){var g;g=d[e][A](".");var ca=g.shift();("GA1"==ca||"1"==ca)&&1<g[y]?(ca=g.shift()[A]("-"),1==ca[y]&&(ca[1]="1"),ca[0]*=1,ca[1]*=1,g={r:ca,s:g[H](".")}):g=void 0;g&&c[p](g)}if(1==c[y]){J(13);c=c[0].s;break i}if(0==c[y])J(12);else{J(14);d=ic(P(a,W));c=Gc(c,d,0);if(1==c[y]){c=c[0].s;break i}d=
jc(P(a,Yb));c=Gc(c,d,1);c=c[0]&&c[0].s;break i}}c=void 0}c||(c=P(a,W),d=P(a,$b)||xa(),c=Xc("__utma",d,c),void 0!=c?(J(10),c=c.O[1]+"."+c.O[2]):c=void 0);c&&(a[q].set(Q,c),hc=!0)}c=a.get(cc);if(e=(c=M[B][c?"href":"search"][m]("(?:&|#|\\?)"+K("_ga")[Qc](/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")+"=([^&#]*)"))&&2==c[y]?c[1]:"")a.get(bc)?(c=e[t]("."),-1==c?J(22):(d=e[F](c+1),"1"!=e[F](0,c)?J(22):(c=d[t]("."),-1==c?J(22):(e=d[F](0,c),c=d[F](c+1),e!=Ic(c,0)&&e!=Ic(c,-1)&&e!=Ic(c,-2)?J(23):(J(11),a[q].set(Q,
c)))))):J(21);b&&(J(9),a[q].set(Q,K(b)));a.get(Q)||((c=(c=O.gaGlobal&&O.gaGlobal.vid)&&-1!=c[ga](/^(?:utma\.)?\d+\.\d+$/)?c:void 0)?(J(17),a[q].set(Q,c)):(J(8),a[q].set(Q,[fe()^Mc()&2147483647,n.round((new Date)[da]()/1E3)][H]("."))));mc(a)},Kc=function(a){var b=O[oa],c=O.screen,d=M[B];a.set(lb,ya(a.get(ec)));if(d){var e=d.pathname||"";"/"!=e.charAt(0)&&(J(31),e="/"+e);a.set(kb,d[E]+"//"+d[ma]+e+d[ga])}c&&a.set(qb,c.width+"x"+c.height);c&&a.set(pb,c.colorDepth+"-bit");var c=M.documentElement,g=(e=
M.body)&&e[la]&&e[na],ca=[];c&&c[la]&&c[na]&&("CSS1Compat"===M.compatMode||!g)?ca=[c[la],c[na]]:g&&(ca=[e[la],e[na]]);c=0>=ca[0]||0>=ca[1]?"":ca[H]("x");a.set(rb,c);a.set(tb,fc());a.set(ob,M.characterSet||M.charset);a.set(sb,b&&"function"===typeof b.javaEnabled&&b.javaEnabled()||!1);a.set(nb,(b&&(b.language||b.browserLanguage)||"")[I]());if(d&&a.get(cc)&&(b=M[B][h])){b=b[A](/[?&#]+/);d=[];for(c=0;c<b[y];++c)(D(b[c],"utm_id")||D(b[c],"utm_campaign")||D(b[c],"utm_source")||D(b[c],"utm_medium")||D(b[c],
"utm_term")||D(b[c],"utm_content")||D(b[c],"gclid")||D(b[c],"dclid")||D(b[c],"gclsrc"))&&d[p](b[c]);0<d[y]&&(b="#"+d[H]("&"),a.set(kb,a.get(kb)+b))}};pc[z].get=function(a){return this.b.get(a)};pc[z].set=function(a,b){this.b.set(a,b)};var qc={pageview:[mb],event:[ub,xb,yb,zb],social:[Bb,Cb,Db],timing:[Mb,Nb,Pb,Ob]};
pc[z].send=function(a){if(!(1>arguments[y])){var b,c;"string"===typeof arguments[0]?(b=arguments[0],c=[][ha][C](arguments,1)):(b=arguments[0]&&arguments[0][Va],c=arguments);b&&(c=za(qc[b]||[],c),c[Va]=b,this.b.set(c,void 0,!0),this.filters.D(this.b),this.b[q].m={},je(this.b))}};var rc=function(a){if("prerender"==M.visibilityState)return!1;a();return!0};var td=/^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/,sc=function(a){if(ea(a[0]))this.u=a[0];else{var b=td.exec(a[0]);null!=b&&4==b[y]&&(this.c=b[1]||"t0",this.e=b[2]||"",this.d=b[3],this.a=[][ha][C](a,1),this.e||(this.A="create"==this.d,this.i="require"==this.d,this.g="provide"==this.d,this.ba="remove"==this.d),this.i&&(3<=this.a[y]?(this.X=this.a[1],this.W=this.a[2]):this.a[1]&&(qa(this.a[1])?this.X=this.a[1]:this.W=this.a[1])));b=a[1];a=a[2];if(!this.d)throw"abort";if(this.i&&(!qa(b)||""==b))throw"abort";if(this.g&&
(!qa(b)||""==b||!ea(a)))throw"abort";if(ud(this.c)||ud(this.e))throw"abort";if(this.g&&"t0"!=this.c)throw"abort";}};function ud(a){return 0<=a[t](".")||0<=a[t](":")};var Yd,Zd,$d;Yd=new ee;$d=new ee;Zd={ec:45,ecommerce:46,linkid:47};
var tc=function(a,b,c){b==N||b.get(V);var d=Yd.get(a);if(!ea(d))return!1;b.plugins_=b.plugins_||new ee;if(b.plugins_.get(a))return!0;b.plugins_.set(a,new d(b,c||{}));return!0},ae=function(a){function b(a){var b=(a[ma]||"")[A](":")[0][I](),c=(a[E]||"")[I](),c=1*a[ja]||("http:"==c?80:"https:"==c?443:"");a=a.pathname||"";D(a,"/")||(a="/"+a);return[b,""+c,a]}var c=M[u]("a");Pc(c,M[B][Ab]);var d=(c[E]||"")[I](),e=b(c),g=c[ga]||"",ca=d+"//"+e[0]+(e[1]?":"+e[1]:"");D(a,"//")?a=d+a:D(a,"/")?a=ca+a:!a||D(a,
"?")?a=ca+e[2]+(a||g):0>a[A]("/")[0][t](":")&&(a=ca+e[2][F](0,e[2].lastIndexOf("/"))+"/"+a);Pc(c,a);d=b(c);return{protocol:(c[E]||"")[I](),host:d[0],port:d[1],path:d[2],G:c[ga]||"",url:a||""}};var Z={ga:function(){Z.f=[]}};Z.ga();Z.D=function(a){var b=Z.J[G](Z,arguments),b=Z.f.concat(b);for(Z.f=[];0<b[y]&&!Z.v(b[0])&&!(b.shift(),0<Z.f[y]););Z.f=Z.f.concat(b)};
Z.J=function(a){for(var b=[],c=0;c<arguments[y];c++)try{var d=new sc(arguments[c]);if(d.g)Yd.set(d.a[0],d.a[1]);else{if(d.i){var e=d,g=e.a[0];if(!ea(Yd.get(g))&&!$d.get(g)){Zd[ra](g)&&J(Zd[g]);var ca=e.X;!ca&&Zd[ra](g)?(J(39),ca=g+".js"):J(43);if(ca){ca&&0<=ca[t]("/")||(ca=(Ba||Ud()?"https:":"http:")+"//www.google-analytics.com/plugins/ua/"+ca);var l=ae(ca),e=void 0;var k=l[E],w=M[B][E],e="https:"==k||k==w?!0:"http:"!=k?!1:"http:"==w;var Xd;if(Xd=e){var e=l,be=ae(M[B][Ab]);if(e.G||0<=e.url[t]("?")||
0<=e.path[t]("://"))Xd=!1;else if(e.host==be.host&&e[ja]==be[ja])Xd=!0;else{var ce="http:"==e[E]?80:443;Xd="www.google-analytics.com"==e.host&&(e[ja]||ce)==ce&&D(e.path,"/plugins/")?!0:!1}}Xd&&(wa(l.url),$d.set(g,!0))}}}b[p](d)}}catch(de){}return b};
Z.v=function(a){try{if(a.u)a.u[C](O,N.j("t0"));else{var b=a.c==gb?N:N.j(a.c);if(a.A)"t0"==a.c&&N.create[G](N,a.a);else if(a.ba)N.remove(a.c);else if(b)if(a.i){if(!tc(a.a[0],b,a.W))return!0}else if(a.e){var c=a.d,d=a.a,e=b.plugins_.get(a.e);e[c][G](e,d)}else b[a.d][G](b,a.a)}}catch(g){}};var N=function(a){J(1);Z.D[G](Z,[arguments])};N.h={};N.P=[];N.L=0;N.answer=42;var uc=[Na,W,V];N.create=function(a){var b=za(uc,[][ha][C](arguments));b[V]||(b[V]="t0");var c=""+b[V];if(N.h[c])return N.h[c];b=new pc(b);N.h[c]=b;N.P[p](b);return b};N.remove=function(a){for(var b=0;b<N.P[y];b++)if(N.P[b].get(V)==a){N.P.splice(b,1);N.h[a]=null;break}};N.j=function(a){return N.h[a]};N.K=function(){return N.P[ha](0)};
N.N=function(){"ga"!=gb&&J(49);var a=O[gb];if(!a||42!=a.answer){N.L=a&&a.l;N.loaded=!0;var b=O[gb]=N;X("create",b,b.create);X("remove",b,b.remove);X("getByName",b,b.j,5);X("getAll",b,b.K,6);b=pc[z];X("get",b,b.get,7);X("set",b,b.set,4);X("send",b,b[xc]);b=Ya[z];X("get",b,b.get);X("set",b,b.set);if(!Ud()&&!Ba){t:{for(var b=M.getElementsByTagName("script"),c=0;c<b[y]&&100>c;c++){var d=b[c].src;if(d&&0==d[t]("https://www.google-analytics.com/analytics")){J(33);b=!0;break t}}b=!1}b&&(Ba=!0)}Ud()||Ba||
!Ed(new Od)||(J(36),Ba=!0);(O.gaplugins=O.gaplugins||{}).Linker=Dc;b=Dc[z];Yd.set("linker",Dc);X("decorate",b,b.Q,20);X("autoLink",b,b.S,25);Yd.set("displayfeatures",fd);Yd.set("adfeatures",Kd);a=a&&a.q;ka(a)?Z.D[G](N,a):J(50)}};N.k=function(){for(var a=N.K(),b=0;b<a[y];b++)a[b].get(V)};
(function(){var a=N.N;if(!rc(a)){J(16);var b=!1,c=function(){if(!b&&rc(a)){b=!0;var d=c,e=M;e.removeEventListener?e.removeEventListener("visibilitychange",d,!1):e.detachEvent&&e.detachEvent("onvisibilitychange",d)}};L(M,"visibilitychange",c)}})();function La(a){var b=1,c=0,d;if(a)for(b=0,d=a[y]-1;0<=d;d--)c=a.charCodeAt(d),b=(b<<6&268435455)+c+(c<<14),c=b&266338304,b=0!=c?b^c>>21:b;return b};})(window);

	// Temporary storage for _gaq pushes
	var _gar = _gar || [];
	
	// Associated array of authorized tracker objects
	var _roit = _roit || {};

	// Main Tracker class, replaces _uat._getTrackerByName
	var ROITracker = ROITracker || undefined;

	// Prevent duplicate loading of library.
	if (typeof ROITracker !== "function") {
		/**
		 * @constructor Creates a new tracker object and assigns it the given name. If no name is give, one will be generated.
		 * Tracker objects are stored under their names so they can be retrieved via _getTrackerByName.
		 * If two trackers are created with the same name, the second will overwrite the first and the first will no longer be retrieveable via _getTrackerByName.
		 * @param {String} opt_account The full web property ID (e.g. UA-XXXXX-X) for the tracker object.
		 * @param {String} opt_name Optional name to store the tracker under. You should specify a name for all tracker objects except the global tracking object. DON'T USE UNDERSCORES IN NAME.
		 */
        ROITracker = function (opt_account, opt_name, opt_domainName) {
			var preferences = {
				// Whether or not debugging is turned on
				isDebug: false,

				// Whether or not this is a global tracker object.
				isGlobal: false,

				// Array of children tracker names;
				children: [],
				
				pluginsLoaded: [],

				// Associated Array of methods that should only be used once
				isMethodUsed: {
					_setDomainName: false,
					_setAllowHash: false
				},

				// Optional name space, usually used for alternate attribution models.
				nameSpace: null,

				// List of pending transactions
				transactions: [],

				// Call back function to be called on _trackTrans
				transCallBack: null
			};
			
			var helper = {				
				/**
				* Disables methods to prevent external method call from corrupting cookies.
				*/
				disableMethods: function() {
					for (methodName in preferences.isMethodUsed) {
						preferences.isMethodUsed[methodName] = true;
					}
				},

				/**
				* Store the id and value of the transaction for callback purposes
				* @param {String[]} transArray is an array containing the transaction information. It's assumed that the id is in slot 1 and the value is in slot 3.
				*/
				storeTransaction: function(transArray) {
					preferences.transactions.push({
						id: transArray[1],
						value: transArray[3]
					});
				},

				/**
				* Parses the utmForm to find transaction lines and store the information.
				*/
				handleUtmForm: function() {
					var utmTrans;
					var utmLines;
					var transArray;
					var i;
					var j;

					try {
						utmTrans = document.getElementById("utmtrans");
						utmLines = utmTrans.innerHTML.split("UTM:");

						for (i = 0; i < utmLines.length; i += 1) {
							if (utmLines[i]) {
								var utmFields = utmLines[i].split("|");
								if (utmFields[0] === "T") {
									helper.storeTransaction(utmFields);
								}
							}
						}
					} catch (e) { }
				},

				/**
				* Runs callBack function on all pending transactions.
				*/
				executeTransCallBack: function() {
					var i;
					var transaction;

					for (i = 0; i < preferences.transactions.length; i += 1) {
						transaction = preferences.transactions[i];
						preferences.transCallBack(transaction.value, transaction.id);
					}

					preferences.transactions = [];
				},
				
				/**
				 * Handles attribution models that require an alternate namespace.
				 * @param {String} opt_nameSpace Namespace of the tracker.
				 */
				handleNameSpace: function(opt_nameSpace) {
					// NameSpace specific cookies
					if (opt_nameSpace) {

						// store nameSpace with tracker object.
						preferences.nameSpace = opt_nameSpace;
					}
				},

				/**
				 * Provides means for alternative attribution models.
				 * @param {Boolean} opt_cpcTrump CPC trumps other sources.
				 * @param {Boolean} opt_firstTouch Report first source instead of last source.
				 * @param {String} opt_paidQueryRegex Optional alternate regular expression for paid based on query string. Default is gclid=|utm_medium=(cpc|ppc)
				 * @param {String} opt_paidCookieRegex Optional alternate regular expression for paid based on __utmz cookie. Default is utmgclid=|utmcmd=(cpc|ppc)
				 */
				handleAttribution: function(opt_cpcTrump, opt_firstTouch, opt_paidQueryRegex, opt_paidCookieRegex) {
					var isCPCCookie;
					var isCPCQuery;
					var isOverwrite = true;

					// Don't change attribution for first visit or direct visit.
					if (!helper.isFirstVisit() && !helper.isDirectCookie()) {

						// CPC Trump
						if (opt_cpcTrump) {
							isCPCCookie = helper.isCPCCookie(opt_paidCookieRegex);
							isCPCQuery = helper.isCPCQuery(opt_paidQueryRegex);

							// First Touch
							if (opt_firstTouch) {
								if (isCPCCookie || !isCPCQuery) {
									isOverwrite = false;
								}

							// Last touch
							} else if (isCPCCookie && !isCPCQuery) {
								isOverwrite = false;
							}

						// No trump
						} else if (opt_firstTouch) {
							isOverwrite = false;
						}
					}

					// Don't isOverwrite existing cookies.
					if (!isOverwrite) {
						ga(opt_name + 'set', 'referrer');
						ga(opt_name + 'set', 'campaignName');
						ga(opt_name + 'set', 'campaignMedium');
						ga(opt_name + 'set', 'campaignSource');
						ga(opt_name + 'set', 'campaignContent');
						ga(opt_name + 'set', 'campaignKeyword');
					}
				},

				/**
				 * Whether or not the query string is for paid traffic.
				 * @param {String} opt_paidQueryRegex Optional alternate regular expression for paid based on query string. Default is gclid=|utm_medium=(cpc|ppc)
				 * @return {Boolean} Query string is for paid traffic.
				 */
				isCPCQuery: function(opt_paidQueryRegex) {
					var paidQueryRegex = opt_paidQueryRegex || "gclid=|utm_medium=(cpc|ppc)";
					var cpcRegex = new RegExp("[?&#](" + paidQueryRegex + ")");

					return cpcRegex.test(location.href);
				},

				/**
				 * Whether or not this is the visitors first visit.
				 * @return {Boolean} First visit.
				 */
				isFirstVisit: function() {
					var firstRegex;

					if (preferences.nameSpace) {

						// alternate regex for namespace cookie.
						firstRegex = RegExp("(^|; )2__utmz=[^;]*\\^" + preferences.nameSpace);

					} else {
						firstRegex = /(^|; )__utmz=/;
					}

					return !firstRegex.test(document.cookie);
				},

				/**
				 * Whether or not the current referral information for the visitor is Direct.
				 * @return {Boolean} Direct visit.
				 */
				isDirectCookie: function() {
					var directRegex;

					if (preferences.nameSpace) {

						// alternate regex for namespace cookie.
						directRegex = RegExp("(^|; )2__utmz=[^;]*\\^" + preferences.nameSpace + "[^^;]*utmcsr=\\(direct\\)");

					} else {
						directRegex = /(^|; )__utmz=[^;]*utmcsr=\(direct\)/;
					}

					return directRegex.test(document.cookie);
				},

				/**
				 * Whether or not the current referral information for the visitor is a CPC referral.
				 * @param {String} opt_paidCookieRegex Optional alternate regular expression for paid based on __utmz cookie. Default is utmgclid=|utmcmd=(cpc|ppc)
				 * @return {Boolean} CPC referral.
				 */
				isCPCCookie: function(opt_paidCookieRegex) {
					var paidCookieRegex = opt_paidCookieRegex || "utmgclid=|utmcmd=(cpc|ppc)";
					var cpcRegex;

					if (preferences.nameSpace) {

						// alternate regex for namespace cookie.
						cpcRegex = RegExp("(^|; )2__utmz=[^;]*\\^" + preferences.nameSpace + "[^^;]*(" + paidCookieRegex + ")");

					} else {
						cpcRegex = RegExp("(^|; )__utmz=[^;]*(" + paidCookieRegex + ")");
					}

					return cpcRegex.test(document.cookie);
				},
			};

			/**
			* Returns whether or not a particular method call is allowed.
			* Disables "once-use" methods in the case of a _trackPageview call.
			* @param {String} methodCall The method being called.
			*/
			this.isMethodAllowed = function(methodCall) {
				var methodName;
				var isMethodUsed;

				try {
					// extract method
					methodName = "_" + methodCall.split("_")[1];

					// check whether method is one of the "once-use" methods
					// and whether or not it has been used.
					isMethodUsed = preferences.isMethodUsed[methodName];

					// A _trackPageview call disables "once-use" methods
					if (methodName === "_trackPageview") {
						helper.disableMethods();
					}

					// If method is not used, then it's allowed.
					return !isMethodUsed;
				} catch (e) {

					// The above should work, but if for some reason it doesn't,
					// It's probably best to just let the call through and hope for the best.
					return true;
				}
			};

			/**
			 * Sets the attribution model for the tracker.
			 * @param {Boolean} opt_cpcTrump Whether or not cpc trumps other sources. Default is false.
			 * @param {Boolean} opt_firstTouch Whether or not it does first touch attribution. Default is false.
			 * @param {String} opt_nameSpace Optional separate names space for cookies. DOES NOT SUPPORT MULTIPLE DOMAINS.
			 * @param {String} opt_paidQueryRegex Optional alternate regular expression for paid based on query string. Default is gclid=|utm_medium=(cpc|ppc)
			 * @param {String} opt_paidCookieRegex Optional alternate regular expression for paid based on __utmz cookie. Default is utmgclid=|utmcmd=(cpc|ppc)
			 */
			this.setAttributionModel = function(opt_cpcTrump, opt_firstTouch, opt_nameSpace, opt_paidQueryRegex, opt_paidCookieRegex) {
				helper.handleNameSpace(opt_nameSpace);
				helper.handleAttribution(opt_cpcTrump, opt_firstTouch, opt_paidQueryRegex, opt_paidCookieRegex);
			};

			this.disableMethod = function(method) {
				preferences[method] = true;
			}

			/**
			 * Adds a Tracker Object so that function calls can apply to all Trackers.
			 * @param {ROITracker} tracker The Tracker Object being added.
			 */
			this.addTracker = function(tracker) {
				preferences.children.push(tracker.getName());
			};

			/***
			*
			* Standard Google Analytics Tracker Methods
			*
			***/

			/**
			* Sets the domain name for cookies. There are three modes to this method: ("auto" | "none" | [[]domain]).
			* By default, the method is set to auto, which attempts to resolve the domain name based on the location object in the DOM.
			*
			* Set this method explicitly to your domain name if you want to track visitor behavior across sub-domains in the same profile.
			* @param {String} newDomainName New default domain name to set.
			*/
			this._setDomainName = function(newDomainName) {

				// for Google Website Optimizer
				window._udn = newDomainName;
			};

			/**
			* Overwrites the ._setSampleRate method to do nothing.
			*
			*/
			this._setSampleRate = function() { };

			/**
			* Sets the linker functionality flag as part of enabling cross-domain user tracking. By default, this method is set to false and linking is disabled. See also _link(), _linkByPost(), and _setDomainName() methods to enable cross-domain tracking. Use the _setAllowLinker method on the target site, so that the target site uses the cookie data in the URL parameter, instead of the standard session logic.
			* @param {Boolean} bool
			*/
			this._setAllowLinker = function(bool) {
				if (bool) {
					ga(opt_name + "require", "linker");
				}
			};

			/**
			* Sets the allow domain hash flag. By default, this value is set to true. The domain hashing functionality in Google Analytics creates a hash value from your domain, and uses this number to check cookie integrity for visitors. If you have multiple sub-domains, such as example1.example.com and example2.example.com, and you want to track user behavior across both of these sub-domains, you would turn off domain hashing so that the cookie integrity check will not reject a user cookie coming from one domain to another. Additionally, you can turn this feature off to optimize per-page tracking performance.
			* @param {Boolean} bool
			*/
			this._setAllowHash = function(bool) {
				//This method is deprecated and no longer required for cross-domain tracking.
				//_gaq.push([opt_name + '_setAllowHash', bool]);
			};

			/**
			* Activate Site Speed Report Metrics for measuring page latency.
			*/
			this._trackPageLoadTime = function() {
                //In Universal Analytics, tracking the page load time is done by default, with no need to make a call to "_trackPageLoadTime" as was the case in "Classic" Analytics. By default, tracking of the page load time is done on a sample of one per cent of the pageviews.
				//http://blog-en.openalfa.com/how-to-upgrade-to-the-google-universal-analytics-tracking-code
				//_gaq.push([opt_name + '_trackPageLoadTime']);
			};

			/**
			* Main logic for GATC (Google Analytic Tracker Code). If linker functionalities are enabled,
			* it attempts to extract cookie values from the URL. Otherwise, it tries to extract cookie values from document.cookie.
			* It also updates or creates cookies as necessary, then writes them back to the document object.
			* Gathers all the appropriate metrics to send to the UCFE (Urchin Collector Front-end).
			* @param {String} opt_pageURL Optional parameter to indicate what page URL to track metrics under.
			* When using this option, use a beginning slash (/) to indicate the page URL.
			*/
			this._trackPageview = function(opt_pageURL) {
				var tempHash;

				// handle gclid/utm conflicts
				if (/[?&#]gclid=/.test(location.search + location.hash)) {			
					ga(opt_name + 'set', 'campaignName');
					ga(opt_name + 'set', 'campaignMedium');
					ga(opt_name + 'set', 'campaignSource');
					ga(opt_name + 'set', 'campaignContent');
					ga(opt_name + 'set', 'campaignKeyword');
				}

				ga(opt_name + 'send', 'pageview');

				// remove anchor
				if (location.hash) {
					tempHash = location.hash;

					// remove gclid, utm_, ga_ and linking parameters
					tempHash = tempHash.replace(/[#&]utm_.*/, "");
					tempHash = tempHash.replace(/[#&]gclid=.*/, "");
					tempHash = tempHash.replace(/[#&]__utm.*/, "");
					tempHash = tempHash.replace(/[#&]ga_.*/, "");

					// Default hash value
					if (tempHash === "") {
						tempHash = "#_";
					}

					// Change it immediately for costmetic reasons.
					location.replace(location.protocol + "//" + location.hostname + location.pathname + location.search + tempHash);

					// Change it again after page load to activate any real anchors
					ga(function() {
						location.replace(location.protocol + "//" + location.hostname + location.pathname + location.search + tempHash);
					});
				}
			};

			/**
			 * Sets a custom variable with the supplied name, value, and scope for the variable.
			 * There is a 64-byte character limit for the name and value combined.
			 * @param {Int} index Required. The slot used for the custom variable.
			 * Possible values are 1-5, inclusive.
			 * @param {String} name Required. The name for the custom variable.
			 * @param {String} value Required. The value for the custom variable.
			 * @param {Int} opt_scope Optional. The scope used for the custom variable.
			 * Possible values are 1 for visitor-level, 2 for session-level, and 3 for page-level.
			 */
			this._setCustomVar = function(index, name, value, opt_scope) {
				ga(opt_name + 'set', 'dimension' + index, value);
			};

			/**
			 * Helper method to track social features. This assumes all the social
			 * scripts / apis are loaded synchronously. If they are loaded async,
			 * you might need to add the nextwork specific tracking call to the
			 * a callback once the network's script has loaded.
			 * @param {string} opt_pageUrl An optional URL to associate the social
			 *     tracking with a particular page.
			 */
			this.trackSocial = function(opt_pageUrl) {
				this.trackFacebook(opt_pageUrl);
				this.trackTwitter(opt_pageUrl);
			};

			/**
			 * Tracks Facebook likes, unlikes and sends by suscribing to the Facebook
			 * JSAPI event model. Note: This will not track facebook buttons using the
			 * iFrame method.
			 * @param {String} opt_pageUrl An optional URL to associate the social tracking with a particular page.
			 */
			this.trackFacebook = function(opt_pageUrl) {
				ga(function() {
					window.facebookTried = true;
					try {
						FB.Event.subscribe('edge.create', function(targetUrl) {
							window.myFBlike = true;
							ga(opt_name + 'send', 'social', {
								socialNetwork: 'facebook',
								socialAction: 'like',
								socialTarget: targetUrl
							});
						});

						FB.Event.subscribe('edge.remove', function(targetUrl) {
							window.myFBunlike = true;
							ga(opt_name + 'send', 'social', {
								socialNetwork: 'facebook',
								socialAction: 'unlike',
								socialTarget: targetUrl
							});
						});

						FB.Event.subscribe('message.send', function(targetUrl) {
	//						window.myFBsend = true;
							ga(opt_name + 'send', 'social', {
								socialNetwork: 'facebook',
								socialAction: 'send',
								socialTarget: targetUrl
							});
						});

						window.facebookTracked = true;
						window.myFB = FB;
					} catch (e) {}
				});
			};

			/**
			 * Tracks everytime a user clicks on a tweet button from Twitter.
			 * This subscribes to the Twitter JS API event mechanism to listen for
			 * clicks coming from this page. Details here:
			 * http://dev.twitter.com/pages/intents-events#click
			 * This method should be called once the twitter API has loaded.
			 * @param {String} opt_pageUrl An optional URL to associate the social tracking with a particular page.
			 */
			this.trackTwitter = function(opt_pageUrl) {
				ga(function(){
					try {
						twttr.events.bind('tweet', function(event) {
							if (event) {
								var targetUrl; // Default value is undefined.
								if (event.target && event.target.nodeName == 'IFRAME') {
									targetUrl = this.extractParamFromUri_(event.target.src, 'url');
								}
								ga(opt_name + 'send', 'social', {
									socialNetwork: 'twitter',
									socialAction: 'tweet',
									socialTarget: targetUrl
								});
							}
						});
					} catch (e) {}
				});
			};

			/**
			 * Extracts a query parameter value from a URI.
			 * @param {String} uri The URI from which to extract the parameter.
			 * @param {String} paramName The name of the query paramater to extract.
			 * @return {String} The un-encoded value of the query paramater. underfined if there is no URI parameter.
			 * @private
			 */
			this.extractParamFromUri_ = function(uri, paramName) {
				if (!uri) {
					return;
				}
				var parts = uri.split('#'); // Check for query params.
				//if (parts.length == 1) {
				// return;
				// }
				var query = decodeURI(parts[1]);

				// Find url param.
				paramName += '=';
				var params = query.split('&');
				for (var i = 0, param; param = params[i]; ++i) {
					if (param.indexOf(paramName) === 0) {
						return unescape(param.split('=')[1]);
					}
				}
			};
			
			function loadPluginIfNeeded(pluginName) {
				if(preferences.pluginsLoaded.indexOf(pluginName) < 0) {
					preferences.pluginsLoaded.push(pluginName);
					ga(opt_name + 'require', pluginName);
				}
			};

			/**
			 * Creates a transaction object with the given values. As with _addItem(),
			 * this method handles only transaction tracking and provides no additional
			 * ecommerce functionality. Therefore, if the transaction is a duplicate of
			 * an existing transaction for that session, the old transaction values are
			 * over-written with the new transaction values. Arguments for this method
			 * are matched by position, so be sure to supply all parameters, even if some
			 * of them have an empty value.
			 * @param {String} orderId Required. Internal unique order id number for this transaction.
			 * @param {String} affiliation Optional. Partner or store affiliation (undefined if absent).
			 * @param {String} total Required. Total dollar amount of the transaction.
			 * @param {String} tax Optional. Tax amount of the transaction.
			 * @param {String} shipping Optional. Shipping charge for the transaction.
			 * @param {String} city Optional. City to associate with transaction.
			 * @param {String} state Optional. State to associate with transaction.
			 * @param {String} country Optional. Country to associate with transaction.
			 */
			this._addTrans = function(orderId, affiliation, total, tax, shipping, city, state, country) {
				loadPluginIfNeeded('ecommerce');
				ga(opt_name + 'ecommerce:addTransaction', {
							 id: orderId,     
					affiliation: affiliation, 
						revenue: total,       
					   shipping: shipping,    
							tax: tax         
				});
			};

			/**
			 * Use this method to track items purchased by visitors to your ecommerce site.
			 * This method tracks individual items by their SKU. This means that the sku
			 * parameter is required. This method then associates the item to the parent
			 * transaction object via the orderId argument.
			 * @param {String} orderId Optional Order ID of the transaction to associate with item.
			 * @param {String} orderId sku Required. Item's SKU code.
			 * @param {String} orderId name REQUIRED. Product name. Required to see data in the product detail report.
			 * @param {String} orderId category Optional. Product category.
			 * @param {String} orderId price Required. Product price.
			 * @param {String} orderId quantity Required. Purchase quantity.
			 */
			this._addItem = function(orderId, sku, name, category, price, quantity) {
				loadPluginIfNeeded('ecommerce');
				ga(opt_name + 'ecommerce:addItem', {
						  id: orderId,
						 sku: sku,
						name: name,
					category: category,
					   price: price,
					quantity: quantity
				});
			};

			/**
			 * Sends both the transaction and item data to the Google Analytics server.
			 * This method should be called after _trackPageview(), and used in conjunction
			 * with the _addItem() and addTrans() methods. It should be called after items
			 * and transaction elements have been set up.
			 */
			this._trackTrans = function() {
				loadPluginIfNeeded('ecommerce');
				ga(opt_name + 'ecommerce:send');
			};

			/**
			 * Constructs and sends the event tracking call to the Google Analytics Tracking Code.
			 * Use this to track visitor behavior on your website that is not related to a web page
			 * visit, such as interaction with a Flash video movie control or any user event that
			 * does not trigger a page request. For more information on Event Tracking, see the
			 * Event Tracking Guide. (Note: the documentation mentions a boolean return value
			 * indicating whether the event was successfully sent. This is not implemented below,
			 * but we can add it if someone actually wants to use it).
			 * @param {String} category The general event category (e.g. "Videos").
			 * @param {String} action The action for the event (e.g. "Play").
			 * @param {String} opt_label An optional descriptor for the event.
			 * @param {Int} opt_value An optional value associated with the event.
			 */
			this._trackEvent = function(category, action, opt_label, opt_value) {
				ga(opt_name + 'send', 'event', {
					eventCategory: category,
					  eventAction: action
				});
			};

			/**
			 * Temporarily push _gaq pushes on _gar instead.
			 */
			// ga = function() {
				// _gar.push(arguments);
			// };

			/**
			* Return whether or not the Tracker object is global.
			* @return {Boolean} Global state
			*/
			this.isGlobal = function() {
				return preferences.isGlobal;
			};

			/**
			* Provides debug output to console.log.
			* @param {String} message Out to log.
			*/
			function debug(message) {
				var e;

				try {
					// Make sure console.log is defined.
					if (typeof console === "object" && console.log) {
						console.log(message);
					}
				} catch (e) { }
			}
			
			/**
			* Provides debug output to console.log.
			* @param {String} message Output to log.
			*/
			this.debug = function(message) {
				if (preferences.isDebug) {
					debug(message);
				}
			};
			
			/**
			 * Adds method debugging to an object.
			 * @param {Object} methodObject Object to add debugging to.
			 */
			function addMethodDebugging(methodObject) {
				var oldMethod;

				for (i in methodObject) {

					// save old method
					oldMethod = methodObject[i];

					// Make sure method is a valid object function
					if (methodObject.hasOwnProperty(i) && typeof methodObject[i] === "function" && i.indexOf("debug") === -1) {

						// Add debugging
						methodObject[i] = addDebug(methodObject, oldMethod, i);
					}
				}
			};

			/**
			* Set the callback function that will be called on _trackTrans.
			* @param {Function} transCallBack is a callBack function to run on trackTrans. This function will be passed revenue and order_id information from _addTrans or _setTrans
			*/
			this.setTransCallBack = function(transCallBack) {
				preferences.transCallBack = transCallBack;
			};

			/**
			* Determine whether or not a callback function has been set.
			* @return {Boolean} Whether or not callBack is set.
			*/
			this.hasTransCallBack = function() {
				return typeof preferences.transCallBack === "function";
			};

			/**
			* Handles transaction related method calls when a callback has been set.
			* @param {String[]} transArray is the transaction method call to be handled.
			*/
			this.handleTrans = function(transArray) {

				if (/_addTrans$/.test(transArray[0])) {
					helper.storeTransaction(transArray);
				} else if (/_setTrans$/.test(transArray[0])) {
					helper.handleUtmForm();
				} else if (/_trackTrans$/.test(transArray[0])) {
					helper.executeTransCallBack();
				}
			};

			/**
			* Return Tracker object names added to this object.
			* @return {String[]} Array of tracker object names.
			*/
			this.getChildren = function() {
				return preferences.children;
			};

			/**
			* Return the optional name of the Tracker Object.
			* @return {String} name of Tracker Object.
			*/
			this.getName = function() {
				return opt_name;
			};

			// Optional debugging
			if (preferences.isDebug) {

				// Add debugging to helper methods.
				addMethodDebugging(helper);

				// Add debugging to Tracker methods.
				addMethodDebugging(this);
			}

			// If there's an optional name, add a period so method calls will work correctly.
			if (opt_name) {
				opt_name = opt_name + ".";
			}
			else {
				opt_name = "";
			}

			// add to associated array of authorized tracker objects.
			_roit[opt_name] = this;

			// If there's an account, call _setAccount,
			// otherwise this a global tracker.
			if (opt_account) {
				// set account				
				var optNameTrimmed = opt_name.split('.').join('');
				if(opt_domainName && opt_domainName != '') {
					ga('create', opt_account, {
						cookieDomain: opt_domainName,
						name: optNameTrimmed
					});
				} else {
					ga('create', opt_account, 'auto', optNameTrimmed);
				}
			} else {
				preferences.isGlobal = true;

				// This prevents the _setAccount call from going through.
				preferences.isMethodUsed._setAccount = true;
			}
		}

		ROITracker.truncateCustomVar = function(key, value) {
			value = escape(value).substring(0, 64 - key.length);
			value = value.replace(/%[A-F0-9]?$/, "");
			return unescape(value);
		};

		// This overrides the default definition of the _gaq.push and adds
		// or removes pushes based on tracking object definitions.
		ga(function() {
			var i;

			// store old _gaq.push
			var oldGaFunction = ga;

			/**
			 * Retrieves the tracker object referenced by the method.
			 * @param {String} methodCall The method being called.
			 * @return {ROITracker} The retrieved tracker object.
			 */
			function getTrackerbyMethod(methodCall) {
				if(methodCall.indexOf('.') < 0) {
					return _roit[''];
				}
				
				var trackerName = methodCall.split(".")[0];
				if(trackerName != '') {
					trackerName += '.';
				}
				return _roit[trackerName];
			}

			/**
			 * The new _gaq.push parses pushes according to the following rules:
			 * 		1. All function pushes are accepted.
			 * 		2. Array calls are only accepted if they come from an authorized tracker.
			 * 		3. Calls from parent trackers generate additional calls to children trackers.
			 * 		4. Global trackers only generate calls for their children.
			 * 		5. Only the first _setAccount call from an authorized, non-global object is accepted.
			 */
			ga = function() {
				var i;
				var j;
				var tracker;
				var children;

				// Handle pushing multiple commands
				var argumentsArray = Array.prototype.slice.call(arguments);
				if(argumentsArray[0] == 'provide') {
					oldGaFunction.apply(this, argumentsArray);
				} else if(argumentsArray[0] == 'create') {
					var trackerId = argumentsArray[1];
					var trackerName = argumentsArray[3];
					var trackerNameWithDot = '';
					if(typeof trackerName !== 'undefined' && trackerName[trackerName.length-1] !== ".")
						trackerNameWithDot = trackerName + '.';
	
					var tracker = getTrackerbyMethod(trackerNameWithDot);
					if(typeof tracker === 'undefined'){
						new window.ROITracker(trackerId, trackerName);
					} else {
						oldGaFunction.apply(this, argumentsArray);
					}
				} else if(typeof(argumentsArray[0]) == "function") {
					oldGaFunction(argumentsArray[0]);
				} else {
					// retrieve tracker referenced by method
					tracker = getTrackerbyMethod(argumentsArray[0]);

					// make sure tracker is an authorized tracker object
					// and that the method call is not a _setAccount call
					if (tracker && (tracker.isMethodAllowed(argumentsArray[0]) || (/_trackPageview$/.test(argumentsArray[0]) && argumentsArray[1]))) {

						// Don't push call for global tracker object
						if (!tracker.isGlobal()) {
							// ***This is the standard push***
							// ***All array pushes end here***
							tracker.debug(argumentsArray);
							oldGaFunction.apply(this, argumentsArray);
						}

						// Handle transactions with call backs.
						if (tracker.hasTransCallBack() && /Trans$/.test(argumentsArray[0])) {
							tracker.handleTrans(argumentsArray);
						}

						// push call for all children
						children = tracker.getChildren();
						if (children && children.length && children.length > 0) {
							for (j = 0; j < children.length; j += 1) {

								var childCall = argumentsArray.slice(0);
								// Change the object of the call to the child tracker
								var trackerName = tracker.getName();
								if(trackerName == '') {
									childCall[0] = children[j] + childCall[0];
								} else {
									childCall[0] = childCall[0].replace(trackerName + '.', children[j]);
								}
								
								// Child tracker call
								ga.apply(this, childCall);
							}
						}
					}

				// push all function calls via document.ready
				}
			};

			// Apply pushes temporarily stored in _gar.
			for (i = 0; i < _gar.length; i += 1) {
				ga.apply(undefined, _gar[i]);
			}
		});	
	}
	

var _gat = _gat || {};
/**
 * Overrides existing _getTracker method to prevent legacy code from disrupting V3 functionality.
 * @return {ROITracker} Modified ROITracker object instead of traditional pageTracker object.
 */
ROITracker._getTracker = _gat._getTracker = function (opt_account) {
	var oldTrackPageview;

	if (opt_account.indexOf("UA-3370374") === 0) {

		// Store old _trackPageview function
		oldTrackPageview = pageTracker._trackPageview;

		// This prevents these methods (in their native form) from being called by the legacy code.
		pageTracker._setDomainName = function () {};
		pageTracker._initData = function () {};
		pageTracker._setReferrerOverride = function () {};
		pageTracker._setCampNameKey = function () {};
		pageTracker._setCampMediumKey = function () {};
		pageTracker._setCampSourceKey = function () {};
		pageTracker._setCampTermKey = function () {};
		pageTracker._setCampContentKey = function () {};
		pageTracker._setCampCIdKey = function () {};
		pageTracker._setCustomVar = function () {};

		/**
		 * Overrides existing _trackpageview method to only allow virtual pageviews.
		 * @param {String} opt_pageURL Optional parameter to indicate what page URL to track metrics under.
		 */
		pageTracker._trackPageview = function (opt_pageURL) {

			// Only fire pageview if it's a virtual pageview. Ignore standard _trackPageview call.
			if (opt_pageURL) {
				oldTrackPageview(opt_pageURL);
			}
		};

		return pageTracker;
	} else {
		ga('create', opt_account, 'auto', 't6');
		extraTracker._initData = function () {};
		return extraTracker;
	}
};

	// Initialize Tracker Objects
var pageTracker = new window.ROITracker("", "");
var globalTracker = new window.ROITracker("", "t5");
var traditionalTracker = new window.ROITracker("UA-3370374-5", "t2");
var firstCPCTracker = new window.ROITracker("UA-3370374-6", "t3");
var extraTracker = new window.ROITracker("UA-1-1", "t6");

	// Add trackers to global tracking object.
	globalTracker.addTracker(pageTracker);
	globalTracker.addTracker(extraTracker);
	pageTracker.addTracker(traditionalTracker);
	pageTracker.addTracker(firstCPCTracker);

	// Tracker Method calls
	firstCPCTracker.setAttributionModel(true, true, "first_cpc");

	//Sets Custom Variables, tracks pageview, and runs _trackLoadTime method.
	(function(){
		var pageName = location.pathname + location.search;
		var queryChar = "?"

		if (/\?/.test(pageName)){
			queryChar = "&";
		}

		var Cafepress = window.Cafepress || window.cafepress || {};

		if (typeof Cafepress === "object" && Cafepress.tracking){
			pageName = pageName + queryChar;
			var pageType = Cafepress.tracking.pageType || Cafepress.tracking.pageLandingType;
			if (pageType){
				pageTracker._setCustomVar(1,  'pageType',  pageType, 3);
				pageName = pageName + "pageType=" + pageType + "&";
			}
			if (Cafepress.tracking.productFamily){
				pageTracker._setCustomVar(2,  'productFamily',  Cafepress.tracking.productFamily, 3);
				pageName = pageName + "productFamily=" + Cafepress.tracking.productFamily + "&";
			}
			if (Cafepress.tracking.salesChannel){
				pageTracker._setCustomVar(3,  'salesChannel',  Cafepress.tracking.salesChannel, 3);
				pageName = pageName + "salesChannel=" + Cafepress.tracking.salesChannel + "&";
			}
			if (Cafepress.tracking.abTestString){
                pageTracker._setCustomVar(4,  'abTestString',  window.ROITracker.truncateCustomVar('abTestString', Cafepress.tracking.abTestString), 2);
				pageName = pageName + "abTestString=" + Cafepress.tracking.abTestString + "&";
			}
			if (Cafepress.tracking.businessUnit){
				pageTracker._setCustomVar(5,  'businessUnit',  Cafepress.tracking.businessUnit, 3);
				pageName = pageName + "businessUnit=" + Cafepress.tracking.businessUnit + "&";
			}
			pageName = pageName.substring(0, pageName.length - 1);
		}

		(function () {
			var c = 'Unknown';
			try {
				var b = document.cookie,
					a = b.indexOf('SL_Audience=');
				if (a != -1) {
					a = a + 11 + 1;
					var d = b.indexOf(';', a);
					if (d == -1) d = b.length;
					c = unescape(b.substring(a, d)).split('|')[1]
				}
			} catch (e) {}
			pageTracker._setCustomVar(6, 'audience', c, 3);
		})();

		pageTracker._trackPageview(pageName);
		pageTracker._trackPageLoadTime();

		pageTracker.disableMethod("_setCustomVar");
		extraTracker.disableMethod("_setCustomVar");
		
		pageTracker.trackSocial();
	}());
