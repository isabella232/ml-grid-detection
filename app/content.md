---
title: Machine Learning for Africa's Grid
---
#### Results of Applying Our Skynet Model

## Summary 
We demonstrated the feasibility of using Skynet to detect high voltage lines at very low resolutions using a previously unused imagery band called SAR-C. We also demonstrated that readily available optical imagery sources with existing training data, even at the highest resolutions, cannot detect power lines. However, we identified several new approaches methods that could make optical imagery workable.

## Background

### SAR-C Images 

SAR-C images are captured in the same band of radio waves that wifi uses. In many respects, they are simpler to deal with than optical images - they don’t have clouds or shadows. They are also readily available. The ESA provides global SAR coverage with it’s Sentinel-1 constellation of satellites.

Usually, SAR images measure  “surface roughness” (though they can also be used to measure a variety of other things, like terrain altitude). Very smooth surfaces, like desert, appear black, and rough surfaces like trees appear lighter. Somewhat rough surfaces like grass are grey.



SAR reflects off of artificial surfaces like concrete  and metal, making it useful for estimating population density. This property is also uniquely useful for detecting the power grid. 
 


Since many high voltage power pylons are made of steel, their glare is visible even at very low resolutions. The power grid shows clearly as rows of dots even when it is invisible in optical images.



### Machine Learning Using Satellite Images and Map Features
To detect whether a tiles has a power line in it, the computer uses a labeled dataset (tiles where it’s known for sure whether or not there’s a powerline) to make a guess about whether there’s a powerline in an unlabeled tile. We label the dataset using features from maps like OpenStreetMap or the Africa Grid Explorer.

To make valid predictions, the computer must have a lot (thousands) of accurate labeled tiles. This approach works really well for finding streets and buildings because there are typically lots of accurate OSM features to use. It’s more challenging to use for power grid detection because powerlines are a lot less common.

## Results
### Optical Images
Even with the best training data, powerlines in low resolution optical images could not be detected. However, it is possible that this is not a fundamental limitation, but caused by our data processing. Our current data processing setup imposes several limitations which, if resolved, could make optical imagery effective at this task.

Currently, we use an approach called semantic segmentation, where we ask the computer to “draw” the lines on the image. However, zoomed this far in, the difference between the physical location of the powerline and the location reported in Africa Grid Explorer is significant. The location of the line on the image therefore uncorrelated with the “correct” answer provided by the label. The program has no information it can use to make guesses.

We are working on switching to a different method, image classification, where the computer merely guesses whether or not the image container a power line. This has some disadvantages - it requires more labeled data and more data preprocessing. However, it should make it possible to use less accurate maps as labels.

Another contributing factor to the lack of success in using optical images is the image file format we use. Currently, all of the satellite images we use are downloaded as JPEGs, a format reduces file size by distorting sharp edges in images. Because we are trying to detect tiny objects with sharp edges (powerlines and pylons), JPEG makes them less visible.

### SAR Images
About half of power lines could be accurately detected using SAR images. The success of the model was highly terrain dependent. Lines could not be detected in mountains, for example. Given that, in these situations, the lines aren’t visible to humans either, this seems to be a fundamental technical limitation of the imagery. 

Other times, mountainous terrain gives false positives - the program guesses the existence of a powerline where there isn’t one. This problem could be solved by preprocessing the data to remove tiles with mountains in them or by adding Landsat images as an additional input which would allow the program detect what sorts of terrain it is seeing and avoid false positives accordingly.

Currently, our program is about 75% accurate (for a given image, there is a 75% chance that the program correctly decided whether or not it has a powerline in it). This can be tuned to favor completeness of up to 85% (i.e. 85% of images with powerlines are identified as having power lines) or accuracy of up to 80% (i.e. 80% of images identified as having power lines actually have power lines in them). 




## Further Steps
### Use Multispectral Imagery
Combining multiple sources of satellite imagery (i.e. SAR and Optical) would give our software more information, significantly reducing false positives. This would require rewriting parts of our skynet-data tool.

### Create an Image Classification Model
We’ve already created the model, but we’d need to rework skynet-data to handle much larger datasets.
