function initiateAndSendTrackingData(){var a={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){for(var b="",c,d,f,g,h,i,j=0,e=a._utf8_encode(e);j<e.length;)c=e.charCodeAt(j++),d=e.charCodeAt(j++),f=e.charCodeAt(j++),g=c>>2,c=(c&3)<<4|d>>4,h=(d&15)<<2|f>>6,i=f&63,isNaN(d)?h=i=64:isNaN(f)&&(i=64),b=b+this._keyStr.charAt(g)+this._keyStr.charAt(c)+this._keyStr.charAt(h)+this._keyStr.charAt(i);return b},_utf8_encode:function(a){for(var a=a.replace(/\r\n/g,
"\n"),b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):(127<d&&2048>d?b+=String.fromCharCode(d>>6|192):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128)),b+=String.fromCharCode(d&63|128))}return b}};"undefined"===typeof btoa&&(_keyStr=a._keyStr,btoa=a.encode);window.cafepress=window.cafepress||{};window.cafepress.tracking=window.cafepress.tracking||{};window.cafepress.tracking.pageLoadTime=window.cafepress.tracking.timestamp?(new Date).getTime()-
window.cafepress.tracking.timestamp:"";window.cpsearch=window.cpsearch||{};csv_data=($.cookie("pid.guid")||"")+"^"+(window.cafepress.tracking.sessionId||$.cookie("ASP.NET_SessionId")||"")+"^"+(window.cafepress.tracking.trafficMedium||"")+"^"+(window.cafepress.tracking.searchQuery||"").substring(0,256)+"^"+(window.cafepress.tracking.searchTerm||"").substring(0,256)+"^"+(window.cafepress.tracking.productCategory||"").substring(0,128)+"^"+(window.cpsearch.searchCategoryName||"").substring(0,128)+"^"+
(window.location.hostname||"").substring(0,64)+"^"+(window.cafepress.tracking.pageLandingType||"").substring(0,256)+"^"+($.cookie("cur_cart")||"")+"^"+(window.productId||"")+"^"+((/ProductDetails|MfProductDetails/i.test(window.cafepress.tracking.pageLandingType)?window.productTypeNo:"")||"")+"^"+($("#imageNo").val()||"")+"^"+(window.cafepress.user&&window.cafepress.user.memberId?window.cafepress.user.memberId:"")+"^"+(window.varOrderNo||"")+"^"+(window.varTotalItems||"")+"^"+(window.varTotalOrderValue||
"")+"^"+(window.cafepress.tracking.abTestString||"").substring(0,256)+"^"+($.cookie("tfx_touch")||"").substring(0,1024)+"^"+(document.referrer||"").substring(0,2048)+"^"+(document.URL||"").substring(0,2048)+"^"+(navigator.userAgent||"").substring(0,256)+"^^^"+(/CartGeneric/i.test(window.cafepress.tracking.pageLandingType)?"true":"")+"^"+(/CheckoutForm/i.test(window.cafepress.tracking.pageLandingType)?"true":"")+"^"+(window.cafepress.tracking.pageLoadTime||"")+"^"+(window.cafepress.tracking.serverName||
"");sendTrackingData=function(){$.ajax({url:"//t.cafepress.com/api/v2b/request/new/"+btoa(csv_data),dataType:"jsonp",type:"GET"})};$(".add-to-cart").bind("click",function(){sendTrackingData()});sendTrackingData()}var br_data={},bloomSearchPixelAlreadyFired=!1;
function fireBloomSearchPixel(){if(!bloomSearchPixelAlreadyFired&&window.cafepress.tracking&&window.cafepress.tracking.bloomSearchAccountId&&("CheckoutReceipt"!=!window.cafepress.tracking.pageLandingType||window.br_related_rid)){bloomSearchPixelAlreadyFired=!0;br_data.acct_id=window.cafepress.tracking.bloomSearchAccountId;br_data.ptype=window.cafepress.tracking.productType;br_data.cat=window.cafepress.tracking.productCategory;br_data.prod_id=window.cafepress.tracking.productId;br_data.prod_name=window.cafepress.tracking.productName;
br_data.search_term=window.cafepress.tracking.searchQuery;br_data.session_id=window.cafepress.tracking.sessionId;br_data.is_conversion=window.cafepress.tracking.isConversion;br_data.basket_value=window.cafepress.tracking.basketValue;br_data.order_id=window.cafepress.tracking.orderId;var a="https:"==document.location.protocol?"https://cdns.brsrvr.com/v1/br-trk-<accountid>.js":"http://cdn.brcdn.com/v1/br-trk-<accountid>.js",a=a.replace("<accountid>",window.cafepress.tracking.bloomSearchAccountId);$.getScript(a,
function(){try{BrTrk.getTracker(0.2,br_data).enableTracking()}catch(a){}})}}$(document).ready(function(){initiateAndSendTrackingData();fireBloomSearchPixel()});/*
 tracking_global.js */
