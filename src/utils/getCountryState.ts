import axios from "axios"

export const getCountryStates = async(country:string)=>{
    if(!country || country === null || country === '') return
    console.log('country --->', country)
    const states = await axios(`https://restcountries.com/v3.1/alpha/${country}`)
    return states
}

export const getStates = async (country:string) => {
    try {
      const response = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/states',
        { country },
        { headers: { 'Content-Type': 'application/json' } }
      );
    //   console.log(response.data.data.states);
      return response.data.data.states
    } catch (error) {
      console.error(error);
    }
  };