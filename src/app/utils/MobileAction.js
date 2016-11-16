class MobileAction {
    /**
     * 切换页面
     * 传参: object
     * { dir: 'room', roomId: 10000 }跳转到房间号
     * { dir: 'activity', title: 'appbar title名称',url: '#/路由' }
     */
    static switchPage(json){
        window.mobileAction.switchPage(json);
    }

    /**
     * 清理缓存
     */
    static clearCache(){
        window.mobileAction.clearCache();
    }

    /**
     * 退出登录
     */
    static logout(){
        window.mobileAction.logout();
    }

    /**
     * 调用登录弹窗
     * param 1: 登录成功后跳转方向
     * home: 大厅， rank: 排行榜，activity: 活动， user: 用户中心
     */
    static showLoginDialog(){
        window.mobileAction.login('home');
    }

    /**
     * 获取用户token从android端
     * 返回string token，或者空字符串
     */
    static getToken(){
        return window.mobileAction.getToken();
    }

    /**
     * 获取移动端版本号
     */
    static getVersion(){
        return window.mobileAction.getVersion();
    }

    /**
     * 触发版本更新
     */
    static updateVersion(){
        window.mobileAction.updateVersion();
    }

    /**
     * 简易弹窗
     * { title: '提示', content: '提示内容' }
     */
    static showToastDialog(json){
        window.mobileAction.showToastDialog(json);
    }
}

export default MobileAction;