var checkout_test_20140711_hour16=1,google_tag_params=!1,google_conversion_id=1025648074,google_conversion_label="2cr1CMKG-QQQysuI6QM",google_custom_params,google_remarketing_only=!0,googlePixelVariableMap={US:{ids:[1025648074],labels:["2cr1CMKG-QQQysuI6QM"]},AU:{ids:[995939598,1004845874],labels:["O7WXCIKTvwMQjqrz2gM","IgXeCO7y1wMQsvaS3wM"]},GB:{ids:[1010565494,1000067481],labels:["-SFgCNrS0QMQ9oLw4QM","m4S8CLfk8AMQmaPv3AM"]},DE:{ids:[1002629166],labels:["qdtuCILrmQMQrtCL3gM"]},CA:{ids:[1003265434,
997572257],labels:["t_g2CMbOrAMQmruy3gM","qsz6CMfBygMQof3W2wM"]},ES:{ids:[997292785],labels:["X-CrCI_TjAQQ8fXF2wM"]},FR:{ids:[1006020103],labels:["iHG8CMHsqwMQh8za3wM"]}};
function getGoogleSmartPixelParams(){var a={prodid:"",pagetype:"",pcat:"",value:""};if(window.cafepress&&window.cafepress.tracking&&window.cafepress.tracking.pageLandingType){switch(window.cafepress.tracking.pageLandingType){case "HomePage":a.pagetype="home";break;case "SearchResults":a.pagetype="category";a.pcat=window.cafepress.tracking.productFamily||window.cpsearch.searchCategoryName||"";break;case "MfProductDetails":case "ProductDetails":a.pagetype="product";a.prodid=window.cafepress.tracking.productId||
window.productId||alternateSizeSubstrateData.productId;a.pcat=window.cafepress.tracking.productFamily||"";a.value=parseFloat($("#data-pdp-saleprice").text())||parseFloat($("#priceContainer #price").text().match(/[0-9\.]+/));break;case "CartGeneric":for(var e=[],b=[],c=[],d=[],f=$.grep($("#trackingDiv").attr("ProductsInfoJson").split("|"),function(a){return a}),g=0;g<f.length;g++){var h=f[g].split(",");e.push(h[2]);b.push(parseFloat(h[0])*parseInt(h[1]));c.push($("#"+h[2]).parents(".cartItem").find(".cartItemProductName").text());
d.push($("#"+h[2]).val())}a.pagetype="cart";if(0==f.length)break;a.prodid=e;a.value=b;a.pcat=d;break;case "CheckoutReceipt":b=[];for(g=0;g<window.cjPrices.length;g++)b.push(window.cjPrices[g]*window.cjQtys[g]);a.pagetype="purchase";a.prodid=window.cjProds;a.value=b;a.pcat=window.cjProdCats;break;default:return!1}return a}}function getGoogleSmartPixelQueryStringParams(){var a=getGoogleSmartPixelParams();return!a?!1:flattenGoogleSmartPixel(a)}
function flattenGoogleSmartPixel(a,e){var b=[];e||(e=0);for(var c in a)if(a.hasOwnProperty(c)){var d;d="Array"==a[c].constructor?flattenGoogleSmartPixel(a[c],1):a[c];b.push(c+"="+d)}return encodeURIComponent(b.join(0==e?";":","))}
function fireGoogleSmartPixel(){var a=googlePixelVariableMap[window.cafepress.countryCode];if(a)for(var e=0;e<a.ids.length;e++){google_conversion_id=a.ids[e];google_conversion_label=a.labels[e];$.getScript("//www.googleadservices.com/pagead/conversion.js");var b='<div style="display:inline;"><img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/{google_id}/?label={google_label}&guid=ON&script=0&data={data_placeholder}"/></div>',c=
getGoogleSmartPixelQueryStringParams();c&&(b=b.replace("{google_id}",google_conversion_id),b=b.replace("{google_label}",google_conversion_label),b=b.replace("{data_placeholder}",c),$("body").append(b))}}var isReceiptPage=window.cafepress&&window.cafepress.tracking&&window.cafepress.tracking.pageLandingType&&"CheckoutReceipt"==window.cafepress.tracking.pageLandingType;
$(document).ready(function(){try{var a=document.createElement("script");a.src="//www.dwin1.com/4102.js";a.type="text/javascript";a.defer="defer";var e=[{domainProp:"domain_ca",jsCode:"6119"},{domainProp:"domain_gb",jsCode:"3647"},{domainProp:"domain_ie",jsCode:"6120"},{domainProp:"domain_us",jsCode:"4102",isDefault:!0}],b,c,d;for(d in e){var f=e[d];cafepress.domain==cafepress[f.domainProp]&&(b=f.jsCode);f.isDefault&&(c=f)}b||(b=c.jsCode);a.src="//www.dwin1.com/"+b+".js";document.body.appendChild(a)}catch(g){}});
attachOnLoad(fireGoogleSmartPixel);
