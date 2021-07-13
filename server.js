const express = require ('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let dataJson={
      "Temperatura": 0,
      "Luminosidade":false,
      "Umidade":0,
      "Gas":0
};

/*Variável global, contendo os minutos de incidência solar até a última chamada
  do request*/
  var time = 0;
  /*Tempo de referência*/
  var refTime = Date.now();

/*function lightTiming(dataJson) {
	var actualTime = Date.now();
	time = dataJson["Luminosidade"] === true ? time + (actualTime - refTime) : time;
	dataJson["Luminosidadetempo"] = Math.floor(time*1E-3/60);
	refTime = actualTime;
	
}*/

function lightTiming(dataJson) {
	var actualTime = Date.now();
	time = dataJson["Luminosidade"] === true ? time + (actualTime - refTime) : time;
	dataJson["Luminosidadetempo"] = Math.floor(time);
	refTime = actualTime;
	
}

const port = 3000;

// Criar o get pra Alexa pegar
app.get('/', (request, response) => {
       response.send(dataJson);
});


// Escreve no servidor, manda confirmacao
app.post('/update', (request, response) => { 
      dataJson = {...dataJson, ...request.body};
      lightTiming(dataJson);
      response.send("ok");
});

app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })

//ssh -i...