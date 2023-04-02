import React from "react";
import Header from "../components/Header";
import { useRouter } from 'next/router'


function Home(){
    const router = useRouter();

    return(
        <div>
            <Header/>
            <button type="button" onClick={() => router.push('/login')}>
            </button>
        </div>
    )
}
export default Home;