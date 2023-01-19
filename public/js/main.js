const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp_real_val = document.getElementById('temp_real_val');

const datahide = document.querySelector('.middle_layer');

const getInfo = async (event)=> {
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === "") {
        city_name.innerHTML = "please enter city before search";
        datahide.classList.add('data_hide');
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=928bef0565f23fc66d79c52689a6c79e`;
            const response = await fetch(url);
            const data = await response.json();
            // console.log(data);
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            // temp_status.innerText = arrData[0].weather[0].main;

            const tempMood = arrData[0].weather[0].main;
            if(tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }
            else if(tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            }
            else if(tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            }
            else {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #eccc68;'></i>";
            }
            datahide.classList.remove('data_hide');
        }
        catch {
            city_name.innerHTML = "Invalid City Name";
            datahide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener('click',getInfo);

//day and date
const day = document.getElementById('day');
const currdate = document.getElementById('currdate');
let currentTime = new Date();

const currentDay = ()=> {
    let weekday = new Array(7);
    weekday[0]="Monday";
    weekday[1]="Tuesday";
    weekday[2]="Wednesday";
    weekday[3]="Thursday";
    weekday[4]="Friday";
    weekday[5]="Saturday";
    weekday[6]="Sunday";

    let myday = weekday[currentTime.getDay()];
    return myday;
}

const month = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
day.innerHTML = currentDay();
currdate.innerHTML = `${currentTime.getDate()} ${month[currentTime.getMonth()]}`;