
# Title: Prediction Model and Analyses
### Author: Ivan Cano
### Date: 3/5/2022
---
## Predictive Model
---
INSERT ML MODEL PORTION HERE
## Analyses of Prediction Model
---

Here we used our ml model we made in the previous step and processed the saved data we have in our testing_data/full_img/, already filled in the data_collection portion of this project. Although any tif files of the same dimensions as the images used for our train model could theoreticaly be used.
```
from os import listdir
from os.path import isfile, join

onlyfiles = [f for f in listdir(full_directory) if isfile(join(full_directory, f))]

model_predictions = []
for i in onlyfiles:
    with rasterio.open('testing_data/full_img/'  + i) as src:
    #     print(src.shape)
        img = src.read()
#     img.flatten(order = 'C')
    
        img_test = np.rollaxis(img.reshape(16,e_dims[1]*e_dims[2]),0,2)

        model_predictions.append(fclf.predict(img_test))
```

Here, we parse through the labels that we went acquired through our ml model. We then counted all the urban labels and and non_urban labels and created a ratio from these two value, where the length of urban labels was divided over the length of non_urban labels to get our desaired ratio.

```
urban_ratio = []
for i in model_predictions:
    urban_count = 0
    for j in i:
        if j == 'urban':
            urban_count += 1
#     print(urban_count)
    non_urban_count  = len(i) - urban_count
    urban_ratio.append(urban_count/non_urban_count)
```
```
import datetime
```
Here we pull all the names of the images we used for our ml model so that we could extract the dates associated with each tif file.  We were able to extract the dates from the images by slicing their names which contained their associated dates and appended those dates to a list. We then formated and changed data type of the dates to datetime.date objects to better process the dates in our analyses.

```
onlyfiles[0][6:16]
dates = []
for i in onlyfiles:
    dates.append(i[6:16])

x_values = [datetime.datetime.strptime(d,"%Y-%m-%d").date() for d in dates]
x_values
```

```
plt.plot(x_values, urban_ratio)
```
FIRST IMAGE HERE
```
import numpy as np
import scipy.stats as st
```

```
year_list = []
for i in x_values:
    year_list.append(i.year)
```

```
years = np.unique(year_list)
```
```
year_avg = {}
for i in years:
    year_avg[i] = []
```

```
pd.Series(year_list).value_counts()
for count, value in enumerate(urban_ratio):
    year_avg[year_list[count]].append(value)
```
```
list_year_average = []
for i in year_avg:
    list_year_average.append(np.mean(year_avg[i]))
list_year_average
```
[0.8932386322805885,
 0.5961964284060416,
 2.541952400843471,
 3.257714599207024,
 1.249241606661275,
 1.3375268946199286,
 1.0263152629146564,
 1.1877434043813473,
 1.450091265543045,
 2.5116910229645093]

 ```
 urban_ratio_corrected  = urban_ratio.copy()
bad_index = []
x_values_corrected = x_values.copy()
for i in urban_ratio_corrected:
    if i > 4:
        outlier_index = urban_ratio_corrected.index(i)
        bad_index.append(outlier_index)
count = 0
for i in bad_index:
    urban_ratio_corrected.pop(i - count)
    x_values_corrected.pop(i - count)
    count += 1
 ```
SECOND IMAGE
 ```
 plt.plot(x_values_corrected, urban_ratio_corrected)
 ```
## dates dates to days
 ```
 import datetime
 ```
 ```
 my_date = x_values_corrected[0]
x_datetime = [datetime.datetime(i.year, i.month, i.day).timestamp() for i in x_values_corrected]
 ```
 ```
 x_datetime_start = min(x_datetime)
x_datetime_days = [(x - x_datetime_start)/(60 * 60 * 24) for x in x_datetime]
 ```
```
x_minutes_reshaped = np.array(x_datetime_days).reshape((-1, 1))
```
## Testing for linear relationship

```
import numpy as np
from sklearn.linear_model import LinearRegression
reg = LinearRegression().fit(x_minutes_reshaped, urban_ratio_corrected)
reg.score(x_minutes_reshaped, urban_ratio_corrected
```
0.05540008335192936
```
reg.intercept_
```
0.7142641939421813
```
reg.coef_
```
array([0.000236])
```
reg.coef_ * 365
```


