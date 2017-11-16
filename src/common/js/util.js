const ERR_OK = 0;

function getLocalTime(now) {
    now = new Date(now);
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    var date=now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();
    return year+"-"+month+"-"+date+" "+hour+":"+minute;
}
export default {
    ERR_OK,
    getLocalTime
}
