import * as qs from 'qs'
import {Buffer} from 'buffer'
import axios from 'axios'

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

export const getToken = async () => {
    const auth_token = Buffer.from(`${clientId}:${clientSecret}`, 'utf-8').toString('base64');
    const token_url = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify({'grant_type':'client_credentials'});
    
    try {
        const response = await axios.post(token_url, data, {
            headers: { 
                'Authorization': `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded' 
            }
        })
        //return access token
        return response.data.access_token
        //console.log(response.data.access_token);   
    } catch(error) {
        //on fail, log the error in console
        console.log(error);
    }
};