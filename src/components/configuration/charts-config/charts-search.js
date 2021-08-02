import { fromEvent } from "rxjs";
import { map, debounceTime } from "rxjs/operators";
import { getDiagnosticByName, getBlobStorage, saveBlobStorage, setBlobStorage } from "../../../services/api/helpers";
import storage from "../../../dataStore";
import { filterByVisibility } from "../utils/config-helpers";
// import { STATUS } from "../../../constants/status-search";

export const chartSearch = {
   resultsCache: {},
   displayList: {},

   get searchInput() {
      return document.getElementById("RTM-charts-search-bar");
   },

   init(mapPropsToComponent) {
      // Init rxjs debounce search.
      const searchInputObservable$ = fromEvent(chartSearch.searchInput, "input").pipe(map(i => i.currentTarget.value));
      const debouncedInput = searchInputObservable$.pipe(debounceTime(250));
      debouncedInput.subscribe((searchInput) => chartSearch.buildSearchList(searchInput, mapPropsToComponent));
   },

   loadSavedChartConfig(mapPropsToComponent) {

      return getBlobStorage().then(val => {
         if (val.length === 0) { return; }
         const cachedCharts = JSON.parse(val[0].data);
         console.log(cachedCharts);

         if (cachedCharts.configData.Chart) {
            chartSearch.displayList = cachedCharts.configData.Chart;
            storage.selectedCharts = filterByVisibility(chartSearch.displayList);
            chartSearch.buildChartsDisplayList(mapPropsToComponent);
         }
      });
   },

   buildSearchList(searchInput, mapPropstoComponent) {

      return getDiagnosticByName(searchInput).then(diagnosticResults => {

         diagnosticResults.forEach(diagnostic => {
            const {
               id,
               name,
               unitOfMeasure
            } = diagnostic;

            const visible = true;

            chartSearch.resultsCache[name] = { name, id, visible, unitOfMeasure };
         });
         mapPropstoComponent(Object.values(chartSearch.resultsCache));
      });
   },

   handleItemSelected(event, mapPropsToComponent) {
      event.preventDefault();
      chartSearch.saveSelectedValue(mapPropsToComponent);
   },

   saveSelectedValue(mapPropsToComponent) {

      const { value } = chartSearch.searchInput;
      const chartData = chartSearch.resultsCache[value];

      if (chartData) {
         chartSearch.displayList[chartData.id] = chartData;
         chartSearch.searchInput.value = "";
         chartSearch.saveConfig(mapPropsToComponent);
      }

      return chartData;
   },

   buildChartsDisplayList(mapPropsToComponent) {
      mapPropsToComponent(Object.values(chartSearch.displayList)
         .filter(diagnostic => diagnostic.id && diagnostic.name));
   },

   deleteItemFromChartsList(id, mapPropsToComponent) {
      delete chartSearch.displayList[id];
      chartSearch.saveConfig(mapPropsToComponent);
   },

   saveConfig(mapPropsToComponent) {
      storage.selectedCharts = filterByVisibility(chartSearch.displayList);
      storage.setBlobStorageObj ? setBlobStorage("Charts", chartSearch.displayList) : saveBlobStorage("Charts", chartSearch.displayList);
      storage.dateKeeper$.update();
      chartSearch.buildStatusDisplayList(mapPropsToComponent);
   },

   toggleChartsVisibility(id, mapPropsToComponent) {
      const selectedCharts = chartSearch.displayList[id];
      selectedCharts.visible = !selectedCharts.visible;
      chartSearch.saveConfig(mapPropsToComponent);
   },

   deleteAllItems(mapPropsToComponent) {
      chartSearch.displayList = {};
      chartSearch.saveConfig(mapPropsToComponent);
   },

   showAllItems(mapPropsToComponent) {
      Object.values(chartSearch.displayList)
         .forEach(selectedChart =>
            selectedChart.visible = true
         );
      chartSearch.saveConfig(mapPropsToComponent);
   },

   hideAllItems(mapPropsToComponent) {
      Object.values(chartSearch.displayList)
         .forEach(selectedChart =>
            selectedChart.visible = false
         );
      chartSearch.saveConfig(mapPropsToComponent);
   }
};
