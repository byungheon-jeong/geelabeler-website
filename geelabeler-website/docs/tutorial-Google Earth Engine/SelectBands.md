
# Data Collection and Filtering: NDVI band
### Author: Ivan Cano
### Date: 3/5/2022
---

```import ee 
import geemap
from datetime import datetime
import numpy as np
import rasterio
import matplotlib.pyplot as plt 
import pandas as pd
from datetime import date
from datetime import timedelta
```
The following method is used too filter the tif files based on their level of cloud interference in each respective image. Filtering by clouds is accomplished by passing an image, and checking for its value associated with its meteorological disturbance.
```
 `def cloudscore(image):
        '''
        Inner function for computing cloud score such that we can remove 
        bad images from the landsat collections we download.
        Implementation in javascript can be found of Google Earth Engine 
        website under (landsat algorithms), translation to python by KH.
        Further help from Nicholas Clinton at 
        https://urldefense.com/v3/__https://gis.stackexchange.com/questions/252685/filter-landsat-images-base-on-cloud-cover-over-a-region-of-interest*5Cn__;JQ!!LLK065n_VXAQ!zP9K-68-_oPkaNWFZdbTYYnai85ggL4j3FhdqssLkim-RneBr2NqD6Ka4fu6yw-v$         '''
        cloud = ee.Algorithms.Landsat.simpleCloudScore(image).select('cloud')
        cloudiness = cloud.reduceRegion(ee.Reducer.mean(),
                                        geometry=region,
                                        scale=30)
        image = image.set(cloudiness)
        return image
```
Authentification requirements to access and initialize the google engine library will be required.

```# Trigger the authentication flow
ee.Authenticate()

ee.Initialize()
```
Users of this program will have to settup an account to access their desired landsat repositories. This can be accomplished by entering the google earth engine website by entering: [link to GEE Authenticator](https://urldefense.proofpoint.com/v2/url?u=https-3A__earthengine.google.com&d=DwIGAg&c=-35OiAkTchMrZOngvJPOeA&r=D1EPOQw7iT2rfi0jWjWTnZkYQh-F5WCqnQ4vW6VmEU8&m=s8455fjUHJxhJxy6rtYNCjrjQubaSyiWL5ndEw2h881PJN3uEMouXpoyGm7ZGbHX&s=b6w2kNnP8I-VE92Y3tQTkOoYlM3QI-SpzVdsEB8gGmc&e=). Once the user sets up their account, they will then need to download and open the google earth engine library. This step requires authentification which can be completed in a seperate tab that will pop open on a seperate tab in which the user will have to enter your email associated with their google earth engine account. Subsiquently it will ask the user to allow for the google earth engine authentificator to manage their permisions on their google earth engine data and google cloud storage, which they will allow for the last step of the authentification process.

![Authentification_Image](https://raw.githubusercontent.com/IcanDXD/DSC_180_images/986c6947bdba86a84a794865044dd77efa4b7297/authentification_image.png)

![Authentification_Image_2](https://raw.githubusercontent.com/IcanDXD/DSC_180_images/692ea5d5aa910314782a221a86007b669310cda6/authentification_image_2.png)



bbox includess the coordinates for the bounding box we will be using for our image. Each list includes a longitude and latitude for each of the quadrants of our bounding box.
```
bbox = [(115.90619263363669, 38.910654401256274),
(116.12214264584372, 38.910654401256274),
(116.12214264584372, 38.988885740039514),
(115.90619263363669, 38.988885740039514)]
```
NDVI was chosen to be the band of choice for the manual labeling of urban expansion as it creates a great contrast between rural areas that contain large quantities of vegitation, and urban settlements which contain many concrete structures. This contrasts helps us differentiate between the two regions in the labeling portion of this project. 
The filtering of bands B4 and B5 is implemented here as they are used in the calculating the values of the tif images we download under the NDVI band.

```
bands = ['B4','B5']
```

```
start_date = datetime(2013,3,18)

end_date = datetime(2022,2,3)

region = ee.Geometry.Polygon(bbox)

collection = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA').filterDate(start_date,end_date).filterBounds(region)

