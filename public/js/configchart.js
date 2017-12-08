/*$.ajax
    ({
    url:"/chart",
    dataType: "json",
    success:function(data)
    {
        var myConfig = {
            type: "pie",
            backgroundColor: "",
            plot: {
                borderColor: "#2B313B",
                borderWidth: 5,
                // slice: 90,
                valueBox: {
                    placement: 'out',
                    text: '%t\n%npv%',
                    fontFamily: "Open Sans"
                },
                animation:{
                    effect: 2, 
                    method: 5,
                    speed: 1000,
                    sequence: 1
                }
            },
            series: 
            [   {
                    values: [data[0].user_id],
                    text: [data[0].username]
                }, 
                {
                    values: [data[1].user_id],
                    text: [data[1].username]
                }, 
                {
                    values: [data[2].user_id],
                    text: [data[2].username]
                }, 
                {
                    values: [data[3].user_id],
                    text: [data[3].username]
                },
                {
                          values: [data[4].user_id],
                          text: [data[4].username]
                }
            ]};
                zingchart.render({
                    id : 'myChart',
                    data : myConfig,
                    height: 500,
                    width: 725
                });
    }
});*/


/*$.ajax({
    url:"/chart",
    dataType: "json",
      success:function(data)
      {
        console.log("log1: "+data[6].user_id)
        //console.log("log2: "+data[0].user_id)
        let data0 = data[0].user_id
        myConfig =
        {
            "type":"hbar",
            "backgroundColor": "",
            "font-family":"Arial",
            "title":{
                "text":"Graph Geodatabase",
                "font-family":"Arial",
                "background-color":"none",
                "font-color":"#A4A4A4",
                "font-size":"18px"
            },
            "labels":[
                {
                    "text":"NAME",
                    "font-size":"17px",
                    "font-color":"#9d9d9d",
                    "x":"11.5%",
                    "y":"10%"
                },
                {
                    "text":"USER_ID",
                    "font-size":"17px",
                    "font-color":"#9d9d9d",
                    "x":"20%",
                    "y":"10%"
                },
            ],
            "plot":{
                "bars-overlap":"100%",
                "borderRadius":15,
                "hover-state":{
                    "visible":false
                },
                "animation": {
                    "delay": 300,
                    "effect": 3,
                    "speed": "500",
                    "method": "0",
                    "sequence": "3"
                }
            },
            "plotarea":{
                "margin":"60px 20px 20px 140px"
            },
            "scale-x":{
                "line-color":"none",
                "values":[data[0].username,data[1].username,data[2].username,data[3].username,data[4].username],
                "tick":{
                    "visible":false
                },
                "guide":{
                    "visible":false
                },
                "item":{
                    "font-size":"24px",
                    "padding-right":"20px",
                    "auto-align":true,
                    "rules":[
                        {
                            "rule":"%i==0",
                            "font-color":"#FA8452"
                        },
                        {
                            "rule":"%i==1",
                            "font-color":"#FCAE48"
                        },
                        {
                            "rule":"%i==2",
                            "font-color":"#FCCC65"
                        },
                        {
                            "rule":"%i==3",
                            "font-color":"#A0BE4A"
                        },
                        {
                            "rule":"%i==4",
                            "font-color":"#6FA6DF"
                        }
                    ]
                }
            },
            "scale-y":{
                "visible":true,
                "guide":{
                    "visible":false
                }
            },
            "series":[
                {
                    "values":[100,100,100,100,100],
                    "bar-width":"40px",
                    "background-color":"#f2f2f2",
                    "border-color": "#e8e3e3",
                    "border-width":3,
                    "fill-angle":90,
                    "tooltip":{
                        "visible":false
                    }
                },
                {
                    "values":[data[0].user_id,data[1].user_id,data[2].user_id,data[3].user_id,data[4].user_id],
                    "bar-width":"32px",
                    "max-trackers":0,
                    "value-box":{
                        "placement":"top-out",
                        "text":"%v",
                        "decimals":0,
                        "font-color":"#A4A4A4",
                        "font-size":"14px",
                        "alpha":0.6
                    },
                    "rules":[
                        {
                            "rule":"%i==0",
                            "background-color":"#FA8452"
                        },
                        {
                            "rule":"%i==1",
                            "background-color":"#FCAE48"
                        },
                        {
                            "rule":"%i==2",
                            "background-color":"#FCCC65"
                        },
                        {
                            "rule":"%i==3",
                            "background-color":"#A0BE4A"
                        },
                        {
                            "rule":"%i==4",
                            "background-color":"#6FA6DF"
                        }
                    ]
                }
            ]
        }; //configchart
        zingchart.render({
            id : 'myChart',
            data : myConfig,
            height: 500,
            width: 725
        });
    } //seccess function
  }); //ajax*/

  // Create the chart
