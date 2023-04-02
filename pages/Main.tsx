import React, { useEffect, useState} from "react";
import axios from "axios";
import Sentiment from 'sentiment';
import Spotify from "./Spotify";

function Main() {
    const prompts = [];
    const [link, setlink] = useState("https://open.spotify.com/playlist/5TbwKB8F4cJqfz3wmNuTMA?si=1919ec12471e427e");
    const [hasLoad, sethasLoad] = useState(false);
    prompts.push("how was your day?");
    prompts.push("highlight of the week?");
    prompts.push("summarize your day in one word");
    prompts.push("anything you're looking forward to");
    const [token, settoken] = useState("");
    const [message, setMessage] = useState("");
    const [prom, setprom] = useState(prompts[2]);
    const [rec, setrec] = useState("");
    
    async function createPlaylist(){
        const energy = getSentiment();
        let playlist = "";
        let playlisturl = "";
        let trackuri1 = [];
        const params = {
            market: "ES",
            limit: 20,
            seed_genres: "pop,country",
            energy: energy
          };
        console.log(token);
        axios.defaults.headers.common['Authorization'] = "Bearer "+token;

        try{
            const res = await axios.get("https://api.spotify.com/v1/recommendations", {params});
            let trackuri = [];
            res.data.tracks.forEach((track)=>{
                trackuri.push(track.uri);
            })
            trackuri1 = trackuri;
        } catch(err){
            console.log(err);
        }
        
        try{
            const playlist_id = await axios.post("https://api.spotify.com/v1/users/11100823629/playlists", {
                name: "your moodified playlist",
                description: "new moodified playlist",
                public: false,
            })
            playlist = playlist_id.data.id;
            playlisturl = playlist_id.data.external_urls.spotify;
            console.log(playlisturl);

        } catch(err){
            console.log(err);
        }

        try{
            let url = "https://api.spotify.com/v1/playlists/" + playlist + "/tracks";
            let params = {
                uris: trackuri1,
            }

            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Authorization': 'Bearer '+token,
                }
            })

            const data = await response.json();
            console.log(data);   
        } catch (err){
            console.log(err);
        }

        setlink(playlisturl);
        sethasLoad(true);
    }

    function getSentiment(){
        const sentiment = new Sentiment();
        const score = sentiment.analyze(message);
        let energy = 0;
        if(score >= 2.5){
            energy = 1;
        } else if(score > 0){
            energy = 0.8;
        } else if (score >= -2.5){
            energy = 0.6
        } else {
            energy = 0.4
        }
        return energy;
    }
    
    const handleChange = (event) =>{
        setMessage(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
           console.log(message)
           console.log(token);
           createPlaylist();
           setMessage("");
        }
     }

    useEffect(()=>{
        // console.log(global.localStorage.getItem('accessToken'));
        console.log(window.location.hash);
        const t = window.location.hash.substring(14,264);
        settoken(t);

        console.log(token);
    }, [createPlaylist, hasLoad, link])

    return (
        (hasLoad) ?
        <>
            <div className="container">
            <h1 className="logo2">moodify</h1>
            <Spotify className="spotify" link={link} />
            <h1 className="prompt2">here, check this out </h1>
                {/* <form>
                    <div id="namer">
                    <input onKeyDown={handleKeyDown} placeholder="enter your thoughts" value={message} onChange={handleChange}
                    className="input" id="hiddenInput"></input>
                    </div>
                </form> */}
             <button className="button-18" role="button" onClick={()=>window.location.reload()}>restart</button>
            </div>
        </>:
        <>
            <div className="container">
            <h1 className="logo2">moodify</h1>
            {/* <Spotify className="spotify" link={link} /> */}
            <h1 className="prompt">{prom}</h1>
            {/* <h1 className="prompt2">here, check this out </h1> */}
                <form>
                    <div id="namer">
                    <input onKeyDown={handleKeyDown} placeholder="enter your thoughts :)" value={message} onChange={handleChange}
                    className="input" id="hiddenInput"></input>
                    </div>
                </form>
            </div>
        </>    
    )
}

export default Main;
