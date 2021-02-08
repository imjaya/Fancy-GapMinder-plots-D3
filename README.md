# Fancy-GapMinder-plots-D3
Application of animations and joins to create a scatterplot that animates the attribute and years for the dataset.

Live firebase deployement of the project: https://fancy-gapminder-plots.web.app/

* Download a set of four data attributes from the [GapMinder Data website](https://www.gapminder.org/data/) for use in your scatterplot.

Downloaded datasets:

Total population
Income per person (GDP per capita)
Life Expectancy
CO2 Emmisions (tonnes per person)
Child Mortality


* To Display a scatterplot on the webpage that shows two selected attributes for a specific year for a regional set of countries (Africa, North America, etc.).
* Changeable attributes include: Year, X, Y axis plot datasets, Region
* The user can also change the attributes shown in the scatterplot. Again, animate the transitions to update the positions of items.
* The user can also switch to a different regional set of countries. Use animated joins to make the "outgoing countries" disappear and "incoming countries" appear on the scatterplot.

* Based on the selections in the **X attribute**, **Y attribute**, **Region**, and **Year** controls, plot the region's countries on the scatterplot for the selected year.
* Linear scales are used for the y and x axes. The domain for each axis should go from 0 to the maximum value of the selected attribute for _all years in your dataset_ (ie, 1800-2020 or 1800-2100), not just the currently selected year. This means that, as your years update, your axes will not. When the user changes to a different attribute, at that point you can redraw the axis using the max value for that attribute. Be sure to label each axis.
* Each country in the scatterplot is visualized as a circle with a dark border. All circles are of same size. For each country's circle, add the abbreviation text centered on its circle. Country abbreviations are in the **geo** column in the `countries_regions.csv` file. The abbreviation text should fully fit inside the circle, so it's okay to tweak the text size and circle size to accomodate this. (Note that country abbreviations are 3 letters long.)  The circles for each region should have their own color (eg, all Latin America & Caribbean countries are color A, while Europe & Central Asia countries are color B, etc.).
* If the `Play` button is clicked, begin iterating through years. The circles in the scatterplot should fully animate for each year update, and the `Year` control's text should likewise update. If you reach the last year of the dataset, stop the animation. Likewise, if the user clicks the `Stop` button, then stop the animation on that year. The example GapMinder scatterplots on the [World Health Chart](https://www.gapminder.org/fw/world-health-chart/) page show this animation functionality.
* When the `Region` dropdown is updated, first remove the scatterplot's current countries circles/text labels using an animated transition that either animates their opacity to 0%, or shrinks their size to 0 (and then removes them from the DOM). Once this set of current countries is removed, use a second (delayed) animated transition to display the new region's countries in their correct positions, either fading in their opacity to 100%, or expanding the circles/text labels from size=0 to the appropriate size.
* If the user hovers over a country's circle, show a tooltip that shows the full name of the country. 


* **X attribute:** A `select` dropdown listing your four attributes. The selected attribute will be what is mapped along the x-axis in the scatterplot.
    * **Y attribute:** A `select` dropdown listing your four attributes. The selected attribute will be what is mapped along the y-axis in the scatterplot.
    * **Region**: A `select` dropdown listing the region options in the `countries_regions.csv` file in the **World bank region** column. There are seven regions here. The countries for the currently selected region will be what is shown in the scatterplot. You can optionally add an **All** option in this dropdown to visualize all 197 countries, though this is not required.
    * **Year:** An `<input type='number'>` element ([link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number)) that denotes the currently selected year. The selected year will be what is shown in the scatterplot. Optionally, you can also add a range slider beside this element that lets the user modify the year by scrubbing along the slider. If you do this, make sure both elements update to show the same values.
    * **Play:** A control that lets the user start and stop year playback. One way to do this is with an `<input type='button'>` element ([link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button)). When first pressed, the scatterplot will begin animating through the years. If pressed again, the animation will stop on the current year. When the playback is paused, the button's text should read "Play". When playback is currently happening, the button's text should read "Pause". (Alternatively, instead of a "Play/Pause" button, you could add an icon or image that alternates between Play and Pause images, similar to the first example on the [World Health Chart](https://www.gapminder.org/fw/world-health-chart/) page.)


Navigate to the project folder and run the following commands:

pip install simple-http-server 

python -m SimpleHTTPServer 8080
