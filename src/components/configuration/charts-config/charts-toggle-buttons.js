import React, { Component } from "react";
import { chartSearch } from "./charts-search";

export class ChartsToggleButtons extends React.Component {
   constructor(props) {
      super(props);
      this.state = { visibility: true };
      this.toggleVisibility = this.toggleVisibility.bind(this);
   }

   toggleVisibility() {
      this.setState(state => {
         return { visibility: !state.visibility };
      });
   }

   render() {
      return (
         <>
            <button
               id="toggleCharts"
               className={`toggleButton ${this.state.visibility ? "shown" : "notShown"
                  }`}
               title="Toggle All Charts"
               onClick={() => {
                  this.toggleVisibility();
                  if (this.state.visibility) {
                     chartSearch.hideAllItems(this.props.setChartsDisplay);
                  } else {
                     chartSearch.showAllItems(this.props.setChartsDisplay);
                  }
               }}
            ></button>
            <button
               id="deleteCharts"
               className="deleteButton"
               title="Delete All Charts"
               onClick={() =>
                  chartSearch.deleteAllItems(this.props.setChartsDisplay)
               }
            ></button>
         </>
      );
   }
}
