import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Ramblin’ Rascal · Shit Tinnie, Good Times',description:'Cold tins. Loud nights. Good company. Ramblin’ Rascal Tavern in Sydney. Enter via 199 Elizabeth Street, basement of 60 Park Street.',icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
