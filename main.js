//https://api.weatherapi.com/v1/current.json?key=cb03200639024d27934194741230105&q=london

//functions that can take a location and return the weather data for that location
function getlocation(){
    let location = document.getElementById("location").value;
    return location
}

function clearPage(){
    document.getElementById("locationdescription").replaceChildren()
    document.getElementById("containerweatherimg").replaceChildren()
    document.getElementById("weatherinfocontainer").replaceChildren()
    document.getElementById("containeradditionalinfo").replaceChildren()
}

document.getElementById("search").addEventListener("click", function(){
    clearPage()
    getweather()
})
document.getElementById("location").addEventListener("keypress", function(){
    if (event.key == "Enter"){
        clearPage()
        getweather()}
    })



async function getweather(){
    try{
    //get location from getlocation()
    const location = await getlocation();
    console.log(`Getting weather information about ${location}`);

    //get info from weatherapi
    const response = await fetch('https://api.weatherapi.com/v1/current.json?key=230926e770004906a25141307230405&q=' + `${location}`, {dataType: 'jsonp'}, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);

    //state where the location is 
    const cityfromapi = weatherData.location.name
    const country = weatherData.location.country
    const localtime = weatherData.location.localtime
    writecity(cityfromapi)
    writeLocation(country)
    writeLocation(localtime)

    //get temperature in celsius and fahrenheit for the location
    const tempc = weatherData.current.temp_c + "°C";
    const tempf = weatherData.current.temp_f + "°F";
    console.log(tempc, tempf)
    writeTempC(tempc)
    writeTempF(tempf)

    //provides a clear icon depending on if it's sunny, cloudy, rainy or snowing
    const condition = weatherData.current.condition.text
    writeCondition(condition)

    //get info on humidity, wind speed, feelslike
    const humidity = "Humidity " + weatherData.current.humidity + "%";
    const feelslike = "Feels like " + weatherData.current.feelslike_c + "°C/ " + weatherData.current.feelslike_f + "°F"
    const windspeed = "Wind speed " + weatherData.current.wind_mph + "mph"

    writeAdditionalInfoHumidity(humidity)
    writeAdditionalInfoFeels(feelslike)
    writeAdditionalInfoWind(windspeed)
    

    }catch(err){
        console.log(err)
    }
}

//write temperatures on the DOM 

function writeTempC(temp){
    console.log(temp)
    let tempctext = document.createTextNode(temp)
    let tempcdiv = document.createElement('div')
    tempcdiv.appendChild(tempctext)
    document.getElementById("weatherinfocontainer").appendChild(tempcdiv)
}

function writeTempF(temp){
    let tempftext = document.createTextNode(temp)
    let tempfdiv = document.createElement('div')
    tempfdiv.appendChild(tempftext)
    document.getElementById("weatherinfocontainer").appendChild(tempfdiv)
}

function writeCondition(condition){
    let conditiondiv = document.createElement("div")
    let conditiontext = document.createTextNode(condition)
    conditiondiv.id = "conditiondiv"
    conditiondiv.appendChild(conditiontext)
    document.getElementById("weatherinfocontainer").appendChild(conditiondiv)

    //generate icons depending on the weather conditions
    let img = document.createElement("img")
    let conditionlower = condition.toLowerCase()
    if (conditionlower.includes("sunny")){
        img.src = "pictures/sunny-day.png"
    }else if (conditionlower.includes("cloudy")){
        img.src = "pictures/cloudy.png"
    }else if (conditionlower.includes("rain") || conditionlower.includes("shower")){
        img.src = "pictures/rainy-day.png"
    }else if(conditionlower.includes("snow")){
        img.src = "pictures/snow.png"
    }else if (conditionlower.includes("wind")){
        img.src = "pictures/wind.png"
    }
    
    
    document.getElementById("containerweatherimg").appendChild(img)
}

function writeLocation(info){
    let infodiv = document.createElement('div')
    let infotext = document.createTextNode(info)
    infodiv.appendChild(infotext)
    document.getElementById("locationdescription").appendChild(infodiv)
}

function writecity(info){
    let citydiv = document.createElement('div')
    let citytext = document.createTextNode(info)
    citydiv.id = "city"
    citydiv.appendChild(citytext)
    document.getElementById("locationdescription").appendChild(citydiv)
}

function writeAdditionalInfoHumidity(info){
    let humidityimg = document.createElement('img');
    humidityimg.src = "pictures/humidity.png"
    humidityimg.classList.add("smallericon");
    humidityimg.classList.add("invert");
    let addinfodiv = document.createElement("div");
    let addinfotext = document.createTextNode(info);
    addinfodiv.appendChild(humidityimg)
    addinfodiv.appendChild(addinfotext);
    document.getElementById("containeradditionalinfo").appendChild(addinfodiv)
}

function writeAdditionalInfoFeels(info){
    let feelsimg = document.createElement('img');
    feelsimg.src = "pictures/thermometer.png"
    feelsimg.classList.add("smallericon");
    feelsimg.classList.add("invert");
    let addinfodiv = document.createElement("div");
    let addinfotext = document.createTextNode(info);
    addinfodiv.appendChild(feelsimg);
    addinfodiv.appendChild(addinfotext);
    document.getElementById("containeradditionalinfo").appendChild(addinfodiv)
}

function writeAdditionalInfoWind(info){
    let windimg = document.createElement('img');
    windimg.src = "pictures/wind.png"
    windimg.classList.add("smallericon");
    windimg.classList.add("invert");
    let addinfodiv = document.createElement("div");
    let addinfotext = document.createTextNode(info);
    addinfodiv.appendChild(windimg);
    addinfodiv.appendChild(addinfotext);
    document.getElementById("containeradditionalinfo").appendChild(addinfodiv)
}
