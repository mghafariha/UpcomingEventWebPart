import * as React from 'react';
import {Web} from '@pnp/sp/webs';
import { sp } from "@pnp/sp";
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import styles from './Upcomingevents.module.scss';
import { IUpcomingeventsProps } from './IUpcomingeventsProps';
import { IEvent } from './IEvent';
import { escape } from '@microsoft/sp-lodash-subset';
const sampleItems = [
  { text: 'Dynamic Item 1', key: '0' },
  { text: 'Dynamic Item 2', key: '1' },
  { text: 'Dynamic Item 3', key: '2' },
  { text: 'Dynamic Item 4', key: '3' }
];
export default class Upcomingevents extends React.Component<IUpcomingeventsProps, {}> {
  constructor(props:IUpcomingeventsProps){
    super(props);
        this.state={
        newsList:[] as IEvent[],
        filters :[{name:'All',active:true}],
        fieldDisplayName:''
        
        }
  
    }
  // public async componentDidMount(){
  //   let selectedFields=`Id,Title,EventTime,Location,EventType`;
  //   selectedFields=this.props.filterField?selectedFields + `, ${this.props.filterField}`:selectedFields;
   
  //   let newsItems = await web.lists.getByTitle('Site Pages').items.filter(filterStr).select(selectedFields).expand(`Author`).orderBy("Id", false).top(this.props.numberOfDisplayNews).get();
     
  //   newsItems = newsItems.sort((a, b) => (a.IssueDate > b.IssueDate ? -1 : 1));
  //     const news = newsItems.map((a) => ({ title: a.Title,issueDate:a.IssueDate, bannerImageUrl:a.BannerImageUrl.Url.indexOf('/thumbnails/')==-1? `${a.BannerImageUrl.Url}&resolution=6`:`${a['BannerImageUrl']['Url'].split("file=")[0].substring(0,a['BannerImageUrl']['Url'].split("file=")[0].indexOf('/thumbnails/'))+ "/" +a['BannerImageUrl']['Url'].split("file=")[1]}`, authorTitle: a.Author.Title, created: a.FirstPublishedDate, sliderDisplayOrder: a.SliderDisplayOrder, topicHeader: a.OData__TopicHeader, url: `${this.props.newsSiteUrl}/SitePages/${a.FileLeafRef}` })) as INews[];
  //    console.log('news',news);
  //     this.setState({...this.state,newsList:news});
  // if(this.props.showTabs)
  // {
   
  //   let filterStr='';
  //   const showtabsArr=this.props.showTabs &&this.props.showTabs.split(',') ||[];
   
  //   if(showtabsArr && showtabsArr.length>0 && showtabsArr.filter(a=>a!='All'))
  //   {
  //    filterStr=filterValuesArr.reduce((rdc,item,i)=>( rdc+ (i==0?`${this.props.filterField} eq '${item}' `: ` or ${this.props.filterField} eq '${item}' `)),'') ;
  //   }
  //   else if (this.props.filterField)
  //   {
  //     filterStr= `${this.props.filterField} ne null and ${this.props.filterField} ne 'n/a'`
  //   }
  //   else {
  //     filterStr=``
  //   }
    
  
    
  // }
  // changedFilterNews=async(it)=>{
  //     console.log('click',it);
  //     console.log('filtersss',this.state.filters);
  //      this.setState({...this.state,filters:this.state.filters.map((a,ind)=>({...a,active:a.name===it.name?true:false}))});
  // //
  //   let filterStr= `${this.props.filterField} ne null and ${this.props.filterField} ne 'n/a' `;
  // if(it.name!="All")
  // {
  //   filterStr=filterStr+ ` and ${this.props.filterField} eq '${it.name}'`;
  // }
  // else {
  //   if(this.state.filters.length>0)
  //   {
  //    filterStr=this.state.filters.filter(a=>a.name!='All').reduce((rdc,item,i)=>( rdc+ (i==0?`${this.props.filterField} eq '${item.name}' `: ` or ${this.props.filterField} eq '${item.name}' `)),'') ;
  //   }
  // }
  
  //   let selectedFields=`Id,AuthorId,Author/Title,BannerImageUrl,IssueDate,Created,Title,FirstPublishedDate,OData__TopicHeader,FileLeafRef`;
  //   selectedFields=this.props.filterField?selectedFields + `, ${this.props.filterField}`:selectedFields;
  //   const web=Web(`${this.props.newsSiteUrl}`);
  //   const r= await web();
  //   let newsItems = await web.lists.getByTitle('Site Pages').items.filter(filterStr).select(selectedFields).expand(`Author`).orderBy("Id", false).top(this.props.numberOfDisplayNews).get();
     
  //     newsItems = newsItems.sort((a, b) => (a.IssueDate > b.IssueDate ? -1 : 1));
  //     const news = newsItems.map((a) => ({ title: a.Title,issueDate:a.IssueDate, bannerImageUrl:a.BannerImageUrl.Url.indexOf('/thumbnails/')==-1? `${a.BannerImageUrl.Url}&resolution=6`:`${a['BannerImageUrl']['Url'].split("file=")[0].substring(0,a['BannerImageUrl']['Url'].split("file=")[0].indexOf('/thumbnails/'))+ "/" +a['BannerImageUrl']['Url'].split("file=")[1]}`, authorTitle: a.Author.Title, created: a.FirstPublishedDate, sliderDisplayOrder: a.SliderDisplayOrder, topicHeader: a.OData__TopicHeader, url: `${this.props.newsSiteUrl}/SitePages/${a.FileLeafRef}` })) as INews[];
  //    console.log('news',news);
  //     this.setState({...this.state,newsList:news});
    
  
  
  //   } 
  public render(): React.ReactElement<IUpcomingeventsProps> {
    return (
      <div className={ styles.upcomingevents }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
             <div>
               upcomping Events
             </div>
             <Pivot>
             {sampleItems.map((item) => {
                    return (
                        <PivotItem headerText={item.text} itemKey={item.key}>
                            <div className={styles.pivotContent}>{`This is the ${item.text} with key: ${item.key}`}</div>
                        </PivotItem>
                    );
                })}
            </Pivot>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
