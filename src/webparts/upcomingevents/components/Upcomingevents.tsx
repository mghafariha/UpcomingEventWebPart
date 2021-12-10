import * as React from 'react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/profiles";
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';

import styles from './Upcomingevents.module.scss';
import { IUpcomingeventsProps } from './IUpcomingeventsProps';
import { IEvent } from './IEvent';
import { escape } from '@microsoft/sp-lodash-subset';
import EventsList from './EventsList';

interface IUpcomingEventsState{
  eventsList: IEvent[];
  tabNames:any[];
}
export default class Upcomingevents extends React.Component<IUpcomingeventsProps,IUpcomingEventsState> {
  constructor(props:IUpcomingeventsProps){
    super(props);
        this.state={
        eventsList:[] as IEvent[],
        tabNames :[]
        } 
    }
  public async componentDidMount(){

    let today = new Date();
    let todayISoStr=today.toISOString();
    console.log('linkUl',this.props.linkUrl);
    let selectedFields=`Id,Title,EventTime,Location,Url`;
   let filterStr=`(EventTime ge  datetime'${todayISoStr}') `;
   let tabs=[];
   if(this.props.tabsField && this.props.tabsValue )
   {
    selectedFields=this.props.tabsField?selectedFields + `, ${this.props.tabsField}`:selectedFields;
    console.log('selectedFields',selectedFields);
    console.log('tabsName',this.state.tabNames);
    let filteredArr=this.props.tabsValue.split(',').filter(a=>a!="All");
     filterStr=filterStr +this.props.tabsValue.split(',').filter(a=>a!="All").reduce((filterQr,value,i)=>(filterQr+ (i==0? `and (${this.props.tabsField} eq '${value}'` :(i==filteredArr.length-1)?`or ${this.props.tabsField} eq '${value}' ) ` :`or ${this.props.tabsField} eq '${value}' `)),'');
     tabs =this.props.tabsValue.split(',').filter(a=>a!="All");
    }
    else if (this.props.tabsField)
    {
      filterStr=filterStr + `${this.props.tabsField} ne null and ${this.props.tabsField} ne 'n/a'`
    }
   
    let eventsItems = await sp.web.lists.getByTitle('UpcomingEvents').items.filter(filterStr).select(selectedFields).orderBy("EventTime", true).get();
   let testEvents=await sp.web.lists.getByTitle('UpcomingEvents').items.filter(`(EventTime ge  datetime'2021-12-09T06:22:13.533Z') and (EventType eq 'Industry'or EventType eq 'Internal' )`).get();
    console.log('testEvents',testEvents);
    eventsItems = eventsItems.sort((a, b) => (a.EventTime > b.EventTime ? 1 : -1));

      const events = eventsItems.map((a) => ({ title: a.Title,eventTime:a.EventTime, location: a.Location,url:a.Url,eventType:a.EventType })) as IEvent[];
      
      let tabsItems=[{name:'All',active:true,events:events}];
      let tabsss=[...tabsItems,...tabs.map(a=>({name:a,active:false,events:events.filter(b=>b.eventType==a)}))]
      console.log('tabsss',tabsss);
      this.setState({...this.state,tabNames:tabsss});
      console.log('events',events);
      this.setState({...this.state,eventsList:events});

  }
 
  public render(): React.ReactElement<IUpcomingeventsProps> {
    return (
      <div className={ styles.upcomingevents }>
        <div className={ styles.container }>
          <div className={ styles.row }>
           
             <div className={styles.title}>
              <div style={{flex:'8',fontSize:'12px',fontWeight:'bold'}}>
                  Upcoming Events
              </div>
            <div style={{flex:'1',fontSize:'10px' ,'minWidth': 'fit-content',color:'white', cursor:'pointer','textDecoration': 'none'}}>
                <a href={this.props.linkUrl} target='_blank'>{this.props.linkLabel}</a>
              </div>
              
             </div>
             <Pivot className={styles.pivotControl}>
             {this.state.tabNames.length>0 &&this.state.tabNames.map((item) => {
                    return (
                        <PivotItem headerText={item.name} itemKey={item.name}>
                          <EventsList items={item.events} />
                            {/* <div className={styles.pivotContent}>{`This is the ${item.name} with key: ${item.name}`}</div> */}
                        </PivotItem>
                    );
                })}
            </Pivot>
           
          </div>
        </div>
      </div>
    );
  }
}
