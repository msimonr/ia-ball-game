// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import * as cocossd from "@tensorflow-models/coco-ssd"
import Webcam from "react-webcam";
import "./App.css";
// 2. TODO - Import drawing utility here
import { drawRect, colision, drawLose, choose} from "./utilities";

//Game variables
var toque = undefined;
var id = undefined;
var circle = {'x': 0, 'y':0, 'r':50, 'dx':1, 'dy':1, 'speed':20};

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();
    const net = await cocossd.load();
    //  Loop and detect hands
     id = setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      // e.g. const obj = await net.detect(video);
      
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      const obj = await net.detect(video);
      
      //console.log(obj);

      //COLISION

      toque = colision(obj, circle);

      if (toque !== undefined){
        //Hubo colision, se debe mostrar la captura y quedarse ahi.
        drawLose(video, toque, ctx, circle);
        clearInterval(id);
      }else{
      // --------- MOVIMIENTO CIRCULO EN PANTALLA ---------------
      
      let positive = [0.7,1.05, 1];
      let negative = [-0.7,-1.05, -1];

      //Direccion horizontal:
      if(circle.x + circle.r > canvasRef.current.width + 10){
        circle.dx = choose(negative);
      }else if(circle.x - circle.r < -10){
        circle.dx = choose(positive);;
      }

      //Direccion vertical:
      if(circle.y + circle.r > canvasRef.current.height + 10){
        circle.dy = choose(negative);;
      }else if(circle.y - circle.r < -10){
        circle.dy = choose(positive);;
      }

      //Actualizar posicion circulo
      circle.x = circle.x + circle.dx*circle.speed;
      circle.y = circle.y + circle.dy*circle.speed;



      // 5. TODO - Update drawing utility
      drawRect(obj, ctx, circle);
    }
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
