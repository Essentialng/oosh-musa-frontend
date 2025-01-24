import axios from "axios"

export const getUserLocation = async()=>{
    try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const data = await response.json();
        return data
      } catch (error) {
        console.error('Error fetching location:', error);
      }
}