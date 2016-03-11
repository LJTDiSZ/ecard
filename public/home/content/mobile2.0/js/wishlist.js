/* Wishlist Functions */
var productNoTemp;
var wishlistItemNoTemp;
var wishlistNoTemp;
var isNewList = false;
var reloadPage;

function showPopupError(a) {
    var b = 10;
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var c = new Number(RegExp.$1);
        if (c < 8) b = 70;
    }
    var d = a.indexOf("width:");
    var e = a.indexOf("height:");
    width = parseInt(a.substring(d + "width:".length, d + a.substring(d).indexOf("px;")));
    height = parseInt(a.substring(e + "height:".length, e + a.substring(e).indexOf("px;"))) + 65;

    //for mobile
    if ($(window).width() < 570) {
        //replace inline styles to allow fluid width.
        a = a.replace('width:740px;', '').replace('height:275px;', '');
        width = '85%';
        height = 'auto';
    }

    /*if ($('#productsheight')) {height = height + 65}*/ //<-- this check doesnt do anything, jquery always returns an empty array when querying the dom.
    $("#TB_ajaxContent").html("");
    if ($("#wishListPopupContainer").length == 0) {
        var f = document.createElement("div");
        f.setAttribute("id", "wishListPopupContainer");
        f.setAttribute("style", "display:none;");
        document.body.appendChild(f)
    }
    $("#wishListPopupContainer").html(a.toString());
    $(".wishListsMenuLinkSelector").find(".wishListsHoverMenuSelector").hide();
    $("#wishListPopupContainer").html(a.toString()).dialog({
        width: width,
        height: height,
        modal: true
    });
}

function showPopupWithRefresh(data, status) {
    if (status == "success") {
        try {
            var result;
            try {
                JSON
            } catch(e) {
                result = eval("(" + data + ")")
            }
            if (!result) result = JSON.parse(data);
            if (result.Alert && result.Alert.toString().length > 0) alert(result.Alert.toString());
            else {
                refreshWishLists(result.WishLists);
                if (result.UpdateListName) setWishlist();
                else showPopup(result.Popup, status)
            }
        } catch(err) {
            showPopupError(data)
        }
    }
}
function showPopup(a, b) {
    if (b == "success") {
        var c = a.indexOf("width:");
        var d = a.indexOf("height:");
        width = parseInt(a.substring(c + "width:".length, c + a.substring(c).indexOf("px;"))) + 65;
        height = parseInt(a.substring(d + "height:".length, d + a.substring(d).indexOf("px;"))) + 65;
        if (a.indexOf("prodheight") > 0) {height = height + 115;}

        $("#TB_ajaxContent").html("");
        if ($("#wishListPopupContainer").length == 0) {
            var e = document.createElement("div");
            e.setAttribute("id", "wishListPopupContainer");
            e.setAttribute("style", "display:none;");
            document.body.appendChild(e)
        }
        $("#wishListPopupContainer").html(a.toString());
        $(".wishListsMenuLinkSelector").find(".wishListsHoverMenuSelector").hide();
        $("#wishListPopupContainer").html(a.toString()).dialog({
        width: width,
        height: height,
        modal: true
    });
    }
}
function showSaveWishlistComment(currentWishListItemNo) {
    wishlistItemNoTemp = currentWishListItemNo;
    var data = {
        WishlistItemNo: wishlistItemNoTemp
    };
    $.ajax({
        type: "POST",
        url: "/cp/catalogExp/wishlist_service.aspx?action=ShowSaveWishlistComment",
        data: data,
        success: showPopup
    })
}
function saveWishlistItemComment() {
    var comment = $('#txtWishlistItemComment').val();
    var data = {
        WishlistItemNo: wishlistItemNoTemp,
        Comment: comment
    };
    $.ajax({
        type: 'POST',
        url: '/cp/catalogExp/wishlist_service.aspx?action=SaveWishlistItemComment',
        data: data,
        success: ReloadWishlistPage,
        error: ShowCommentError
    })
}
function ReloadWishlistPage() {
    location.reload();
    removeWishlistPopup()
}

