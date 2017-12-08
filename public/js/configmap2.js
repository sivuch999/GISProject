    require([
        "esri/map",
        "esri/layers/FeatureLayer",
        "esri/InfoTemplate",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/ClassBreaksRenderer",
        "esri/Color"
    ], function (
        Map,
        FeatureLayer,
        InfoTemplate,
        SimpleFillSymbol,
        ClassBreaksRenderer,
        Color
    ) {

        var map = new Map("map",{
          basemap: 'gray',
          center: [98.9545014, 18.8114649],
          zoom: 16
        });
        //Renderer Set Style
         var symbol = new SimpleFillSymbol();
        // Add five breaks to the renderer.
        // If you have ESRI's ArcMap available, this can be a good way to determine break values.
        // You can also copy the RGB values from the color schemes ArcMap applies, or use colors
        // from a site like www.colorbrewer.org
        //
        // alternatively, ArcGIS Server's generate renderer task could be used
        var renderer = new ClassBreaksRenderer(symbol, "FID");
        renderer.addBreak(0, 20, new SimpleFillSymbol().setColor(new Color("#99FF33")));
        renderer.addBreak(21, 30, new SimpleFillSymbol().setColor(new Color("#FFFF00")));
        renderer.addBreak(31, 40, new SimpleFillSymbol().setColor(new Color("#FFCC00")));
        renderer.addBreak(41, 50, new SimpleFillSymbol().setColor(new Color("#FF0000")));
        renderer.addBreak(51, Infinity, new SimpleFillSymbol().setColor(new Color("#CC0066")));


          var infoTemplate = new InfoTemplate();
          infoTemplate.setTitle("${Descrip}");
          infoTemplate.setContent("<table border='0' width='200'>"+
                                  "<tr>"+
                                    "<th width=80> FID: </th>"+
                                    "<th>${FID}</th>"+
                                  "<tr>"+
                                    "<th width=80> ID: </th>"+
                                    "<th>${ID}</th>"+
                                  "<tr>"+
                                    "<th width=80> Area: </th>"+
                                    "<th>${Area}</th>"+
                                  "<tr>"+
                                    "<th width=80> Area_id: </th>"+
                                    "<th>${Area_id}</th>"+
                                  "<tr>"+
                                    "<th width=80> Area_type: </th>"+
                                    "<th>${Area_type}</th>"+
                                  "<tr>"+
                                    "<th width=80> Descrip: </th>"+
                                    "<th>${Descrip}</th>"+
                                  "<tr>"+
                                    "<th width=80> Date: </th>"+
                                    "<th>${Date}</th>"+
                                  "<tr>"+
                                    "<th width=80> Area_NEW: </th>"+
                                    "<th>${Area_NEW}</th>"+
                                  "</table>");

          // Create the feature layer
          myFeatureLayer1 = new FeatureLayer("https://services8.arcgis.com/GQNJdm0A7dDAqWEG/ArcGIS/rest/services/Bldg/FeatureServer/0",{
            outFields: ["*"],
            infoTemplate: infoTemplate
          });

          myFeatureLayer2 = new FeatureLayer("https://services8.arcgis.com/GQNJdm0A7dDAqWEG/ArcGIS/rest/services/L01_JedLin/FeatureServer/0");

          myFeatureLayer1.setRenderer(renderer);
          //map.addLayer(myFeatureLayer1);
          //set map extent

            filter = function(index,state){
              let layer = [myFeatureLayer1,myFeatureLayer2]
              if(state===true){
                map.addLayer(layer[index])
              }else{
                map.removeLayer(layer[index])
              }
            }

          /*myFeatureTable = new FeatureTable({
            "featureLayer" : myFeatureLayer1,
            "outFields": [
              "ID", "Area", "Perineter", "Area_id", "Descrip"
            ],
            "map" : map
          }, 'myTableNode');
          myFeatureTable.startup();
          */
    
    });