# Coordinates from a batch of addresses

This tool can generate a list of coordinates from a large batch of addresses.

## Setup

Download the files and set them up in your favourite local web server.
You will then have to create a file `apiKey.js` in the same folder as index.html with the following content:

    var apiKey = "Your Google Maps API Key";

You can obtain a Google Maps API key [here](https://developers.google.com/maps/documentation/javascript/get-api-key).

Also note that the version of the OpenLayers API I used for OpenStreetMap only works over http.

## Usage

Paste addresses separated by semicolons into the input field and press `Go`.
The addresses may be formatted in any way that Google Maps would understand.

Examples:

    Güterstrasse 8, 3008 Bern;
    bundesplatz 1, bern;
    Hinterkappelen;

The coordinates will be printed in your browser's dev console.
The output for the above example would look like this:

    46.9471068, 7.4449111
    46.9678052, 7.3774817
    46.9477341, 7.4156457

The points will also be displayed on the OpenStreetMap frame.
