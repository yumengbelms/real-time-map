import React, { Component } from "react";
import { chartSearch } from "./charts-search";

export class ChartsFormComponent extends React.Component {
   constructor(props) {
      super(props);
      this.changeHandler = this.changeHandler.bind(this);
   }

   changeHandler(e) {
      chartSearch.handleItemSelected(e, this.props.setChartsDisplay);
   }
   render() {
      return (
         <>
            <input
               id="RTM-charts-search-bar"
               type="search"
               placeholder="Search..."
               list="RTM-charts-list"
               className="RTM-SearchBar Charts"
               onChange={this.changeHandler}
               autoComplete="off"
            ></input>
            <datalist id="RTM-charts-list">
               <Dropdown options={this.props.charts} />
            </datalist>
         </>
      );
   }
}

export const Dropdown = props => {
   const isResultEmpty = props.options.length <= 0;
   const builtDropdownList = props.options.map(prop => (
      <option key={prop.id} id={prop.id}>
         {prop.name}
      </option>
   ));
   const optionList = isResultEmpty ? [] : builtDropdownList;
   return optionList;
};
