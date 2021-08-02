import React, { Component } from "react";
import { ExceptionsTab } from "./exception-config/exceptions-tab";
import { StatusTab } from "./status-config/status-tab";
import { VehiclesTab } from "./vehicles-config/vehicles-tab";
import { ChartsTab } from "./charts-config/charts-tab";
import { initCollapse } from "./utils/config-collapse";
import { diagnosticSearch } from "./status-config/status-search";
import { exceptionSearch } from "./exception-config/exception-search";
import { deviceSearch } from "./vehicles-config/vehicle-search";
import { chartSearch } from "./charts-config/charts-search";

export class ConfigView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         exceptionsSearchList: [],
         statuses: [],
         devices: [],
         charts: [],
         exceptionDisplayList: [],
         statusDisplayList: [],
         vehicleDisplayList: [],
         chartsDisplayList: []
      };
      this.setExceptionsList = this.setExceptionsList.bind(this);
      this.setStatusList = this.setStatusList.bind(this);
      this.setVehicleList = this.setVehicleList.bind(this);
      this.setChartsList = this.setChartsList.bind(this);
      this.setExceptions = this.setExceptions.bind(this);
      this.setStatuses = this.setStatuses.bind(this);
      this.setDevices = this.setDevices.bind(this);
      this.setCharts = this.setCharts.bind(this);
   }

   setExceptionsList(props) {
      this.setState({ exceptionDisplayList: props });
   }

   setStatusList(props) {
      this.setState({ statusDisplayList: props });
   }

   setVehicleList(props) {
      this.setState({ vehicleDisplayList: props });
   }

   setChartsList(props) {
      this.setState({ chartsDisplayList: props });
   }

   setExceptions(props) {
      this.setState({ exceptionsSearchList: props });
   }

   setStatuses(props) {
      this.setState({ statuses: props });
   }

   setDevices(props) {
      this.setState({ devices: props });
   }

   setCharts(props) {
      this.setState({ charts: props });
   }

   componentDidMount() {
      exceptionSearch.init(this.setExceptions);
      diagnosticSearch.init(this.setStatuses);
      deviceSearch.init(this.setDevices);
      chartSearch.init(this.setCharts);
      exceptionSearch.loadSavedExceptionConfig(this.setExceptionsList);
      diagnosticSearch.loadSavedStatusConfig(this.setStatusList);
      deviceSearch.loadSavedDeviceConfig(this.setVehicleList);
      chartSearch.loadSavedChartConfig(this.setChartsList);
      initCollapse();
   }

   render() {
      return (
         <div id="RTM-config-view">
            <div id="RTM-config-container">
               <div id="RTM-config-header" className="">
                  <ExceptionsTab
                     exceptions={this.state.exceptionsSearchList}
                     exceptionDisplayList={this.state.exceptionDisplayList}
                     onClick={this.setExceptionsList}
                  />
                  <StatusTab
                     statuses={this.state.statuses}
                     statusDisplayList={this.state.statusDisplayList}
                     onClick={this.setStatusList}
                  />
                  <VehiclesTab
                     devices={this.state.devices}
                     vehicleDisplayList={this.state.vehicleDisplayList}
                     onClick={this.setVehicleList}
                  />
                  <ChartsTab
                     charts={this.state.charts}
                     chartsDisplayList={this.state.chartsDisplayList}
                     onClick={this.setChartsList}
                  />
               </div>
            </div>
         </div>
      );
   }
}
