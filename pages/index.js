import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Home from "./Home.tsx";
import Login from "./login";
import { useRouter } from 'next/router';

function index() {
  return (
    <Login/>
  )
}
export default index;
