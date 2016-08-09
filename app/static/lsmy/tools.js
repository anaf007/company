"use strict";
var tools = {
	check_cookie:function(){
		if(window.navigator.cookieEnabled)  
			return true;  
		else{  
			alert("娴忚鍣ㄩ厤缃敊璇紝Cookie涓嶅彲鐢紒");  
			return false;
		}  
	}
	,set_cookie:function(name,value){  
	   var Days = 30; //姝� cookie 灏嗚淇濆瓨 30 澶�  
	   var exp = new Date(); //new Date("December 31, 9998");  
	   exp.setTime(exp.getTime() + Days*24*60*60*1000);  
	   document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();  
	}  
	,get_cookie:function(name)
	{  
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
		if(arr != null) return unescape(arr[2]); return null;  

		// var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
		// var result = regexp.exec(document.cookie);
		// return (result === null) ? null : result[1];
	}  
	,del_cookie:function(name)
	{  
		var exp = new Date();  
		exp.setTime(exp.getTime() - 1);  
		var cval=getCookie(name);  
		if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();  
	}  
	// 妫€娴嬬┖瀵硅薄
	// 绌哄垯杩斿洖true
	,isEmptyValue:function(value) {
		var type;
	    if(value === null) { // 绛夊悓浜� value === undefined || value === null
	    	return true;
	    }
	    type = Object.prototype.toString.call(value).slice(8, -1);
	    switch(type) {
	    	case 'String':
	    	return !!$.trim(value);
	    	case 'Array':
	    	return !value.length;
	    	case 'Object':
	    	// return $.isEmptyObject(value);
	    	return !value.length;
	    	default:
	    	return false;
	    }
	}
	,is_set:function(value){
		if (typeof(value) == "undefined") {
			return false;
		}else{
			return true;
		}

	}
	// 瑙ｆ瀽URL璺緞
	,parseURL:function(url) {
		var a =  document.createElement('a');
		a.href = url;
		return {
			source: url,
			protocol: a.protocol.replace(':',''),
			host: a.hostname,
			port: a.port,
			query: a.search,
			params: (function(){
				var ret = [],
				seg = a.search.replace(/^\?/,'').split('&'),
				len = seg.length, i = 0, s;
				for (;i<len;i++) {
					if (!seg[i]) { continue; }
					s = seg[i].split('=');
					ret[i] = {"key":s[0],"val":s[1]};
				}
				return ret;
			})(),
			file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
			hash: a.hash.replace('#',''),
			path: a.pathname.replace(/^([^\/])/,'/$1'),
			relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
			segments: a.pathname.replace(/^\//,'').split('/')
		};
	}	
};

/**
 * 鍥剧墖澶存暟鎹姞杞藉氨缁簨浠�
 * @version	2011.05.27
 * @author	TangBin
 * @see		http://www.planeart.cn/?p=1121
 * @param	{String}	鍥剧墖璺緞
 * @param	{Function}	灏哄灏辩华
 * @param	{Function}	鍔犺浇瀹屾瘯 (鍙€�)
 * @param	{Function}	鍔犺浇閿欒 (鍙€�)
 * @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
		alert('size ready: width=' + this.width + '; height=' + this.height);
	});
 */
var imgReady = (function () {
	var list = [];
	var intervalId = null;

	// 鐢ㄦ潵鎵ц闃熷垪
	var tick = function () {
		var i = 0;
		for (; i < list.length; i++) {
			list[i].end ? list.splice(i--, 1) : list[i]();
		};
		!list.length && stop();
	};

	// 鍋滄鎵€鏈夊畾鏃跺櫒闃熷垪
	var stop = function () {
		clearInterval(intervalId);
		intervalId = null;
	};

	return function (url, ready, load, error) {
		var onready, width, height, newWidth, newHeight,
			img = new Image();
		
		img.src = url;

		// 濡傛灉鍥剧墖琚紦瀛橈紝鍒欑洿鎺ヨ繑鍥炵紦瀛樻暟鎹�
		if (img.complete) {
			ready.call(img);
			load && load.call(img);
			return;
		};
		
		width = img.width;
		height = img.height;
		
		// 鍔犺浇閿欒鍚庣殑浜嬩欢
		img.onerror = function () {
			error && error.call(img);
			onready.end = true;
			img = img.onload = img.onerror = null;
		};
		
		// 鍥剧墖灏哄灏辩华
		onready = function () {
			newWidth = img.width;
			newHeight = img.height;
			if (newWidth !== width || newHeight !== height ||
				// 濡傛灉鍥剧墖宸茬粡鍦ㄥ叾浠栧湴鏂瑰姞杞藉彲浣跨敤闈㈢Н妫€娴�
				newWidth * newHeight > 1024
			) {
				ready.call(img);
				onready.end = true;
			};
		};
		onready();
		
		// 瀹屽叏鍔犺浇瀹屾瘯鐨勪簨浠�
		img.onload = function () {
			// onload鍦ㄥ畾鏃跺櫒鏃堕棿宸寖鍥村唴鍙兘姣攐nready蹇�
			// 杩欓噷杩涜妫€鏌ュ苟淇濊瘉onready浼樺厛鎵ц
			!onready.end && onready();
		
			load && load.call(img);
			
			// IE gif鍔ㄧ敾浼氬惊鐜墽琛宱nload锛岀疆绌簅nload鍗冲彲
			img = img.onload = img.onerror = null;
		};

		// 鍔犲叆闃熷垪涓畾鏈熸墽琛�
		if (!onready.end) {
			list.push(onready);
			// 鏃犺浣曟椂鍙厑璁稿嚭鐜颁竴涓畾鏃跺櫒锛屽噺灏戞祻瑙堝櫒鎬ц兘鎹熻€�
			if (intervalId === null) intervalId = setInterval(tick, 40);
		};
	};
})();


// if (!window.console || !console.firebug)
// if (!window.console)
// {
//     var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
//     "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

//     window.console = {};
//     for (var i = 0; i < names.length; ++i)
//         window.console[names[i]] = function() {};
// }


// 琛ㄥ崟 to object for ajax
// 鎵╁睍 缁勭粐琛ㄥ崟鍐呭
$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};