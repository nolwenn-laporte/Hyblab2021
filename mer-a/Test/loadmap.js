'use strict'
var width = 1400;
var height = 1000;

function generateMap(mapData){
	var svg = d3.select("#bretagne")
		.append('svg')
		.attr("width", width)
		.attr("height", height);

	var center = d3.geoCentroid(mapData);

	// Map and projection
	var projection = d3.geoMercator()
		.center(center)                // GPS of location to zoom on
		.scale(20000)                       // This is like the zoom
		.translate([ width /2, height/2 ])

	//var myColor = d3.scaleLinear().domain([1,4]).range(["white", "blue"]);
	var path = d3.geoPath().projection(projection);



		// Draw the map
	svg.append("g")
		.selectAll("path")
		.data(mapFusion.features)
		.enter()
		.append("path")
			.attr('id',function(d) { return 'path_' + d.properties.code})
			.attr("fill", function(d){return color(d);})
			.attr("d", path)
			.on('mouseover', function(d){ hover(d,this);})
			.on('mouseleave', function(d){ leave(d,this)})
			.style('stroke','rgb(255,128,0)')
			.style('stroke-width', '1px');

	svg.append("g")
		.selectAll("labels")
		.data(mapData.features)
		.enter()
		.append("text")
			.attr('id', function(d) { return 'text_' + d.properties.code})
			.attr("x", function(d){return path.centroid(d)[0]})
			.attr("y", function(d){return path.centroid(d)[1]})
			.text(function(d){ return d.properties.nom})
			.attr("text-anchor", "middle")
			.attr("alignment-baseline", "central")
			.on('mouseover', function(d){
				let code = d.properties.code;
				let path = document.getElementById('path_' + code); 
				hover(d,path);
			})
			.on('mouseleave', function(d){ 
				let code = d.properties.code;
				let path = document.getElementById('path_' + code); 
				leave(d,path);
			})
			.style("font-size", 32)
			.style("fill", "white")

}

function color(d){
	let color = '';
	let name = d.properties.nom; 
	if(name === 'Ille-et-Vilaine' || name === 'Côtes-d\'Armor'){
		color = '#c4df9b';
	}
	else if(name === 'Finistère'){
		color = '#a3d39c';
	}
	else if(name === 'Morbihan'){
		color = '#82ca9c';
	}
	else{
		color = '#E8E7ED';
	}
	return color;
}

function hover(d,t){
// 	d3.select(t).style("fill", "rgb(170,120,180)");
	d3.select(t)
		.style("opacity", 0.9);
//		.style("z-index", 100);
	console.log(d);
	let name = d.properties.nom;
	let code = d.properties.code;
	//d3.select('#text_' + code).style("z-index", 1);
	console.log(name);
	if(name === 'Ille-et-Vilaine'){
		//d3.select('#Côtes-d\\\'Armor').style("fill", "rgb(170,120,180)")
		d3.select('#path_22').style("opacity", 0.9);
		//d3.select('#text_Côtes-d\\\'Armor').style("opacity", 0.7);
	}
	else if(name === 'Côtes-d\'Armor'){
		//d3.select('#Ille-et-Vilaine').style("fill", "rgb(170,120,180)")
		d3.select('#path_35').style("opacity", 0.9);
	}
}

function leave(d,t){
//	d3.select(t).style("fill", "rgb(150,110,160)");
	d3.select(t).style("opacity", 1);

	console.log(d);
	let name = d.properties.nom; 
	if(name === 'Ille-et-Vilaine'){
		//d3.select('#Côtes-d\\\'Armor').style("fill", "rgb(150,110,160)")
		d3.select('#path_22').style("opacity", 1)
	}
	else if(name === 'Côtes-d\'Armor'){
		//d3.select('#Ille-et-Vilaine').style("fill", "rgb(150,110,160)")
		d3.select('#path_35').style("opacity", 1)
	}
}

function colorFocusDepartement(d,t,nameDep){
	let name = d.properties.nom; 
	if(name != nameDep){
		//d3.select('#Côtes-d\\\'Armor').style("fill", "rgb(150,110,160)")
		d3.select(t).style("fill", '#A0A0A0')
	}
	else{
		d3.select(t).style("fill", '#EFEFF7')
	}
}

function selectDepartment(event){

	//document.getElementById('bretagne').innerHTML= '';
	d3.selectAll("path").attr("fill", function(d){return colorFocusDepartement(d,this,'Morbihan');})
}

generateMap(mapData);