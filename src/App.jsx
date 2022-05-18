import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd"
import Webcam from "react-webcam";
import "./App.css";
import { drawRect, colision, drawLose, choose} from "./utilities";

//Game variables
var toque = undefined;
var id = undefined;
var circle = {'x': -100, 'y':-100, 'r':50, 'dx':1, 'dy':1, 'speed':20, 'transparencia': 60};

class Control extends React.Component{

  state = {
    speed: 20,
    radio: 50,
    transparencia: 60
  }

  reiniciar = () =>{
    if(toque !== undefined){
      circle.x = -100;
      circle.y = -100;
      circle.r = this.state.radio;
      circle.speed = this.state.speed;
      circle.transparencia = this.state.transparencia;
      toque = undefined;     
    }
  }

  setSpeed = (e) =>{
    this.setState({speed: parseFloat(e.target.value)});
  }

  setRadio = (e) =>{
    this.setState({radio: parseFloat(e.target.value)});
  }

  setTransparencia = (e) =>{
    this.setState({transparencia: parseFloat(e.target.value)});
  }

  render(){
    return(
      <div className="Control">
        <label>Velocidad de bola</label>
        <input type="number" min='1' id="speed" defaultValue={this.state.speed} onChange={this.setSpeed}/>
        <label>Radio de bola</label>
        <input type="number" min='10' id="radio" defaultValue={this.state.radio} onChange={this.setRadio}/>
        <label>Transparencia</label>
        <input type="number" min='10' id="transparencia" defaultValue={this.state.transparencia} onChange={this.setTransparencia}/>
        <button onClick={this.reiniciar}>Reiniciar</button>
      </div>
    )
  }
}



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
    if(toque !== undefined){

    }else{
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
      }else{
      // --------- MOVIMIENTO CIRCULO EN PANTALLA ---------------
      
      let arraySpeed = [0.95,1.05, 1];
      
      let margen = circle.r * 0.2;
      //Direccion horizontal:
      if(circle.x + circle.r > canvasRef.current.width + margen){
        circle.dx = choose(arraySpeed)*-1;
      }else if(circle.x - circle.r < -margen){
        circle.dx = choose(arraySpeed);
      }

      //Direccion vertical:
      if(circle.y + circle.r > canvasRef.current.height + margen){
        circle.dy = choose(arraySpeed)*-1;
      }else if(circle.y - circle.r < -margen){
        circle.dy = choose(arraySpeed);
      }

      //Actualizar posicion circulo
      circle.x = circle.x + circle.dx*circle.speed;
      circle.y = circle.y + circle.dy*circle.speed;



      // 5. TODO - Update drawing utility
      drawRect(obj, ctx, circle);
    }
    }
  }

  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <Control/>
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
