/**
 * Created by nicholas on 2016/10/7.
 */
import $ from "jquery";
import Common from "./Common";

//alert(token);
if(!Common.isLogin()){
    //获取login
    Common.login();
}

//header setting
$.ajaxSetup({
    headers: { 'Authorization': window.localStorage.getItem('token') }
});

export default $;