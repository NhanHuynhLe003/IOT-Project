let weather = {
    "apiKey": "a4f316c60c467a1ddc52dbef9570f4dd",
    weatherFetching: function(city) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
        )
        .then((res) => res.json())
        .then((data) => this.weatherRendering(data))
    },
    weatherRendering: function(data) {
        const {name} = data;
        const {main, description} = data.weather[0];
        const {humidity, temp} = data.main;
        const {speed} = data.wind;

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth()+1;
        const year = date.getFullYear();
        const hour = date.getHours();
        const min = date.getMinutes();
        const second = date.getSeconds();
        
        document.querySelector('.location').innerText = name;
        document.querySelector('.status-name').innerText = description;
        document.querySelector('.dgOfHumidity').innerText = humidity + "%";
        document.querySelector('.dgOfTempa').innerText = temp + "℃";
        document.querySelector('.dgOfWind').innerText = speed + "km/h";

        const iconStatus = description;
        if(iconStatus.search('cloud')>=0){
            document.querySelector('.img-container img').src = `./icon/weather/cloud.svg`
        }
        else if(iconStatus.search('clear')>=0){
            document.querySelector('.img-container img').src = `./icon/weather/clear.svg`
        }
        else if(iconStatus.search('rain')>=0){
            document.querySelector('.img-container img').src = `./icon/weather/rain.svg`
        }
        
        document.querySelector('.hour').innerText = `${hour}:${min}:${second}`
        document.querySelector('.date').innerText = `${month}/${day}/${year}`
    },
    searching: function(){
        this.weatherFetching(document.querySelector('.search-bar input').value);
    },
    defaultPst: 'Ho Chi Minh City',
}
    function hideContent(){
        document.querySelector(".hidden-element").setAttribute("style","display: none !important;"); //hide
        document.querySelector(".lds-dual-ring").setAttribute("style", "display: block;"); //show loading
    }
    function showContent(){
        document.querySelector(".hidden-element").setAttribute("style","display: block;");
        document.querySelector(".lds-dual-ring").setAttribute("style", "display: none;");
    }
    //xu li btn
    document.querySelector('.search-btn').addEventListener("click", ()=>{
        weather.searching();
        showContent();
    });
    //an noi dung khi dang nhap
    document.querySelector('.search-bar input').addEventListener("keydown", ()=>{
        hideContent();
    })
    //dang nhap blur ra ngoai se hien lai
    document.querySelector('.search-bar input').addEventListener("blur",() => {
        showContent();
    })
    document.querySelector('.search-bar input').addEventListener("keydown", (e) => {
        e.key === 'Enter' ? showContent(): hideContent();
    })
    function changeDfPst(){
        let newVal = document.querySelector('.search-bar input').value;
        newVal === ''? newVal = weather.defaultPst : newVal;
        return newVal
    }

//auto update data
    
weather.weatherFetching(changeDfPst());

const loading =  setInterval(() => {
    weather.weatherFetching(changeDfPst());
    
}, 1000);


