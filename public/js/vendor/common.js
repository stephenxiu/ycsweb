!function(e){"use strict";e(["jquery","ajax","dialog","info","cookie","json","placeholder"],function(e,t,s,o){function n(){this.name="",this.id="",this.prefix="/",this.message=0,this.onImgCode=!1,this.telphone="",this.formStatus="common",this.onCountDown=!1,this.rememberme=!1,this.init()}return n.FRONTPAGE=["index","service_detail","service_provider","provider_detail","404","500","about","aptitude","chronicle","contact","exempt","help","help_detail","help_list","help_search","jobs","news","news_detail","news_list","SearchArticleList","team"],n.NORETURNPAGE=[],n.BACKPAGE=["login","register","404","500","order_commit","order_detail","order_list","setting","modify_password","message","gotoEditOrder","createOrderPage"],n.prototype={init:function(){this.getUserInfo(),this.watchLink(),this.mapCtrl(),this.codeBoxCtrl(),this.assist(),this.addQQTalk(),this.searchFormCtrl()},addQQTalk:function(){var e="1001",t=window.location.href;-1!==t.indexOf("service_detail")||-1!==t.indexOf("service_provider")||-1!==t.indexOf("provider_detail")?e="1002":this.isOnBack()&&(e="1003");try{BizQQWPA.addCustom([{aty:"1",a:e,nameAccount:4008310866,node:document.body},{aty:"1",a:e,nameAccount:4008310866,selector:"qqTalk_fixed_btn_01"},{aty:"1",a:e,nameAccount:4008310866,selector:"qqTalk_fixed_btn_02"},{aty:"1",a:e,nameAccount:4008310866,selector:"qqTalk_header_btn_01"},{aty:"1",a:e,nameAccount:4008310866,selector:"qqTalk_backyard_btn_01"},{aty:"1",a:e,nameAccount:4008310866,selector:"qqTalk_font_btn_01"},{aty:"1",a:e,nameAccount:4008310866,selector:"qqTalk_contact_btn_01"}])}catch(s){}},searchFormCtrl:function(){var t=document.getElementById("articleSearchForm");e(t).submit(function(e){e.preventDefault(),window.location.href="/so/"+encodeURIComponent(t.querycondition.value)})},watchLink:function(){e(document).delegate("a","click",e.proxy(this.beforeJump,this))},beforeJump:function(){this.isOnBack()||e.cookie("backpage",window.location.href)},getUserInfo:function(e){var o=this,n=new t("/user/qryUserInfos.htm");n.done(function(t){"200"===t.status?("0"===t.re.isLogin?(o.delUserInfo(),o.changeStatus(!1)):(o.setUserInfo({id:t.re.id,username:t.re.username}),o.name=t.re.username,o.id=t.re.id,o.message=t.re.msgCount,o.changeStatus(!0)),e&&"function"==typeof e&&e(t.re)):s.show({content:t.errormsg})})},mapCtrl:function(){var t=e("#h_map");e("#h_showMap").on("mouseenter",function(){t.data("status")&&"hidden"!==t.data("status")?(t.hide(),t.data("status","hidden")):(t.show(),t.data("status","show"))}),t.on("mouseleave",function(){t.hide(),t.data("status","hidden")})},codeBoxCtrl:function(){var t=e("#h_codeBox");e("#h_showCodeBox").on("mouseenter",function(){t.data("status")&&"hidden"!==t.data("status")?(t.hide(),t.data("status","hidden")):(t.show(),t.data("status","show"))}),t.on("mouseleave",function(){t.hide(),t.data("status","hidden")})},changeStatus:function(t){var s=this,o=[];document.getElementById("h_status")&&(t?(o.push("<li>"+this.name+' <a id="h_loginout" href="javascript:;">退出</a></li>'),o.push('<li><a href="/app/message.html">消息通知</a> <span class="h_red"'+("0"===this.message?' style="display:none"':"")+">"+this.message+"</span></li>"),o.push('<li class="h_noline"><a href="/app/order_list.html">我的订单</a></li>')):(o.push('<li><a href="/app/register.html" class="line">注册</a></li>'),o.push('<li class="h_noline"><a id="loginBtn" href="javascript:;">登录</a></li>')),e("#h_status").html(o.join("")),document.getElementById("h_loginout")&&e("#h_loginout").unbind("click").bind("click",e.proxy(this.loginOut,this)),document.getElementById("loginBtn")&&e("#loginBtn").on("click",function(e){s.showLoginBox()}))},showLoginBox:function(t,s){var n=this,i=[],a=e.cookie("accountname"),l=e.cookie("usertelphone"),r=null;this.formStatus="common",i.push('<div class="ui-info-loginBox">'),i.push('<ul class="lb_tab clearfix" id="plb_tab">'),i.push('<li data-role="item" data-target="common" class="active">'),i.push('<a href="javascript:;">普通登录</a>'),i.push("</li>"),i.push('<li data-role="item" data-target="telphone">'),i.push('<a href="javascript:;">手机验证登录</a>'),i.push("</li>"),i.push("</ul>"),i.push('<form action="/user/login" name="popuploginform" id="popup_login_form">'),i.push("<ol>"),i.push('<li class="ui-tips" id="ui-tips">测试</li>'),i.push('<li id="plb_nameLine">'),i.push('<label class="lb_title" for="pl_name">用户名</label>'),i.push('<input class="lb_text" type="text" id="pl_name" name="username" tabindex="1" maxlength="20" value="'+(a?a:"")+'" />'),i.push("</li>"),i.push('<li id="plb_passwordLine">'),i.push('<label class="lb_title" for="pl_password">密码</label>'),i.push('<input class="lb_text" type="password" id="pl_password" name="password" tabindex="2" maxlength="20" />'),i.push('<a class="lb_find" href="javascript:;" onclick="document.getElementById(\'qqTalk_header_btn_01\').click()">找回密码</a>'),i.push("</li>"),i.push('<li id="plb_telphoneLine" class="lb_telphoneLine">'),i.push('<label class="lb_title" for="pl_telphone">手机号码</label>'),i.push('<input class="lb_text" type="text" id="pl_telphone" name="telphone" tabindex="3" maxlength="11" value="'+(l?l:"")+'" />'),i.push("</li>"),i.push('<li id="plb_phoneCodeLine" class="lb_phoneCodeLine">'),i.push('<label class="lb_title" for="pl_telCode">验证码</label>'),i.push('<input class="lb_text" type="text" id="pl_telCode" name="telCode" tabindex="4" maxlength="4" />'),i.push('<a href="javascript:;" id="plb_getPhoneCode">获取手机验证码</a>'),i.push("</li>"),i.push('<li id="plb_rememberLine" class="lb_rememberline">'),i.push('<input checked="checked" type="checkbox" name="rememberme" id="pl_remember" tabindex="3">'),i.push('<label for="pl_remember">记住我</label>'),i.push("</li>"),i.push('<li id="plb_imgCodeLine" class="lb_imgCodeLine">'),i.push('<label class="lb_title" for="pl_imgCode">图片验证</label>'),i.push('<input class="lb_text" type="text" id="pl_imgCode" name="imgCode" tabindex="5" maxlength="4" />'),i.push('<img src="/vc.htm" id="plb_imgCode" width="100" height="36" />'),i.push('<a class="lb_find" href="javascript:;" id="plb_changeImgCode">换一换</a>'),i.push("</li>"),i.push('<li class="lb_btnline">'),i.push('<button type="submit" class="btn btn_warning" id="plb_submitBtn">登录</button>'),i.push("</li>"),i.push("</ol>"),i.push("</form>"),i.push('<p class="lb_registerline">还没注册？<a href="/app/register.html">免费注册</a></p>'),i.push("</div>"),o.show({content:i.join("")}),e(document.forms.popuploginform).submit(function(e){e.preventDefault(),"common"===n.formStatus?n.loginPass(t,s):"telphone"===n.formStatus?n.loginByPhone(t,s):"image"===n.formStatus&&n.checkImageCode()}),e("#plb_imgCode").on("click",e.proxy(this.changeImgCode,this)),e("#plb_changeImgCode").unbind("click").on("click",e.proxy(this.changeImgCode,this)),e("#plb_tab").on("click","li",function(){e(this).addClass("active").siblings("li").removeClass("active"),n.tabChange(this)}),r=e("#pl_telphone"),r.on("keyup",function(){/^1(3[0-9]|4[0-9]|5[0-35-9]|7[0-9]|8[0-9])\d{8}$/.test(r.val())?e(this).removeClass("invalid").addClass("valid"):e(this).addClass("invalid").removeClass("valid")}),e("#plb_getPhoneCode").on("click",function(){/^1(3[0-9]|4[0-9]|5[0-35-9]|7[0-9]|8[0-9])\d{8}$/.test(r.val())&&(n.onCountDown||n.getPhoneCode())}),e("#plb_checkImgCodeBtn").on("click",function(){n.checkImageCode()})},tabChange:function(t){var s=e(t).attr("data-target");e("#ui-tips").hide(),e("#popup_login_form input").removeAttr("style"),"common"===s?(this.formStatus="common",e("#plb_nameLine").show(),e("#plb_passwordLine").show(),e("#plb_telphoneLine").hide(),e("#plb_phoneCodeLine").hide(),e("#plb_imgCodeLine").hide(),e("#plb_rememberLine").show(),e("#plb_submitBtn").text("登录")):"telphone"===s&&(e("#plb_nameLine").hide(),e("#plb_passwordLine").hide(),this.onImgCode?(this.formStatus="image",e("#plb_telphoneLine").hide(),e("#plb_phoneCodeLine").hide(),e("#plb_imgCodeLine").show(),e("#plb_rememberLine").hide(),e("#plb_submitBtn").text("确定")):(this.formStatus="telphone",e("#plb_telphoneLine").show(),e("#plb_phoneCodeLine").show(),e("#plb_imgCodeLine").hide(),e("#plb_rememberLine").show(),e("#plb_submitBtn").text("登录")))},changeImgCode:function(){e("#plb_imgCode").attr("src","/vc.htm?time="+(new Date).getTime())},getPhoneCode:function(s){var o=this,n=null,i=e("#ui-tips"),a={phoneNo:e("#pl_telphone").val()};s&&(a.authCodeImg=s),n=new t("/user/sendAuthCode4Login.htm",a),n.done(function(e){"200"===e.status?o.startCountDown():"-100"===e.status&&("2084"===e.errorcode?o.changeImageBox():i.html(e.errormsg).show())})},changeImageBox:function(){e("#ui-tips").hide(),e("#popup_login_form input").removeAttr("style"),this.onImgCode?(this.onImgCode=!1,this.formStatus="telphone",e("#plb_telphoneLine").show(),e("#plb_phoneCodeLine").show(),e("#plb_imgCodeLine").hide(),e("#plb_rememberLine").show(),e("#plb_submitBtn").text("登录")):(this.onImgCode=!0,this.formStatus="image",e("#plb_telphoneLine").hide(),e("#plb_phoneCodeLine").hide(),e("#plb_imgCodeLine").show(),e("#pl_imgCode").val(""),e("#plb_rememberLine").hide(),e("#plb_submitBtn").text("确定"),this.changeImgCode())},packageSupplement:function(t,s,n){var i=this,a=[];a.push('<div class="ui-info-supplement">'),a.push('<div class="sf_messageBox">'),a.push('<p class="sf_iconLine"><span class="icon"></span></p>'),a.push("<h3>登录成功！</h3>"),t.password?(a.push('<p class="sf_textLine">'+t.mobile+" 的手机用户，欢迎您登录壹财税网站！我们已为您自动生成用户名和密码：</p>"),a.push('<p class="sf_userLine"><span>用户名：'+t.username+"</span><span>密码："+t.password+'</span><a href="javascript:;" id="sf_showForm">修改</a></p>')):a.push('<p class="sf_textLine">'+t.mobile+' 的手机用户，欢迎您登录壹财税网站！为了保障您的账号安全，请设置用户名和密码：<a href="javascript:;" id="sf_showForm">设置</a></p>'),a.push("</div>"),a.push('<form action="/user/setIDAndPwd.htm" method="post" name="supplementForm" id="supplementForm">'),a.push('<ol id="sf_form">'),a.push('<li class="ui-tips" id="ui-supplement-tips">测试</li>'),a.push("<li>"),a.push('<label class="sf_title" for="sf_username"><em>*</em>用户名</label>'),a.push('<input class="sf_text" type="text" name="username" id="sf_username" placeholder="请输入4-20位字母、数字或“-”、“_”" />'),a.push("</li>"),a.push("<li>"),a.push('<label class="sf_title" for="sf_password"><em>*</em>密码</label>'),a.push('<input class="sf_text" type="password" name="password" id="sf_password" placeholder="6-20位字符，不能包含空格" />'),a.push("</li>"),a.push('<li class="sf_btnLine">'),a.push('<button type="submit" class="btn btn_warning">确认</button>'),a.push("</li>"),a.push("</ol>"),a.push("</form>"),a.push("</div>"),o.show({content:a.join(""),closeAction:function(){i.getUserInfo(),"function"==typeof s&&s(n)}}),e("#sf_username").placeholder(),e("#sf_password").placeholder(),e("#supplementForm").on("submit",function(e){e.preventDefault(),i.supplementSubmit(s,n)}),e("#sf_showForm").on("click",function(t){e("#sf_form").show(),e(this).hide()})},supplementSubmit:function(s,n){var i=this,a=document.forms.supplementForm,l=e("#ui-supplement-tips"),r=null,h={username:a.username.value,password:a.password.value};return e(a.username).removeClass("invalid"),e(a.password).removeClass("invalid"),/^[A-Za-z0-9\-\_]{4,20}$/.test(a.username.value)?/^\d+$/.test(a.username.value)?(l.html("对不起，您输入的用户名不能为纯数字").show(),void e(a.username).css({"border-color":"#db281f"})):/^\S{6,20}$/.test(a.password.value)?(r=new t("/user/setIDAndPwd.htm",h),void r.done(function(t){"200"===t.status?(o.close(),i.getUserInfo(),i.packageSuccessTips(),"function"==typeof s&&s(n)):(e(a.username).removeAttr("style"),e(a.password).removeAttr("style"),l.html(t.errormsg).show())})):(l.html("密码有误，请输入6-20位非空格字符").show(),void e(a.password).css({"border-color":"#db281f"})):(l.html("用户名有误，请输入4-20位字母、数字或“-”、“_”字符").show(),void e(a.username).css({"border-color":"#db281f"}))},packageSuccessTips:function(){var e=[];e.push('<div class="ui-info-supplement">'),e.push('<div class="sf_messageBox">'),e.push('<p class="sf_iconLine"><span class="icon"></span></p>'),e.push("<h3>用户名密码修改成功！</h3>"),e.push("</div>"),e.push("</div>"),o.show({content:e.join("")})},checkImageCode:function(){var s=this,o=e("#ui-tips"),n={validateCode:e("#pl_imgCode").val()},i=new t("/common/checkValidateCode4Img.htm",n);i.done(function(t){"200"===t.status?(e("#pl_imgCode").css({"border-color":"#dddddd"}),s.changeImageBox(),s.getPhoneCode(e("#pl_imgCode").val()),s.startCountDown()):(o.html(t.errormsg).show(),e("#pl_imgCode").css({"border-color":"#db281f"}))})},startCountDown:function(){var t=this,s=e("#plb_getPhoneCode"),o=60,n=function(){o-=1,0>=o?(t.onCountDown=!1,s.html("获取手机验证码")):(s.html("<em>"+o+"</em>秒后可重新获取"),setTimeout(n,1e3))};this.onCountDown=!0,n()},loginByPhone:function(s,n){var i=this,a=document.forms.popuploginform,l=e("#ui-tips"),r={phoneNo:a.telphone.value,authCode:a.telCode.value},h=null;return a.telphone.value?a.telCode.value?(h=new t("/user/loginByPhone.htm",r),void h.done(function(t){"200"===t.status?(a.rememberme.checked?e.cookie("usertelphone",a.telphone.value,{expires:7,path:"/"}):e.removeCookie("usertelphone",{path:"/"}),t.re.needSetPwd?(o.close(),t.re.mobile=a.telphone.value,i.packageSupplement(t.re,s,n)):(i.getUserInfo(),o.close(),"function"==typeof s&&s(n))):(l.html(t.errormsg).show(),e(a.telphone).removeClass("invalid"),e(a.telCode).removeClass("invalid"))})):void l.html("请输入验证码").show():void l.html("请填写手机").show()},loginPass:function(s,n){var i=this,a=document.forms.popuploginform,l=e("#ui-tips"),r={username:a.username.value,password:a.password.value},h=null;return a.username.value?a.password.value?(h=new t("/user/login.htm",r),void h.done(function(t){"200"===t.status?(a.rememberme.checked?e.cookie("accountname",a.username.value,{expires:7,path:"/"}):e.removeCookie("accountname",{path:"/"}),i.getUserInfo(),"function"==typeof s&&s(n),o.close()):(e(a.username).removeAttr("style"),e(a.password).removeAttr("style"),l.html(t.errormsg).show(),"3001"===t.errorcode?e(a.username).css({"border-color":"#db281f"}):"3119"===t.errorcode&&e(a.password).css({"border-color":"#db281f"}))})):(l.html("请填写密码").show(),void e(a.password).css({"border-color":"#db281f"})):(l.html("请填写用户名").show(),void e(a.username).css({"border-color":"#db281f"}))},loginOut:function(){var e=this,s=new t("/user/loginout.htm");s.done(function(t){"200"===t.status&&(e.isOnBack()?(e.delUserInfo(),e.changeStatus(!1),window.location.href="/"):(e.delUserInfo(),e.changeStatus(!1)))})},errorDialog:function(e,t,o){var n=this,i=e.errormsg,a=e.errorcode,l=[];"1034"===a||"3400"===a||"3000"===a?(this.delUserInfo(),this.changeStatus(!1),l=[{name:"重新登录",callBack:function(){s.close(),n.showLoginBox(t,o)}}]):l=[{name:"确定",callback:function(){s.close()}}],s.show({content:i,buttons:l})},isOnBack:function(){var e=0,t=window.location.href,s=n.BACKPAGE.length,o=!1;for(e=0;s>e;e+=1)if(-1!==t.indexOf(n.BACKPAGE[e])){o=!0;break}return o},delUserInfo:function(){e.removeCookie("username",{path:"/"}),e.removeCookie("id",{path:"/"})},setUserInfo:function(t){var s="";for(s in t)t.hasOwnProperty(s)&&e.cookie(s,t[s],{expires:7,path:"/"})},getParams:function(e){if(window.location.search){var t=window.location.search.substring(1).split("&"),s={},o=0;for(o=0;o<t.length;o+=1)s[t[o].split("=")[0]]=t[o].split("=")[1];return s[e]?s[e]:""}return""},getAreaById:function(e){var s=new t("/area/getAreaById.htm");s.done(function(t){e("200"===t.status?t.re:{province:"440000",city:"440100",area:"440106"})}).fail(function(t){e({province:"440000",city:"440100",area:"440106"})})},saveParams:function(t){var s="";for(s in t)t.hasOwnProperty(s)&&("object"==typeof t[s]?(e.removeCookie(s),e.cookie(s,e.toJSON(t[s]))):e.cookie(s,t[s]))},assist:function(){var t=null,s='<div id="fixed_box" class="fixed_box"><a href="javascript:void(0);" id="qqTalk_fixed_btn_01">在线客服</a><a href="javascript:void(0);" id="qqTalk_fixed_btn_02">意见反馈</a><a id="topBtn" href="javascript:void(0);"><i class="icon"></i>顶部</a></div>',o=function(){var t=0,s=e(window).scrollTop(),o=0,n=360,i=0,a=function(e,t,s,o,n){return s>o?(i=o,o=s,s=i,o-(-o*Math.cos(t/n*(Math.PI/2))+o+s)):-o*Math.cos(t/n*(Math.PI/2))+o+s},l=function(){t>=n?(e(window).scrollTop(o),e(this).css({visibility:"hidden"})):(e(window).scrollTop(a(0,t,s,o,n)),setTimeout(l,30)),t+=30};l()},n=function(){e(this).scrollTop()>0?t.css({visibility:"visible"}):t.css({visibility:"hidden"})};e("body").append(s),t=e("#topBtn"),e(window).on("scroll",n),t.on("click",o),n.call(window)}},new n})}(window.define);