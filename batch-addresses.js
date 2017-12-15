

/*

	You'll need a file apiKey.js, with the following content:
	
	var apiKey.js = "your Google Maps API key";

	You get a Google Maps API key here:
	https://developers.google.com/maps/documentation/javascript/get-api-key

*/

map = new OpenLayers.Map("osm");
map.addLayer(new OpenLayers.Layer.OSM());

var url = "https://maps.googleapis.com/maps/api/geocode/json?address=Aeschlen+bei+Oberdiessbach,+Bern,+Switzerland&key="+apiKey;

var locations = [];
var urls = [];
var openRequests = 0;

document.getElementById("startButton").onclick = processAddresses;

function processAddresses(){

	var addr = document.getElementById("addresses").value;

	addr = addr.split(";");

	for(var i = 0; i < addr.length; i++){
		addr[i] = encodeURIComponent(addr[i].trim());

		if(addr[i] != ""){
			openRequests++;
			
			var url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
			url += addr[i];
			url += "&key="+apiKey;

			urls.push(url);
		}
	}

	document.getElementById("openRequests").innerHTML = openRequests;

	doRequests();
	
};

function doRequests(){
	var delay = 50;

	var url = urls.shift();
	if(url){
		makeRequest(url, handleResponse);
		setTimeout(doRequests, delay);
	}
	
}

function handleResponse(responseText, status, url){

	openRequests--;
	document.getElementById("openRequests").innerHTML = openRequests;

	if(status == "200"){
		var json = JSON.parse(responseText);
		if(json.results.length > 0){
			locations.push(json.results[0].geometry.location);
		} else {
			console.log(json);
			console.log(url);
		}
		
	} else {
		console.log(status);
		console.log(url);
	}

	if(openRequests == 0){
		processLocations();
	}
	
}

function processLocations(){

	var openLayersPoints = [];

	var outString = "";

	var markers = new OpenLayers.Layer.Markers("Markers");
	map.addLayer(markers);

	for(var i = 0; i < locations.length; i++){
		var point = new OpenLayers.LonLat(locations[i].lng, locations[i].lat)
			.transform(
				new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
				map.getProjectionObject() // to Spherical Mercator Projection
			);

		markers.addMarker(new OpenLayers.Marker(point));
		
		openLayersPoints.push(point);

		outString += locations[i].lat +", "+locations[i].lng+"\n";
	}

	console.log(outString);

	var zoom=12;

	map.setCenter(openLayersPoints[0], zoom);
}

function makeRequest(url, callback){
	
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	//xmlhttp.withCredentials = true;
	
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4){
			callback(xmlhttp.responseText, xmlhttp.status, url);
		}
	};

	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	/*if(!xmlhttp.withCredentials){
		xmlhttp.abort();
		
		console.log("Could not load file "+url);
		
	} else {
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}*/
}
