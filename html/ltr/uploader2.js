class Uploader {
  
    constructor() { 
      this.x=0;
      let _this = this;
    }
  
  
    async gettt() {
      let response = await fetch('../../status1');
      let res = await response.json();
      console.log(">>>yVal",res);
  
      return res["last_value"]; 
    }
  
   //------------------------------RANDOM PLOT--------------------------------//
    async plotAll(){
          var dps3 = []; 
          var dps1 = [];
          var dps2 = [];
          var dps4 = []  // dataPoints
          var chart = new CanvasJS.Chart("plotAll", {	
         //   theme : "dark1",
            animationEnabled: true,
            animationDuration: 2000,
            width : 850,
            height :350,
            legend: 
            {
              dockInsidePlotArea: true,
              verticalAlign: "top",
              horizontalAlign: "right"               
            },
            title :{
            //  text: ""
            },
             axisX:{
              title: "Time in hour",
              gridDashType: "dot",
              gridThickness: 2
             },
            axisY: {
              includeZero: false,
              title: "Feed Value",
           //   interval : 1
            },      
            data: [{
              showInLegend: true, 
              name: "series0",
              legendText: "Feed 1",
              type: "line",
              dataPoints: dps1
            },{
              showInLegend: true, 
              name: "series1",
              legendText: "Feed 2",
              type : "line",
              dataPoints : dps2
            },{
              showInLegend: true,
              name: "series2",
              legendText: "Feed 3",
              type : "line",
              dataPoints :dps3
            },{
                showInLegend: true,
                name: "series3",
                legendText: "Feed 4",
                type : "line",
                dataPoints :dps4
              }]  
          });
 
          var xVal = 1;
          var yVal = 1; 
          var updateInterval = 1000;
          var dataLength = 20; // number of dataPoints visible at any point
  
          async function get1() {
            let response = await fetch('../../status1');
            let res = await response.json();
            return res["last_value"]; 
          }
          async function get2() {
            let response = await fetch('../../status2');
            let res = await response.json();
            return res["last_value"]; 
          }
          async function get3() {
            let response = await fetch('../../status3');
            let res = await response.json();
            return res["last_value"]; 
          }
          async function get4() {
            let response = await fetch('../../status4');
            let res = await response.json();
            return res["last_value"]; 
          }
          
         var updateChart = async function (count) {
          
            count = count || 1;
            for (var j = 0; j < count; j++) {
              //console.log(">>>yVal",typeof yVal);
              let res,yVal1,yVal2,yVal3,yVal4;
              res = await get1();
              yVal1 = parseInt(res,10);
              res = await get2();
              yVal2 = parseInt(res,10);
              res = await get3();
              yVal3 = parseInt(res,10);
              res = await get4();
              yVal4 = parseInt(res,10);
              console.log("1>",yVal1);
              console.log("2>",yVal2);console.log("3>",yVal3);console.log("4>",yVal4);
              dps1.push({
                x: xVal,
                y: yVal1
              });
              dps2.push({
                x:xVal,
                y:yVal2
              });
              dps3.push({
                x:xVal,
                y:yVal3
              })
              dps4.push({
                x:xVal,
                y:yVal4
              })
              xVal++;
            }
          
            if (dps1.length > dataLength) {
                 dps1.shift();
            }
            if (dps3.length > dataLength) {
                 dps3.shift();
            }
            if (dps2.length > dataLength) {
                 dps2.shift();
            }
            if (dps4.length > dataLength) {
                dps4.shift();
            }
            chart.render();
          };
          
          updateChart(dataLength);
          setInterval(function(){updateChart()}, updateInterval);
          
      }

   //------------------------------------------------------------------------------//

  }