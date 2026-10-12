import type { Metadata } from 'next';
import Subpage from '@/components/rascal/subpage';
import Enquiry from '@/components/rascal/enquiry';
export const metadata:Metadata={title:'Bookings · Ramblin’ Rascal',description:'Plan a private event, group visit or live gig at Ramblin’ Rascal Tavern, Sydney.'};
export default function Bookings(){return <Subpage><p className="sub-kicker">BOOKINGS & ENQUIRIES</p><h1 className="sub-title">MAKE A<br/>NIGHT OF IT.</h1><Enquiry/></Subpage>}
