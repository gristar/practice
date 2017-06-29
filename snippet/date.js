(function(root){
    var UIDate = {
        fmtNum: function(num){
            if(num < 10){
                return '0' + num;
            }
            return num;
        },
        getMonthDate: function(year, month){
            var days = [];
            var today = new Date();
            month = month || today.getMonth() + 1;
            year = year || today.getFullYear();

            var firstDay = new Date(year, month-1, 1).getDay();
            if(firstDay == 0){
                firstDay = 7;
            }
            var perMonthDayCount = firstDay - 1;
            var perMonthLastDay = new Date(year, month-1, 0).getDate();
            for(var i = 0; i < perMonthDayCount; i++){
                var perDate = perMonthLastDay-perMonthDayCount+1+i;
                var perMonthDay = new Date(year,month-2,perDate);
                days.push({date:UIDate.fmtNum(perMonthDay.getDate()),month:UIDate.fmtNum(month-1)})
            }

            var curMonthDayCount = new Date(year, month, 0).getDate();
            for(var j = 0; j < curMonthDayCount; j++){
                days.push({data:UIDate.fmtNum(j+1),month:UIDate.fmtNum(month)})
            }

            var nextMonthDayCount = 6 - new Date(year, month-1, curMonthDayCount).getDay();
            for(var k = 0; k < nextMonthDayCount; k++){
                days.push({data:UIDate.fmtNum(k+1), month:UIDate.fmtNum(month+1)})
            }

            return {year: year, month: month, days: days};
        },
        getTime: function(){
            var today = new Date();
            var hour = today.getHours(),
                minutes = today.getMinutes(),
                seconds = today.getSeconds(),
                week = today.getDay();

            var weekTxt = ['日','一', '二', '三', '四', '五', '六'];
            week = weekTxt[week];
            return {week: week, hour: hour, minutes: minutes, seconds: seconds};
        }
    };

    if(typeof module !== 'undefined' && typeof exports === 'object'){
        module.exports = UIDate;
    }
    else if(typeof define === 'function' && define.amd){
        define([], function(){
            return UIDate;
        })
    }
    else if (root !== undefined){
        root.UIDate = UIDate;
    }
})(this);