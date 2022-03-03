Working with GEEL Script after getting dataset ready (read previous page to do this)

## Starting Napari
After the desired dataset is put in the directory;

Run main script from the project directory

```
python src/run_annotation.py

> Enter Directory:
./example_dataset
```
- The Checkpoint file should be created automatically

```

    .
    ├── checkpoints
    │   └── imgAnnotatedData.json
    ├── full_img
    │   ├── Engilchek_glacier_1999-07-09.tif
    │   ├── Engilchek_glacier_1999-08-10.tif
    │   ├── Engilchek_glacier_1999-08-26.tif
    │   └── Engilchek_glacier_1999-10-13.tif
    └── label_img
        ├── Engilchek_glacier_1999-07-09.tif
        ├── Engilchek_glacier_1999-08-10.tif
        ├── Engilchek_glacier_1999-08-26.tif
        └── Engilchek_glacier_1999-10-13.tif
```

**My Monitor Setup**
![setup](https://raw.githubusercontent.com/byungheon-jeong/geelabeler-website/master/geel-website/images/my_setup.PNG)

## Running through Dataset

### Label Image or decide to SKIP image
![Labeling Image](https://raw.githubusercontent.com/byungheon-jeong/geelabeler-website/master/geel-website/images/gee_labeler.gif)

### Iterate through dataset
    If image is labeled, press ENTER else, enter "SKIP")
![SKIPPING](https://raw.githubusercontent.com/byungheon-jeong/geelabeler-website/master/geel-website/images/skip.PNG)
    **Enter SKIP if you want to skip image**
![SKIPPING GIF](https://raw.githubusercontent.com/byungheon-jeong/geelabeler-website/master/geel-website/images/skipping_img.gif)



## Checkpoint & Output Structure

### Checkpoint System
- When the image is either (finished being) labeled or skipped, the checkpoint system will record the name of the image
- When an image is labeled, the pixel-label data is saved into numpy files

```console
./example_dataset
├── checkpoints
│   ├── data.npy
│   ├── imgAnnotatedData.json
│   └── labels.npy
├── full_img
│   ├── Engilchek_glacier_1999-07-09.tif
    ...
└── label_img
    ├── Engilchek_glacier_1999-07-09.tif
    ...
```

### Output Structure

|file|description|
|----|----|
|data.npy| This file that holds the band data for each pixel of the labeled polygon|
|labels.npy| This file holds the designated label |



