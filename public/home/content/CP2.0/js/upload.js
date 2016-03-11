window.matchMedia=window.matchMedia||(function(e,f){var c,a=e.documentElement,b=a.firstElementChild||a.firstChild,d=e.createElement("body"),g=e.createElement("div");g.id="mq-test-1";g.style.cssText="position:absolute;top:-100em";d.style.background="none";d.appendChild(g);return function(h){g.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width: 42px; }</style>';a.insertBefore(d,b);c=g.offsetWidth===42;a.removeChild(d);return{matches:c,media:h}}}(document));
window.cafepress = window.cafepress || {};
cafepress.globalHeader = cafepress.globalHeader || {};
cafepress.globalHeader.matchMedia = function(width, Fn){
	//pass in orientation string 'portrait' or 'landscape' for orientation media query instead of width
	if (window.matchMedia) {
		if(width == "portrait" || width == "landscape") {
			var mq = window.matchMedia("(orientation: "+orientation+")")
		} else {
			var mq = window.matchMedia("(max-width: "+width+"px)");
		}

		if(mq.addListener) {
			mq.addListener(Fn);
			Fn(mq);
		}
	}
}

/*helper classes and functions*/
String.prototype.bool = function() {
    return (/^true$/i).test(this);
};

function chunk(arr, len) {
  var chunks = [],
      i = 0,
      n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}

function ImageInfo(){
	return {
		tags:ko.observable(''),
		about:ko.observable('')
	}
}

function RegisterData(){
	return {
		email:ko.observable(''),
		password:ko.observable(''),
		firstName:ko.observable(''),
		lastName:ko.observable('')
	}
}

function LoginData(){
	return {
		email:ko.observable(''),
		password:ko.observable('')
	}
}

/*the main view model class*/
function ViewModel(fileAddedCallback, uploadButtons, isAnonymousFlow) {
	var self = this;
	console.log("in ViewModel 0");
	self.isAnonymousFlow = ko.observable(isAnonymousFlow);
	self.isTermsAccepted = ko.observable(true);
	self.readParamFromQueryString = function(name, defaultValue, url){
		return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(url || location.search) || [, defaultValue || null])[1]);
	};
	self.readIntParamFromQueryString = function(name, defaultValue){
		return parseInt(self.readParamFromQueryString(name, defaultValue));
	};
	self.readFloatParamFromQueryString = function(name, defaultValue){
		return parseFloat(self.readParamFromQueryString(name, defaultValue));
	};
	self.readBoolParamFromQueryString = function(name, defaultValue){
		return self.readParamFromQueryString(name, defaultValue).bool();
	};

	self.loading = ko.observable(false);
	self.useFlash = self.readBoolParamFromQueryString('useFlash', true);
	self.useHtml5 = self.readBoolParamFromQueryString('useHtml5', true);
	self.uploaderButtons = uploadButtons;

	self.isBrowserHtml5UploadCapable = function(){
		var firstCheck = window.File && window.FileReader && window.FileList && window.Blob;
		var anotherCheck = $("<input type='file'>").get(0).files !== undefined;
		return typeof (firstCheck && anotherCheck) != 'undefined' && firstCheck && anotherCheck;
	};

	self.isBrowserFlashCapable = function(){
		var hasFlash = false;
		try {
			var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
			if(fo) hasFlash = true;
		} catch(e){
			if(navigator.mimeTypes ["application/x-shockwave-flash"] != undefined) hasFlash = true;
		}
		return hasFlash;
	};

	self.detectBrowserCapabilities = function(){
		var is_firefox22 = navigator.userAgent.toLowerCase().indexOf('firefox/'+22) > -1;
		return {
			flash: self.useFlash && self.isBrowserFlashCapable(),
			html5: self.useHtml5 && self.isBrowserHtml5UploadCapable() && !is_firefox22
		};
	};

	self.memberNo = ko.observable(0);
	self.fitSelected = ko.observable(false);
	self.fitChosen = ko.observable(false);
	self.anonymousMemberNo = ko.observable(0);
	self.isMemberAnonymous = ko.observable(false);
	self.cnlFolderNo = ko.observable(0);
	self.currency = ko.observable({Symbol: '$'});
	self.imageNo = ko.observable(0);
	self.imagePreview = ko.observable('');
	self.imageName = ko.observable('');
	self.imageNameForDisplay = ko.computed(function(){
		return self.imageName().length > 14 ? self.imageName().substring(0, 10) + ' ...' : self.imageName();
	});
	self.token = ko.observable('');
	self.uploaderConfig = ko.computed(function(){
		var capability = self.detectBrowserCapabilities();
		var result = {
			elementId: 'upload-button',
			maxUpload: 1,
			selectionMode: 'single',
			MemberNo: self.memberNo(),
			FolderNo: self.cnlFolderNo(),
			ImageCaption: '',
			ImageDescription: '',
			thumbWidth: self.readIntParamFromQueryString('thumbWidth', 400),
			thumbHeight: self.readIntParamFromQueryString('thumbHeight', 400),
			ImageQuality: self.readFloatParamFromQueryString('quality', 0.75),
			preUploadUri: 'http://' + window.cafepress.dnlUploadHost + '/DesignAndListCloudAPI/DesignAndListCloudAPIRestful.svc/GetProductUrlsForThumbnailBase64',
			uploadUri: 'http://' + window.cafepress.dnlUploadHost + '/DesignAndListCloudAPI/DesignAndListCloudAPIRestful.svc/ReplacePrimitiveByImageNo'
		};

		if (capability.html5){
			/*html5*/
			result.preUploadComplete = self.uploaderFileUploaded;
			result.uploadComplete = self.uploadPrimitiveComplete;
			result.uploadFailure = self.uploadPrimitiveFailed;
			result.uploadCanceled = self.uploadPrimitiveFailed;
			result.selectedImagesLoadProgress = self.uploaderFilesAdded;
			result.selectedImagesLoadComplete = self.uploaderFilesAddedComplete;
			result.uploadsProgressCallBack = self.uploadsProgressCallBack;
		} else if (capability.flash){
			/*flash*/
			result.preUploadCompleteCallBack = 'viewModel.uploaderFileUploaded';
			result.uploadComplete = 'viewModel.uploadPrimitiveComplete';
			result.uploadFailure = 'viewModel.uploadPrimitiveFailed';
			result.noProductSuggestions = 'viewModel.noProductSuggestions';
			result.selectedImagesLoadProgressCallBack = 'viewModel.uploaderFilesAdded';
			result.selectedImagesLoadCompleteCallBack = 'viewModel.uploaderFilesAddedComplete';
			result.uploadsProgressCallBack = 'viewModel.uploadsProgressCallBack';
		}

		return result;
	});
	
	self.actionBarVisible = ko.observable(false);
	self.buyItFlowStarted = ko.observable(false);
	self.makeMoneyFlowStarted = ko.observable(false);
	self.editProductFlowStarted = ko.observable(false);
	self.repositionFlowStarted = ko.observable(false);	
	self.shareFlowStarted = ko.observable(false);
	self.repositionTooltipVisible = ko.observable(false);
	self.editProductsTooltipVisible = ko.observable(false);
	self.showLogin = ko.observable(false);
	self.repositionTipClosed = ko.observable(false);
	self.editProductTipClosed = ko.observable(false);
	self.showRegister = ko.computed(function(){
		var isNotLoggedInOrIsAnonymous = self.memberNo() == 0 || self.isMemberAnonymous();
		var hasInitiatedOneOfTheFlowsThatRequireLogin = self.shareFlowStarted() || self.makeMoneyFlowStarted();
		return hasInitiatedOneOfTheFlowsThatRequireLogin && isNotLoggedInOrIsAnonymous && !self.showLogin();
	});
	self.mainPageVisible = ko.observable(false);
	self.uploadPageVisible = ko.observable(false);
	self.uploadPageImagePreviewVisible = ko.observable(false);
	self.uploadReadyVisible = ko.observable(false);
	self.collectionVisible = ko.observable(false);
	self.collectionVisibleFilterBar = ko.observable(false);
	self.reviewDialogVisible = ko.observable(false);
	self.reviewDialogAcceptTermsVisible = ko.observable(false);
	self.collectionNameFocused = ko.observable(false);
	self.collectionNameWasFocused = ko.observable(false);
	self.primitiveDone = ko.observable(false);
	self.collectionName = ko.observable('');
	self.suggestions = ko.observableArray([]);
	self.departments = ko.observable([]);
	self.departmentsWithProducts = ko.computed(function(){
		var depts = new Array();
		for (var i = 0; i < self.departments().length; i++){
			var item = self.departments()[i];
			item.productsInThisDepartment = self.suggestions().select(function(s){return s.ProductTypeNo();}).intersect(item.MerchandiseIds).length;
			if (item.productsInThisDepartment > 0)
				depts.push(item);
		}
		return depts;
	});
	
	self.departmentsFilterVisible = ko.observable(false);
	self.filters = [
		{
			name : 'Lowest Price',
			action: function(){
				self.clearDepartmentFilter();
				return self.suggestions().orderBy(function(i){ return i.salePrice(); });
			}
		},
		{
			name : 'Category',
			action: function(){
				self.showDepartmentsFilter();
				return self.suggestions();
			}
		},
		{
			name : 'Alphabetical',
			action: function(){
				self.clearDepartmentFilter();
				return self.suggestions().orderBy(function(i){ return self.computedProductTypeCaption(i); });
			}
		},
		{
			name : 'View All',
			action: function(){
				self.clearDepartmentFilter();
				return self.suggestions().orderBy(function(i){ return i.ProductTypeNo(); });
			},
			isDefault: true
		}
	];
	self.currentFilter = ko.observable(self.filters.firstOrDefault(function(i){ return i.isDefault === true; }))
	self.currentCategory = ko.observable();
	
	self.selectFilter = function(filter){
		self.currentFilter(filter);
		self.loadMoreClicked(false);
	};
	self.selectCategory = function(cat){
		window.console && console.log(cat.Title);
		self.currentCategory(cat);
		self.departmentsFilterVisible(false);
	};
	
	self.clearDepartmentFilter = function(){
		self.currentCategory(null);
		self.departmentsFilterVisible(false);
	};
	
	self.filteredSuggestions = ko.computed(function(){
		var result = self.currentFilter().action(self.suggestions());
		if (self.currentCategory())
			result = result.where(function(i){ return self.currentCategory().MerchandiseIds.indexOf(i.ProductTypeNo()) > -1; });
		return result;
	});
	
	self.showMoreButtonThreshold = ko.observable(4);
	self.mobileView = ko.observable(true);
	
	cafepress.globalHeader.matchMedia(990, function(mq){
		if (mq.matches){
			self.mobileView(true);
			cafepress.globalHeader.matchMedia(570, function(mq){
				if (mq.matches){
					self.showMoreButtonThreshold(4);
				} else {
					self.showMoreButtonThreshold(6);
				}
			});
		} else {
			self.showMoreButtonThreshold(9999);
			self.mobileView(false);
		}
	});
	
	self.loadMoreClicked = ko.observable(false);
	
	self.visibleSuggestions = ko.computed(function(){
		var count = self.loadMoreClicked() ? self.filteredSuggestions().length : Math.min(self.showMoreButtonThreshold(), self.filteredSuggestions().length);
		setTimeout(self.lazyLoadImages, 1000);
		return self.filteredSuggestions().take(count);
	});
	
	self.showLoadMore = ko.computed(function(){
		var filteredSuggestionsCount = self.filteredSuggestions().length;
		return !self.loadMoreClicked() && filteredSuggestionsCount > self.showMoreButtonThreshold() && filteredSuggestionsCount != self.visibleSuggestions().length;
	});
	
	self.loadMore = function(){
		self.loadMoreClicked(true);
	};
	
	self.selectedSuggestions = ko.computed(function(){
		var selected = new Array();
		for(var i = 0; i < self.filteredSuggestions().length; i++){
			var suggestion = self.filteredSuggestions()[i];
			if (suggestion.selected())
				selected.push(suggestion);
		}
		return selected;
	});
	self.selectedSuggestionsCount = ko.computed(function(){
		return self.selectedSuggestions().length;
	});
	self.suggestionsPtns = ko.computed(function(){
		var ptns = new Array();
		for(var i = 0; i < self.suggestions().length; i++){
			ptns.push(self.suggestions()[i].ProductTypeNo());
		}
		return ptns.join(',');
	});
	self.currentQuickViewSuggestion = ko.observable(null);
	self.currentQuickViewProductsCount = ko.observable(1);
	self.currentQuickViewImageUrl = ko.observable('');
	self.registerData = ko.observable(new RegisterData());
	self.loginData = ko.observable(new LoginData());
	self.imageInfo = ko.observable(new ImageInfo());
	self.keyword = ko.observable('photo');
	self.keywords = ['image', 'photo', 'graphic', 'design', 'logo', 'creativity', 'artwork'];
	self.getMaxImageCaptionLengthBasedOnProductTypeNames = ko.computed(function(){
		var length = 0;
		for(var i = 0; i < self.suggestions().length; i++){
			if(self.suggestions()[i].ProductTypeCaption().length > length)
				length = self.suggestions()[i].ProductTypeCaption().length;
		}
		//50 is the max product.caption limit in the DB
		//35 is the desired max image caption
		return Math.min(50-length, 35);
	});

	self.checkForProductTypeTagRestrictions = ko.observable(true);
	self.createdAtLeastOneProduct = ko.observable(false);
	self.areImageNameAndTagsFilled = ko.computed(function(){
		return jQuery.trim(self.collectionName()) != '' && jQuery.trim(self.imageInfo().tags()) != '';
	});
	
	/*Begin Uploader*/
	self.initUploaderControl = function(){
		self.detectBrowserCapabilitiesAndLoadNecessaryScripts(function(type){
			switch(type){
				case 'flash':
					window.console && console.log('flash');
					/* replace buttons with the flash uploader*/
					var flashButton = $('.step1');
					var copyOfFlashButton = flashButton.clone();
					flashButton.remove();
					self.uploaderButtons.each(function(index){
						var tempFlashButton = copyOfFlashButton.clone();
						tempFlashButton.find('.upload-wrapper').append('<div id="upload-button' + ((index != 0) ? index : "") +  '" />');
						$(this).append(tempFlashButton).addClass('upload-button');
						if (index == 0)
							self.initFlashUploader(self.uploaderConfig());
						else
							self.initFlashUploader(self.uploaderConfig(), self.uploaderConfig().elementId + index);
					});
					self.initFlashUploader(self.uploaderConfig(), 'tryagain');
					break;
				case 'html5':
					window.console && console.log('html5');
					self.uploaderButtons.add('.tryagain .upload-button').each(function(index){
						self.initHtml5Uploader(self.uploaderConfig(), $(this));
					});
					break;
			}
		});
	};

	self.detectBrowserCapabilitiesAndLoadNecessaryScripts = function(callback){
		var capability = self.detectBrowserCapabilities();
		if (capability.html5)
		{
		    console.log("capability.html5");
			$.getScript('content/CP2.0/js/vendor/html5uploader.js',function(){
				callback('html5');
			});
		}
		else if (capability.flash)
		{
		    console.log("capability.flash");
			$.getScript('content/CP2.0/js/vendor/swfobject.js', function(){
				callback('flash');
			});
		}
	};

	self.initHtml5Uploader = function(config, element){
		new window.cafepress.html5Uploader(config, element);
	};

	self.initFlashUploader = function(config, elementId){
		var flashvars = {
			maxUpload: config.maxUpload,
			selectionMode: config.selectionMode,
			MemberNo: config.MemberNo,
			FolderNo: config.FolderNo,
			ImageCaption: config.ImageCaption,
			ImageDescription: config.ImageDescription,
			preUploadUri: config.preUploadUri,
			uploadUri: config.uploadUri,
			uploadComplete: config.uploadComplete,
			uploadFailure: config.uploadFailure,
			preUploadCompleteCallBack: config.preUploadCompleteCallBack,
			uploadsProgressCallBack: config.uploadsProgressCallBack,
			selectedImagesLoadProgressCallBack: config.selectedImagesLoadProgressCallBack,
			selectedImagesLoadCompleteCallBack: config.selectedImagesLoadCompleteCallBack,
			preUploadUriCompleteCallBack: config.preUploadUriCompleteCallBack,
			noProductSuggestions: config.noProductSuggestions
		};
		config.elementId = elementId || config.elementId;

		var container = $('#' + config.elementId).parents('.upload-button');
		config.width = Math.max(container.outerWidth(), 110);
		config.height = Math.max(container.outerHeight(), 25);
		var params = {
			menu: "false",
			scale: "noScale",
			allowFullscreen: "true",
			allowScriptAccess: "always",
			bgcolor: "",
			wmode: "transparent" // can cause issues with FP settings & webcam
		};
		var attributes = {
			id: config.elementId,
			stlyle:'z-index="999;"'
		};
		swfobject.embedSWF("/content/CP2.0/js/vendor/uploader.swf", config.elementId, config.width, config.height, "11.0.0", "/content/CP2.0/js/vendor/expressInstall.swf", flashvars, params, attributes);
	};

	self.noProductSuggestions = function(file){
		self.showDialog('Oops','There were no product suggestions for your image. Please try uploading another image.', self.reset);
	};

	self.uploaderFilesAdded = function(file){
		if(self.imageNo() != 0 && !self.createdAtLeastOneProduct())
			self.deactivateImage();
			
		self.createdAtLeastOneProduct(false);
		self.moveToUploadPage();
		self.imageName("");
		self.imagePreview("");
		self.suggestions([]);
		if (typeof fileAddedCallback == "function")
			fileAddedCallback();
	};

	self.uploaderFilesAddedComplete = function(file){
		self.imageName(file.name);
		self.imagePreview(file.base64);
	};
	
	self.uploadsProgressCallBack = function(file){
		var percentage = Math.round(file.bytesLoaded * 100 / file.bytesTotal);		
		window.console && console.log('uploadsProgressCallBack percentage = ', percentage);
	};

	self.uploaderFileUploaded = function(response){
		var data = response.GetProductUrlsForThumbnailBase64Result;
		
		if (data.Suggestions.length == 0){
			self.showDialog('Oops','No product suggestions was found for your image. Please try to upload another image', self.reset);
			return;
		}
		self.mapSuggestions(data.Suggestions);
		self.setImageNo(data.Suggestions);
		self.moveToUploadReady();
	};

	self.uploadPrimitiveComplete = function(data){
		if(!data.ReplacePrimitiveByImageNoResult.Result){
			self.uploadPrimitiveFailed(data.ReplacePrimitiveByImageNoResult.ErrorMessage);
		}else{
			self.track('cp2_0_upload_success');
			self.primitiveDone(true);
		}
	};
	self.uploadPrimitiveFailed = function(msg, skipLog){
		if (!msg || typeof(msg) == 'object')
			msg = 'An error occured while uploading your full size image. Please excuse us for the inconveninece and try again.';
		self.showDialog('Oops', msg, self.reset);
		if (!skipLog){
			self.track('cp2_0_upload_fail');
			self.logErrorToServer(2, msg, 'DnLFlow');
		}
	};

	self.setImageNo = function(suggestions){
		if (suggestions.length > 0)
			self.imageNo(suggestions[0].ImageNo);
	};
	/*End Uploader*/

	self.showDialog = function (title, message, onClose) {
		if(!$.ui)
		{
			alert(message);
			if (typeof onClose == "function")
				onClose();
			return;
		}
		var dialog = $('<div title="' + title + '!">' + message + '</div>');
		dialog.dialog({
			resizable: false,
			modal: true,
			buttons: {
				Ok: function() {
					$(this).dialog("close");
				}
			},
			close: onClose
		});
	}

	self.tagsEntities = ko.observableArray([]);
	self.tagsEntitiesCsv = ko.computed(function(){
		var tags = new Array();
		for(var i = 0; i < self.tagsEntities().length; i++){
			if(self.tagsEntities()[i].IsPartnerTag()){ //if partner tag, check if it is accepted before adding it to the collection that is sent for tagging
				if(self.tagsEntities()[i].HasAcceptTC()){
					tags.push(self.tagsEntities()[i].Value());
				}
			}
			else{
				tags.push(self.tagsEntities()[i].Value());
			}
		}		
		return tags.join(',');
	});
	self.partnerTags = ko.computed(function(){
		var pTags = new Array();
		for(var i = 0; i < self.tagsEntities().length; i++){
			var tagEntity = self.tagsEntities()[i];
			if (tagEntity.IsPartnerTag())
				pTags.push(tagEntity);
		}
		return pTags;
	});
	self.notAcceptedPartnerTags = ko.computed(function(){
		var napTags = new Array();
		for(var i = 0; i < self.partnerTags().length; i++){
			var partnerTag = self.partnerTags()[i];
			if (!partnerTag.HasAcceptTC())
				napTags.push(partnerTag);
		}
		return napTags;
	});
	self.nonPartnerTagsCsv = ko.computed(function(){
		var tags = new Array();
		for(var i = 0; i < self.tagsEntities().length; i++){
			if(!self.tagsEntities()[i].IsPartnerTag())
				tags.push(self.tagsEntities()[i].Value());
		}
		return tags.join(',');
	});
	self.partnerTagsCsv = ko.computed(function(){
		var tags = new Array();
		for(var i = 0; i < self.partnerTags().length; i++){
			if(self.partnerTags()[i].Accepted()){
				tags.push(self.partnerTags()[i].Value());
			}
		}
		return tags.join(',');
	});
	self.showTermsAndConditions = ko.observable(false);
	self.showAcceptTermsAndConditionsButton = ko.computed(function(){
		for(var i = 0; i < self.notAcceptedPartnerTags().length; i++){
			if(self.notAcceptedPartnerTags()[i].Accepted())
				return true;
		}
		return false;
	});

	self.getTermsAndConditionsUrl = function(partnerTag){
		var url = "javascript:viewModel.launchHelp(\'" + ko.utils.unwrapObservable(partnerTag).TCFileName() + "\',\'height=500,width=800,scrollbars=1\')";
		return url;
	};

	self.numberOfSuggestions = ko.computed(function(){
		return self.suggestions().length;
	});

	self.getAllSuggestionsMerchandiseTypes = function(){
		var ptns = new Array();
		for(var i = 0; i < self.suggestions().length; i++){
			var suggestion = self.suggestions()[i];
			ptns.push(suggestion.ProductTypeNo());
		}
		return ptns;
	};

	self.getAllDepartments = function(callback){
		callback = callback || function(){};
		if (!self.departments().any()){
			$.get('/ws/getdepartments', {}, function(response){
				if (response.Data){
					self.departments(response.Data);
					callback();
				}
			});
		} else {
			callback();
		}
	};

	self.showDepartmentsFilter = function(){
		self.getAllDepartments(function(){
			self.departmentsFilterVisible(true);
		});
	};

	self.mapSuggestions = function(suggestions){
		self.addPropertiesToSuggestions(suggestions);
		self.addPropertiesFromCrunchUrl(suggestions);
		ko.mapping.fromJS({suggestions: suggestions}, {}, self);
		var ptnsCsv = self.getAllSuggestionsMerchandiseTypes().join(',');
		self.setMerchandiseDetails(ptnsCsv);
	};

	self.addPropertiesToSuggestions = function(suggestions){
		for(var i = 0; i < suggestions.length; i++){
			var suggestion = suggestions[i];
			suggestion.selected = false;
			suggestion.salePrice = 0;
			suggestion.originalPrice = 0;
			suggestion.productNo = 0;
			suggestion.description = '';
			suggestion.isInStock = true;
			suggestion.width = 0;
			suggestion.height = 0;
			suggestion.cropX = 0;
			suggestion.cropY = 0;
		}
	};

	self.addPropertiesFromCrunchUrl = function(suggestions){
		for(var i = 0; i < suggestions.length; i++){
			var suggestion = suggestions[i];
			var crunchJson = self.readParamFromQueryString('region', '{}', suggestion.ProductCrunchUrls[0]);
			var crunch = $.parseJSON(crunchJson);
			suggestion.width = crunch.width || 0;
			suggestion.height = crunch.height || 0;
			suggestion.cropX = crunch.crop_x || 0;
			suggestion.cropY = crunch.crop_y || 0;
		}
	};
	
	self.generateProductsForGUID = function(imageno, guid, callback){
		self.createdAtLeastOneProduct(true);
		var url = 'http://' + window.cafepress.dnlUploadHost + '/DesignAndListCloudAPI/DesignAndListCloudAPIRestful.svc/GenerateProductsForGUID?ImageNo={ImageNo}&MemberNo={MemberNo}&GUIDs={GUIDs}';
		url = url.replace('{ImageNo}', imageno);
		url = url.replace('{MemberNo}',self.memberNo()); 
		url = url.replace('{GUIDs}', encodeURIComponent(guid));
		if (self.fitChosen())
			url += '&MediaFit=' + (self.fitSelected() ? "fit" : "fill");
		$.ajax({
			url: url,
			dataType: "jsonp",
			jsonpCallback: callback
		});
	};

	self.setMerchandiseDetails = function(merchandiseIds){
		$.get('/ws/getmerchandisepriceanddescription', {merchandiseIds: merchandiseIds, salesChannelId:4}, function(response){
			if (response.Data){
				self.currency(response.Data.currency);
				for(var i = 0; i < self.suggestions().length; i++){
					var suggestion = self.suggestions()[i];
					suggestion.salePrice(response.Data.prices[suggestion.ProductTypeNo()].salePrice);
					suggestion.originalPrice(response.Data.prices[suggestion.ProductTypeNo()].originalPrice);
					suggestion.description(response.Data.prices[suggestion.ProductTypeNo()].description);
					suggestion.isInStock(response.Data.prices[suggestion.ProductTypeNo()].isInStock);
				}
			}
		});
	};

	self.keywordPicker = function() {
		var random = Math.floor(Math.random() * self.keywords.length);
		var keyword = self.keywords[random];
		self.keyword(keyword);
	};

	self.moveToUploadPage = function(){
		self.mainPageVisible(true);
		self.uploadPageVisible(true);
		self.uploadPageImagePreviewVisible(true);
		self.uploadReadyVisible(false);
		self.collectionVisible(false);
		self.buyItFlowStarted(false);
		self.editProductFlowStarted(false);
		self.repositionFlowStarted(false);
		self.shareFlowStarted(false);
		self.makeMoneyFlowStarted(false);
		self.showLogin(false);
		self.actionBarVisible(false);
		self.collectionVisibleFilterBar(true)
		self.collectionName('');
	};

	self.moveToUploadReady = function(){
		self.uploadReadyVisible(true);
		self.moveToCollection();
		var firstNimages = $(".item-wrap img").slice(0,4); //adjust the product images count to wait for, before we show the products
		var nimages = firstNimages.length;
		firstNimages.load(function() {
			nimages--;
			if(nimages == 0) {
				self.moveToCollection();
			}
		});
	};

	self.moveToCollection = function(){
		self.mobileFooterVisible(true);
		self.collectionVisible(true);
		self.collectionNameFocused(true);
		self.collectionNameWasFocused(true);
		setTimeout(function() {self.actionBarVisible(true)}, 1500);
		setTimeout(function() {if(!self.repositionTipClosed())self.repositionTooltipVisible(true)}, 1500);
	};
	
	self.closeRepositionTooltip = function(){
		self.repositionTooltipVisible(false);
		self.repositionTipClosed(true);
	};
	
	self.closeEditProductsTooltip = function(){ 
		self.editProductsTooltipVisible(false);
		self.editProductTipClosed(true);
	};
	
	self.mobileFooterVisible = ko.observable(false);	
	self.closeMobileFooter = function(){
		self.mobileFooterVisible(false);
	};

	self.getProductTypeDimensions = function(suggestion){
		return suggestion.ProductTypeWidth() + '" x ' + suggestion.ProductTypeHeight() + '"';
	};

	self.computedProductTypeCaption = function(suggestion){
		return self.collectionName() + ' ' + suggestion.ProductTypeCaption();
	};

	self.showQuickView = function(suggestion){
		self.currentQuickViewImageUrl(suggestion.ProductCrunchUrls()[0]);
		self.currentQuickViewSuggestion(suggestion);
	};

	self.hideQuickView = function(){
		self.currentQuickViewImageUrl('');
		self.currentQuickViewSuggestion(null);
		self.currentQuickViewProductsCount(1);
	};

	self.disselectSuggestion = function(data){
		data.selected(false);
		if(self.selectedSuggestionsCount() < 1)
			self.cancelReviewAndAddPopup();
	};

	self.cancelReviewAndAddPopup = function(){
		if(!self.reviewDialogAcceptTermsVisible()){
			self.reviewDialogVisible(false);
			$('.actionbar').animate({'height': '70px'});
		}
	};
	
	self.cancelAcceptTermsPopup =  function(){
		self.reviewDialogAcceptTermsVisible(false);
	};
	
	self.eventPropagationWorkaroundForQuickView = function(ctx, event){
		event.stopImmediatePropagation();
	};

	self.loadPreviousSuggestion = function(){
		var currentIndex = self.visibleSuggestions().indexOf(self.currentQuickViewSuggestion());		
		var prevIndex = currentIndex - 1;
		if(prevIndex < 0)
			prevIndex  = self.visibleSuggestions().length - 1;
		self.showQuickView(self.visibleSuggestions()[prevIndex]);
	};

	self.loadNextSuggestion = function(){
		var currentIndex = self.visibleSuggestions().indexOf(self.currentQuickViewSuggestion());		
		var nextIndex = currentIndex + 1;
		if(nextIndex >= self.visibleSuggestions().length)
			nextIndex = 0;
		self.showQuickView(self.visibleSuggestions()[nextIndex]);
	};
	
	self.onSuggestionImageClick = function(data){
		var suggestion = this;
		cafepress.globalHeader.matchMedia(990, function(mq){
			if (mq.matches)
				self.showQuickView(suggestion);
			else
				self.goThroughProductViews(suggestion, data);
		});
	};
	
	self.goThroughProductViews = function(suggestion, views){
		var views = $(views);
		if (suggestion.ProductCrunchUrls().length < 2) return;
		views.find('img:first-child').appendTo(views).hide();
		views.find('img:first-child').fadeIn();
	};

	self.clickThumbnailView = function(){
		self.currentQuickViewImageUrl(this);
	};

	self.buyItFlow = function(){
		self.buyItFlowStarted(true);
	};
	
	self.makeMoneyFlow = function(){
		self.makeMoneyFlowStarted(true);
		$('.actionbar').animate({'height': '550px'});
		self.track('cp2_0_list');
	};

	self.editProductFlow = function() {
		self.editProductFlowStarted(true);
	};
	
	self.repositionFlow = function() {
		self.repositionFlowStarted(true);
		self.repositionTooltipVisible(false);
		self.repositionTipClosed(true);
		self.repositionUploadedImage();
	};

	self.shareFlow = function(){
		self.shareFlowStarted(true);
		$('.actionbar').animate({'height': '550px'});
		self.track('cp2_0_share');
	};

	self.notNow = function(){
		self.reviewDialogVisible(false);
		self.buyItFlowStarted(false);
		self.shareFlowStarted(false);
		self.editProductFlowStarted(false);
		self.repositionFlowStarted(false);		
		self.makeMoneyFlowStarted(false);
		self.showLogin(false);
		$('.actionbar').animate({'height': '70px','background' : 'white'});
	};

	self.toggleShowLogin = function(){
		self.showLogin(true);
	};
	
	self.loginUser = function(){
		self.loading(true);
		$.post('/ws/loginmemberandtransfermedia',
			{
				email: self.loginData.email,
				password: self.loginData.password,
				anonymousMemberId: self.memberNo
			}, function(res){
				self.loading(false);
				self.registerData(new RegisterData());
				if(res.Result != "Success"){
					self.showDialog('Oops', res.Message);
					self.track('client.cp2_0_error');
				}
				else{
					if(res.Data.LoggedIn)
					{
						self.memberNo(res.Data.MemberNo);
						self.isMemberAnonymous(res.Data.IsAnonymous);
						self.token(res.Data.SecurityToken);
						self.showLogin(false);
					}
					else{
						self.showDialog('Oops', res.Message);
						self.track('client.cp2_0_error');
					}
				}
			});
	};

	self.registerUser = function(){
		self.loading(true);
		$.post('/ws/registerorloginuser',
			{
				email: self.registerData.email,
				password: self.registerData.password,
				firstName: self.registerData.firstName,
				lastName: self.registerData.lastName,
				anonymousMemberId: self.memberNo
			}, function(res){
				self.loading(false);
				self.registerData(new RegisterData());
				if(res.Result != "Success"){
					self.showDialog('Oops', res.Message);
					self.track('client.cp2_0_error');
				}
				else{
					//Since we've just registered, the member is no longer anonymous.
					self.memberNo(res.Data.MemberNo);
					self.isMemberAnonymous(res.Data.IsAnonymous);
					self.token(res.Data.SecurityToken);
					self.cnlFolderNo(res.Data.FolderNo);
				}
			});
	}

	self.getPartnerTags = function(){
		if(self.isTermsAccepted()){
			if(!self.primitiveDone() || !self.areImageNameAndTagsFilled()) return;
			self.loading(true);
			self.tagImage();
		}else{
			self.reviewDialogAcceptTermsVisible(true);
		}
	};

	self.numberOfBatchesForProductGeneration = ko.observable(0);

	self.persistPartnerTags = function(){
		self.loading(true);
		$.post('/ws/persistpartnertags',
		{
			partnerTags: self.partnerTagsCsv,
			memberNo: self.memberNo,
			imageNo: self.imageNo
		}, 	function(res){
				self.tagImage();
			}
		)
	};
	
	self.tagImage = function(){
		self.loading(true);
		var tagList = self.tagsEntitiesCsv;
		tagList = self.imageInfo().tags();
		$.post('/ws/tagimage',
			{
				description: self.imageInfo().about(),
				imageNo: self.imageNo,
				memberNo: self.memberNo,
				caption: self.collectionName,
				tags: tagList,
				partnerTags: self.partnerTagsCsv
			}, function(res){
				self.imageInfo(new ImageInfo());
				if(res.Result == "Success"){
					if(self.checkForProductTypeTagRestrictions()){
						$.post('/ws/getblockedproducttypesfortags',
						{
							productTypes: self.suggestionsPtns(),
							tags: tagList
						}, function(res){
							if(res == '' || res.Result == "Success"){
								var guids = new Array();
								for(var i = 0; i < self.suggestions().length; i++){
									var suggestion = self.suggestions()[i];
									if(res == '' || $.inArray(suggestion.ProductTypeNo(), res.Data) < 0){//check if any of the products, we want to create is product type - tag restricted
										guids.push(suggestion.GUID());
									}
								}
								var chunks = chunk(guids, 28);
								self.numberOfBatchesForProductGeneration(chunks.length);
								for (var j = 0; j < chunks.length; j++){
									self.generateProductsForGUID(self.imageNo(), chunks[j].join(','), 'viewModel.generateProductsForGuidCallbackForDdpRedirect');
								}
							}
						});
					}else{
						var guids = new Array();
						for(var i = 0; i < self.suggestions().length; i++){
							var suggestion = self.suggestions()[i];
								guids.push(suggestion.GUID());
						}
						var chunks = chunk(guids, 28);
						self.numberOfBatchesForProductGeneration(chunks.length);
						for (var j = 0; j < chunks.length; j++){
							self.generateProductsForGUID(self.imageNo(), chunks[j].join(','), 'viewModel.generateProductsForGuidCallbackForDdpRedirect');
						}
					}
				} else {
					self.loading(false);
					self.showDialog('Oops','There was an error tagging your products.');
					self.track('client.cp2_0_error');
					self.logErrorToServer(2, 'There was an error tagging your products.', 'DnLFlow');
				}
			});
	};

	self.deactivateImage = function(callback, async){
		self.loading(true);
		window.console && console.log('deactivating image...');
		$.ajax({
			type: 'POST',
			async: async,
			url: '/ws/deactivateimage',
			data: { memberNo: self.memberNo, imageNo: self.imageNo },
			success: function(res){
				self.loading(false);
				if (typeof callback == "function")
					callback();
			}
		});
	}
	
	self.deactivateImageAndReset = function(){
		if(!self.primitiveDone()) return;
		self.deactivateImage(self.reset, true);
	}

	self.cancelPartnerTags = function(){
		for(var i = 0; i < self.partnerTags().length; i++){
			self.partnerTags()[i].Accepted(false);
		}
		self.tagImage();
	};

	self.getMemberId = function(callback){
	    //$.post('http://www.cafepress.com/ws/getmemberoranonymous', {}, function(res) {
	    var res = { "Result": "Success", "Message": "", "Data": { "MemberId": 134101533, "IsAnonymous": true, "FolderNo": 421978057, "SecurityToken": "eb01c892c72d9865cf2e6b72775478f1" } };
			if (res.Result == "Success"){
				self.memberNo(res.Data.MemberId);
				self.isMemberAnonymous(res.Data.IsAnonymous);
				if (res.Data.IsAnonymous)
					self.anonymousMemberNo(res.Data.MemberId)
				self.cnlFolderNo(res.Data.FolderNo);
				self.token(res.Data.SecurityToken);
				if(typeof callback == 'function')
					callback();
			} else {
				self.showDialog('Oops','There was an error initializing the uploader.');
				self.track('client.cp2_0_error');
				self.logErrorToServer(2, 'There was an error initializing the uploader.', 'DnLFlow');
			}
		//});
	};

	self.makeAddToCartUrlParams = function(suggestion, quantity){
		var url = '&qty_{ProductNo}={Quantity}';
		return url.replace('{ProductNo}', suggestion.ProductNo).replace('{Quantity}',quantity);
	};

	self.doAddToCart = function(smartProducts, callback, error, quantity){
		self.loading(true);
		var url = '/cp/catalogExp/addtocarthelper.aspx?channel=4&storeid=selfbuy';
		for(var i = 0; i < smartProducts.length; i++){
			var product = smartProducts[i];
			url += self.makeAddToCartUrlParams(product, quantity || 1);
		}

		error = error || function(){
			self.showDialog('Oops', 'Error adding product(s) to cart. Please try again later.');
			self.track('client.cp2_0_error');
			self.logErrorToServer(2, 'Error adding product(s) to cart. Please try again later.', 'DnLFlow');
			self.loading(false);
		};

		$.get(url, {}, callback || function(res){
			if(res.indexOf('Oops!') > 0){
				error();
				self.loading(false);
			} else {
				self.track('cp2_0_add_to_cart');
				window.location.href = '/cp/viewcart.aspx';
			}
		}).fail(error);
	};
	
	self.chooseFitFillOption = function(fit) {
		self.fitChosen(true);
		self.fitSelected(fit);
		self.createdAtLeastOneProduct(true);
		var d = new Date();
		var url = 'http://' + window.cafepress.dnlUploadHost + '/DesignAndListCloudAPI/DesignAndListCloudAPIRestful.svc/GetAllProductUrlsForImageNo?ImageNo={ImageNo}&MediaFit={MediaFit}&date='+d.getTime();
		url = url.replace('{ImageNo}', self.imageNo());
		url = url.replace('{MediaFit}', self.fitSelected() ? "fit" : "fill");
		self.loading(true);
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: function(response) {
				var data = response.GetAllProductUrlsForImageNoResult; //GetProductUrlsForThumbnailBase64Result;
		
				if (data.Suggestions.length == 0){
					self.showDialog('Oops','No product suggestions was found for your image. Please try to upload another image', self.reset);
					return;
				}
				
				self.mapSuggestions(data.Suggestions);
				self.setImageNo(data.Suggestions);
				self.moveToUploadReady();
				self.notNow();				
				self.loading(false);
				if(!self.editProductTipClosed()&&self.repositionTipClosed())
					self.editProductsTooltipVisible(true);
			}
		});
	};
	
	self.reviewAndAddToCartSelected = function(){
		if (self.selectedSuggestionsCount() > 0){
			self.reviewDialogVisible(true);
			$('.actionbar').animate({'height': '550px'});
		}
	};
	
	self.reviewAndDeleteSelected = function(){
		if (self.selectedSuggestionsCount() > 0){
			self.reviewDialogVisible(true);
			$('.actionbar').animate({'height': '550px'});
		}
	};
	
	self.repositionUploadedImage = function() {
		self.reviewDialogVisible(true);
		var win_height = $(window).height();
		$('.actionbar').animate({'height': win_height});		
	};

	self.acceptTerms = function() {
		self.isTermsAccepted(true);
		self.reviewDialogAcceptTermsVisible(false);
		if(self.reviewDialogVisible()){
			self.addToCartAfterReview();
		}
		if(self.makeMoneyFlowStarted() || self.shareFlowStarted()){
			self.getPartnerTags();
		}
	};
	
	self.addToCartAfterReview = function(){
		if(!self.isTermsAccepted()){
			self.reviewDialogAcceptTermsVisible(true);
		}
		else{
			var guids = new Array();
			for(var i = 0; i < self.selectedSuggestions().length; i++){
				var suggestion = self.selectedSuggestions()[i];
				guids.push(suggestion.GUID());
			}

			var chunks = chunk(guids, 28);
			self.numberOfBatchesForProductGeneration(chunks.length);
			self.loading(true);
			for (var j = 0; j < chunks.length; j++){
				self.generateProductsForGUID(self.imageNo(), chunks[j].join(','), 'viewModel.generateProductsForGuidCallbackForAddToCart');
			}
		}
	};
	
	self.deleteAfterReview = function(){
		for ( var i = self.selectedSuggestions().length; i >= 0; --i)
		{
			self.suggestions.remove(self.selectedSuggestions()[i]);
		}
		self.notNow();
	};
	
	self.removeSuggestion = function(data) {
		for(var item = 0; item < self.suggestions().length; item++)
		{
			if(data.GUID() == self.suggestions()[item].GUID()){
				self.suggestions.remove(data);
				break;
			}
		}
	};
	
	self.addToCart = function(){
		var suggestion = this;		
		if(suggestion.product && suggestion.product()){
			self.doAddToCart([suggestion.product()], null, function(){}, self.currentQuickViewProductsCount());
		} else {
			self.loading(true);
			self.generateProductsForGUID(this.ImageNo(), this.GUID(), 'viewModel.generateProductForSingleGuidCallbackForAddToCart');
		}
	};
	
	self.addToFavourites = function(){
		var suggestion = this;		
		if(suggestion.product && suggestion.product()){
			addToWishList(0, suggestion.product().ProductNo, -1);
		} else {
			self.loading(true);
			self.generateProductsForGUID(this.ImageNo(), this.GUID(), 'viewModel.generateProductForSingleGuidCallbackForAddToFavourites');
		}
	};
	
	self.generateProductForSingleGuidCallbackForAddToFavourites = function(data){
		self.generateProductForSingleGuidForAddToCartOrAddToFavourites(data, function(likedProduct){
			if (likedProduct){
				addToWishList(0, likedProduct.ProductNo, -1);
			}
		});
	};
	
	self.generateProductForSingleGuidCallbackForAddToCart = function(data){
		self.generateProductForSingleGuidForAddToCartOrAddToFavourites(data, function(product){
			self.doAddToCart([product], null, function(){}, self.currentQuickViewProductsCount());
		});
	};

	self.generateProductForSingleGuidForAddToCartOrAddToFavourites = function(data, callback){
		if (data.GenerateProductsForGUIDResult.Result && data.GenerateProductsForGUIDResult.SmartProducts){
			self.loading(false);
			var product = data.GenerateProductsForGUIDResult.SmartProducts.singleOrDefault();
			var suggestion = self.suggestions().singleOrDefault(function(i){ return i.ProductTypeNo() == product.ProductTypeNo;})
			if (!suggestion.product)
				suggestion.product = ko.observable();
			
			suggestion.product(product)
			callback(product);
		} else {
			self.loading(false);
			self.showDialog('Oops','There was an error creating your products.');
			self.track('client.cp2_0_error');
			self.logErrorToServer(2, 'There was an error creating your products.', 'DnLFlow');
		}
	};
	
	self.generateProductsForGuidCallbackForDdpRedirect = function(data)
	{
		if(data.GenerateProductsForGUIDResult.Result && data.GenerateProductsForGUIDResult.SmartProducts){
			self.numberOfBatchesForProductGeneration(self.numberOfBatchesForProductGeneration() - 1);
			if (self.numberOfBatchesForProductGeneration() != 0) return;
			var domain = window.cafepress && window.cafepress.domain ? window.cafepress.domain : document.domain.substring(document.domain.indexOf(".") + 1)
			
			var url = 'http://members.' + domain + '/editdesign/' + self.imageNo();
			if (self.isAnonymousFlow()){
				if (self.shareFlowStarted()){
					var productNo = data.GenerateProductsForGUIDResult.SmartProducts[0].ProductNo;
					url = 'http://www.' + domain + '/+product,' + productNo;
				} else if (self.makeMoneyFlowStarted()) {
					url = 'http://members.' + domain + '/mydesigns/';
				}
			}
			window.location.href = url;
		} else {
			self.loading(false);
			self.showDialog('Oops','There was an error creating your products.');
			self.track('client.cp2_0_error');
			self.logErrorToServer(2, 'There was an error creating your products.', 'DnLFlow');
		}
	}

	self.generateProductsForGuidCallbackForAddToCart = function(data){
		if (data.GenerateProductsForGUIDResult.Result && data.GenerateProductsForGUIDResult.SmartProducts){
			self.numberOfBatchesForProductGeneration(self.numberOfBatchesForProductGeneration() - 1);

			var callback;
			if (self.numberOfBatchesForProductGeneration() != 0) callback = function(){};
			self.doAddToCart(data.GenerateProductsForGUIDResult.SmartProducts, callback);
		} else {
			self.loading(false);
			self.showDialog('Oops','There was an error creating your products.');
			self.track('client.cp2_0_error');
			self.logErrorToServer(2, 'There was an error creating your products.', 'DnLFlow');
		}
	};

	self.canAddToCart = function(suggestion){
		return self.primitiveDone() && suggestion && suggestion.salePrice() != 0 && suggestion.isInStock();
	};

	self.showOosMessage = function(suggestion){
		return (self.buyItFlowStarted() || self.mobileView()) && !suggestion.isInStock();
	};
	
	self.reset = function(){
		window.location.reload();
	};

	self.resizedProductImage = function(image, dimension){
		image = ko.utils.unwrapObservable(image);
		/* http://pim.cpcache.com/product/new/86 */
		if ((/product\/new\/[0-9]+/).test(image)){
			if ((/width=[0-9]+/).test(image)){
				image = image.replace(/width=[0-9]+/, 'width=' + dimension).replace(/height=[0-9]+/, 'height=' + dimension);
			} else {
				image += '&width=' + dimension + '&height=' + dimension;
			}
		}
		/* http://i3.cpcache.com/merchandise/490_275x275_Front_Color-NA.png */
		else if ((/merchandise\/[0-9]+_/).test(image)){
			image = image.replace(/[0-9]+x[0-9]+/, dimension + 'x' + dimension);
		}
		return image;
	};

	self.resizedProductImages = function(images, dimension){
		var result = new Array();
		for(var i = 0; i < images().length; i++){
			result.push(self.resizedProductImage(images()[i], dimension));
		}
		return result;
	};

	self.launchHelp = function(newURL, newFeatures) {
		if ((navigator.appName == 'Microsoft Internet Explorer') && (window.HelpWindow)) HelpWindow.close();
		HelpWindow = open(newURL, "HelpWindow", newFeatures + ",screenX=0,left=0,screenY=0,top=0,channelmode=0,dependent=0,directories=0,fullscreen=0,location=0,menubar=0,resizable=0,status=0,toolbar=0,scroll=1");
		if (HelpWindow.opener == null) HelpWindow.opener = window;
		HelpWindow.focus();
	};

	self.lazyLoadImages = function(){
		$(".lazy img").lazyload({ threshold : 750 }).lazyload({ event : "lazyload" });
		$(".lazy img").slice(0,11).trigger("lazyload");
	};

	self.track = function(id){
		try{
			if (window.cafepress){
				if (window.location.href.indexOf(window.cafepress.www) > -1)
					$.post("/s/statsd/increment/client." + id);
				else if (window.location.href.indexOf(window.cafepress.members) > -1)
					$.post("/m/StatsD/Increment/client." + id);
			}
		} catch (e) {
		}
	};

	self.logErrorToServer = function(severity, msg, title){
		$.post('/ws/logerror',
			{
				severity: severity,
				message: msg,
				title: title
			});
	};

	self.bindOnUnload = function(){
		var unloadFunction = function () {			
			if(self.imageNo() != 0 && !self.createdAtLeastOneProduct()){				
				self.deactivateImage(null, false);
			}
		};
		$(window).on('beforeunload', unloadFunction);		
	};

	self.windowScrollPosition = ko.observable(0);
	self.windowScrollPosition.subscribe(function(newValue){
		if (newValue > 120 && self.mobileFooterVisible()) self.mobileFooterVisible(false);
	});
	self.footerMessageBottomPosition = ko.computed(function(){
		return (self.windowScrollPosition() * -1) + 'px';
	});
	self.bindOnScroll = function(){
		$(window).on('scroll', function () {
			self.windowScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
		});
	};
	
	self.init = function(){
		setInterval(self.keywordPicker, 2000);
		if (self.memberNo() == 0)
			self.getMemberId(self.initUploaderControl);
		else
			self.initUploaderControl;
		self.bindOnUnload();
		self.bindOnScroll();
		return self;
	};

	return self.init();
}

