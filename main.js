status_song1 = "";
left_wrist_score = 0;
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;

function preload(){
    harry_song = loadSound("harry.mp3");
    peter_song = loadSound("peter.mp3");
}

function setup(){
    canvas = createCanvas(700, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    background("white");
    image(video, 0, 0, 700, 500);
    stroke("red");
    fill("red");
    if(harry_song.isPlaying()){
        status_song1 = "true";
    }else{
        status_song1 = "false";
    }

    if(left_wrist_score > 0.2){
        circle(left_wrist_x, left_wrist_y, 20);
        peter_song.stop();
        harry_song.play();
        console.log("harry");
    }else{
        harry_song.stop();
        document.getElementById("song").innerHTML = " ";
    }

    if(status_song1 == "true"){
        harry_song.play();
        document.getElementById("song").innerHTML = "Harry Potter Theme Song";
    }else{
        harry_song.stop();
        document.getElementById("song").innerHTML = " ";
    }
}

function modelLoaded(){
    console.log("poseNet is Initialised.");
}

function gotPoses(result){
    if(result.length>0){
        console.log(result);
        left_wrist_score = result[0].pose.keypoints[9].score;
        left_wrist_x = result[0].pose.leftWrist.x;
        left_wrist_y = result[0].pose.leftWrist.y;
        right_wrist_x = result[0].pose.rightWrist.x;
        right_wrist_y = result[0].pose.rightWrist.y;
        console.log("Left Wrist X = "+ left_wrist_x +", Left Wrist Y = "+ left_wrist_x +", Right Wrist X = "+ right_wrist_x +", Right wrist Y = "+ right_wrist_y +", Left wrist score = "+ left_wrist_score +".");
    }
}