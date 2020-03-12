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
  async plotRandom(){
        var dps = []; 
        var dps1 = [];
        var cost = [];// dataPoints
        var chart = new CanvasJS.Chart("plotRandom", {	
        //  theme : "dark1",
          animationEnabled: true,
          animationDuration: 2000,
          legend: 
          {
            dockInsidePlotArea: true,
            verticalAlign: "top",
            horizontalAlign: "right"               
          },
          title :{
            text: "Load vs Time Graph"
          },
           axisX:{
            title: "Time in hour",
            gridColor: "lightblue" ,
            gridThickness: 2    
           },
          axisY: {
            includeZero: false,
            title: "Load in kW",
         //   interval : 1
          },      
          data: [{
            showInLegend: true, 
            name: "series0",
            legendText: "Load",
            type: "line",
            dataPoints: dps
          },{
            showInLegend: true, 
            name: "series1",
            legendText: "Feed",
            type : "line",
            dataPoints : dps1
          }]  
        });

        var costChart = new CanvasJS.Chart("costChart", {	
          width : 721,
          height : 361,
        //  theme : "dark1",
          animationEnabled: true,
          animationDuration: 2000,
          legend:{
            dockInsidePlotArea: true,
            verticalAlign: "top",
            horizontalAlign: "right"               
          },
          title :{
            text: "Cost vs Time Graph"
          },
           axisX:{
            title: "Time in hour",
            gridColor: "lightblue" ,
            gridThickness: 2  
           },
          axisY: {
            includeZero: false,
            title: "Cost",
            margin : 17
          //  interval : 1
          },      
          data: [{
            showInLegend: true, 
            name: "series0",
            legendText: "Cost",
            type: "line",
            dataPoints: cost
          }
        ]  
        });

        let cost_0=4,cost_1=4.25,cost_3=4.75,cost_4=5;

        var xVal = 1;
        var yVal = 1; 
        var updateInterval = 1000;
        var dataLength = 20; // number of dataPoints visible at any point

        async function get() {
          let response = await fetch('../../status1');
          let res = await response.json();
          return res["last_value"]; 
        }

      async function calc(x,y){
        let cost;
        switch(x){
          case 0:
            cost = cost_0*y;
            break;
          case 1:
            cost = cost_1*y;
            break;
          case 2:
            cost = cost_2*y;
            break;
          case 3:
            cost = cost_3*y;
            break;
          case 4:
            cost = cost_4*y;
            break;
          default :
            cost = 6*y;
        }
        return cost;
      }
        
    var updateChart = async function (count) {
        
          count = count || 1;

          for (var j = 0; j < count; j++) {
            yVal = (Math.abs(Math.random())%5)*5;
            //console.log(">>>yVal",typeof yVal);
            let res = await get();
            let yVal1 = parseInt(res,10);
            let c = await calc(yVal1,yVal);
            dps.push({
              x: xVal,// xVal,
              y: yVal
            });
            dps1.push({
              x:xVal,
              y:yVal1
            });
            cost.push({
              x:xVal,
              y:c
            })
            xVal++;
          }
        
          if (dps.length > dataLength) {
               dps.shift();
          }
          if (dps1.length > dataLength) {
               dps1.shift();
          }
          if (cost.length > dataLength) {
               cost.shift();
          }
          costChart.render();
          chart.render();
        };
        
        updateChart(dataLength);
        setInterval(function(){updateChart()}, updateInterval);
        
    }
 //------------------------------------------------------------------------------//
 async plotRandomBar(){
  var dps = []; 
  var dps1 = [];// dataPoints
  var chart = new CanvasJS.Chart("plotRandom", {	
    legend: 
    {
      dockInsidePlotArea: true,
      verticalAlign: "top",
      horizontalAlign: "right"               
    },
    title :{
      text: "Load vs Time Graph"
    },
     axisX:{
      title: "time in hour",
      gridDashType: "dot",
      gridThickness: 2
     },
    axisY: {
      includeZero: false,
      title: "Load in kW",
   //   interval : 1
    },      
    data: [{
      showInLegend: true, 
      name: "series0",
      legendText: "Load",
      type: "line",
      dataPoints: dps
    },{
      showInLegend: true, 
      name: "series1",
      legendText: "Feed",
      type : "line",
      dataPoints : dps1
    }]  
  });
  
  var xVal = 1;
  var yVal = 1; 
  var updateInterval = 1000;
  var dataLength = 20; // number of dataPoints visible at any point

  async function get() {
    let response = await fetch('http://localhost:8081/status');
    let res = await response.json();
    return res["last_value"]; 
  }

  
  var updateChart = async function (count) {
  
    count = count || 1;
  
    for (var j = 0; j < count; j++) {
      yVal = (Math.abs(Math.random())%5)*5;
      //console.log(">>>yVal",typeof yVal);
      let res = await get();
      let yVal1 = parseInt(res,10);
      dps.push({
        x: xVal,// xVal,
        y: yVal
      });
      dps1.push({
        x:xVal,
        y:yVal1
      })
      xVal++;
    }
  
    if (dps.length > dataLength) {
         dps.shift();
    }
    if (dps1.length > dataLength) {
      dps1.shift();
 }
    chart.render();
  };
  
  updateChart(dataLength);
  setInterval(function(){updateChart()}, updateInterval);
  
}
}