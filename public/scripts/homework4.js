var mapSvg;

var lineSvg;
var lineWidth;
var lineHeight;
var lineInnerHeight;
var lineInnerWidth;
var lineMargin = { top: 20, right: 60, bottom: 60, left: 100 };
var year;
var x_attr;
var mapData;
var timeData;
var Region;
var color;
var country_color;
var x_label;
var y_label;
var interval;


function year_increment()
{
  year=document.getElementById("year-input").value;
if(year>=1800 && year<=2100)
{
  year++;
  d3.select("#year-input").property('value', year)
  drawMap(year);
  
  d3.select("#year-back").text(year)
  //year++;
}
}

// This runs when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
  year=document.getElementById("year-input").value;
  svg = d3.select('#map');
  svg.append('g').attr("id","plots")
  tooltip=d3.select("body").append("div")
  
  .attr("class","tooltip")
  .style("opacity",0);
  // Load both files before doing anything else
  Promise.all([d3.csv('data/countries_regions.csv'),d3.csv('data/emmision_new.csv'),d3.csv('data/income_new.csv'),d3.csv('data/life_expectancy_new.csv'),d3.csv('data/population_new.csv'),d3.csv('data/mortality_new.csv')])
  .then(function(values){

countries_region = values[0];
emmision = values[1];
income=values[2];
life_expectancy=values[3];
population=values[4];
mortality=values[5];
drawMap(year);
})

const playBtn = d3.select('#play-button')
const resetBtn = d3.select('#reset-button')
playBtn.on('click', () => {
  if (playBtn.text() === 'Play') {
    playBtn.text('Pause')
    interval = setInterval(year_increment, 1000)
  } else {
    playBtn.text('Play')
    clearInterval(interval)
  }
})

// resetBtn.on('click', () => {
//   time = 0
//   playBtn.text('Play')
//   clearInterval(interval)
//   update(data[time])
// })
// text label for year


});
var min_max={
  "Income":[0,179000],"Life_expectancy":[0,94.8],"Emmision":[0,10100000],"Population":[0,1650],"Mortality":[0,756]

}



