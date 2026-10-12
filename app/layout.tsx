import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Ramblin’ Rascal · 5 Star Dive Bar',description:'Cold tins. Loud nights. Good company. Ramblin’ Rascal Tavern in Sydney. Enter via 199 Elizabeth Street, basement of 60 Park Street.',icons:{icon:'/favicon.png',shortcut:'/favicon.png',apple:'/favicon.png'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
