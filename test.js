const cheerio = require("cheerio");
const html = `
<!DOCTYPE html>
<html lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>WTAPS / MILITIA / CAP / COPO. TWILL</title>
<meta property="og:site_name" content="wtaps" /><meta property="og:type" content="article" /><meta property="og:url" content="https://www.wtaps.com/products/detail/642" /><meta property="og:title" content="WTAPS / MILITIA / CAP / COPO. TWILL" /><meta property="og:description" content="ポリエステル/コットン混紡のツイルを使用したトラッカーキャップ。フロントパネルにブランドロゴの刺繍、背面にURBAN TERRITORYの刺繍。アジャスターストラップ付き。COLOR :BLACK, NAVY, OLIVE DRABSIZE :FITS ALLFABRIC :POLYESTER 65%, COTTON 35%PRICE :" /><meta property="og:image" content="https://cdn.wtaps.com/upload/save_image/0825141506_5f449e5a63d33.jpg" /><meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="https://cdn.wtaps.com/template/translate/img/common/favicon.ico">
<link href="https://fonts.googleapis.com/css?family=Oswald:200,400,500" rel="stylesheet">
<link rel="stylesheet" href="https://use.typekit.net/nof4yux.css">
<link rel="stylesheet" href="https://cdn.wtaps.com/template/translate/css/style.css?v=3.0.17">
<link rel="stylesheet" href="https://cdn.wtaps.com/template/translate/css/slick.css?v=3.0.17">
<link rel="stylesheet" href="https://cdn.wtaps.com/template/translate/css/default.css?v=3.0.17">
<link rel="stylesheet" href="https://cdn.wtaps.com/asset/css/style.css?2020090301">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script><script>window.jQuery || document.write('<script src="https://cdn.wtaps.com/template/translate/js/vendor/jquery-1.11.3.min.js?v=3.0.17"><\/script>')</script><script src="https://cdn.wtaps.com/asset/js/jquery.inview.js"></script><script src="https://cdn.wtaps.com/asset/js/jquery.easing.1.3.js"></script><script src="https://cdn.wtaps.com/asset/js/TweenMax.min.js"></script><script src="https://cdn.wtaps.com/asset/js/common.js?2020090301"></script><script>  w01 = '郵便番号を正しく入力して下さい。';
 w02 = '選択したカテゴリとカテゴリ内の全てのカテゴリを削除します';
 w03 = '一度削除したデータは、元に戻せません。\n削除しても宜しいですか？';
 w04 = '登録しても宜しいですか';
 w05 = '検索結果を全て削除しても宜しいですか';
 w06 = '一度削除したデータは、元に戻せません。\n削除しても宜しいですか？';
 w07 = 'カゴから商品を削除しても宜しいでしょうか？';
 w08 = '登録しても宜しいですか';
 w09 = '登録しても宜しいですか';
 w10 = 'メールアドレス/パスワードを入力して下さい。';
 w11 = '縮小';
 w12 = '拡大';
 w13 = 'ただいま品切れ中です';
 w14 = 'カートに入れる';
 w15 = '(品切れ中)';
 w16 = '選択してください'; </script>
</head>
<body id="page_product_detail" class="product_page">
<div id="fb-root"></div>
<script>(function(d, s, id) {
                           var js, fjs = d.getElementsByTagName(s)[0];
                           if (d.getElementById(id)) return;
                           js = d.createElement(s); js.id = id;
                           js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.8&appId=1799770243578568";
                           fjs.parentNode.insertBefore(js, fjs);
                        }(document, "script", "facebook-jssdk"));</script><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script><script src="https://apis.google.com/js/platform.js" async defer>{lang: "ja"}</script><script>
                        var url = encodeURIComponent("https://www.wtaps.com/products/detail/642");
                        var title = encodeURIComponent("WTAPS / MILITIA / CAP / COPO. TWILL");
                        function share_fb() {
                            var href = "https://www.facebook.com/sharer.php?u=" + url + "&t=" + title;
                            window.open(href, "FBwindow", "width=600, height=450, menubar=no, toolbar=no, scrollbars=yes");
                        }
                        function share_tw() {
                            var href = "https://twitter.com/intent/tweet?original_referer=" + url + "&ref_src=twsrc%5Etfw&text=" + title + "&tw_p=tweetbutton&url=" + url;
                            window.open(href, "TWwindow", "width=600, height=450, menubar=no, toolbar=no, scrollbars=yes");
                        }
                        function share_l() {
                            location.href = "http://line.me/R/msg/text/?" + title + url;
                        }
                        function share_g() {
                            var href = "https://plus.google.com/share?url=" + url;
                            window.open(href, "Gwindow", "width=650, height=450, menubar=no, toolbar=no, scrollbars=yes");
                        }
                        </script><div id="wrapper">
<header id="header"><h1><a href="/"><svg class="wtaps-logo" viewbox="0 0 120 29"><path d="M25.17.39l-4.93 28.22h-4.05l-3.5-18.65h-.08L9.35 28.6H5.33L0 .39h4.52l2.93 17.97h.07L10.67.39h3.96l3.28 17.97h.08L20.68.39zm17.72 0H28.76V4.6h4.65v24h4.84v-24h4.64zM54.29 6l1.91 12.1h-3.89l1.91-12.1h.08zM57.27.4h-5.99L46.1 28.61h4.66l.86-6.27h5.27l.87 6.27h4.66L57.26.39zm15.03 3.98c1.6 0 2.7.33 3.24.96.57.63.85 1.76.85 3.39 0 1.63-.28 2.75-.85 3.38-.55.64-1.64.96-3.24.96h-1.87v-8.7h1.87zm.23-3.98H65.6v28.22h4.83V17.04c3.78 0 6.37-.43 7.8-1.27 1.98-1.17 2.98-3.52 2.98-7.05 0-2.97-.72-5.11-2.17-6.43C77.7 1.02 75.5.4 72.52.4zm27.32 21.37c0-2.16-.83-4.2-2.52-6.11l-4.7-4.39c-1.72-1.56-2.57-3-2.57-4.28 0-1.83.8-2.76 2.4-2.76 1.58 0 2.44 1.06 2.56 3.15l4.6-.55a8.35 8.35 0 0 0-1.95-4.8A6.11 6.11 0 0 0 92.93 0c-2.3 0-4.12.6-5.4 1.78-1.4 1.22-2.08 2.96-2.08 5.24 0 2.3.87 4.38 2.57 6.27l4.7 4.3c1.7 1.56 2.53 3.1 2.53 4.6 0 1.72-.93 2.58-2.8 2.58-1.72 0-2.7-1.41-2.87-4.24l-4.58.65c.1 2.2.76 4.02 2.02 5.46a6.53 6.53 0 0 0 5.2 2.36c2.31 0 4.17-.64 5.55-1.92 1.39-1.27 2.07-3.04 2.07-5.32M112.89 5.1c.22 0 .44.01.67.05.23.03.43.1.6.18.19.1.33.22.44.4.11.16.17.39.17.67 0 .34-.07.6-.19.8-.12.18-.3.32-.5.42-.2.09-.45.14-.71.16-.27.02-.56.03-.86.03h-1.39V5.1h1.77zM113.1 4h-3.31v8.54h1.33V8.88h1.41l2.33 3.66h1.44l-2.45-3.76a2.9 2.9 0 0 0 1.6-.64c.43-.36.65-.92.65-1.69 0-.82-.25-1.43-.73-1.83-.5-.4-1.25-.6-2.27-.6zm-.45-1.95a5.9 5.9 0 0 1 5.56 3.75c.3.76.46 1.57.46 2.44 0 .9-.16 1.73-.46 2.49a5.94 5.94 0 0 1-5.56 3.78 5.98 5.98 0 0 1-6.06-6.27 6.4 6.4 0 0 1 1.74-4.4 5.97 5.97 0 0 1 4.32-1.79zm0-1.07a7.37 7.37 0 0 0-6.8 4.4c-.4.88-.59 1.83-.59 2.86a7.18 7.18 0 0 0 4.54 6.77c.9.37 1.84.55 2.85.55a7.42 7.42 0 0 0 5.17-2.08A7.41 7.41 0 0 0 120 8.25a7.32 7.32 0 0 0-7.35-7.26z"></path></svg></a></h1>
<nav class="global-nav"><div class="menu"><i class="menu-ico"></i></div>

<div class="cart-ico"><a href="https://www.wtaps.com/cart"></a></div>


<div class="account-ico">
<a href="javascript:void(0);">
</a>
<div class="account-box">
<div class="account-inner">
<div class="account-list">
<div class="account-login"><a href="https://www.wtaps.com/mypage/login">ログイン</a></div>
<div class="account-regist"><a href="https://www.wtaps.com/entry">新規会員登録</a></div>
</div>
</div>
</div>
</div>



<div id="lang_menu">
<form method="get" id="shiro8_translate_form" action="">
<select id="plg_shiro8_translate_language" name="plg_shiro8_translate[language]" class="form-control form-control" onchange='$(this).parent("form").get(0).submit();'><option value="ja">日本語(Japanese)</option>
<option value="en">English</option></select>
</form>
</div>


</nav><div class="pulldown">
<div class="pulldown-bg-close"></div>
<div class="pulldown-left">
<div class="pulldown-left-box">
</div>
</div>
<div class="pulldown-right">
<div class="pulldown-right-box">
<h2 class="pulldown-nav-logo">
<div class="pulldown-nav-logo-wtaps">
<span class="animated">
<svg class="wtaps-logo" viewbox="0 0 120 29"><path d="M25.17.39l-4.93 28.22h-4.05l-3.5-18.65h-.08L9.35 28.6H5.33L0 .39h4.52l2.93 17.97h.07L10.67.39h3.96l3.28 17.97h.08L20.68.39zm17.72 0H28.76V4.6h4.65v24h4.84v-24h4.64zM54.29 6l1.91 12.1h-3.89l1.91-12.1h.08zM57.27.4h-5.99L46.1 28.61h4.66l.86-6.27h5.27l.87 6.27h4.66L57.26.39zm15.03 3.98c1.6 0 2.7.33 3.24.96.57.63.85 1.76.85 3.39 0 1.63-.28 2.75-.85 3.38-.55.64-1.64.96-3.24.96h-1.87v-8.7h1.87zm.23-3.98H65.6v28.22h4.83V17.04c3.78 0 6.37-.43 7.8-1.27 1.98-1.17 2.98-3.52 2.98-7.05 0-2.97-.72-5.11-2.17-6.43C77.7 1.02 75.5.4 72.52.4zm27.32 21.37c0-2.16-.83-4.2-2.52-6.11l-4.7-4.39c-1.72-1.56-2.57-3-2.57-4.28 0-1.83.8-2.76 2.4-2.76 1.58 0 2.44 1.06 2.56 3.15l4.6-.55a8.35 8.35 0 0 0-1.95-4.8A6.11 6.11 0 0 0 92.93 0c-2.3 0-4.12.6-5.4 1.78-1.4 1.22-2.08 2.96-2.08 5.24 0 2.3.87 4.38 2.57 6.27l4.7 4.3c1.7 1.56 2.53 3.1 2.53 4.6 0 1.72-.93 2.58-2.8 2.58-1.72 0-2.7-1.41-2.87-4.24l-4.58.65c.1 2.2.76 4.02 2.02 5.46a6.53 6.53 0 0 0 5.2 2.36c2.31 0 4.17-.64 5.55-1.92 1.39-1.27 2.07-3.04 2.07-5.32M112.89 5.1c.22 0 .44.01.67.05.23.03.43.1.6.18.19.1.33.22.44.4.11.16.17.39.17.67 0 .34-.07.6-.19.8-.12.18-.3.32-.5.42-.2.09-.45.14-.71.16-.27.02-.56.03-.86.03h-1.39V5.1h1.77zM113.1 4h-3.31v8.54h1.33V8.88h1.41l2.33 3.66h1.44l-2.45-3.76a2.9 2.9 0 0 0 1.6-.64c.43-.36.65-.92.65-1.69 0-.82-.25-1.43-.73-1.83-.5-.4-1.25-.6-2.27-.6zm-.45-1.95a5.9 5.9 0 0 1 5.56 3.75c.3.76.46 1.57.46 2.44 0 .9-.16 1.73-.46 2.49a5.94 5.94 0 0 1-5.56 3.78 5.98 5.98 0 0 1-6.06-6.27 6.4 6.4 0 0 1 1.74-4.4 5.97 5.97 0 0 1 4.32-1.79zm0-1.07a7.37 7.37 0 0 0-6.8 4.4c-.4.88-.59 1.83-.59 2.86a7.18 7.18 0 0 0 4.54 6.77c.9.37 1.84.55 2.85.55a7.42 7.42 0 0 0 5.17-2.08A7.41 7.41 0 0 0 120 8.25a7.32 7.32 0 0 0-7.35-7.26z" fill="#FFF"></path></svg></span>
</div>
</h2>
<div class="pulldown-inner">
<nav class="pulldown-nav"><h3 class="pulldown-nav-col">
<span class="animated delay">2020-2nd COLLECTION</span>
</h3>
<div class="link-list">
<div class="link-list-item"><span class="animated delay"><a class="category" href="/products/list">ALL ITEMS<span class="slash"></span></a></span></div>
<div class="link-list-item"><span class="animated delay"><a class="category" href="/products/list?category_id=7">JACKET</a></span></div>
<br><div class="link-list-item"><span class="animated delay"><a class="category" href="/products/list?category_id=8">SHIRT<span class="slash"></span></a></span></div>
<div class="link-list-item"><span class="animated delay"><a class="category" href="/products/list?category_id=10">CUT & SEWN</a></span></div>
<br><div class="link-list-item"><span class="animated delay"><a class="category" href="/products/list?category_id=18">KNIT<span class="slash"></span></a></span></div>
<div class="link-list-item"><span class="animated delay"><a class="category" href="/products/list?category_id=9">TROUSERS</a></span></div>
<br><div class="link-list-item"><span class="animated delay"><a class="category" href="/products/list?category_id=11">HAT.CAP<span class="slash"></span></a></span></div>
<div class="link-list-item"><span class="animated delay"><a class="category" href="/products/list?category_id=12">CARGO</a></span></div>
<br><div class="link-list-item"><span class="animated delay"><a class="category" href="/products/list?category_id=13">ACCESSORIES</a></span></div>
<br><div class="link-list-item"><span class="animated delay"><a class="category" href="/products/list?category_id=14">UNDER WEAR</a></span></div>
<br>
</div>

<ul class="link-list-other">
<li><span class="animated delay"><a href="/feature/">FEATURE</a></span></li>

<li><span class="animated delay"><a href="/contents/visual">VISUAL</a></span></li>
<li><span class="animated delay"><a href="/news/">NEWS</a></span></li>
<li><span class="animated delay"><a href="/contents/stockists">STOCKISTS</a></span></li>
<li><span class="animated delay"><a href="https://gonzoinc.jp/recruit/" target="_blank">RECRUIT<img src="https://cdn.wtaps.com/asset/img/common/hed_ico_bla.png" class="pulldown-bla-ico"></a></span></li>
</ul>
<div class="link-list-reg">
<div class="btn-reg-wrap"><span class="animated delay"><a class="btn-reg" href="/entry">NEW MEMBER REGISTRATION</a></span></div>
</div>
<div class="link-list-sns">
<div class="sns-ico-wrap"><span class="animated delay"><a class="sns-ico" href="https://www.wtaps.com/contact"><img src="https://cdn.wtaps.com/asset/img/common/hed_ico_ma_w.png" alt="mail"></a></span></div>
<div class="sns-ico-wrap"><span class="animated delay"><a class="sns-ico" href="https://www.instagram.com/wtaps_tokyo/" target="_blank"><img src="https://cdn.wtaps.com/asset/img/common/hed_ico_in_w.png" alt="instagram"></a></span></div>
<div class="sns-ico-wrap"><span class="animated delay"><a class="sns-ico" href="https://twitter.com/wtaps_tokyo" target="_blank"><img src="https://cdn.wtaps.com/asset/img/common/hed_ico_tw_w.png" alt="twitter"></a></span></div>
</div>
</nav>
</div>
<div class="close"><i class="close-ico"></i></div>
<div class="lang-tab">
<ul class="lang-btn animated">
<li class="lang-btn-jp"><a href="javascript:void(0)">JP</a></li>
<li class="lang-btn-en"><a href="javascript:void(0)">EN</a></li>
</ul>
</div>
</div>
</div>
</div>
</header><div id="contents" class="theme_main_only">
<div class="container-fluid inner">
<div id="main">
<div id="main_middle">
<script>
    var eccubeImages = ["0825141506_5f449e5a63d33.jpg","0825141506_5f449e5aa6d8c.jpg","0825141506_5f449e5a100de.jpg","0825141506_5f449e5a40a57.jpg"];
    var eccubeImages2 = ["0825141532_5f449e746b420.JPG","0825141619_5f449ea342867.jpg","0825141619_5f449ea380f54.jpg","0825141619_5f449ea3b6ef3.jpg"];
</script><section class="product-sec arrival "><ul class="product-page-list">
<li class="product-page act">
<img src="https://cdn.wtaps.com/upload/save_image/0825141506_5f449e5a63d33.jpg"><span class="alt">OLIVE DRAB</span>
</li>
<li class="product-page ">
<img src="https://cdn.wtaps.com/upload/save_image/0825141506_5f449e5aa6d8c.jpg"><span class="alt">OLIVE DRAB</span>
</li>
<li class="product-page ">
<img src="https://cdn.wtaps.com/upload/save_image/0825141506_5f449e5a100de.jpg"><span class="alt">BLACK</span>
</li>
<li class="product-page ">
<img src="https://cdn.wtaps.com/upload/save_image/0825141506_5f449e5a40a57.jpg"><span class="alt">NAVY</span>
</li>
<li class="product-page product-page--info">
<div id="product-info--hidden">
<div id="product-info-price--hidden">
8,800yen (Tax inc.)
</div>
<ul id="detail-cut-list--hidden">
<li style="background:url(/upload/save_image/0825141532_5f449e746b420.JPG)center;background-size:cover;" data-path="/upload/save_image/0825141532_5f449e746b420.JPG">
<li style="background:url(/upload/save_image/0825141619_5f449ea342867.jpg)center;background-size:cover;" data-path="/upload/save_image/0825141619_5f449ea342867.jpg">
<li style="background:url(/upload/save_image/0825141619_5f449ea380f54.jpg)center;background-size:cover;" data-path="/upload/save_image/0825141619_5f449ea380f54.jpg">
<li style="background:url(/upload/save_image/0825141619_5f449ea3b6ef3.jpg)center;background-size:cover;" data-path="/upload/save_image/0825141619_5f449ea3b6ef3.jpg">
</ul>
</div>
<div class="product-info">
<div class="product-info-inner">
<div class="product-info--left">
<div class="product-info-text">
<h2 class="product-info-text-title">
<span class="small"></span><span class="large"></span>
</h2>
<div class="product-info-expr">ポリエステル/コットン混紡のツイルを使用したトラッカーキャップ。フロントパネルにブランドロゴの刺繍、背面にURBAN TERRITORYの刺繍。アジャスターストラップ付き。</div>
</div>
<div class="product-info-list"><div class="product-info-list-wrap"><div class="product-info-list-inner">
<div class="line color">
<div class="label">COLOR :</div>
<div class="txt">BLACK, NAVY, OLIVE DRAB</div>
</div>
<div class="line size">
<div class="label">SIZE :</div>
<div class="txt">FITS ALL</div>
</div>
<div class="line fabric">
<div class="label">FABRIC :</div>
<div class="txt">POLYESTER 65%, COTTON 35%</div>
</div>
<div class="line price">
<div class="label">PRICE :</div>
<div class="txt" id="product-info-price"></div>
</div>
<div class="line detail-cut"><ul class="detail-cut-list"></ul></div>
</div></div></div>
</div>
<div class="product-info--right">
<form action="?" method="post" id="form1" name="form1">

<div id="detail_cart_box" class="cart_area">
<dl class="detail_cart_box__cart_category_list COLOR">
<dt class="detail_cart_category_label"><span>COLOR</span></dt>
<dd class="detail_cart_category_input">
<select id="classcategory_id1" name="classcategory_id1" class="form-control"><option value="__unselected">Please Select.</option>
<option value="5">BLACK</option>
<option value="6">OLIVE DRAB</option>
<option value="10">NAVY</option></select>
</dd>
</dl>
<dl class="detail_cart_box__cart_category_list SIZE">
<dt class="detail_cart_category_label"><span>SIZE</span></dt>
<dd class="detail_cart_category_input">
 <select id="classcategory_id2" name="classcategory_id2" class="form-control"><option value="__unselected">Please Select.</option></select>
</dd>
</dl>
<div id="detail_qty_cart_box">
<div id="detail_qty_cart_box_left">
<dl id="detail_cart_box__cart_quantity">
<dt class="detail_cart_box_label"><span>QTY</span></dt>
<dd class="detail_cart_box_input">
<div class="detail_cart_box_input_wrap">
<div class="detail_cart_box_input_num">0</div>
<div class="detail_cart_box_input_up"></div>
<div class="detail_cart_box_input_down"></div>
</div>
<input type="number" id="quantity" name="quantity" required="required" min="1" maxlength="9" class="form-control" value="1">
</dd>
</dl>
<div class="extra-form">
</div>
</div>
</div>
<div id="detail_cart_box__button_area" class="btn_area">
<ul id="detail_cart_box__insert_button" class="">
<li class=""><button type="submit" id="add-cart" class="btn btn-primary btn-block prevention-btn prevention-mask">CART</button></li>
</ul>
</div> </div>

<div style="display: none"><input type="hidden" id="mode" name="mode"></div>
<div style="display: none"><input type="hidden" id="product_id" name="product_id" value="642"></div>
<div style="display: none"><input type="hidden" id="product_class_id" name="product_class_id"></div>
<div style="display: none"><input type="hidden" id="_token" name="_token" value="-DiUtxt03D0F4eMZbiQifk1N9LGZhQSttgA_Cq_XR6w"></div>
</form>
</div>
</div>
<div class="product-info-footer">
<ul class="product-info-footer-list">
<li><a class="category" href="/products/list">ALL ITEMS</a></li>
<li><a class="category" href="/products/list?category_id=7">JACKET</a></li>
<li><a class="category" href="/products/list?category_id=8">SHIRT</a></li>
<li><a class="category" href="/products/list?category_id=10">CUT & SEWN</a></li>
<li><a class="category" href="/products/list?category_id=18">KNIT</a></li>
<li><a class="category" href="/products/list?category_id=9">TROUSERS</a></li>
<li><a class="category" href="/products/list?category_id=11">HAT.CAP</a></li>
<li><a class="category" href="/products/list?category_id=12">CARGO</a></li>
<li><a class="category" href="/products/list?category_id=13">ACCESSORIES</a></li>
<li><a class="category" href="/products/list?category_id=14">UNDER WEAR</a></li>

</ul>
<ul class="product-info-term-list term-guide-list">
<li><a href="https://www.wtaps.com/help/guide">Shopping guide</a></li>
<li><a href="https://www.wtaps.com/help/tradelaw">Terms & Conditions</a></li>
<li><a href="https://www.wtaps.com/help/privacy">Privacy policy</a></li>
</ul>
</div>
</div>
</li>
</ul>
<div class="product-image-sp">
<ul class="product-image-list-sp">
<li class="product-image-list-img-sp act"><img src="https://cdn.wtaps.com/upload/save_image/0825141506_5f449e5a63d33.jpg"></li>
<li class="product-image-list-img-sp "><img src="https://cdn.wtaps.com/upload/save_image/0825141506_5f449e5aa6d8c.jpg"></li>
<li class="product-image-list-img-sp "><img src="https://cdn.wtaps.com/upload/save_image/0825141506_5f449e5a100de.jpg"></li>
<li class="product-image-list-img-sp "><img src="https://cdn.wtaps.com/upload/save_image/0825141506_5f449e5a40a57.jpg"></li>
</ul>
<ul class="product-sec-cursor-sp"></ul>
<ul class="product-sec-alt-sp"></ul>
</div>
<div class="product-color-detail">
<ul></ul>
</div>
<div class="product-btn-detail">
<span class="product-btn-detail-btn">DETAILS</span>
</div>
<h2 class="product-page-title">
<span class="small">202HCDT-HT12</span>
<span class="large">MILITIA / CAP / COPO. TWILL</span>
<ul class="color"></ul>
</h2>
<ul class="product-sec-cursor"></ul></section>
</div>
</div>
</div>
<footer id="footer"><ul class="footer-link-list">
<li><a class="category slideUp" href="/products/list"><span>ALL ITEMS</span></a></li>
<li><a class="category slideUp" href="/products/list?category_id=7"><span>JACKET</span></a></li>
<li><a class="category slideUp" href="/products/list?category_id=8"><span>SHIRT</span></a></li>
<li><a class="category slideUp" href="/products/list?category_id=10"><span>CUT & SEWN</span></a></li>
<li><a class="category slideUp" href="/products/list?category_id=18"><span>KNIT</span></a></li>
<li><a class="category slideUp" href="/products/list?category_id=9"><span>TROUSERS</span></a></li>
<li><a class="category slideUp" href="/products/list?category_id=11"><span>HAT.CAP</span></a></li>
<li><a class="category slideUp" href="/products/list?category_id=12"><span>CARGO</span></a></li>
<li><a class="category slideUp" href="/products/list?category_id=13"><span>ACCESSORIES</span></a></li>
<li><a class="category slideUp" href="/products/list?category_id=14"><span>UNDER WEAR</span></a></li>

</ul>
<ul class="footer-term-list">
<li><a href="https://www.wtaps.com/help/guide">Shopping guide</a></li>
<li><a href="https://www.wtaps.com/help/tradelaw">Terms & Conditions</a></li>
<li><a href="https://www.wtaps.com/help/privacy">Privacy policy</a></li>
</ul>
<div class="footer-sns">
<a class="sns-ico" href="https://www.instagram.com/wtaps_tokyo/" target="_blank"><img src="https://cdn.wtaps.com/asset/img/common/hed_ico_in.png" alt="instagram"></a><a class="sns-ico" href="https://twitter.com/wtaps_tokyo" target="_blank"><img src="https://cdn.wtaps.com/asset/img/common/hed_ico_tw.png" alt="twitter"></a>
</div>
<div class="footer-copy">WTAPS VISUALUPARMORED<br>COPYRIGHT © NEIGHBORHOOD CO.,LTD. ALL RIGHTS RESERVED.</div>



<script>
                    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-3815321-1', 'auto');
            ga('send', 'pageview');
            </script></footer>
</div>
<div class="menu-pc"><i class="menu-pc-ico"></i></div>
</div>
<script src="https://cdn.wtaps.com/template/translate/js/vendor/bootstrap.custom.min.js?v=3.0.17"></script><script src="https://cdn.wtaps.com/template/translate/js/vendor/slick.min.js?v=3.0.17"></script><script src="https://cdn.wtaps.com/template/translate/js/function.js?v=3.0.17"></script><script src="https://cdn.wtaps.com/template/translate/js/eccube.js?v=3.0.17"></script><script>
$(function () {
    $('#drawer').append($('.drawer_block').clone(true).children());
    $.ajax({
        url: '/template/translate/img/common/svg.html',
        type: 'GET',
        dataType: 'html',
    }).done(function(data){
        $('body').prepend(data);
    }).fail(function(data){
    });
});
</script><script>
	$(function() {
		$('select[name=classcategory_id1], select[name=classcategory_id2]')
				.change(function() {
					$('.price01_default, .price02_default').each(
							function(){
								$(this).text($(this).text().replace(/¥[\s　]*([\d,]+)/, '$1yen (Tax inc.)'));
							}
					);
				});
	});
</script><script>
    $(function () {
        $('#detail_image_box__slides').on('click', '.slick-dots li', function () {
            var $img = $(this).find('.selectable-class-image');
            if ($('#classcategory_id1').length > 0) {
                $('#classcategory_id1').val("__unselected");
                $('#classcategory_id1').change();
            }
            if ($img.length > 0) {
                var class1 = $img.data('class_category1');
                if (class1) {
                    $('#classcategory_id1').val(class1);
                    $('#classcategory_id1').change();
                }
                var class2 = $img.data('class_category2');
                if (class2) {
                    setTimeout(function () {
                        $('#classcategory_id2').val(class2);
                    }, 100);
                }
            }
        });
        if ($('#classcategory_id1').length > 0 && $('#classcategory_id2').length > 0) {
            $('#classcategory_id2').change(function () {
                var $this = $(this);
                if ($this.val()) {
                    if ($('#apg_product_class_image-' + $('#classcategory_id1').val() + '-' + $this.val()).length > 0) {
                        $index = $('.slick-dots li').length - $('.slick-dots .selectable-class-image').length + $('#apg_product_class_image-' + $('#classcategory_id1').val() + '-' + $this.val()).data('class_index') - 1;
                        $('.slides').slick('slickGoTo', $index);
                    }
                }
            });
        } else if ($('#classcategory_id1').length > 0) {
            $('#classcategory_id1').change(function () {
                var $this = $(this);
                if ($this.val() != "__unselected") {
                    if ($('#apg_product_class_image-' + $this.val() + '-').length > 0) {
                        $index = $('.slick-dots li').length - $('.slick-dots .selectable-class-image').length + $('#apg_product_class_image-' + $this.val() + '-').data('class_index') - 1;
                        $('.slides').slick('slickGoTo', $index);
                    }
                }
            });
        } else if ($('#classcategory_id2').length > 0) {
            $('#classcategory_id2').change(function () {
                var $this = $(this);
                if ($this.val()) {
                    if ($('#apg_product_class_image--' + $this.val()).length > 0) {
                        $index = $('.slick-dots li').length - $('.slick-dots .selectable-class-image').length + $('#apg_product_class_image--' + $this.val()).data('class_index') - 1;
                        $('.slides').slick('slickGoTo', $index);
                    }
                }
            });
        }
    });
</script><script>
    eccube.classCategories = {"__unselected":{"__unselected":{"name":"Please select.","product_class_id":""}},"5":{"#":{"classcategory_id2":"","name":"Please select.","product_class_id":""},"#37":{"classcategory_id2":"37","name":"FITS ALL","stock_find":true,"price01":"","price02":"8,800","product_class_id":"8679","product_code":"202HCDT-HT12","product_type":"1"}},"6":{"#":{"classcategory_id2":"","name":"Please select.","product_class_id":""},"#37":{"classcategory_id2":"37","name":"FITS ALL (SOLD OUT)","stock_find":false,"price01":"","price02":"8,800","product_class_id":"8681","product_code":"202HCDT-HT12","product_type":"1"}},"10":{"#":{"classcategory_id2":"","name":"Please select.","product_class_id":""},"#37":{"classcategory_id2":"37","name":"FITS ALL","stock_find":true,"price01":"","price02":"8,800","product_class_id":"8680","product_code":"202HCDT-HT12","product_type":"1"}}};

    // 規格2に選択肢を割り当てる。
    function fnSetClassCategories(form, classcat_id2_selected) {
        var $form = $(form);
        var product_id = $form.find('input[name=product_id]').val();
        var $sele1 = $form.find('select[name=classcategory_id1]');
        var $sele2 = $form.find('select[name=classcategory_id2]');
        eccube.setClassCategories($form, product_id, $sele1, $sele2, classcat_id2_selected);
    }

        fnSetClassCategories(
            document.form1, ""
    );
    </script><script>
$(function(){
    $('.carousel').slick({
        infinite: false,
        speed: 300,
        prevArrow:'<button type="button" class="slick-prev"><span class="angle-circle"><svg class="cb cb-angle-right"><use xlink:href="#cb-angle-right" />',
        nextArrow:'<button type="button" class="slick-next"><span class="angle-circle"><svg class="cb cb-angle-right"><use xlink:href="#cb-angle-right" />',
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    });

    $('.slides').slick({
        dots: true,
        arrows: false,
        speed: 300,
        customPaging: function(slider, i) {
            return '<button class="thumbnail">' + $(slider.$slides[i]).find('img').prop('outerHTML') + '';
        }
    });

    $('#favorite').click(function() {
        $('#mode').val('add_favorite');
    });

    $('#form1').on('submit', function(event){
        if($("#classcategory_id1").children().length>0) {
            if($('#classcategory_id1').val() == '' || $('#classcategory_id1').val() == '__unselected'){
                event.preventDefault();
                alert('Please Select COLOR');
                return false;
            };
        }
        if($("#classcategory_id2").children().length>0) {
            if($('#classcategory_id2').val() == ''){
                event.preventDefault();
                return false;
            }
        }
    });

    $('#add-cart').click(function() {
        if($("#classcategory_id1").children().length>0) {
            if($('#classcategory_id1').val() == '' || $('#classcategory_id1').val() == '__unselected'){
                return false;
            };
        }
        if($("#classcategory_id2").children().length>0) {
            if($('#classcategory_id2').val() == ''){
                return false;
            }
        }
        $('#mode').val('add_cart');
    });

    // bfcache無効化
    $(window).bind('pageshow', function(event) {
        if (event.originalEvent.persisted) {
            location.reload(true);
        }
    });

    // toggle
    if($(".product-detail-chart-btn").length){
        $(".product-detail-chart-btn").each(function(){
            $(this).click(function(){
              if($(this).hasClass("act")==false){
                $(this).parents(".product-detail-chart").find(".product-detail-chart-btn").removeClass("act");
                $(this).addClass("act");
                var cls = $(this).attr("class").replace("product-detail-chart-btn","").replace("act","").replace(/\s+/g,"");
                var tar = $(this).parents(".product-detail-chart").find(".product-detail-chart-toggle."+cls);
                $(this).parents(".product-detail-chart").find(".product-detail-chart-toggle").animate({"height":0},300,"linear");
                tar.stop();
                tar.css({"visibility":"hidden","height":"auto","position":"absolute","top":0});
                var _h = tar.height();
                tar.css({"visibility":"visible","height":"0","position":"relative","top":"auto"});
                tar.animate({"height":_h},300,"linear");
              }else{
                $(this).removeClass("act");
                $(this).parents(".product-detail-chart").find(".product-detail-chart-toggle").each(function(){
                    $(this).css({"visibility":"visible","position":"relative","top":"auto"});
                    $(this).stop().animate({"height":0},300,"linear");
                });
              }
            });
        });
    }

    // QTY

    if($("#quantity").length){

      $("#detail_cart_box__cart_quantity .detail_cart_box_input_num").html(Number($("#quantity").val()));

      $("#detail_cart_box__cart_quantity .detail_cart_box_input_up").click(function(){
        var _n = Number($("#quantity").val());
        var _max = $("#quantity").attr("maxlength");
        if(_n < _max){
          $("#detail_cart_box__cart_quantity .detail_cart_box_input_num").html(_n+1);
          $("#quantity").val(_n+1);
        }
      });

      $("#detail_cart_box__cart_quantity .detail_cart_box_input_down").click(function(){
        var _n = Number($("#quantity").val());
        if(_n > 1){
          $("#detail_cart_box__cart_quantity .detail_cart_box_input_num").html(_n-1);
          $("#quantity").val(_n-1);
        }
      });


      $("#quantity").click(function(){
        $("#detail_cart_box__cart_quantity .detail_cart_box_input_num").html(Number($(this).val()));
      });


    };

});
</script><div class="product-sec-modal">
<div class="product-sec-modal-close"></div>
<img src=""><div class="product-sec-modal-left"></div>
<div class="product-sec-modal-right"></div>
</div>
</body>
</html>
`;
const page = cheerio.load(html);
console.log(page(".line.color").find(".txt").html());
