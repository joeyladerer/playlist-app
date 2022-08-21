import * as qs from 'qs'
import {Buffer} from 'buffer'
import axios from 'axios'

// leave variabes hidden online
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

// retrieve the access token, Client Credentials Flow
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
    } catch(error) {
        console.log(error);
    }
};

export const search = async (input, token) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/search?q=${input.split(' ').join('%20')}&type=track,artist`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
        return response.data.tracks.items
    } catch(error) {
        console.log(error)
    }
}

// properly format songs for event playlist
export const spotifySongToPlaylistObject = (song) => {
    return {
        song: {
            id: song.id,
            name: song.name,
            artists: song.artists,
            image: song.album.images[1].url
        },
        numUpvotes: 0,
        numDownvotes: 0,
        netVoteCount: 0
    }
}