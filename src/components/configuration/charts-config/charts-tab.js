import React, { Component } from "react";
import configuration from "../index";
import { ChartsFormComponent } from "./charts-form-component";
import { ChartsListComponent } from "./charts-list-component";
import { ChartsToggleButtons } from "./charts-toggle-buttons";

export const ChartsTab = props => (
   <div>
      <button
         id="RTM-ChartsTitle"
         className="RTM-Tab RTM-TabNotSelected"
         onClick={() => configuration.selectTab("RTM-ChartsTitle")}
      >
         Charts
      </button>
      <div id="charts-tab" className="RTM-config-info">
         <ChartsFormComponent
            charts={props.charts}
            setChartsDisplay={props.onClick}
         />
         <div className="config-Header">
            <p>Selected Charts:</p>
            <div className="toggleButtonDiv" id="ToggleChartsButtons">
               <ChartsToggleButtons setChartsDisplay={props.onClick} />
            </div>
         </div>

         <div id="RTM-charts-view">
            <div className="config-list">
               <div>
                  <ul className="mdc-list" id="ChartsList">
                     <ChartsListComponent
                        chartsDisplayList={props.chartsDisplayList}
                        setChartsDisplay={props.onClick}
                     />
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </div>
);
