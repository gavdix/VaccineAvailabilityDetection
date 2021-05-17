const PINCODE = '560066';//560037, 560048
function main(){
    checkAvailability();
}

function checkAvailability() {

    let datesArray = fetchNext10Days();
    datesArray.forEach(date => {
        getSlotsForDate(date);
    })
}

function fetchNext10Days(){
    let dates = [];
    let d = new Date();
    let today = d.getDate() + '-05-2021';// '12-05-2021';
    for(let i = 0 ; i < 10 ; i ++ ){
        let dateString = today//.format('DD-MM-YYYY')
        dates.push(dateString);
        today = (d.getDate() + i) + '-05-2021';
    }
    return dates;
}

function getSlotsForDate(DATE) {
    let config = {
        method: 'get',
        url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=' + PINCODE + '&date=' + DATE,
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'hi_IN'
        }
    };

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           console.log(xhttp.response)
           if (JSON.parse(xhttp.response).centers) {
            let response = JSON.parse(xhttp.response).centers;
           console.log("response = ", response)
            for (let i = 0; i < response.length; i++) {
                let sessions = response[i].sessions;
                // console.log("sessions = ", sessions)
                for (let j = 0; j < sessions.length; j++) {
                    console.log("sessions[j].available_capacity = ", sessions[j].available_capacity)
                    if (sessions[j].available_capacity !== 0) {
                        alert("slots available");
                    } else {
                        console.log("all slots booked");
                    }
                }
            }
           } else {
               console.log("no available")
           }
        }
    };
    xhttp.open("GET", config.url, true);
    xhttp.setRequestHeader('accept', 'application/json')
    xhttp.setRequestHeader('accept-language', 'hi_IN')
    // xhttp.setRequestHeader('Access-Control-Allow-Origin', "*")
    // xhttp.setRequestHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS, PUT, DELETE')
    // xhttp.setRequestHeader('Access-Control-Allow-Headers', "Origin, Content-Type, Accept, Authorization, X-Request-With")
    // xhttp.setRequestHeader('user-agent', "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36")
    // xhttp.setRequestHeader('sec-fetch-site', "cross-site")
    // xhttp.setRequestHeader('sec-fetch-mode', "cors")

    xhttp.send();

}

// setInterval(function() {
    main();
// }, 60000);
