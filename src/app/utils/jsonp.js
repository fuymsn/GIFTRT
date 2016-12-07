/**
 * Created by yvan on 16/2/9.
 */
module.exports = function (config) {
    var param = config || {};
    param.url = param.url || "";
    param.type = param.type || "jsonp";
    param.callback = param.callback || "callback";

    // 设置回调名称为
    param.callbackName = param.callbackName || "jsonp" + new Date().getTime() + "callback";

    // 创建回调函数
    if (param.type === "jsonp") {
        window[param.callbackName] = function () {
            if (param.onsuccess) {
                param.onsuccess(arguments[0]);
            }
        };
    }

    // 创建一个 script 的 DOM 对象
    var script = document.createElement("script");

    // 设置其同步属性
    script.async = true;

    // 设置其地址
    script.src = param.url.replace(/#.*$/, "") + (/\?/.test(param.url) ? "&" : "?") + param.callback + "=" + param.callbackName;

    // 监听
    script.onload = script.onreadystatechange = function () {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;

            if (param.type === "var") {
                if (param.onsuccess) {
                    param.onsuccess(window[param.callbackName]);
                }
            }

            // 移除该 script 的 DOM 对象
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }

            // 删除函数或变量
            window[param.callbackName] = null;
        }
    };

    script.onerror = function () {
        if (param.onerror) {
            param.onerror();
        }
    };

    // 插入head
    document.getElementsByTagName("head")[0].appendChild(script);
};