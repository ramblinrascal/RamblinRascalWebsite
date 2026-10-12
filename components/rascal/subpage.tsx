import { instagram } from '@/lib/rascal-data';

export default function Subpage({children}:{children:React.ReactNode}) {
  return <div className="rascal-subpage">
    <header className="sub-header"><a href="/" aria-label="Ramblin’ Rascal home"><img src="/brand/skulls-patch.png" alt="Ramblin’ Rascal Tavern" width="1080" height="1080"/></a><nav aria-label="Page navigation"><a href="/about/">ABOUT</a><a href="/#drinks">DRINKS</a><a href="/bookings/">BOOKINGS</a><a href="/shop/">MERCH</a></nav></header>
    <main className="sub-main">{children}</main>
    <footer className="sub-footer"><a href="/">BACK TO THE TIN</a><a href={instagram} target="_blank" rel="noopener noreferrer">INSTAGRAM</a><span>5 STAR DIVE BAR · SYDNEY</span></footer>
  </div>;
}
