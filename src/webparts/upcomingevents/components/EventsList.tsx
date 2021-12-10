import * as React from 'react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/profiles";


import styles from './Upcomingevents.module.scss';
import { IUpcomingeventsProps } from './IUpcomingeventsProps';
import { IEvent } from './IEvent';
import { escape } from '@microsoft/sp-lodash-subset';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const EventsList=(props)=>{
    const formattedDate = (date) => (date.getUTCDate() + " " + monthNames[date.getMonth()] + ', ' + date.getUTCFullYear());
    const formattedTime=(date)=>( date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
   
return(<div className={styles.eventList} >
      { 
        props.items.map(a=> {
        return (<div className={styles.event}>
            <div className={styles.dateTile}>
               <div className={styles.dayTile}> {('0'+new Date(a.eventTime).getUTCDate().toString()).slice(-2) }</div>
               <div className={styles.monthTile}> {monthNames[new Date(a.eventTime).getMonth()]}</div>
            </div>
            <div className={styles.detailTile}>
                <div className={styles.detailHeader}>
                <div className={styles.detailHeaderItem}> {weekday[new Date(a.eventTime).getDay()]}</div>
                  <div className={styles.detailHeaderItem}>{formattedTime(new Date(a.eventTime))}</div>
                  <div className={styles.detailHeaderItem}>{a.location}</div>
                </div>
                <div className={styles.titleEvent} ><a href={a.url} target='_blank'>{a.title.toUpperCase()}</a></div>
            </div>
        </div>)
        })
        }
</div>)
}
export default EventsList