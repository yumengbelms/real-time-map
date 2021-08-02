import React, { Component } from "react";
import { chartSearch } from "./charts-search";

export const ChartsListComponent = props => {
   const mapPropsToComponent = props.setChartsDisplay;
   const chartsList =
      props.chartsDisplayList.length > 0
         ? props.chartsDisplayList.map(prop => (
            <li key={prop.id} className="mdc-list-item">
               <span
                  className={`RTM-iconSquare mdc-list-item__graphic material-icons filterIcon ${prop.visible ? "showConfig" : "hideConfig"
                     }`}
                  title="Hide/Show"
                  onClick={() =>
                     chartSearch.toggleChartsVisibility(
                        prop.id,
                        mapPropsToComponent
                     )
                  }
               ></span>
               <span className="mdc-list-item__graphic material-icons charts"></span>
               <span
                  id={"RTMnode-" + prop.id}
                  className="RTM-ConfigListItem mdc-list-item__text"
               >
                  {prop.name}
               </span>
               <span
                  className="mdc-list-item__meta material-icons"
                  onClick={() =>
                     chartSearch.deleteItemFromChartsList(
                        prop.id,
                        mapPropsToComponent
                     )
                  }
               ></span>
            </li>
         ))
         : [];
   return chartsList;
};