cloud_tol=100
collection= collection.map(algorithm=cloudscore).filter(ee.Filter.lt('cloud', cloud_tol))
```
Because of the nature of satelite images, many of them end up either clipped or corruption. This is due to a combination of instrament error and faulty correction of the shifts in space as the satelites move. Therefore as there is no parameter to test for corrupted and clipped images, a manual filter was conducted where faulty images were noted to be excluded, which were of the dates listed bellow. But this can be skipped as there already exists a skip function for the labeling program in this project.
```
bad_dates = ['2013-04-05',
'2013-06-13',
 '2013-06-29',
 '2013-07-31',
 '2013-09-17',
 '2013-10-19',
 '2013-12-06',
 '2014-01-07',
 '2014-02-08',
 '2014-03-12',
 '2014-05-31',
 '2014-06-16',
 '2014-08-03',
 '2014-11-07',
 '2014-12-09',
 '2015-01-26',
 '2015-06-19',
 '2015-07-21',
 '2015-09-23',
 '2016-03-17',
 '2016-04-02',
 '2016-07-07',
 '2016-07-23',
 '2016-08-08',
 '2016-09-09',
 '2016-09-25',
 '2017-02-16',
 '2017-03-20',
 '2017-06-24',
 '2017-08-11',
 '2017-09-12',
 '2017-10-14',
 '2018-01-18',
 '2018-02-19',
 '2018-05-10',
 '2018-07-29',
 '2018-09-15',
 '2018-10-17',
 '2018-12-20',
 '2019-02-22',
 '2019-04-11',
 '2019-07-16',
 '2019-10-20',
 '2020-02-09',
 '2020-05-15',
 '2020-07-02',
 '2021-01-26',
 '2021-04-16',
 '2021-08-06',
 '2021-08-22',
 '2021-09-07',
 '2021-09-23',
 '2021-10-25']

from datetime import date

list_set = []
for i in range(len(bad_dates)):   
    datetime_object = date.fromisoformat(bad_dates[i])
    start = datetime_object + timedelta(days=1)
    end = datetime_object - timedelta(days=1)
    
    list_set.append((str(start), str(end)))

for i in range(len(list_set)):
    collection = collection.filter(ee.Filter.date(list_set[i][0], list_set[i][1]).Not())
```
Selects all images based on previously implimented filters includeing, cloud, date, and band selections.
```
collection = collection.select(bands)
collection_list = collection.toList(collection.size())

collection_size = collection_list.size().getInfo()
dates = geemap.image_dates(collection, date_format='YYYY-MM-dd').getInfo()
```

The following loop applies creates a NDVI band to be applied into images passed. They are then scaled to the apropriate dimensions and downloaded into the local machine. Scale can be increased or decreased to whatever value best interests the user; a higher scale reduces the image quality while a lower scale increases it. 
```
for i, date in enumerate(dates[:]):
    
    if date in bad_dates:
        continue
    image = ee.Image(collection_list.get(i))

    NDVI_image = (image.select('B5').subtract(image.select('B4'))
         .divide(image.select('B5').add(image.select('B4'))))
    NDVI_image = NDVI_image.unitScale(0, 1)
    
    geemap.ee_export_image(NDVI_image, filename = "testing_data/label_img/China_{}.tif".format(date), scale = 100, region = region, file_per_band = False)