function ShowCommentError() {
    alert('Your comment cannot contain html tags or javascript.')
}
function refreshWishLists(a) {
    $(".wishListHolderSelector").html(a)
}
function setWishlist() {
    var name = $('#txtListNameEdit').val();
    $('#lblWishlistName').text(name);
    var description = $('#txtListDescriptionEdit').val();
    $('#lblWishlistDescription').text(description);
    setWishlistSharelinks(name);
    removeWishlistPopup()
}
function editWishlist() {
    var listName = $('#txtListNameEdit').val().trim();
    var listDescription = $('#txtListDescriptionEdit').val().trim();
    var data = {
        WishlistNo: wishlistNoTemp,
        ListName: listName,
        ListDescription: listDescription
    };
    if (listName.length > 127) {
        alert("WishList Name cannot be too long!!")
    } else {
        if (listName.length > 0) {
            $.ajax({
                type: 'POST',
                url: '/cp/catalogExp/wishlist_service.aspx?action=SaveWishList',
                data: data,
                success: showPopupWithRefresh,
                error: ShowHtmlError
            })
        } else {
            alert("Please enter the name of the list.")
        }
    }
}
function ReloadWishlistMembersPage(a) {
    try {
        $("#lbtnRefreshWishlistMembers").click()
    } catch(b) {}
    removeWishlistPopup();
    $("#" + a).remove()
}

function saveWishlist() {
    var a = $("#txtListName").val().trim();
    var b = $("#txtListDescription").val().trim();
    if (a.length > 127) {
        alert("WishList Name cannot be too long!!")
    } else {
        if (a.length > 0) {
            var c = $("#txtProductDescription").val();
            var d = 1;
            var e = $('select[name^="color_' + productNoTemp + '"]').val();
            var f = $('input[name^="size_' + productNoTemp + '"]').val();
            var g = {
                ProductNo: productNoTemp,
                Qty: d,
                Color: e,
                Size: f,
                ListName: a,
                ListDescription: b,
                ProductDescription: c,
                WishlistItemNo: wishlistItemNoTemp,
                IsNewList: isNewList
            };
            $.ajax({
                type: "POST",
                url: "/cp/catalogExp/wishlist_service.aspx?action=SaveWishList",
                data: g,
                success: showPopupWithRefresh,
                error: ShowHtmlError
            });
        } else {
            alert("Please enter the name of the list.");
        }
    }
}

function showCreateNewWishlist(a) {
    wishlistItemNoTemp = "";
    productNoTemp = a;
    var b = {
        ProductNo: a
    };
    $.ajax({
        type: "POST",
        url: "/cp/catalogExp/wishlist_service.aspx?action=ShowCreateNewWishList",
        data: b,
        success: showPopup
    });
}
function showCreateNewWishlistWishThisProduct(productNo, currentWishListItemNo) {
    var qty = 1;
    var color = $('select[name^="color_' + productNo + '"]').val();
    var size = $('input[name^="size_' + productNo + '"]').val();
    productNoTemp = productNo;
    wishlistItemNoTemp = currentWishListItemNo;
    isNewList = true;
    var data = {
        ProductNo: productNoTemp,
        Qty: qty,
        Color: color,
        Size: size,
        WishlistItemNo: wishlistItemNoTemp
    };
    $.ajax({
        type: 'POST',
        url: '/cp/catalogExp/wishlist_service.aspx?action=ShowCreateNewWishList',
        data: data,
        success: showPopup
    })
}
function InitWishlistsMenu() {
    $(".wishListsMenuLinkSelector").hover(function() {
        var a = $(this).find(".wishListsHoverMenuSelector");
        a.show()
    },
    function() {
        $(this).find(".wishListsHoverMenuSelector").hide()
    });
}

function updateWishlist() {
    if (window.cafepress.showWishlists) $("#yourlists").show()
}
function showSendEmail(currentWishListNo) {
    wishlistNoTemp = currentWishListNo;
    $.ajax({
        type: 'POST',
        url: '/cp/catalogExp/wishlist_service.aspx?action=ShowSendEmail',
        success: showPopup
    })
}

