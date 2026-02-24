# Google-Earth

# NDWI-Based Surface Water Extraction (Wular Lake)

##Google Earth Engine Imports
The following variables are defined using the **Google Earth Engine "Imports" panel**
(Since I am unable to paste the imports panel, I added a screenshot of it instead)

They include:
- AOI (polygon)
- Image collection reference
- Visualization parameters


![Imports panel](https://github.com/user-attachments/assets/01b87e55-18d8-495c-8e9a-1836d5f912b4)

> These variables are created via the Earth Engine Code Editor UI and are referenced directly in the script.

I will further add images of maps with different layers added.

<img width="1916" height="1079" alt="Screenshot 2026-02-07 230521" src="https://github.com/user-attachments/assets/6d892025-3a9e-4789-b783-ee8ad60ff6ef" />
Area of Interest is Wular Lake taken for the Surface Water Extraction


<img width="1098" height="714" alt="Screenshot 2026-02-07 225910" src="https://github.com/user-attachments/assets/3d21be12-549a-4d6f-b39d-45978d8e654a" />
Binary Image of NDWI Map. The black part shows non-water bodies with NDWI <= 0 and the blue part shows water bodies with NDWI > 0


<img width="1920" height="1080" alt="Screenshot (102)" src="https://github.com/user-attachments/assets/0aafd924-39c5-4ce5-a70f-9d17d8d95c09" />
This is the RGB image of Area of Interest as seen by the satellite


<img width="1920" height="1080" alt="Screenshot (103)" src="https://github.com/user-attachments/assets/26792566-b561-4c2a-9ffd-7be51c59d748" />
Above is the NDWI Map layer, where non-water bodies are white in color.

Next update will include the Sampled Map Layer using Random Forest algorithm.
<img width="1920" height="1080" alt="Screenshot (106)" src="https://github.com/user-attachments/assets/d2004bda-fd0b-440a-96be-4046584db8d9" />
Random Forest algorithm trained map layer. Brown means non-water body and blue means water body

<img width="753" height="303" alt="Screenshot 2026-02-15 204059" src="https://github.com/user-attachments/assets/f6ee08a5-4420-4060-aa40-ce00ae015bad" />
Surface Area (approx.) of calculated NDWI map printed on Google Earth Engine Console.

<img width="748" height="576" alt="NON-WATER" src="https://github.com/user-attachments/assets/85c28664-0e05-47e9-8c77-8496678a6cd0" />
Non Water body graph shown on Inspector Tab by clicking on any non-water body

<img width="736" height="576" alt="WATER" src="https://github.com/user-attachments/assets/2d2af021-622c-409e-bfd9-575ccbc8d5cd" />
Watter Body graph shown on Inspector Tab clicking on any water body
