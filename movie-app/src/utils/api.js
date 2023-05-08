import axios from "axios";


const BASE_URL="https://api.themoviedb.org/3";

const TMDB_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjJkMmQ4ZTYwMTAwNGQxNTJhNmFkZDhmZjZhYzRjYyIsInN1YiI6IjY0NTg4YjViNmM4NDkyMDEyNGM1YmRlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1PpURYQSxcoqdd4WDKHzRxD5Fi2308f8Yv4XovHF6C8"

const headers={
    Authorization:"bearer " +
    TMDB_TOKEN,
};

export const fetchDataFromApi=async(url,params)=>{
    try{
         const {data}=await axios.get(BASE_URL + url,{
            headers,
            params
         })
         return data;
    }
    catch(err)
    {
      console.log(err);
      return err
    }
}