// Draw the map in the #map svg
function drawMap(year) {
//////////////////////////////////////////////////
 // get the selected year, x-attr,y-attr,region based on the input box's value
 //d3.select("#points").remove();
  d3.select("#axis-y").remove();
  d3.select("#axis-x").remove();
  d3.select("#y_label").remove();
  d3.select("#x_label").remove();
  d3.select("#year_back").remove();
  //d3.select("#circle_text").remove();
 year=document.getElementById("year-input").value;
 x_attr=document.getElementById("x_attribute").value;
 x_r=x_attr;
 
 if(x_attr=="Population")
 {
  x_label=x_attr +" (in millions)";
  x_extent=min_max[x_attr];
   x_attr=population;
     
 }
 if(x_attr=="Income")
 {
  x_label=x_attr + " per person (GDP/capita)";
  x_extent=min_max[x_attr];
   x_attr=income;
  
 }
 if(x_attr=="Life_expectancy")
 {
  x_label=x_attr +" (in years)";
  x_extent=min_max[x_attr]; 
  x_attr=life_expectancy;
  
 }
 if(x_attr=="Emmision")
 {
  x_label="CO2 Emission (1000 tonnes)";
  x_extent=min_max[x_attr];
   x_attr=emmision;
   
 }
 if(x_attr=="Mortality")
 {
  x_label="Child Mortality ( per 1000 born)";
  x_extent=min_max[x_attr];
   x_attr=mortality;
   
 }


 var y_attr=document.getElementById("y_attribute").value;
 y_r=y_attr;
 if(y_attr=="Population")
 {
  y_label=y_attr +" (in millions)";
  y_extent=min_max[y_attr];
   y_attr=population;
  
 }
 if(y_attr=="Income")
 {
  y_label=y_attr + " per person (GDP/capita)";
  y_extent=min_max[y_attr];
   y_attr=income;
  
 }
 if(y_attr=="Life_expectancy")
 {
  y_label=y_attr +" (in years)";
  y_extent=min_max[y_attr];
   y_attr=life_expectancy;
   
 }
 if(y_attr=="Emmision")
 {
  y_label="CO2 Emission (1000 tonnes)";
  y_extent=min_max[y_attr];
   y_attr=emmision;
   
 }
 if(y_attr=="Mortality")
 {
  y_label="Child Mortality (per 1000 born)";
  y_extent=min_max[y_attr];
   y_attr=mortality;
   
 }

 Region=document.getElementById("region_attribute").value;
 // make a list of countries based upon the selected region
 color={"East Asia & Pacific":"#FF1493",	"Europe & Central Asia":"#FFA07A","Latin America & Caribbean":"#FF0000","Middle East & North Africa":"#FFFF00","North America":"#00FF00","South Asia":"#00FFFF","Sub-Saharan Africa":"#808000"};
 country_list=[];
 country_code=[];
 country_color=[];
 //console.log(countries_region);
 if(Region=="All")
 {
  let regionData = countries_region;
  regionData.forEach(element => {country_list.push(element.name); country_code.push(element.geo); country_color.push(color[element.region]);});
 }
 else
 {
 let regionData = countries_region.filter( d => d.region == Region); 
 regionData.forEach(element => {country_list.push(element.name); country_code.push(element.geo); country_color.push(color[Region]);});
 }
 console.log(country_list);
 console.log(country_code);
 console.log(country_color); 
//////////////////////////////////////////////////
//store x and y data in list
x_data=[];
y_data=[];
var XData = x_attr.filter( d => d.Year == year);
var YData = y_attr.filter( d => d.Year == year);


for(i in country_list)
{
  //console.log()
  for (let [key, value] of Object.entries(XData[0])) {
     if(country_list[i]==String(key)){
       if(x_r=="Population")
       {
        x_data.push(parseInt(value)/1000000)
       }
       else{
      x_data.push(parseInt(value))
       }
     }
   }
   
   for (let [key, value] of Object.entries(YData[0])) {
    if(country_list[i]==String(key)){
      if(y_r=="Population")
      {
        y_data.push(parseInt(value)/1000000)
      }
      else{
     y_data.push(parseInt(value))
      }
    }
  }

}

data=[]
for (var i=0;i<x_data.length;i++)
{
  data.push([x_data[i],y_data[i],country_code[i],country_color[i],country_list[i]])
}
console.log(data)
scatterplot(data);
}

