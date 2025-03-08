const clientId = "041ce51115434d4582f2bb8911878be0";
const redirectUri = "http://localhost:3000/";
let accessToken;


const Spotify = {

    getAccessToken:  function () {
        if (accessToken) {
            return accessToken;
        }
        const urlParams =  new URLSearchParams(window.location.hash.substring(1));
        const accessTokenUrl =  urlParams.get("access_token");
        const expiresIn = urlParams.get("expires_in");


        if (accessTokenUrl && expiresIn) {
            accessToken = accessTokenUrl;
            setTimeout(() => {
                accessToken = ""
            }, Number(expiresIn) * 1000);
            window.history.pushState({}, document.title, "/")
            return accessToken;
        }
        else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${encodeURIComponent(redirectUri)}`;


        }



    },
    search: async function (term) {
        const token = this.getAccessToken();
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;
        try {
           const response = await fetch(endpoint, {
               headers: {Authorization: `Bearer ${token}`}
           }) ;

           const data = await response.json();
           if(!data.tracks || !data.tracks.items) {
               return [];
           }

           return data.tracks.items.map(track =>({
               id: track.id,
               name: track.name,
               artist: track.artists[0].name,
               album: track.album.name,
               uri: track.uri
           }));
        }
        catch(err) {
            console.error("Error fetching tracks:", err);
            return [];
        }

    },

    async savePlaylist(name, trackUris) {
        if(!name || !trackUris.length) {
            return;
        }

        const token = this.getAccessToken();
        const headers = {Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"};
        try {
            const userResponse = await fetch("https://api.spotify.com/v1/me", {headers:headers});
            const userData = await userResponse.json();
            const userId = userData.id;
            const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
                {headers:headers,
                    method:"POST",
                    body: JSON.stringify({name:name})});
            const playlistData = await playlistResponse.json();
            const playlistId = playlistData.id;

            console.log(trackUris);
            await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                {
                    headers: headers,
                    method:"POST",
                    body: JSON.stringify({uris: trackUris}),
                });
            console.log(`Playlist "${name} created successfully!`);
        }
        catch(err) {
            console.error("Error saving playlist:", err);
        }

    }



}
export default Spotify;