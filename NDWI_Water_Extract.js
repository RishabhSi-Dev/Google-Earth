var wular = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
              .filterDate("2024-10-01","2024-10-31")
              .filterBounds(aoi)
              .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE",10))
              .median()
              .clip(aoi);
Map.addLayer(wular,imageVisParam,"WULAR LAKE RGB");
Map.centerObject(aoi,12);

var ndwi = wular.normalizedDifference(["B3","B8"]);
print(ndwi);
Map.addLayer(ndwi,imageVisParam2,"NDWI");

var ndwi_binary = ndwi.gt(0);
Map.addLayer(ndwi_binary,{},"NDWI BINARY");

var ndwi_clean = ndwi_binary
    .focalMin(1)
    .focalMax(1);

var water = ndwi_clean.selfMask();
Map.addLayer(water,imageVisParam3,"WATER");

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