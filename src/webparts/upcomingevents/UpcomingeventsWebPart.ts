import * as React from 'react';
import * as ReactDom from 'react-dom';
import { sp } from "@pnp/sp";
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'UpcomingeventsWebPartStrings';
import Upcomingevents from './components/Upcomingevents';
import { IUpcomingeventsProps } from './components/IUpcomingeventsProps';

export interface IUpcomingeventsWebPartProps {
  description: string;
  tabsField:string;
  tabsValue:string;
  linkLabel:string;
  linkUrl:string;
  displayNumber:number;

}

export default class UpcomingeventsWebPart extends BaseClientSideWebPart<IUpcomingeventsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IUpcomingeventsProps> = React.createElement(
      Upcomingevents,
      {
        description: this.properties.description,
        tabsField:this.properties.tabsField,
        tabsValue:this.properties.tabsValue,
        linkLabel:this.properties.linkLabel,
        linkUrl:this.properties.linkUrl,
        displayNumber:this.properties.displayNumber
      }
    );

    ReactDom.render(element, this.domElement);
  }
  protected async onInit(): Promise<void>{
   
     return super.onInit().then(_ => {
       sp.setup({
         spfxContext: this.context
       });
     });
   }
 
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }), 
                PropertyPaneTextField('tabsField', {
                  label: 'Field to create tabs'
                }), 
                PropertyPaneTextField('tabsValue', {
                  label: 'What tabs to show'
                }),
                PropertyPaneTextField('linkLabel', {
                  label: 'The lable of the link'
                }),
                PropertyPaneTextField('linkUrl', {
                  label: 'The url of the link'
                }),
                ,
                PropertyPaneTextField('displayNumber', {
                  label: 'The number of events shown on each tab'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
