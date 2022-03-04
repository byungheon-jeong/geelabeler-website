This tutorial walks through the process of labeling the TIFF dataset. The tutorial assumes the TIFF dataset is already extracted from Google Earth Engine. 
> :warning: **If you are running the labeling script**: Activate the Conda virtual enviromnent!

---
### Dataset Location in Project Repo
How to set up dataset for labeling

#### TREE
```console
.
├── example_dataset
│   ├── full_img
│   └── label_img
├── README.md
├── requirements.txt
├── src
│   ├── checkpoint_data
│   ├── __pycache__
│   └── run_annotation.py
├── testing_data
│   ├── checkpoints
│   ├── data_loader.ipynb
│   ├── full_img
│   └── label_img
└── tests
    ├── polygon_mask_test.pickle
    ├── test_config.yml
    └── test_run_annotation.py

```

*testing_data is the offical format for a (labeled) dataset*

*Example_dataset will be our example for this tutorial*

### Dataset Configuration

```console
./example_dataset
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
> :warning: **The full_img file name must be the same as the ones label_img**

<!-- :::Image Information -->
:::tip

|subdirectory|description|
|----|----|
|full_img| This subdirectory is where the TIFF image file with ALL the bands are present|
|label_img| This subdirectory is where the TIFF image files that will be used to label (only consist of a few bands) are present|

![image shapes](https://raw.githubusercontent.com/byungheon-jeong/geelabeler-website/master/geel-website/images/image_shapes-full.PNG)

:::