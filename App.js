import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import fetchWeather from "./api/api"
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome'
let weather 
let cow = false
export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        weather: ''
    };
}
componentDidMount() {
  fetchWeather().then(response => {
    let weatherObj = response.list[0]
    // console.log(weatherObj)
        weather = {
          description: weatherObj.weather[0].description,
          //City geo location, latitude
          latitude: weatherObj.coord.lat,
          //City geo location, longitude
          longitude: weatherObj.coord.lon,
          temperature: weatherObj.main.temp - 273.15,
          humidity: weatherObj.main.humidity,
          //Minimum temperature at the moment. This is deviation from current temp that 
          //is possible for large cities and megalopolises geographically expanded
          temp_min: weatherObj.main.temp_min - 273.15,
          temp_max: weatherObj.main.temp_max - 273.15,
          windSpeed: weatherObj.wind.speed,
          //in degrees
          windDirection: weatherObj.wind.deg,
          //percentage of clouds
          clouds: weatherObj.clouds.all
        }
          
    
      this.setState({weather: weather});
  });
}
// componentDidMount() {
//     var self = this;
//       // fetchWeather(this.state.searchedCity).then((response) => {
//   fetchWeather().then((response) => {
//     let weatherObj = response.list[0]
//     weather = {
//       description: weatherObj.weather[0].description,
//       //City geo location, latitude
//       latitude: weatherObj.coord.lat,
//       //City geo location, longitude
//       longitude: weatherObj.coord.lon,
//       temperature: weatherObj.main.temp,
//       humidity: weatherObj.main.humidity,
//       //Minimum temperature at the moment. This is deviation from current temp that 
//       //is possible for large cities and megalopolises geographically expanded
//       temp_min: weatherObj.main.temp_min,
//       temp_max: weatherObj.main.temp_max,
//       windSpeed: weatherObj.wind.speed,
//       //in degrees
//       windDirection: weatherObj.wind.deg,
//       //percentage of clouds
//       clouds: weatherObj.clouds.all
      
//     }
//     self.setState({
//       imageUrls: newUrls
//   });
//     // cow = true
//   })
    
// }
render() {
  const then = this.props.then || (weather => 
    <View style={styles.container}>
    
      <Text style={styles.title}>WeatherX</Text>
      <Text style={styles.info}>Weather condidtions <Icon name='map-signs'/></Text>
      <Text style={styles.value}>{weather.description}</Text>
      <Text style={styles.info}>City geo location <Icon name='map-marker'/></Text>
      <Text style={styles.value}>Lat:{weather.latitude} Lon:{weather.longitude}</Text>
      <Text style={styles.info}>Temperature <Icon name='thermometer'/></Text>
      <Text style={styles.value}>{weather.temperature}°C</Text>
      <Text style={styles.info}>Humidity <Icon name='tint'/></Text>
      <Text style={styles.value}>{weather.humidity}%</Text>
      <Text style={styles.info}>Minimum and maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded</Text>
      <Text style={styles.value}>Min:{weather.temp_min} Max:{weather.temp_max}</Text>
      <Text style={styles.info}>Wind speed <Icon name='tachometer'/></Text>
      <Text style={styles.value}>{weather.windSpeed}m/s | {weather.windSpeed*3.6}km/h</Text>
      <Text style={styles.info}>wind direction <Icon name='compass'/></Text>
      <Text style={styles.value}>{weather.windDirection}°</Text>
      <Text style={styles.info}>Clouds <Icon name='cloud'/></Text>
      <Text style={styles.value}>{weather.clouds}%</Text>
      <Image source={{uri: 'http://i0.kym-cdn.com/photos/images/original/000/102/404/my-god-2001-space-odyssey-kubrick-demotivational-poster-1277301590.jpg'}}
       style={{width: 200, height: 160}} />
     </View>)

  return then(this.state.weather);
}
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.hello}>Hello world!</Text>
//           <Text >{weather ? 'true' : 'false'}</Text>
//           { cow ?
//               <Text> Welcome Back Chris</Text>
//             :
//             <Text>Hey man! Log in to see this section</Text>
//         }
//       </View>
//     );
//   }
}
 const styles = StyleSheet.create({
   title:{
    fontSize: 27,
    alignItems: 'center',
    paddingBottom: 70,
    justifyContent: 'space-between',
   },
  container: {
    // flex: 1,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    paddingTop: '10%',
    // borderStyle: 'dotted',
    // margin: 20,
    borderTopColor: 'red'
  },
  info: {
      color: 'black',
  },
  value: {
    color: 'green'
  }
});

