
import Jsonp from 'jsonp'

let getWeather = (cb)=>{

    Jsonp('https://api.asilu.com/weather_v2/',{},(err,results)=>{
        cb(results)
    })

}

export default getWeather