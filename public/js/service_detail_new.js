(function (requirejs) {
    'use strict';
    requirejs(['jquery', 'handlebars', 'sersAddrsCtrl', "serviceCtrl", 'paginate', 'common', 'experts', 'dialog', 'chosen', 'affix', 'scrollspy', 'placeholder'], function ($, Handlebars, sersAddrsCtrl, serviceCtrl, Paginate, common, Experts, dialog) {
        
        function ServiceDetail() {
            this.paginate = null;
            this.commonQuestCtrl = null;
            this.newsCtrl = null;
            this.init();
        }

        ServiceDetail.prototype = {
            serviceid: "",
            init: function () {
                var that = this,
                    expert = new Experts($('#expert_list'));;
                $('select').chosen();
                this.selectAction();
                
                
                Handlebars.registerHelper('formatIndex', function (value) {
                    return value >= 9 ? (value + 1) : ("0" + (value + 1));
                });
                
                Handlebars.registerHelper('addOne', function (value) {
                    return value + 1;
                });
                
                $('#tabOuter').affix({
                    offset: {
                        top: function () {
                            return $('#tab_position').offset().top;
                        }
                    }
                });
                $('body').scrollspy({
                    target: '#tabNav',
                    offset: 10
                });
                
                this.tabAction();
            },
            
            tabAction: function () {
                $('#tabNav').on('click', 'li', function () {
                    var btn = $(this),
                        lis = btn.siblings('li'),
                        transaction = $('#transaction_box'),
                        commonQuery = $('#common_quest_box'),
                        news = $('#news_box');
                    lis.removeClass('active');
                    if (btn.attr('id')) {
                        transaction.hide();
                        btn.addClass('active');
                        if (btn.attr('id') === "tab_showCommonBtn") {
                            commonQuery.show();
                            news.hide();
                        } else if (btn.attr('id') === "tab_showNewsBtn") {
                            commonQuery.hide();
                            news.show();
                        }
                        $('body').scrollspy('refresh');
                    } else {
                        transaction.show();
                        commonQuery.hide();
                        news.hide();
                        $('body').scrollspy('refresh');
                    }
                });
            },

            selectAction: function () {
                var that = this,
                    firstChild = null,
                    main = $('#sb_mainclass'),
                    sub = $('#sb_subclass'),
                    service = $('#sb_service'),
                    maincId = $('#sb_mainclassId'),
                    subId = $('#sb_subclassId'),
                    serviceId = $('#sb_serviceId'),
                    params = [],
                    firstclass = "",
                    secondclass = "",
                    serviceid =  "",
                    province = "",
                    city = "",
                    area = "";
                params = /(\d{0,4})-(\d{0,4})-(\d{0,4})-(\d{6})-(\d{6})-(\d{6})/.exec(window.location.href);
                
                if (params) {
                    firstclass = params[1];
                    secondclass = params[2];
                    serviceid = params[3];
                    province = params[4];
                    city = params[5];
                    area = params[6];
                }
                
                $('#sb_province').change(function () {
                    sersAddrsCtrl.addressSelectAction({
                        selectObj: document.getElementById('sb_city'),
                        value: this.value,
                        resetObj: document.getElementById('sb_district'),
                        isCity: true
                    });
                });
                
                $('#sb_city').change(function () {
                    sersAddrsCtrl.addressSelectAction({
                        selectObj: document.getElementById('sb_district'),
                        value: this.value,
                        isCity: false
                    });
                });

                $('#sb_district').change(function () {
                    that.getServiceDetail();
                    that.packageCommonQuestion();
                    that.packageNews();
                });
                
                
                if (firstclass) {
                    this.packageChoice({
                        selectObj: main,
                        selected: firstclass,
                        isService: false
                    });
                } else {
                    this.packageChoice({
                        selectObj: main,
                        isService: false
                    });
                    firstChild = main.find('a').eq(0);
                    firstChild.addClass('active');
                    firstclass = firstChild.attr('data-value')
                }
                maincId.val(firstclass);
                
                
                main.on('click', 'a', function () {
                    that.servicePicker(this, 'main');
                });
                
                
                
                if (secondclass) {
                    this.packageChoice({
                        selectObj: sub,
                        selected: secondclass,
                        value: firstclass,
                        isService: false
                    });
                } else {
                    this.packageChoice({
                        selectObj: sub,
                        value: firstclass,
                        isService: false
                    });

                    firstChild = sub.find('a').eq(0);
                    firstChild.addClass('active');
                    secondclass = firstChild.attr('data-value')
                }
                subId.val(secondclass);
                
                
                sub.on('click', 'a', function () {
                    that.servicePicker(this, 'sub');
                });
                
                if (serviceid) {
                    this.packageChoice({
                        selectObj: service,
                        selected: serviceid,
                        value: secondclass,
                        isService: true
                    });
                } else {
                    this.packageChoice({
                        selectObj: service,
                        value: secondclass,
                        isService: true
                    });

                    firstChild = service.find('a').eq(0);
                    firstChild.addClass('active');
                    serviceid = firstChild.attr('data-value')
                }
                
                serviceId.val(serviceid);
                
                
                service.on('click', 'a', function () {
                    that.servicePicker(this, 'service');
                });
                
                common.getAreaById(function (data) {
                    province = province || data.province.toString();
                    city = city || data.city.toString();
                    area = area || data.area.toString();
                    sersAddrsCtrl.addressSelectAction({selectObj: document.getElementById('sb_province'), selected: province});
                    sersAddrsCtrl.addressSelectAction({selectObj: document.getElementById('sb_city'), value: province, selected: city, isCity: true});
                    sersAddrsCtrl.addressSelectAction({selectObj: document.getElementById('sb_district'), value: city, selected: area, isCity: false});
                });
            },

            servicePicker: function (obj, columnName) {
                var that = this,
                    btn = $(obj),
                    firstChild = null,
                    mainClass = '',
                    main = $('#sb_mainclass'),
                    sub = $('#sb_subclass'),
                    service = $('#sb_service'),
                    mainId = $('#sb_mainclassId'),
                    subId = $('#sb_subclassId'),
                    serviceId = $('#sb_serviceId');

                btn.siblings('a').removeClass('active');
                btn.addClass('active');
                switch (columnName) {
                    case 'main':
                        that.packageChoice({
                            selectObj: sub,
                            value: btn.attr('data-value'),
                            isService: false
                        });
                        mainId.val(btn.attr('data-value'));
                        firstChild = sub.find('a').eq(0);
                        firstChild.addClass('active');
                        mainClass = firstChild.attr('data-value')
                        subId.val(firstChild.attr('data-value'));
                    case 'sub':
                        that.packageChoice({
                            selectObj: service,
                            value: mainClass || btn.attr('data-value'),
                            isService: true
                        });
                        if (columnName === "sub") {
                            subId.val(btn.attr('data-value'));
                        }
                        firstChild = service.find('a').eq(0);
                        firstChild.addClass('active');
                        serviceId.val(firstChild.attr('data-value'));
                    case 'service':
                        if (columnName === "service") {
                            if (that.serviceid === btn.attr('data-value')) {
                                return;
                            }
                            serviceId.val(btn.attr('data-value'));
                        }
                }

                that.getServiceDetail();
                that.packageCommonQuestion();
                that.packageNews();
            },


            
            packageChoice: function (params) {
                var items = serviceCtrl.qryData(params.value, params.isService),
                    i = 0,
                    length = items.length,
                    html = "",
                    box = params.selectObj,
                    source = $('#choice_template').html(),
                    template = Handlebars.compile(source);
                
                if (params.selected) {
                    for (i = 0; i < length; i += 1){
                        if(items[i].code === parseInt(params.selected, 10)){
                            items[i].active = true;
                            break;
                        }
                    }
                }
                box.empty();
                html = template(items);
                $(html).appendTo(box);;
            },

            getFluxData: function () {
                var data = {},
                    province = document.getElementById('sb_province'),
                    city = document.getElementById('sb_city'),
                    district = document.getElementById('sb_district'),
                    main = $('#sb_mainclass'),
                    sub = $('#sb_subclass'),
                    service = $('#sb_service');
  
                function getPlaceData (obj, name){
                    var i = 0,
                        length = 0,
                        temp = null,
                        option = null;
                    data[name] = [];
                    for (i = 0, length = obj.options.length; i < length; i += 1) {
                        option = obj.options[i];
                        if(!option.selected && option.value !== "") {
                            temp = {};
                            temp.name = option.text;
                            temp.id = option.value;
                            data[name].push(temp);
                        } else if (option.selected) {
                            data["z" + name] = {
                                name: option.text,
                                id: option.value
                            };
                        }
                    }
                }
  
                function getServiceData(obj, name){
                    var option = null,
                        temp = null;
                    data[name] = [];
                    obj.find('a').each(function (index) {
                        option = $(this);
                        if (option.hasClass('active')) {
                            data["z" + name] = {
                                name: option.text(),
                                id: option.attr('data-value')
                            };
                        } else {
                            temp = {};
                            temp.name = option.text();
                            temp.id = option.attr('data-value');
                            if (data[name].length <= 9) {
                                data[name].push(temp);
                            }
                        }
                    });
                }
  
                getPlaceData(province, 'province');
                getPlaceData(city, 'city');
                getPlaceData(district, 'district');
                getServiceData(main, 'main');
                getServiceData(sub, 'sub');
                getServiceData(service, 'service');
                return data;
            },

            packageFlux: function () {
                var data = this.getFluxData(),
                    html = "",
                    box = $('#flux_box'),
                    source = $('#flux_template').html(),
                    template = Handlebars.compile(source);
                box.empty();
                html = template(data);
                $(html).appendTo(box);
            },

            getServiceDetail: function () {
                var that = this,
                    params = {
                        id: $('#sb_serviceId').val(),
                        pcode: $('#sb_mainclassId').val(),
                        ccode: $('#sb_subclassId').val(),
                        area: $('#sb_district').val(),
                        city: $('#sb_city').val(),
                        province: $('#sb_province').val(),
                        useragent: navigator.userAgent
                    };
                
                function para(data) {
                    var datastr = "";
                    if (data && Object.prototype.toString.call(data) == "[object Object]") {
                        for (var i in data) {
                                datastr += i + "=" + data[i] + "&";
                        }
                    }

                    datastr = datastr.substr(0, datastr.length-1);
                    return datastr;

                }
   
                
                $.ajax({
                    url: common.prefix + "service/qryServiceDetailByCode.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    success: function (data) {
                        if (data.status === "200") {
                            $('#overview_box').show();
                            $('#tab_position').show();
                            $('#transaction_box').show();
                             $('#noResult').hide();
                            that.fillOverview(data.re);
                            that.packageTransaction(data.re);
                            that.packageMajor(data.re);
                            that.packageRelatedServices(data.re);
                            $('#tabNav li').removeClass('active');
                            $('#tabNav li').eq(0).addClass('active');
                            $('#common_quest_box').hide();
                            $('#news_box').hide();
                            common.saveParams({
                                specificationlist: data.re.specificationlist,
                                province: $('#sb_province').val(),
                                city: $('#sb_city').val(),
                                district: $('#sb_district').val(),
                                serviceid: data.re.id,
                                servicename: data.re.name
                            });
                            that.serviceid = params.id;
                            that.packageFlux();
                        } else {
                            $('#overview_box').hide();
                            $('#tab_position').hide();
                            $('#transaction_box').hide();
                            $('#noResultText').text(data.errormsg);
                            $('#noResult').show();
                        }
                    },
                    
                    error: function (data) {

                    }
                });
            },
            
            packageMajor: function (data) {
                var items = data.tag,
                    box = $('#major_box'),
                    list = $('#mb_content'),
                    html = [],
                    i = 0,
                    length = items.length;
                if (length) {
                    list.empty();
                    for (i = 0; i < length; i += 1) {
                        html.push('<a href="/so/' + encodeURIComponent(items[i]) + '" target="_blank">' + items[i] + '</a>');
                    }
                    list.append(html.join(''));
                    box.show();
                } else {
                    box.hide();
                }
            },
            

            fillOverview: function (data) {
                var content = $('#ob_conent'),
                    showMoreLine = $('#ob_showmoreline'),
                    province = $('#sb_province'),
                    city = $('#sb_city'),
                    district = $('#sb_district'),
                    changeStatus = function () {
                        var btn = $(this);
                        if (!btn.data('status') || btn.data('status') === "hide") {
                            content.css({
                                height: 'auto',
                                overflow: 'auto'
                            });
                            btn.text("收起详情").data('status', 'show');
                        } else if (btn.data('status') === "show") {
                            content.css({
                                height: '146px',
                                overflow: 'hidden'
                            });
                            btn.text("查看更多").data('status', 'hide');
                        }
                    };
                $('#ob_title').html(data.name +
                                    '<span>[' +
                                    sersAddrsCtrl.qryName(province.val()) +
                                    '][' +
                                    sersAddrsCtrl.qryName(city.val()) +
                                    '][' +
                                    sersAddrsCtrl.qryName(district.val()) +
                                    ']</span>');
                $('#ob_img').attr('src', data.cover);
                content.removeAttr('style');
                $('#ob_conent').html(data.description);
                if (content.height() > 146) {
                    showMoreLine.show();
                    content.css({
                        height: '146px',
                        overflow: 'hidden'
                    });
                    $('#ob_showmore').unbind('click').on('click', changeStatus).text("查看更多").data('status', 'hide');
                } else {
                    content.removeAttr('style');
                    showMoreLine.hide();
                }
                $('#ob_provider_btn').attr("href",
                    "/fuwu/" + 
                    data.pcode + "-" + 
                    data.ccode + "-" + 
                    data.id + "-" + 
                    province.val() + "-" + 
                    city.val() + "-" + 
                    district.val() + "-sp1");
                
                $('#tab_provider_btn').attr("href",
                    "/fuwu/" + 
                    data.pcode + "-" + 
                    data.ccode + "-" + 
                    data.id + "-" + 
                    province.val() + "-" + 
                    city.val() + "-" + 
                    district.val() + "-sp1");
                
            },

            packageTransaction: function (data) {
                var html = "",
                    province = $('#sb_province'),
                    city = $('#sb_city'),
                    district = $('#sb_district'),
                    box = $('#transaction_box'),
                    source = $('#transaction_template').html(),
                    template = Handlebars.compile(source);
                box.empty();
                html = template(data);
                $(html).appendTo(box);
                $('body').scrollspy("refresh");
                
                $('#tranc_provider_btn').attr("href",
                    "/fuwu/" + 
                    data.pcode + "-" + 
                    data.ccode + "-" + 
                    data.id + "-" + 
                    province.val() + "-" + 
                    city.val() + "-" + 
                    district.val() + "-sp1");
            },
            
            packageRelatedServices: function (data) {
                var html = "",
                    box = $('#other_service_list'),
                    items = data.relateservicegoods,
                    i = 0,
                    length = data.relateservicegoods.length,
                    source = $('#other_service_template').html(),
                    template = Handlebars.compile(source);
                box.empty();
                if (length) {
                    for(i = 0; i < length; i += 1){
                        items[i].province = $('#sb_province').val();
                        items[i].city = $('#sb_city').val();
                        items[i].district = $('#sb_district').val();
                        items[i].description = items[i].description.replace(/<\/?[\w ="'\.\-:()#,;]+>/g, "");
                    }
                    html = template(items);
                    $(html).appendTo(box);
                    $('#other_service_box').show();
                } else {
                    $('#other_service_box').hide();
                }
            },
            
            getCommonQuestion: function (paramsObj) {
                var that = this,
                    key = "",
                    params = {};
                for (key in paramsObj) {
                    params[key] = paramsObj[key];
                }
                delete params.func;
                $.ajax({
                    url: common.prefix + "service/qryCommonProblems.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            that.writeCommonQuestion(data.re);
                            paramsObj.func(that.commonQuestCtrl,
                                           params.pageSize,
                                           params.pageNumber,
                                           data.re.totalPage);
                        }
                    },
                    error: function (data) {

                    }

                });
            },
            
            writeCommonQuestion: function (data) {
                var html = "",
                    box = $('#cqb_list'),
                    source = $('#common_quest_template').html(),
                    template = Handlebars.compile(source);
                box.empty();
                html = template(data);
                $(html).appendTo(box);
            },
            
            packageCommonQuestion: function () {
                var that = this;
                this.commonQuestCtrl = new Paginate({
                    position: "#cqbl_pager",
                    anchorPoint: "common_quest_box",
                    amount: 5,
                    currentPage: 1,
                    pages: 0,
                    data: {
                        id: function () {
                            return $('#sb_serviceId').val();
                        },
                        area: function () {
                            return $('#sb_district').val();
                        },
                        city: function () {
                            return $('#sb_city').val();
                        },
                        province: function () {
                            return $('#sb_province').val();
                        },
                        pageSize: 5,
                        pageNumber: 1
                    },
                    invoke: function () {
                        that.getCommonQuestion.apply(that, arguments);
                    }
                });
            },
            
            getNews: function (paramsObj) {
                var that = this,
                    key = "",
                    params = {};
                for (key in paramsObj) {
                    params[key] = paramsObj[key];
                }
                delete params.func;
                $.ajax({
                    url: common.prefix + "service/qryRelatedArticles.htm",
                    data: params,
                    dataType: "json",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        if (data.status === "200") {
                            that.writeNews(data.re);
                            paramsObj.func(that.newsCtrl,
                                           params.pageSize,
                                           params.pageNumber,
                                           data.re.totalPage);
                        }
                    },
                    error: function (data) {

                    }

                });
            },
            
            writeNews: function (data) {
                var html = "",
                    box = $('#nl_list'),
                    source = $('#news_template').html(),
                    template = Handlebars.compile(source);
                box.empty();
                html = template(data);
                $(html).appendTo(box);
            },
            
            packageNews: function () {
                var that = this;
                this.newsCtrl = new Paginate({
                    position: "#nl_pager",
                    anchorPoint: "news_box",
                    amount: 5,
                    currentPage: 1,
                    pages: 0,
                    data: {
                        id: function () {
                            return $('#sb_serviceId').val();
                        },
                        pageSize: 5,
                        pageNumber: 1
                    },
                    invoke: function () {
                        that.getNews.apply(that, arguments);
                    }
                });
            }
        };
        var serviceDetail = new ServiceDetail();
    });
}(window.requirejs));