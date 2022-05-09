export const drawRect = (detections, ctx, circle) => {
    
    ctx.fillStyle = '#FF000080';
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI, 0);
    ctx.fill();
    
    detections.forEach(prediction=>{
        //resultados predicciones
        const [x, y, width, height] = prediction['bbox'];
        const text = prediction['class'];
        const score = Math.floor(prediction['score']*100);
        
        //estilo cuadrado
        const color = 'green';
        ctx.strokeStyle = color;
        ctx.font = '18px Arial';
        ctx.fillStyle = color;

        //dibujar
        ctx.beginPath();
        ctx.scale(-1,1);
        ctx.fillText(text +' '+ score + '%', -width-x, y);
        ctx.scale(-1,1);
        ctx.lineWidth = 3;
        ctx.rect(x, y, width, height);
        ctx.stroke();
    });
}

export const colision = (detections, circle)=>{
    for (let elem of detections){
        if(elem['class'] === 'person' && elem['score'] > 0.5){
            let rx = elem['bbox'][0];
            let ry = elem['bbox'][1];
            let rw = elem['bbox'][2];
            let rh = elem['bbox'][3];
            let testX = circle.x;
            let testY = circle.y;
        
            if (circle.x < rx){
                testX = rx;
               // console.log('cerca de izquierda');
            }            // test left edge
            else if (circle.x > rx+rw){ 
                testX = rx+rw;
               // console.log('cerca de derecha');
            }   // right edge
            if (circle.y < ry){
                testY = ry; 
               // console.log('cerca de arriba');
                }     // top edge
            else if (circle.y > ry+rh) {
                testY = ry+rh;
                //console.log('cerca de abajo');
            }   // bottom edge
        
            let distance = Math.sqrt( Math.pow((circle.x-testX), 2) + Math.pow((circle.y-testY), 2) );
            //console.log('Distance:',distance, 'radio:', circle.r);
            if(distance+35 < circle.r){
               return elem;
            }    
        }
    }
    return undefined;
}

export const drawLose = (video, box, ctx, circle) => {
    ctx.drawImage(video, 0, 0);
    const [x, y, width, height] = box['bbox'];
    //estilo cuadrado
    const color = 'red';
    ctx.strokeStyle = color;
    ctx.font = '30px bold Arial';
    ctx.fillStyle = color;
    //dibujar
    ctx.beginPath();
    ctx.scale(-1,1);
    ctx.fillText('¡Toque!', -x-width, y-5);
    ctx.scale(-1,1);
    ctx.lineWidth = 3;
    ctx.rect(x, y, width, height);
    ctx.stroke();

    ctx.fillStyle = '#FF000080';
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI, 0);
    ctx.fill();

}