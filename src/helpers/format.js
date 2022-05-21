export default {

    dateUsToBr(date){
        if (date) {
            let new_date = new Date(date);
            let day   = '' + (new_date.getDate() + 1);
            let month = '' + (new_date.getMonth() + 1);
            let year  = new_date.getFullYear();

            if (day.length < 2) {
                day = '0' + day;
            }

            if (month.length < 2) {
                month = '0' + month;
            }

            return [day, month, year].join('/');
        } else {
            return null;
        }
    },

    dateBrToUs(date)
    {
        if(date == null || date == ""){
            return null;
        }

        let arr = date.split('/');
        return `${arr[2]}-${arr[1]}-${arr[0]}`;
    },

    calculateAge(birthday){
        let age = new Date(birthday);
        let now = new Date();

        return Math.floor(Math.ceil(Math.abs(age.getTime() - now.getTime()) / (1000 * 3600 * 24)) / 365.25);
    }

}