$.ajax
    ({
    url:"/chart",
    dataType: "json",
    success:function(data)
    {
        Highcharts.chart('chart', {
            chart: {
                type: 'column',
                backgroundColor: '',
                polar: true
            },
            title: {
                text: ''
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                    }
                }
            },

            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: data[0].username,
                    y: data[0].user_id,
                    drilldown: data[0].username
                }, {
                    name: data[1].username,
                    y: data[1].user_id,
                    drilldown: data[1].username
                }, {
                    name: data[2].username,
                    y: data[2].user_id,
                    drilldown: data[2].username
                }, {
                    name: data[3].username,
                    y: data[3].user_id,
                    drilldown: data[3].username
                }, {
                    name: data[4].username,
                    y: data[4].user_id,
                    drilldown: data[4].username
                }, {
                    name: data[5].username,
                    y: data[5].user_id,
                    drilldown: data[5].username
                }]
            }],
            drilldown: {
                series: [{
                    name: data[0].username,
                    id: data[0].username,
                    data: [
                        [
                            'v11.0',
                            24.13
                        ],
                        [
                            'v8.0',
                            17.2
                        ],
                        [
                            'v9.0',
                            8.11
                        ],
                        [
                            'v10.0',
                            5.33
                        ],
                        [
                            'v6.0',
                            1.06
                        ],
                        [
                            'v7.0',
                            0.5
                        ]
                    ]
                }, {
                    name: data[1].username,
                    id: data[1].username,
                    data: [
                        [
                            'v40.0',
                            5
                        ],
                        [
                            'v41.0',
                            4.32
                        ],
                        [
                            'v42.0',
                            3.68
                        ],
                        [
                            'v39.0',
                            2.96
                        ],
                        [
                            'v36.0',
                            2.53
                        ],
                        [
                            'v43.0',
                            1.45
                        ],
                        [
                            'v31.0',
                            1.24
                        ]
                    ]
                }, {
                    name: data[2].username,
                    id: data[2].username,
                    data: [
                        [
                            'v35',
                            2.76
                        ],
                        [
                            'v36',
                            2.32
                        ],
                        [
                            'v37',
                            2.31
                        ],
                        [
                            'v34',
                            1.27
                        ],
                        [
                            'v38',
                            1.02
                        ],
                        [
                            'v31',
                            0.33
                        ],
                        [
                            'v33',
                            0.22
                        ],
                        [
                            'v32',
                            0.15
                        ]
                    ]
                }, {
                    name: data[3].username,
                    id: data[3].username,
                    data: [
                        [
                            'v8.0',
                            2.56
                        ],
                        [
                            'v7.1',
                            0.77
                        ],
                        [
                            'v5.1',
                            0.42
                        ],
                        [
                            'v5.0',
                            0.3
                        ],
                        [
                            'v6.1',
                            0.29
                        ],
                        [
                            'v7.0',
                            0.26
                        ],
                        [
                            'v6.2',
                            0.17
                        ]
                    ]
                }, {
                    name: data[4].username,
                    id: data[4].username,
                    data: [
                        [
                            'v12.x',
                            0.34
                        ],
                        [
                            'v28',
                            0.24
                        ],
                        [
                            'v27',
                            0.17
                        ],
                        [
                            'v29',
                            0.16
                        ]
                    ]
                },{
                    name: data[5].username,
                    id: data[5].username,
                    data: [
                        [
                            'v12.x',
                            0.34
                        ],
                        [
                            'v28',
                            0.24
                        ],
                        [
                            'v27',
                            0.17
                        ],
                        [
                            'v29',
                            0.16
                        ]
                    ]
                }]
            }
        });
    }
    });