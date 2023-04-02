import {useState, useEffect} from "react";
import React from 'react';
const CLIENT_ID = "8867e131fdf643bfa07f286afcf8146d"; // insert your client id here from spotify
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/Main";
const CLIENT_SECRET  = "34b5e386704749b5a31fddf1f6c50afb";
const SPACE_DELIMITER = "%20";
const SCOPES = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-modify-private"
  ];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
  
    return paramsSplitUp;
};


const Login = () => {
    useEffect(() => {
      if (window.location.hash) {
        const { access_token, expires_in, token_type } =
          getReturnedParamsFromSpotifyAuth(window.location.hash);
        
            global.localStorage.clear();
            global.localStorage.setItem("accessToken", access_token);
            global.localStorage.setItem("tokenType", token_type);
            global.localStorage.setItem("expiresIn", expires_in);

    
        
      }
    });
  
    const handleLogin = () => {
        const win: Window = window;
        win.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    };
  
    return (
      <div className="container">
        <h1 className="logo">moodify</h1>
        <button className="button-17" role="button" onClick={handleLogin}>login to spotify</button>
      </div>
    );
  };

export default Login