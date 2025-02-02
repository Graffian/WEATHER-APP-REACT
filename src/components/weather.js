import styles from "./weather.css"
import {useState,useEffect} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSun} from "@fortawesome/free-solid-svg-icons"
import {faMoon} from "@fortawesome/free-solid-svg-icons"
import {faTemperatureHigh} from "@fortawesome/free-solid-svg-icons"
import {faTemperatureLow} from "@fortawesome/free-solid-svg-icons"
import {faTemperatureArrowUp} from "@fortawesome/free-solid-svg-icons"
import {faTemperatureArrowDown} from "@fortawesome/free-solid-svg-icons"
import {faGlobe} from "@fortawesome/free-solid-svg-icons"
import {faEye} from "@fortawesome/free-solid-svg-icons"
import {faWind} from "@fortawesome/free-solid-svg-icons"
function Weather(){
  const [weatherData,setWeatherData] = useState([])
  const[cityInput,setCityInput] = useState("")
  const [toggle,setToggle] = useState(false)
  useEffect(()=>{
    async function dataFetch(){
      if(!toggle)
      return;
    const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${cityInput}&aqi=no`);
    const result = await data.json()
    const location = result.location
    const current = result.current
    
    setWeatherData(
      {
      localtime:location.localtime,
      name:location.name,
      region:location.region,
      country:location.country,
      day:current.is_day,
      feelslike:current.feelslike_c,
      temperature:current.temp_c,
      uv:current.uv,
      visibility:current.vis_km,
      windSpeed:current.wind_kph
    })
    
    console.log(weatherData)
    console.log(result)
    console.log(location)
    console.log(current)
    }
    
    dataFetch()
    
    setToggle(false)
  },[toggle])
  useEffect(()=>{
    console.log(weatherData)
  },[weatherData])
  
  function handleCityInput(e){
    setCityInput(e.target.value)
  }
  function handleEnterBtn(){
    setToggle(true)
    
  }
  function uvLogic(){
    if(weatherData.uv >=0 && weatherData.uv <=2){
      return "(Low Risk)"
    }else if(weatherData.uv >=3 && weatherData.uv <=5){
      return "(Moderate Risk)"
    }else if(weatherData.uv >=6 && weatherData.uv <=7){
      return "(High Risk)"
    }else if(weatherData.uv >=8){
      return "(Very High Risk)"
    }
  }
  return(
    <>
    <nav className="weather-app">
      <div className="input-enter-fields">
        <input className="city-input" placeholder="enter a city...." value ={cityInput} onChange={handleCityInput}/>
        <button onClick={handleEnterBtn} className="enter-button">ENTER</button>
      </div>
      {weatherData.length!=0?(<div className={weatherData.day==1?"weather-data-day":"weather-data-night"}>
        
        {weatherData.day==1?(<p className="sunIcon"><FontAwesomeIcon icon={faSun}/></p>):(<p className="moonIcon"><FontAwesomeIcon icon={faMoon}/></p>)}
      <p className="location-data"><FontAwesomeIcon className="globe-icon" icon={faGlobe} />PLACE: {weatherData.name},{weatherData.region},{weatherData.country}</p>
      <p className="location-data">DATE: {weatherData.localtime} {weatherData.day==1?"AM":"PM"}</p>
      <p>TEMPRATURE : {weatherData.temperature}°C {weatherData.temperature>21?(<FontAwesomeIcon className="high-temp-icon" icon={faTemperatureHigh} />):(<FontAwesomeIcon className="low-temp-icon" icon={faTemperatureLow} />)}</p>
      <p>FEELS LIKE : {weatherData.feelslike} {weatherData.feelslike>21?(<FontAwesomeIcon className="up-temp-icon" icon={faTemperatureArrowUp} />):(<FontAwesomeIcon className="down-temp-icon" icon={faTemperatureArrowDown} />)}</p>
      <p>UV : {weatherData.uv} {uvLogic()}</p>
      <p>VISIBILITY : {weatherData.visibility}Km <FontAwesomeIcon className="eyeIcon" icon={faEye} /></p>
      <p>WIND-SPEED : {weatherData.windSpeed}Kph <FontAwesomeIcon className="wind-icon" icon={faWind} /></p>
      
      
      </div>
      ):null}
    </nav>
  <footer>
        <div className="footer-text">© 2025 Polling Website . All rights reserved
         <a href="mailto:rudrabehera2006@gmail.com" className="footer-text">CONTACT:rudrabehera2006@gmail.com</a>
        </div>
       
      </footer>
    </>
    )
}
export default Weather
