/*
* set global delimiters in Vue.js 2.0
*/
Vue.options.delimiters = ['[[', ']]'];
Vue.config.productionTip = false;

/**
 * @description 获取数据
 * @param {URIString} url  需要请求数据的接口地址
 * @param {String} method  需要请求type
 * @param {Object} parm 提交的参数
 * */

window.canRequest = new Array(); //请求条件开关
function _dqRequest(url, method, param, callback) {

	if(window.canRequest[callback] == undefined || window.canRequest[callback]) {
		window.canRequest[callback] = false;
		window.deviceClientWidth = document.body.clientWidth;
		$.ajax(url, {
			data: param,
			crossDomain: true == !(document.all),
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			type: method,
			timeout: 30000,
			beforeSend: function() {
				if(window.deviceClientWidth<1200) {
					Vue.prototype._beforeSendAjax();
				}
			},
			complete: function () {
				if(window.deviceClientWidth<1200) {
                	Vue.prototype._completeAjax();
            	}
            },
			success: function(response) {
				delete window.canRequest[callback];
				if(response && response.hasOwnProperty('return_code')) {
					callback(response);
				} else {
					console.log('温馨提示：数据格式错误');
				}
				if(window.deviceClientWidth<1200) {
                	Vue.prototype._completeAjax();
            	}
			},
			error:function(xhr, type, errorThrownhr) {
				delete window.canRequest[callback];
				// console.log(new Date() + '【AJAX:ERR】-|T:' + type + '|H:' + errorThrownhr);
				if(window.deviceClientWidth<1200) {
                	Vue.prototype._completeAjax();
            	}
			}
		}); //ajax end
	}
}
