import MobileAction from './MobileAction';

class Common {
    //获取活动 banner图片url
	static getActivityBannerImageUrl(iamgeId) {
		return '/public/images/activity/' + iamgeId;
	}

	/**
	 * 判断是否登录
	 * 返回bool
	 */
	static isLogin() {
		
		//let token = window.localStorage.getItem('token');
		//一个神奇的现象：localstorage 在pc端token 返回为null并且typeof null == 'object'对象，在移动端返回typeof 'null' == 'string'字符串
		//return (token == null || token == 'null' || token == '') ? false : true;

		let token = this.getTokenFromServer();
		return token.length > 0 ? true: false;
	}

	/**
	 * 从android获取token，并入库localStorage
	 * return: true:获取token成功，用户在登录状态中。false: 获取token失败，用户不在登录状态
	 */
	static getTokenFromServer() {
		let token = MobileAction.getToken();
		//let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0Nzg1MzUxMjMsImV4cCI6MTQ4MTEyNzEyMywidWlkIjoiMTAwMDAiLCJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSJ9.xvxwrKhnAp472oBUfFZwsN1tyFWhw-fThNYiNenSg50';
		//alert(data);
		//alert('token 获取成功');
		//let data = '';

		//写入token
		window.localStorage.setItem('token', token);

		//token返回值判定
		return token;
	}

	/**
	 * 返回 ajax headers token
	 * return: true:获取token成功，用户在登录状态中。false: 获取token失败，用户不在登录状态
	 */
	static getAjaxHeader(){
		let token = window.localStorage.getItem('token');
		let ajaxToken = '';

		if(token.length > 0){
			ajaxToken = 'Bearer ' + token;
		}else{
			token = this.getTokenFromServer();
			ajaxToken = token.length > 0 ? 'Bearer ' + token : '';
		}
		
		//写入ajax header setting
		// $.ajaxSetup({
		// 	headers: { 'Authorization': ajaxToken }
		// });
		return ajaxToken;
	}

}

export default Common;