function showEditWishlist(wishlistNo) {
    wishlistNoTemp = wishlistNo;
    var data = {
        WishlistNo: wishlistNoTemp
    };
    $.ajax({
        type: 'POST',
        url: '/cp/catalogExp/wishlist_service.aspx?action=ShowEditWishlist',
        data: data,
        success: showPopup
    })
}
function MakeWishlistPrivate(wishlistNo) {
    var url = 'WishList.aspx?wishlistNo=' + wishlistNo;
    var data = {
        edit: '1'
    };
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: setWishlistPrivate
    });
    return false
}
function setWishlistPrivate(data, status) {
    if (status == "success") {
        if ($('#aMakeWishlistPrivate').text().indexOf("public") != -1) $('#aMakeWishlistPrivate').text('Make list private');
        else $('#aMakeWishlistPrivate').text('Make list public')
    }
}
function SendMailToTextExample(oEvent) {
    if (oEvent.type == 'mouseout') if ($('#txtaSendMailTo').val() == '') {
        $('#txtaSendMailTo').css({
            'color': '#B0D1E8'
        });
        $('#txtaSendMailTo').val('Type in emails: jo@example.com,hy@example.com')
    }
    if (oEvent.type == 'mouseover') if ($('#txtaSendMailTo').val() == 'Type in emails: jo@example.com,hy@example.com') {
        $('#txtaSendMailTo').css({
            'color': 'black'
        });
        $('#txtaSendMailTo').val('')
    }
}
function ShowHtmlError() {
    alert("Your could not enter html tags or javascript.")
}
function setWishlistSharelinks(name) {
    $("#lnkFacebook").attr("href", "http://facebook.com/sharer.php?u=" + $(location).attr("href"));
    $("#lnkTwitter").attr("href", "http://twitter.com/home?status=" + name + " - CafePress: " + $(location).attr("href") + " via @cafepress")
}
function signInCallBack(data, status) {
    if (status == "success" && data.indexOf('pnlAddedToWishlist') > -1){
        $(document).trigger('productaddedtowishlist', [productNoTemp]);
	}
    try {
        var result;
        try {
            JSON
        } catch(e) {
            result = eval("(" + data + ")")
        }
        if (!result) result = JSON.parse(data);
        reloadPage = result.ReloadPage;
        showPopupWithRefresh(data, status)
    } catch(err) {
        showPopupWithRefresh(data, status)
    }
}

function signIn(a) {
    var b = 1;
    var c = $('select[name^="color_' + productNoTemp + '"]').val();
    var d = $('input[name^="size_' + productNoTemp + '"]').val();
    var e = $("#txtEmailAddress").val();
    var f = $("#txtPassword").val();
    var g = {
        ProductNo: productNoTemp,
        WishListNo: a,
        Qty: b,
        Color: c,
        Size: d,
        Email: e,
        Password: f
    };
    $.ajax({
        type: "POST",
        url: "/cp/catalogExp/wishlist_service.aspx?action=SignIn",
        data: g,
        success: signInCallBack,
        error: ShowHtmlError
    });
}
function addToWishList(wishListNo, productNo, currentWishListItemNo) {
    var qty = 1;
    var color = $('input[name^="color_'+productNo+'"]').val();
    var size = $('input[name^="size_' + productNo + '"]').val();
    productNoTemp = productNo;
    var data = {
        ProductNo: productNoTemp,
        WishListNo: wishListNo,
        Qty: qty,
        Color: color,
        Size: size,
        WishlistItemNo: currentWishListItemNo
    };
    $.ajax({
        type: "POST",
        url: "/cp/catalogExp/wishlist_service.aspx?action=AddToList",
        data: data,
        success: signInCallBack
    })
}
function removeWishlistPopup() {
    if (reloadPage) window.location.reload();
    $('#wishListPopupContainer').dialog('destroy')
}

function hideThickboxPopup(a) {
    removeWishlistPopup();
    $("#" + a).remove()
}

function updateWishlist() {
    if (window.cafepress.showWishlists) $("#yourlists").show()
}

$(function(){
    InitWishlistsMenu();
    updateWishlist();
});

