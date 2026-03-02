//Satellite Data Processing
var wular = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
              .filterDate("2024-10-01","2024-10-31")
              .filterBounds(aoi)
              .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE",10))
              .median()
              .clip(aoi);
Map.addLayer(wular,imageVisParam,"WULAR LAKE RGB");
Map.centerObject(aoi,12);


//Computing NDWI and adding map layer
var ndwi = wular.normalizedDifference(["B3","B8"]);
print(ndwi);
Map.addLayer(ndwi,imageVisParam2,"NDWI");


//defining the bands blue, green, red and infrared
var bands = ["B2", "B3", "B4", "B8"];
var wularNDWI = wular
    .select(bands)
    .addBands(ndwi.rename("NDWI"));
    
    
//adding a binary map this will be black and white
//white means 1 will be water and black means 0 will be non-water
var ndwi_binary = ndwi.gt(0);
Map.addLayer(ndwi_binary,{},"NDWI BINARY");


//spatial filtering
var ndwi_clean = ndwi_binary
    .focalMin(1)
    .focalMax(1);
    
    
//masking the water body and adding a map layer
var water = ndwi_clean.selfMask();
Map.addLayer(water,imageVisParam3,"WATER");


//calculating the surface water area
var AreaImage = water.multiply(ee.Image.pixelArea());
var AreaStats = AreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: aoi,
  scale: 10, //Sentinel Resolution
  maxPixels: 1e13
});

var area = ee.Number(AreaStats.get('nd')).divide(1e6);
print('Surface Water Area(sq km)');
print(area);


//sampling of pixels
var samples = wularNDWI.sample({
  region: aoi,
  scale: 10,
  numPixels: 1000,
  tileScale: 4
});


//assigning the class labels
var training = samples.map(function(f){
  var nd = ee.Number(f.get('NDWI'));
  var cls = ee.Algorithms.If(nd.gt(0), 1, 0);
    return f.set("Class", cls);
});


//training a Random Forest classifier with multiple decision trees
var classifier = ee.Classifier.smileRandomForest(100).train({
  features: training,
  classProperty: "Class",
  inputProperties: bands.concat(["NDWI"])
});


//classifying the entire AOI into water and non-water classes
var RandomForest = wularNDWI.classify(classifier);
Map.addLayer(RandomForest, imageVisParam4, "RF Water Classification");


//Exporting the map to google drive
Export.image.toDrive({
  image: RandomForest,
  description: "Wular_Lake_Random_Forest",
  folder: "GEE_RF",
  fileNamePrefix: "WularLake_RF",
  region: aoi,
  scale: 10,
  maxPixels: 1e13
});

//adding legend to the map
var legend = ui.Panel({
  style: {
    position: "bottom-left",
    padding: "8px 15px"
  }
});

var legendTitle = ui.Label({
  value: "RandomForest Classification",
  style: {
    fontWeight: "bold",
    fontSize: "14px",
    margin: "0 0 6px 0"
  }
});

legend.add(legendTitle);

function makeRow(color, name){
  var colorbox = ui.Label({
    style:{
      backgroundColor: color,
      padding: "8px",
      margin: "0 0 4px 0"
    }
  });
  var description = ui.Label({
    value: name,
    style:{margin: "0 0 4px 6px"}
  });
  return ui.Panel({
    widgets: [colorbox, description],
    layout: ui.Panel.Layout.Flow("horizontal")
  });
}

legend.add(makeRow("blue", "Water"));
legend.add(makeRow("brown", "Non-Water"));

Map.add(legend);