(function(win, doc, $, undefined){

	win.cafepress = win.cafepress || {};

	win.cafepress.html5Uploader = function(config, element){
		var self = this;
		self.config = config;
		self.element = element;
		self.init = function(){
			var $input = $('<input type="file" name="file" style="display:none" accept=".jpg,.jpeg,.png,.gif">');
			self.config.FileParam = self.config.FileParam || 'ThumbnailStream';
			self.element.after($input);
			self.element.click(function(){
				$input.click();
				$input.get(0).files = [];
			});

			self.config.params = {
				ImageFullSizeHeight:'0',
				ImageFullSizeWidth:'0',
				FileName:'',
				ImageCaption:'',
				ImageDescription:'',
				MemberNo: config.MemberNo.toString(),
				FolderNo: config.FolderNo.toString(),
				FileParam: self.config.FileParam
			};

			$input.on('change', function(e){
				var fileInput = $(this);
				var files = e.target.files;
				$(files).each(function(){
					/*this check is for browsers that do not respect the accept attribute*/
					var type = fileInput.attr('accept');
					var ext = "." + this.name.split(".").reverse()[0].toLowerCase();

					if(type.split(',').indexOf(ext) != -1 && (/image/i).test(this.type)){
						self.config.params.FileName = this.name;
						self.generateThumbnail(this, ext);
					} else {
						self.error('Only images may be uploaded. Choose one of the following extensions: ' + type, true);
					}
				});
			});
		};

		self.upload = function(response, file){
			var xhr = new XMLHttpRequest(),
				data = new FormData(),
				newData;
			response = $.parseJSON(response.response)['GetProductUrlsForThumbnailBase64Result']['Suggestions'][0]['ImageNo'];

			newData = self.serializeParams(self.config.uploadUri, data, file, { 'FileParam': self.config.FileParam, 'ImageNo': response });
			data = newData['data'];

			xhr.addEventListener('load', self.complete, false);
			xhr.addEventListener('error', self.error, false);
			xhr.addEventListener('abort', self.config.uploadCanceled, false);
			xhr.upload.addEventListener("progress", self.progress, false);

			xhr.open('POST', newData['url']);
			xhr.send(data);
		};

		self.uploadThumbnail = function(canvasData, file){
			var xhr = new XMLHttpRequest(),
				data = new FormData(),
				newData;

			newData = self.serializeParams(self.config.preUploadUri, data, canvasData, self.config.params);
			data = newData['data'];

			xhr.addEventListener('error', self.error, false);
			xhr.onload = function(){
				self.thumbComplete(this);
				self.upload(this, file);
			};

			xhr.open('POST', newData['url']);
			xhr.send(data);
		};

		self.generateThumbnail = function(file, ext){
			var reader = new FileReader();
			if($('#transient-img-preview').length == 0){
				$('body').append($('<img id="transient-img-preview" src="" style="z-index:-9999; position:absolute; top: -9999px; left: -9999px;"/>'));
				$('#transient-img-preview').on('load', function(e){
					$(this).css('display', 'none');
					var img = $(this),
						scaleFactor,
						canvas = self.fixCanvas(document.createElement('canvas')),
						oldCanvas;

					if( (img.width() > img.height()) || (img.width() == img.height()) ){
						canvas.width = self.config.thumbWidth;
						scaleFactor = img.width() / img.height();
						canvas.height = Math.floor(canvas.width / scaleFactor);
					} else {
						canvas.height = self.config.thumbHeight;
						scaleFactor = img.height() / img.width();
						canvas.width = Math.floor(canvas.height / scaleFactor);
					}

					// populate image height/width in params for service calls
					self.config.params.ImageFullSizeHeight = img.height().toString();
					self.config.params.ImageFullSizeWidth = img.width().toString();

					// This is a workaround for a Firefox issue when the image is reported to be
					// loaded but it's still not fully loaded for the canvas to draw it on.
					// Hopefully this will not be needed after the next version of Firefox is released.
					while(true) {
						try {
							canvas.getContext('2d').drawImage($(this).get(0), 0, 0, canvas.width, canvas.height);
							break;
						} catch(err) {}
					}

					if (ext == ".jpg" || ext == '.jpeg')
						oldCanvas = canvas.toDataURL("image/jpeg", self.config.ImageQuality);
					else
						oldCanvas = canvas.toDataURL();

					// upload done here so that we have finished callbacks and collected all image data for params
					self.uploadThumbnail(oldCanvas, file);
					var fileUi = {name: file.name, base64: oldCanvas};
					self.config.selectedImagesLoadProgress(fileUi);
					self.config.selectedImagesLoadComplete(fileUi);

					// resize canvas thumbnail for display
					img = new Image();
					img.onload = function(){
						canvas.width = Math.floor(canvas.width / 4);
						canvas.height = Math.floor(canvas.height / 4);
						canvas.getContext('2d').drawImage(img, 0, 0);
						$(img).css({
							height: canvas.height + 'px',
							width: canvas.width + 'px'
						});
					};
					img.src = oldCanvas;
					$('#images').append(img);
				});
			}
			reader.onload = function(e){
				$('#transient-img-preview').attr('src', e.target.result);
			};

			reader.readAsDataURL(file);
		};

		self.serializeParams = function(url, data, file, params){
			var counter = 0;

			url += '?';

			for(var x in params){
				if(x == 'FileParam'){
					data.append(params[x], file);
				} else {
					// use this once the service supports form-data params:
					// data.append(x, params[x]);
					// until then, use the ugly version:
					if(counter > 0){ url += '&'; }
					url += x + '=' + params[x];
					counter++;
				}
			}
			return { data: data, url: url }
		};

		self.complete = function(){
			if (self.config.uploadComplete)
				self.config.uploadComplete($.parseJSON(this.response));
		};

		self.thumbComplete = function(data){
			if (self.config.preUploadComplete)
				self.config.preUploadComplete($.parseJSON(data.response));
		};

		self.error = function(msg, skipLog){
			if (self.config.uploadFailure)
				self.config.uploadFailure(msg, skipLog);
		};
		
		self.progress = function(evt){
			if (self.config.uploadsProgressCallBack){
				if (evt.lengthComputable) {					
					self.config.uploadsProgressCallBack({bytesLoaded : evt.loaded, bytesTotal : evt.total});				
				}
				else {
					self.config.uploadsProgressCallBack({bytesLoaded : 0, bytesTotal : 1});				
				}
			}
		};
		
		/**
		 * 'Fixes' single canvas instances. 
		 * Leaving the canvas html detection.
		 */
		self.fixCanvas = function(canvas)
		{
			var ctx = canvas.getContext('2d');
			var drawImage = ctx.drawImage;
			ctx.drawImage = function(img, sx, sy, sw, sh, dx, dy, dw, dh)
			{
				var vertSquashRatio = 1;
				// Detect if img param is indeed image
				var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/i);
				if (!!img && img.nodeName == 'IMG' && iOS)
				{
					vertSquashRatio = self.detectVerticalSquash(img);
					sw || (sw = img.naturalWidth);
					sh || (sh = img.naturalHeight);
				}
				
				// Execute several cases (Firefox does not handle undefined as no param)
				// by call (apply is bad performance)
				if (arguments.length == 9)
					drawImage.call(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
				else if (typeof sw != 'undefined')
					drawImage.call(ctx, img, sx, sy, sw, sh / vertSquashRatio);
				else
					drawImage.call(ctx, img, sx, sy);
			};
			return canvas;
		}

		/**
		 * Detecting vertical squash in loaded image.
		 * Fixes a bug which squash image vertically while drawing into canvas for some images.
		 * This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
		 */
		self.detectVerticalSquash = function(img) {
			var ih = img.naturalHeight;
			var canvas = document.createElement('canvas');
			canvas.width = 1;
			canvas.height = ih;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0);
			try {
				// Prevent cross origin error
				var data = ctx.getImageData(0, 0, 1, ih).data;
			} catch (err) {
				// hopeless, assume the image is well and good.
				console.log("Cannot check verticalSquash: CORS?");
				return 1;
			}
			// search image edge pixel position in case it is squashed vertically.
			var sy = 0;
			var ey = ih;
			var py = ih;
			while (py > sy) {
				var alpha = data[(py - 1) * 4 + 3];
				if (alpha === 0) {
					ey = py;
				} else {
					sy = py;
				}
				py = (ey + sy) >> 1;
			}
			var ratio = (py / ih);
			return (ratio===0)?1:ratio;
		}
		
		self.init(config, element);
		return self;
	};

})(window, document, jQuery);