//////////////////////////////////////////////////////////////////////////
function scatterplot(data)
{
// set the dimensions and margins of the graph
var margin = {top: 40, right: 40, bottom: 10, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
svg
      .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

          var x = d3.scaleLinear()
  
          .domain(x_extent)
          .range([ 1, width ]);
        
          var y = d3.scaleLinear()
         
            .domain(y_extent)
            .range([ height, 0]);
        
            var focus = svg
            .append('g')
            .append('circle')
              .style("fill", "none")
              .attr("stroke", "black")
              .attr('r', 10)
              .style("opacity", 0)
 const t=d3.transition().duration(1000)
    // console.log(data[0][0].toString()+data[0][1].toString()+data[0][2])
    svg.selectAll("g")
    .data(data)
    .join(
      enter => enterRects(enter, t),
      update => updateRects(update, t),
      exit => exitRects(exit, t)
    )
    
function enterRects(enter, t){     
  console.log("inside enter section")

// Add dots
enter.append("g")
.attr("id", "points")
  //.selectAll("dot")
  .call(
    g => g
    .on('mouseover', function(data,i){
      showTooltip(data);
    })
    .on('mousemove', function(data){
                     showTooltip(data);
      
    })
    
    .on('mouseout', function(data){
      tooltip.transition()
      .duration('50')
      .style("opacity",0);          
    
    })
  
    .append("circle")
    .transition(t)
    
    .attr("cx", function (d) {return x(d[0]); } )
    .attr("cy", function (d) { return y(d[1]); } )
    //.attr("transform", "translate(0,210)")
    .attr("r", 20)
    .attr("transform", "translate(+200,20)") 
    .style("stroke", "black")
    .style("stroke-width","2")
    .style("border",4)
    .style("fill",function (d) {return d[3]; })
  )

  .call(g =>g.append("text")
    // Add Text Labels
    .transition(t)
.attr("id","circle_text")
//.selectAll("dot")
.text(function(d) {
    return d[2];
})
.attr("x", function(d) {
    return x(d[0]);  // Returns scaled location of x
})
.attr("y", function(d) {
    return y(d[1]);  // Returns scaled circle y
})
.attr("transform", "translate(-10,0)")
.attr("font_family", "sans-serif")  // Font type
.attr("font-size", "15px")  // Font size
.attr("transform", "translate(+190,20)") 
.attr("fill", "black")   // Font color
  )
}

function updateRects(update,t)
{
  console.log("inside update section")
update
.call(g=>g.transition(d3.transition().duration(1000))
  .select('circle')
.attr("cx", function (d) {return x(d[0]); } )
.attr("cy", function (d) { return y(d[1]); } )
//.attr("transform", "translate(0,210)")
.attr("r", 20)
.style("stroke", "black")
.style("stroke-width","2")
.style("border",4)
.attr("transform", "translate(+200,20)") 
.style("fill",function (d) {return d[3]; })
  )

.call(g=>g.transition(t)
  .select('text')
.text(function(d) {
  return d[2];
})
.attr("x", function(d) {
  return x(d[0]);  // Returns scaled location of x
})
.attr("y", function(d) {
  return y(d[1]);  // Returns scaled circle y
})
//.attr("transform", "translate(-10,0)")
.attr("transform", "translate(+190,20)") 
.attr("font_family", "sans-serif")  // Font type
.attr("font-size", "15px")  // Font size
.attr("fill", "black")   // Font color
)

}

function  exitRects(exit,t)
{
  console.log("inside exit section")

  exit
  .call(g=>
    g.transition(t)
    .style('opacity',0)
    .remove()
  )

} 

  // Add Y axis
  
  svg.append("g")
  .attr("transform", "translate(+200,20)") 
  .attr("id", "axis-y")

    .call(d3.axisLeft(y));

   // Add X axis
  
 svg.append("g")
   .attr("transform", "translate(200,670)")
   .attr("id", "axis-x")
   .call(d3.axisBottom(x));



// text label for the x axis
svg.append("text")  
.attr("id","x_label")           
    .attr("transform",
    "translate(" + (width/2 +250) + " ," + 
    (height + margin.top+80/2) + ")")
  .style("text-anchor", "middle")
  .style("stroke","black")
  .text(x_label);

  console.log(x_label);
  console.log(y_label);
   // text label for the y axis
svg.append("text")
.attr("id","y_label")
.attr("transform", "rotate(-90)")
//.attr("id", "y-label")
.attr("y",80)
.attr("x",0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.style("stroke","black")
.text(y_label);

svg.append("text")  
.attr("id","year_back")           
    .attr("transform",
    "translate(" + (width/2 +200) + " ," + 
    (height-300) + ")")
  .style("text-anchor", "middle")
  .style("stroke","gray")
  .attr("font-size", "120px")
  .attr("opacity","0.5")
  .text(parseInt(document.getElementById("year-input").value));


}


function showTooltip(data)
{
  //d3.select(this).transition()
  label=data[4];
  tooltip.transition()
  .duration(50)
  .style("opacity",1);
  tooltip.html(label)
  //.style("text-align","left")
               .style("left", (d3.event.pageX+10) + "px")
               .style("top", (d3.event.pageY-15) + "px");
}