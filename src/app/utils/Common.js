import MobileAction from './MobileAction';

class Common {
    //获取活动 banner图片url
	static getActivityBannerImageUrl(iamgeId) {
		return '/public/images/activity/' + iamgeId;
	}
	//获取userToken
	// static getUserToken() {
	// 	//return (dispatch) => {
	// 		let data = MobileAction.getToken();
	// 		//let data = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NzUxNDQ0MTQsImV4cCI6MTQ3NzczNjQxNCwidWlkIjoiMTAwMDAiLCJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSJ9.gC6gL_yhrNVE48tniwuYLmlqfcmmnD1V6Y2A2soyHvw';
	// 		//let data = {'token': ''}

	// 		if(!this.isLogin()){
	// 			//如果能够获取token
	// 			window.localStorage.setItem('token', data);
	// 		}else{
	// 			//如果不能获取token, 调用弹窗
	// 			MobileAction.showLoginDialog();
	// 		}
			
	// 		//dispatch(updateUserToken(token));
	// 	//}
	// }

	/**
	 * 判断是否登录
	 * 返回bool
	 */
	static isLogin() {
		let token = window.localStorage.getItem('token');
		//一个神奇的现象：localstorage 在pc端token 返回为null并且typeof null == 'object'对象，在移动端返回typeof 'null' == 'string'字符串
		return (token == null || token == 'null' || token == '') ? false : true;
	}

	/**
	 * 从android获取token，并入库localStorage
	 */
	static login() {
		let data = MobileAction.getToken();
		//let data = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NzUxNDQ0MTQsImV4cCI6MTQ3NzczNjQxNCwidWlkIjoiMTAwMDAiLCJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSJ9.gC6gL_yhrNVE48tniwuYLmlqfcmmnD1V6Y2A2soyHvw';
		//alert(data);
		//alert('token 获取成功');
		//let data = '';
		//if(!this.isLogin()){
		window.localStorage.setItem('token', data);
		//}
	}

}

export default Common;