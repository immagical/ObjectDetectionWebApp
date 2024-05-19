modelStatus = " "
objects = []; 
function preload() {
    playground = loadImage("playground.jpg"); 
}
function setup() {
    canvas = createCanvas(600, 500); 
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object"; 
    
}

function modelLoaded() {
    console.log("Model Loaded"); 
    modelStatus = "true"; 
    objectDetector.detect(playground, gotResults); 
}

function gotResults(error, results) {
    if(error) {
        console.error(error); 
    }
    else {
        console.log(results); 
        objects = results; 
    }
}

function draw() {
    image(playground, 0, 0, 600, 500); 
    if(modelStatus != " ") {
    for(i=0; i<objects.length; i++){
        noFill(); 
        stroke("red"); 
        strokeWeight(4); 
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
        fill("white")
        stroke("blue");  
        textSize(20); 
        confidence = Math.floor(objects[i].confidence*100) + "%"; 
        text(objects[i].label + " - " + confidence, objects[i].x, objects[i].y)
    }
    document.getElementById("status").innerHTML = "Status: Object Detected"; 
    document.getElementById("numObjects").innerHTML = "Number of Objects Detected: " + objects.length; 
}
}

function back() {
    window.location = "index.html"; 
}