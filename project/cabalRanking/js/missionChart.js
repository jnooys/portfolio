$(function(){
    var data = [
        {date:new Date("Fri Jan 09 2015 11:19"),score:200},
        {date:new Date("Sat Feb 21 2015 08:42"),score:300},
        {date:new Date("Tue Mar 03 2015 22:20"),score:500},
        {date:new Date("Wed Apr 01 2015 17:02"),score:400},
        {date:new Date("Thu May 21 2015 22:02"),score:620},
        {date:new Date("Fri Jun 12 2015 12:39"),score:580},
        {date:new Date("Tue Jul 07 2015 19:21"),score:280},
        {date:new Date("Tue Aug 04 2015 07:22"),score:420},
        {date:new Date("Sun Aug 30 2015 20:00"),score:580},
        {date:new Date("Wed Nov 18 2015 14:11"),score:900}
    ]
    /*json 파일 불러올 경우
    d3.json(url,function(data){
        missionChart(data);
    })*/
    missionChart(data);
})
function missionChart(data){
        var margin = {top:40,bottom:66,left:80},
            width = 883 - margin.left,
            height = 491 - margin.top - margin.bottom,
            x = d3.scale.ordinal().rangeRoundBands([0, width]).domain(data.map(function(d) {return d.date;})),
            y = d3.scale.linear().range([height, 0]).domain([0, d3.max(data, function(d) {return d.score*1.2;})]),
            xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(9).tickFormat(d3.time.format('%Y %b')),
            yAxis = d3.svg.axis().scale(y).orient("left").ticks(5).tickSize(-width).tickPadding(15),
            line = d3.svg.line().x(function(d) { return x(d.date); }).y(function(d){return y(d.score);});
        var xcoor = function(e){return x(e.date);}
        var ycoor = function(e){return y(e.score);}
        var svg = d3.select("#chartbox").append("svg").attr({"width":width + margin.left,"height":height + margin.top + margin.bottom});
        var visual = svg.attr("height", height + margin.top + margin.bottom)
        .append("svg:g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        visual.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        visual.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + (height-1) + ")")
          .call(xAxis);
        visual.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", line)
            .attr("transform", "translate(40,0)");
        visual.append("g")
            .attr({"class":"circle","transform":"translate(40,0)"})
            .selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("r", 7)
            .attr({"cx":xcoor,"cy":ycoor})
            .attr("cursor","pointer")
            .on("mouseover", function(d){
                var coord = [x(d.date),y(d.score)];
                showInfo(this, d.score,d.date,coord);
            }).on("mouseout", function(){
                hideInfo(this);
            });
        svg.append("rect")
            .attr("class","overaxis")
            .attr({"width":3,"x":margin.left,"height":height+margin.top});        
        svg.append("rect")
            .attr("class","overaxis")
            .attr({"width":width,"x":margin.left,"y":height+margin.top,"height":3});
    } 
    function showInfo(obj,score,date,pos) {
        d3.select(obj).attr("class","hover");
        var cinfo = d3.select(".cinfo");
        var hours = date.getHours() < 10 ? "0"+date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
        cinfo.style({"left":(pos[0]-10)+"px","top":(pos[1]-55)+"px"});
        $(".cinfo .score td").text(score);
        $(".cinfo .time td").text(hours+":"+minutes);
        $(".cinfo").addClass("show");
    }

    function hideInfo(obj){
        d3.select(obj).attr("class","");
        $(".cinfo").removeClass("show");
     }