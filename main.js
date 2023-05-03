//https://api.weatherapi.com/v1/current.json?key=cb03200639024d27934194741230105&q=london

//functions that can take a location and return the weather data for that location
function getlocation(){
    let location = document.getElementById("location").value;
    return location
}

document.getElementById("search").addEventListener("click", function(){getweather()})
document.getElementById("location").addEventListener("keypress", function(){
    if (event.key == "Enter"){
        getweather()}
    })

async function getweather(){
    try{
    //get location from getlocation()
    const location = await getlocation();
    console.log(`Getting weather information about ${location}`);

    //get info from weatherapi
    const response = await fetch('https://api.weatherapi.com/v1/current.json?key=cb03200639024d27934194741230105&q=' + `${location}`, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);

    //state where the location is 
    writeLocation(location)

    //get temperature in celsius and fahrenheit for the location
    const tempc = weatherData.current.temp_c;
    const tempf = weatherData.current.temp_f;
    console.log(tempc, tempf)
    writeTempC(tempc)
    writeTempF(tempf)

    //provides a clear icon depending on if it's sunny, cloudy, rainy or snowing
    const condition = weatherData.current.condition.text
    writeCondition(condition)

    }catch(err){
        console.log(err)
    }
}

function writeTempC(temp){
    document.getElementById("containertempc").textContent = temp + "°C"
}

function writeTempF(temp){
    document.getElementById("containertempf").textContent = temp + "°F"
}

function writeCondition(condition){
    document.getElementById("containerweatherimg").textContent = condition;
    let img = document.createElement("img")
    img.src = "sunny-day.png"
    document.getElementById("containerweatherimg").appendChild(img)
}

function writeLocation(location){
    document.getElementById("declarelocation"). textContent = "Current weather in " + location
}
