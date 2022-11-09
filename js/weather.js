$(document).ready(function () {
    $.ajax({
        url: "api/weather.json",
        method: "get",
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (Data) {
            //console.log(Data);
            //Calling
            fnDrawMultiLineChart(Data, "MarsWeatherChart");
        }
    });
});

// draw chart
function fnDrawMultiLineChart(Data, DivID) {
    console.log(Data);
    var margin = { top: 50, right: 80, bottom: 50, left: 50 },
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y-%m-%d");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category20();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    // xData gives an array of distinct 'Weeks' for which trends chart is going to be made.
    var xData = Data[0].WeeklyData.map(function (d) {
        var d = new Date(d.date);
        var m = d.toISOString().substr(0, 10);
        return m;
    });

    console.log(xData);

    var line = d3.svg.line()
        .x(function (d) {
            var d = new Date(d.date);
            var m = d.toISOString().substr(0, 10);
            return x(m) + x.rangeBand() / 2;
        })
        .y(function (d) { return y(d.value); });

    var svg = d3.select("#" + DivID).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + 75 + "," + margin.top + ")");

    color.domain(Data.map(function (d) { return d.name; }));

    x.domain(xData);

    var valueMax = d3.max(Data, function (r) { return d3.max(r.WeeklyData, function (d) { return d.value; }) });
    var valueMin = d3.min(Data, function (r) { return d3.min(r.WeeklyData, function (d) { return d.value; }) });
    y.domain([valueMin, valueMax]);

    //Drawing X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Drawing Horizontal grid lines.
    svg.append("g")
        .attr("class", "GridX")
        .selectAll("line.grid").data(y.ticks()).enter()
        .append("line")
        .attr(
            {
                "class": "grid",
                "x1": x(xData[0]),
                "x2": x(xData[xData.length - 1]) + x.rangeBand() / 2,
                "y1": function (d) { return y(d); },
                "y2": function (d) { return y(d); },
                "stroke":"#000"
            });
    // Drawing Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("y", -20)
        .attr("x", 60)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-size", "20px")

    svg.append("circle")
        .attr("cx", 120)
        .attr("cy", -30)
        .attr("r", 6)
        .style("fill", "rgb(31, 119, 180)")
    svg.append("circle")
        .attr("cx", 300)
        .attr("cy", -30)
        .attr("r", 6)
        .style("fill", "rgb(174, 199, 232)")
    svg.append("text")
        .attr("x", 140)
        .attr("y", -30)
        .text("Highest Temperature")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle")
        .style("fill", "rgb(256 256 256/ 60%)")
    svg.append("text")
        .attr("x", 320)
        .attr("y", -30)
        .text("Lowest Temperature")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle")
        .style("fill", "rgb(256 256 256/ 60%)")

    // Drawing Lines for each segments
    var segment = svg.selectAll(".segment")
        .data(Data)
        .enter().append("g")
        .attr("class", "segment");

    segment.append("path")
        .attr("class", "line")
        .attr("id", function (d) { return d.name; })
        .attr("visible", 1)
        .attr("d", function (d) { return line(d.WeeklyData); })
        .style("stroke", function (d) { return (d.name); });
    // Creating Dots on line
    segment.selectAll("dot")
        .data(function (d) { return d.WeeklyData; })
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function (d) {
            var d = new Date(d.date);
            var m = d.toISOString().substr(0, 10);
            return x(m) + x.rangeBand() / 2;
        })
        .attr("cy", function (d) { return y(d.value); })
        .style("stroke", "none")
        .style("fill", function (d) { return color(this.parentNode.__data__.name); })
        .on("mouseover", mouseover)
        .on("mousemove", function (d) {
            divToolTip
                .text(this.parentNode.__data__.name + "\n" + d.date + " : " + d.value + "° F")
                .style("left", (d3.event.pageX + 15) + "px")
                .style("top", (d3.event.pageY - 10) + "px");
        })
        .on("mouseout", mouseout);

    d3.selectAll(".segmentText").on("click", function (d) {
        var tempId = d3.select(this).attr("Segid");
        var flgVisible = d3.select("#" + tempId).attr("visible");

        var newOpacity = flgVisible == 1 ? 0 : 1;
        flgVisible = flgVisible == 1 ? 0 : 1;

        // Hide or show the elements
        d3.select("#" + tempId).style("opacity", newOpacity)
            .attr("visible", flgVisible);

    });
    // Adding Tooltip
    var divToolTip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 1e-6);

    function mouseover() {
        divToolTip.transition()
            .duration(500)
            .style("opacity", 1);
    }
    function mouseout() {
        divToolTip.transition()
            .duration(500)
            .style("opacity", 1e-6);
    }
}


