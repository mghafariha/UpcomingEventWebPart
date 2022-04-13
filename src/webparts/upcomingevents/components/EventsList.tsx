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
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const EventsList = (props) => {
  const formattedDate = (date) => (date.getUTCDate() + " " + monthNames[date.getMonth()] + ', ' + date.getUTCFullYear());

  const returnDate = (date) => {
    if (new Date(date).toString() == 'Invalid Date') {
      let splited = date.split('/');
      let day = splited[0];
      let month = splited[1];
      let year = splited[2].split(' ')[0];
      let time = splited[2].split(' ')[1];
      return new Date(year + "-" + month + "-" + day + " " + time)
    }
    else
      return new Date(date);

  }

  console.log('formattedDate', formattedDate);
  const formattedTime = (date) => (date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  console.log(formatAMPM(new Date));
  return (<div className={styles.eventList} >
    {
      props.items.map(a => {
        return (<div className={styles.event}>
          <div className={styles.dateTile}>
            <div className={styles.dayTile}> {('0' + returnDate(a.eventTime).getUTCDate().toString()).slice(-2)}</div>
            <div className={styles.monthTile}> {monthNames[returnDate(a.eventTime).getMonth()]}</div>
          </div>
          <div className={styles.detailTile}>
            <div className={styles.detailHeader}>
              <div className={styles.detailHeaderItem}> {weekday[returnDate(a.eventTime).getDay()]}</div>
              <div className={styles.detailHeaderItem}>{formatAMPM(returnDate(a.eventTime))}</div>
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