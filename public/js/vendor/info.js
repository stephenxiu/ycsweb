define(["jquery"],function(t){"use strict";function i(t){t=t||{},this.contentText=t.content||"",this.width=t.width||0,this.closeAction=void 0,this.modal=void 0!==t.modal?t.modal:!0,this.init()}return i.prototype={mask:null,box:null,content:null,closeBtn:null,init:function(){this.modal&&(document.getElementById("mask")?(this.mask=t("#mask"),this.mask.hide()):this.mask=t('<div class="mask" id="mask" style="display:none;"></div>').appendTo("body")),document.getElementById("ui-info")?(this.box=t("#ui-info"),this.content=t("#ui-info-content"),this.closeBtn=t("ui-info-close"),this.content.html(this.contentText)):this.initInfo(),this.closeBtn.unbind("click").bind("click",t.proxy(function(){this.close()},this))},close:function(i){this.mask.hide(),t("html").removeAttr("style"),this.box.hide(),i&&"function"==typeof i&&(this.closeAction=void 0,i()),this.closeAction&&"function"==typeof this.closeAction&&this.closeAction()},initInfo:function(){this.box=t('<div class="ui-info" id="ui-info" style="display:none;"></div>'),this.content=t('<div class="ui-info-content" id="ui-info-content">'),this.content.html(this.contentText),this.closeBtn=t('<a href="javascript:;" class="ui-info-close" id="ui-info-close">×</a>'),this.box.append(this.content).append(this.closeBtn).appendTo("body")},show:function(i){i=i||{};var n=void 0!==i.modal?i.modal:this.modal;this.closeAction=i.closeAction,n&&t(this.mask).show(),i&&this.rebuild(i),t(this.box).show()},rebuild:function(t){var i=t.content||this.contentText,n=0;this.content.html(i),n=t.width?t.width+30:this.box.width(),this.box.css({"margin-left":"-"+n/2+"px"})}},new i});