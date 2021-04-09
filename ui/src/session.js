
class SessionMaintain {
    static setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    static getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    static delteCookies() {
        //document.cookie = "jwt=;userType=; expires=;path=/;";
        var res = document.cookie;
        var multiple = res.split(";");
        for (var i = 0; i < multiple.length; i++) {
            var key = multiple[i].split("=");
            document.cookie = key[0] + " =; expires =; path=/";
            //document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
        }
    }

    static DeleteParticularCookie(cname) {
        document.cookie = cname + "=; Path=/; Expires=;";
    }
    static logoutRedirect(jwt) {
        if (!jwt) {
            console.log("jwt---clear");
            window.open("/Login/Candidate","_self");
            //history.go(-1);
        }
    }
}
export default SessionMaintain;