/*the uploader class*/
function uploader(buttons, container, displayAnonymousTemplate){
	var self = this;
	self.uploaderButtons = buttons;
	self.uploaderContainer = container;
	console.log("in uploader 0");
	buttons.each(function(index){
		var currentId = $(this).attr('id');
		if (!currentId)
			$(this).attr('id', 'daUploadButton' + (index + 1));
	});
	console.log("in uploader 1");
	/* this function is invoked once all scripts are loaded, it appends and binds the contents of the template and replaces the upload button */
	self.templateLoaded = function(template){
		/* knockout bindings for animated change of visibility*/
		ko.bindingHandlers.fadeVisible = {
			init: function(element, valueAccessor) {
				var value = valueAccessor();
				$(element).toggle(ko.utils.unwrapObservable(value));
			},
			update: function(element, valueAccessor) {
				var value = valueAccessor();
				ko.utils.unwrapObservable(value) ? $(element).fadeIn() : $(element).fadeOut();
			}
		};
		ko.bindingHandlers.fadeShowOnlyVisible = {
			init: function(element, valueAccessor) {
				var value = valueAccessor();
				$(element).toggle(ko.utils.unwrapObservable(value));
			},
			update: function(element, valueAccessor) {
				var value = valueAccessor();
				ko.utils.unwrapObservable(value) ? $(element).fadeIn() : $(element).hide();
			}
		};
		ko.bindingHandlers.slideVisible = {
			init: function(element, valueAccessor) {
				var value = valueAccessor();
				$(element).toggle(ko.utils.unwrapObservable(value));
			},
			update: function(element, valueAccessor) {
				var value = valueAccessor();
				ko.utils.unwrapObservable(value) ? $(element).fadeIn(200, function(){$(this).addClass('slideIn')}) : $(element).hide();
			}
		};
		ko.bindingHandlers.slideHeightVisible = {
			init: function(element, valueAccessor) {
				var value = valueAccessor();
				$(element).toggle(ko.utils.unwrapObservable(value));
			},
			update: function(element, valueAccessor) {
				var value = valueAccessor();
				ko.utils.unwrapObservable(value) ? $(element).slideDown(1000) : $(element).slideUp(1000);
			}
		};
		ko.bindingHandlers.overflowHidden = {
			init: function(element, valueAccessor) {
				var value = valueAccessor();
				$(element).toggle(ko.utils.unwrapObservable(value));
			},
			update: function(element, valueAccessor) {
				var value = valueAccessor();
				ko.utils.unwrapObservable(value) ? 	setTimeout(function() {$(element).css({'height':'auto', 'display':'block'});}, 1500) : $(element).css({'height':0, 'display':'block', 'overflow':'hidden'});
			}
		};

		console.log("in uploader 2");
		/* wrap the original content of the page in a wrapping div, so it can be hidden later (when a file is selected) */
		self.uploaderContainer.wrap('<div class="uploader-container-wrapper" />');
		/* append the template */
		$('.uploader-container-wrapper').append(template);
		/* init the view model*/
		window.viewModel = new ViewModel(function(){
			self.uploaderContainer.css({'float' : 'left', 'visibility' : 'hidden', 'height' : '0', 'zIndex' : '-55'});
			$('body').removeClass("bg");
			$(window).scrollTop(0);
			$('.upload-wrapper').css({'zIndex' : '-1'});
			//toggle helptext
			$('.login-field input').focus(function(){
				$(this).parent().find('.helptext').slideDown();
				$(this).on('blur',function(){
					$(this).parent().find('.helptext').slideUp();
				});
			});
		}, self.uploaderButtons, displayAnonymousTemplate);
		if (displayAnonymousTemplate)
			$('body').attr('data-bind', 'css: {gradient: !collectionVisible(), "modal-open": currentQuickViewSuggestion() != null}' );
		ko.applyBindings(viewModel);
	};
	console.log("in uploader 3");
	/* get the necessary scripts and styles */
	var cssName = 'upload' + (displayAnonymousTemplate ? '-anonymous' : '') + '.css';
	$("head").append($("<link rel='stylesheet' href='content/CP2.0/css/" + cssName + "' type='text/css' media='screen' />"));
	$.getScript('content/CP2.0/js/vendor/lazyload.js');
	$.getScript('content/CP2.0/js/vendor/knockout-2.2.1.js', function(){
		$.getScript('content/CP2.0/js/vendor/knockout.mapping.js', function(){
			var templateName = 'upload_template' + (displayAnonymousTemplate ? '_anonymous' : '') + '.html';
			$.get('content/CP2.0/templates/' + templateName, {}, self.templateLoaded);
		});
	});

	if (!$.ui){
		$.getScript('content/CP2.0/js/vendor/jquery-ui-1.10.3/ui/minified/jquery-ui.min.js');
	}
	
	if (typeof addToWishList !== "function"){
		$.getScript('content/mobile2.0/js/wishlist.js');
	}
	
	if (typeof [].where !== "function"){
		$.getScript('content/js/linq.js');
	}

	return self;
}