```
 Using the code above, the processed tif files will be downloaded into the google-eartheingine-labeler/testing_data/label_img/ directory, as can be noted bellow.
```
    Directory: C:\Users\Administrator\DSC_180B\google-eartheingine-labeler\testing_data\label_img


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----        1/27/2022   1:43 PM                .ipynb_checkpoints
-a----         2/8/2022   4:08 PM          62412 China_2013-04-10.tif
-a----         2/8/2022   4:05 PM          61361 China_2013-04-26.tif
-a----         2/8/2022   4:05 PM          60509 China_2013-05-12.tif
-a----         2/8/2022   4:05 PM          60345 China_2013-08-16.tif
-a----         2/8/2022   4:05 PM          60509 China_2013-09-01.tif
-a----         2/8/2022   4:05 PM          60263 China_2013-10-03.tif
-a----         2/8/2022   4:05 PM          60857 China_2013-11-04.tif
-a----         2/8/2022   4:05 PM          62144 China_2013-11-20.tif
-a----         2/8/2022   4:05 PM          61780 China_2013-12-22.tif
-a----         2/8/2022   4:05 PM          62017 China_2014-04-13.tif
-a----         2/8/2022   4:05 PM          61894 China_2014-04-29.tif
-a----         2/8/2022   4:05 PM          60232 China_2014-05-15.tif
-a----         2/8/2022   4:05 PM          59925 China_2014-07-18.tif
-a----         2/8/2022   4:05 PM          60621 China_2014-08-19.tif
-a----         2/8/2022   4:05 PM          60318 China_2014-09-04.tif
-a----         2/8/2022   4:05 PM          59261 China_2014-09-20.tif
-a----         2/8/2022   4:06 PM          61031 China_2014-10-06.tif
-a----         2/8/2022   4:06 PM          62303 China_2014-12-25.tif
-a----         2/8/2022   4:06 PM          62327 China_2015-01-10.tif
-a----         2/8/2022   4:06 PM          62234 China_2015-03-15.tif
-a----         2/8/2022   4:06 PM          61805 China_2015-04-16.tif
-a----         2/8/2022   4:06 PM          61746 China_2015-05-02.tif
-a----         2/8/2022   4:06 PM          61382 China_2015-05-18.tif
-a----         2/8/2022   4:06 PM          60022 China_2015-06-03.tif
-a----         2/8/2022   4:06 PM          59251 China_2015-07-05.tif
-a----         2/8/2022   4:06 PM          60479 China_2015-08-06.tif
-a----         2/8/2022   4:06 PM          60004 China_2015-08-22.tif
-a----         2/8/2022   4:06 PM          60204 China_2015-09-07.tif
-a----         2/8/2022   4:06 PM          61070 China_2015-10-09.tif
-a----         2/8/2022   4:06 PM          61439 China_2015-11-26.tif
-a----         2/8/2022   4:06 PM          60065 China_2015-12-12.tif
-a----         2/8/2022   4:06 PM          61999 China_2015-12-28.tif
-a----         2/8/2022   4:06 PM          60882 China_2016-01-13.tif
-a----         2/8/2022   4:06 PM          61481 China_2016-01-29.tif
-a----         2/8/2022   4:06 PM          61855 China_2016-02-14.tif
-a----         2/8/2022   4:06 PM          62316 China_2016-03-01.tif
-a----         2/8/2022   4:06 PM          61648 China_2016-04-18.tif
-a----         2/8/2022   4:06 PM          61208 China_2016-05-04.tif
-a----         2/8/2022   4:06 PM          59531 China_2016-05-20.tif
-a----         2/8/2022   4:06 PM          59334 China_2016-06-05.tif
-a----         2/8/2022   4:06 PM          59728 China_2016-06-21.tif
-a----         2/8/2022   4:06 PM          60010 China_2016-10-11.tif
-a----         2/8/2022   4:06 PM          61098 China_2016-11-12.tif
-a----         2/8/2022   4:06 PM          61710 China_2016-11-28.tif
-a----         2/8/2022   4:06 PM          61804 China_2016-12-14.tif
-a----         2/8/2022   4:06 PM          59774 China_2016-12-30.tif
-a----         2/8/2022   4:06 PM          62264 China_2017-01-15.tif
-a----         2/8/2022   4:06 PM          61990 China_2017-01-31.tif
-a----         2/8/2022   4:06 PM          62294 China_2017-03-04.tif
-a----         2/8/2022   4:06 PM          61981 China_2017-04-05.tif
-a----         2/8/2022   4:06 PM          61311 China_2017-04-21.tif
-a----         2/8/2022   4:06 PM          60381 China_2017-05-07.tif
-a----         2/8/2022   4:07 PM          61329 China_2017-05-23.tif
-a----         2/8/2022   4:07 PM          60907 China_2017-06-08.tif
-a----         2/8/2022   4:07 PM          60686 China_2017-07-10.tif
-a----         2/8/2022   4:07 PM          60771 China_2017-09-28.tif
-a----         2/8/2022   4:07 PM          60439 China_2017-10-30.tif
-a----         2/8/2022   4:07 PM          60591 China_2017-11-15.tif
-a----         2/8/2022   4:07 PM          61786 China_2017-12-01.tif
-a----         2/8/2022   4:07 PM          61528 China_2017-12-17.tif
-a----         2/8/2022   4:07 PM          61137 China_2018-01-02.tif
-a----         2/8/2022   4:07 PM          61290 China_2018-02-03.tif
-a----         2/8/2022   4:07 PM          61189 China_2018-03-23.tif
-a----         2/8/2022   4:07 PM          61379 China_2018-04-08.tif
-a----         2/8/2022   4:07 PM          61120 China_2018-04-24.tif
-a----         2/8/2022   4:07 PM          60569 China_2018-06-11.tif
-a----         2/8/2022   4:07 PM          59500 China_2018-06-27.tif
-a----         2/8/2022   4:07 PM          60820 China_2018-10-01.tif
-a----         2/8/2022   4:07 PM          60656 China_2018-11-02.tif
-a----         2/8/2022   4:07 PM          60867 China_2018-11-18.tif
-a----         2/8/2022   4:07 PM          61081 China_2018-12-04.tif
-a----         2/8/2022   4:07 PM          61865 China_2019-01-21.tif
-a----         2/8/2022   4:07 PM          62223 China_2019-03-10.tif
-a----         2/8/2022   4:07 PM          61337 China_2019-03-26.tif
-a----         2/8/2022   4:07 PM          61408 China_2019-05-13.tif
-a----         2/8/2022   4:07 PM          61333 China_2019-05-29.tif
-a----         2/8/2022   4:07 PM          60934 China_2019-06-14.tif
-a----         2/8/2022   4:07 PM          60994 China_2019-06-30.tif
-a----         2/8/2022   4:07 PM          60194 China_2019-08-01.tif
-a----         2/8/2022   4:07 PM          60053 China_2019-08-17.tif
-a----         2/8/2022   4:07 PM          60326 China_2019-09-02.tif
-a----         2/8/2022   4:07 PM          60427 China_2019-09-18.tif
-a----         2/8/2022   4:07 PM          60153 China_2019-11-05.tif
-a----         2/8/2022   4:07 PM          61701 China_2019-12-07.tif
-a----         2/8/2022   4:07 PM          61878 China_2019-12-23.tif
-a----         2/8/2022   4:07 PM          62235 China_2020-01-08.tif
-a----         2/8/2022   4:07 PM          62319 China_2020-01-24.tif
-a----         2/8/2022   4:07 PM          61472 China_2020-03-12.tif
-a----         2/8/2022   4:07 PM          62072 China_2020-03-28.tif
-a----         2/8/2022   4:07 PM          61961 China_2020-04-13.tif
-a----         2/8/2022   4:08 PM          61541 China_2020-04-29.tif
-a----         2/8/2022   4:08 PM          61307 China_2020-05-31.tif
-a----         2/8/2022   4:08 PM          60120 China_2020-06-16.tif
-a----         2/8/2022   4:08 PM          60327 China_2020-08-03.tif
-a----         2/8/2022   4:08 PM          60250 China_2020-09-04.tif
-a----         2/8/2022   4:08 PM          60654 China_2020-09-20.tif
-a----         2/8/2022   4:08 PM          60253 China_2020-10-06.tif
-a----         2/8/2022   4:08 PM          60267 China_2020-10-22.tif
-a----         2/8/2022   4:08 PM          61433 China_2020-11-23.tif
-a----         2/8/2022   4:08 PM          61261 China_2020-12-09.tif
-a----         2/8/2022   4:08 PM          61700 China_2020-12-25.tif
-a----         2/8/2022   4:08 PM          61522 China_2021-01-10.tif
-a----         2/8/2022   4:08 PM          61688 China_2021-02-11.tif
-a----         2/8/2022   4:08 PM          62333 China_2021-02-27.tif
-a----         2/8/2022   4:08 PM          61658 China_2021-03-31.tif
-a----         2/8/2022   4:08 PM          61606 China_2021-05-02.tif
-a----         2/8/2022   4:08 PM          61374 China_2021-05-18.tif
-a----         2/8/2022   4:08 PM          61170 China_2021-06-03.tif
-a----         2/8/2022   4:08 PM          61041 China_2021-06-19.tif
-a----         2/8/2022   4:08 PM          59725 China_2021-07-05.tif
-a----         2/8/2022   4:08 PM          61170 China_2021-11-10.tif
-a----         2/8/2022   4:08 PM          61467 China_2021-11-26.tif
-a----         2/8/2022   4:08 PM          61593 China_2021-12-12.tif
-a----         2/8/2022   4:08 PM          62171 China_2021-12-28.tif
-a----         2/8/2022   4:08 PM          61788 China_2022-01-13.tif
```

The following is an example of one of the tif files under the NDVI bands, after resizing.
```
with rasterio.open('testing_data\label_img\China_2013-08-16.tif') as src:
    first_band = src.read(1)
    img = src.read()
 
rolled_img = np.rollaxis(img, 0,3)
print(rolled_img.shape)
plt.imshow(rolled_img[:,:,0:3])
```


![Xiong An New District](https://raw.githubusercontent.com/IcanDXD/DSC_180_images/8dff9bd1ec0175a59ce715a9fe79941a47c41a56/download.png)