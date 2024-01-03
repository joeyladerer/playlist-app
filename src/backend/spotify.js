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
            image: song.album.images[1].url,
            uri: song.uri
        },
        numUpvotes: 0,
        numDownvotes: 0,
        netVoteCount: 0
    }
}

export const exportPlaylist = async (playlist, token, userID, playlistName, playlistDescription) => {
    // create the playlist
    const body = qs.stringify({
        name: playlistName,
        public: true,
        collaborative: false,
        description: playlistDescription
    })
    const spotifyPlaylist = await axios.post('', body, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    // now add all the tracks
    const newPlaylistId = spotifyPlaylist.id
    var tracks = ''
    var first = true
    for (const song in playlist) {
        if (first) {
            tracks += song.song.uri
            first = false
        } else {
            tracks += ',' + song.song.uri
        }
    }
    console.log(tracks)
    const requestURL = `https://api.spotify.com/playlists/${newPlaylistId}/tracks?uris=${tracks}`

    await axios.post(requestURL, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return
}