'use client';
import { useState } from 'react';
import { instagram, bookingEmail } from '@/lib/rascal-data';

export default function Enquiry(){
  const [draft,setDraft]=useState(''),[status,setStatus]=useState('');
  function prepare(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault(); const values=new FormData(event.currentTarget);
    setDraft(`Ramblin’ Rascal enquiry — ${values.get('kind')}\n\nName: ${values.get('name')}\nEmail: ${values.get('email')}\nPreferred date: ${values.get('date') || 'Flexible'}\nGuests: ${values.get('guests') || 'To be confirmed'}\n\n${values.get('message')}`);setStatus('');
  }
  async function copy(){try{await navigator.clipboard.writeText(draft);setStatus('Copied. Paste your enquiry into an Instagram message to the bar.')}catch{setStatus('Select the message above and copy it, then send it to the bar on Instagram.')}}
  return <div className="enquiry-layout"><form onSubmit={prepare} className="enquiry-form">
    <label>WHAT’S THE OCCASION?<select name="kind" defaultValue="Private event"><option>Private event</option><option>Play a gig</option><option>Group visit</option><option>General enquiry</option></select></label>
    <div className="field-pair"><label>YOUR NAME<input name="name" autoComplete="name" required maxLength={120}/></label><label>EMAIL<input name="email" type="email" autoComplete="email" required maxLength={254}/></label></div>
    <div className="field-pair"><label>PREFERRED DATE<input name="date" type="date"/></label><label>GUESTS<input name="guests" type="number" min="1" max="1000"/></label></div>
    <label>THE DETAILS<textarea name="message" required maxLength={3000} rows={5} placeholder="Tell us what you have in mind."/></label>
    <button type="submit" className="sub-button">PREPARE ENQUIRY</button>
    <p className="form-note">This prepares a message. Nothing is sent or booked until you send it to the bar and hear back.</p>
  </form><aside className="enquiry-aside"><img src="/images/room.jpg" width="1200" height="800" alt="Inside Ramblin’ Rascal Tavern"/><h2>YOUR NIGHT.<br/>OUR BASEMENT.</h2><p>Private events, live acts, or a few mates. Tell the crew what you’re planning.</p><a href={instagram} target="_blank" rel="noopener noreferrer" className="text-link">MESSAGE THE RASCALS</a>{bookingEmail ? <a className="enquiry-email" href={`mailto:${bookingEmail}`}>{bookingEmail}</a> : null}</aside>
    {draft ? <section className="enquiry-draft" aria-label="Prepared enquiry"><h2>READY TO RAMBLE.</h2><label htmlFor="enquiry-message">YOUR MESSAGE</label><textarea id="enquiry-message" value={draft} onChange={event=>setDraft(event.target.value)} rows={10}/><div className="draft-actions">{bookingEmail ? <a className="sub-button" href={`mailto:${bookingEmail}?subject=${encodeURIComponent('Ramblin’ Rascal booking enquiry')}&body=${encodeURIComponent(draft)}`}>OPEN EMAIL DRAFT</a> : null}<button className="sub-button outline" onClick={copy}>COPY MESSAGE</button><a className="sub-button outline" href={instagram} target="_blank" rel="noopener noreferrer">OPEN INSTAGRAM</a></div><p role="status">{status}</p></section> : null}
  </div>;
}
