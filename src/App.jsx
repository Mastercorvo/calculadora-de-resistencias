
import { useEffect, useState } from 'react';
import './App.css';
import Resistor from './img/resistor';
import Resistor2 from './img/resistor2';

const R = {

  black: [0, 0, 1, 0],
  brown: [1, 1, 10, 1],
  red: [2, 2, 100, 2],
  orange: [3, 3, 1000, 0],
  yellow: [4, 4, 10000, 0],
  green: [5, 5, 100000, 0.5],
  blue: [6, 6, 1000000, 0.25],
  purple: [7, 7, 10000000, 0.10],
  gray: [8, 8, 100000000, 0.05],
  white: [9, 9, 1000000000, 0],
  gold: [0, 0, 0.1, 5],
  silver: [0, 0, 0.01, 10]

}
const R2 = {

  black: [0, 0, 0, 1, 0],
  brown: [1, 1, 1, 10, 1],
  red: [2, 2, 2, 100, 2],
  orange: [3, 3, 3, 1000, 0],
  yellow: [4, 4, 4, 10000, 0],
  green: [5, 5, 5, 100000, 0.5],
  blue: [6, 6, 6, 1000000, 0.25],
  purple: [7, 7, 7, 10000000, 0.10],
  gray: [8, 8, 8, 100000000, 0.05],
  white: [9, 9, 9, 1000000000, 0],
  gold: [0, 0, 0, 0.1, 5],
  silver: [0, 0, 0, 0.01, 10]

}

function App() {

  const [currentBanda, setCurrentBanda] = useState(1);
  const [bandas, setBandas] = useState([0, 0, 0, 0]);

  const [countBand, setCountBand] = useState(1);

  const [resistenciaResultante, setResistenciaResultante] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{

    if(bandas.length === 4 && bandas.every(e=>e) && countBand === 1){

      let result = (''+(`${R[bandas[0]][0]}${R[bandas[1]][1]}`)*R[bandas[2]][2]);

      if(result.endsWith('000000')) result = result.slice(0, result.length -6 ) + ' M'
        else if(result.endsWith('000')) result = result.slice(0, result.length -3 ) + ' K'

      setResistenciaResultante( result + `Ω +/- ${R[bandas[3]][3] || 0}%`)

    }
  
    if(bandas.length === 5 && bandas.every(e=>e) && countBand === 2){

      let result = (''+(`${R2[bandas[0]][0]}${R2[bandas[1]][1]}${R2[bandas[2]][2]}`)*R2[bandas[3]][3]);

      if(result.endsWith('000000')) result = result.slice(0, result.length -6 ) + ' M'
        else if(result.endsWith('000')) result = result.slice(0, result.length -3 ) + ' K'

      setResistenciaResultante( result + `Ω +/- ${R2[bandas[4]][4] || 0}%`)

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bandas])

  function colorHandler(color){

    setBandas(bandas=>{

      const copy = [...bandas]

      copy[currentBanda-1] = color;

      return copy;

    });

    if(countBand === 1) setCurrentBanda(value=>{

      if((value+1) === 5) return 1;

      return value + 1

    });

    if(countBand === 2) setCurrentBanda(value=>{

      if((value+1) === 6) return 1;

      return value + 1

    });

  }

  function countBandHandler(band){

    if(band !== countBand) {
    
      setBandas([0, 0, 0, 0]);

      setCurrentBanda(1);

      setResistenciaResultante('');
    
    }

    setCountBand(band);

  }

  return (
    <div className="App">
        <div className="main">

          <div className="selector">

            <h1>Resistor de {countBand === 1?4:5} Bandas</h1>

            <div className="selector-resistor">

              <button onClick={()=>countBandHandler(1)}>4 Bandas</button>
              <button onClick={()=>countBandHandler(2)}>5 Bandas</button>

            </div>

            <div className="selector-banda" style={
                {gridTemplateColumns:'repeat(' + (countBand === 1 ?4:5) + ', 1fr)'}
              }>

              <button className={"banda-1 " + (currentBanda === 1?'current':'')} onClick={()=> setCurrentBanda(1)}>Banda #1</button>
              <button className={"banda-2 " + (currentBanda === 2?'current':'')} onClick={()=> setCurrentBanda(2)}>Banda #2</button>
              <button className={"banda-3 " + (currentBanda === 3?'current':'')} onClick={()=> setCurrentBanda(3)}>Banda #3</button>
              <button className={"banda-4 " + (currentBanda === 4?'current':'')} onClick={()=> setCurrentBanda(4)}>Banda #4</button>
              {countBand === 2 && <button className={"banda-5 " + (currentBanda === 5?'current':'')} onClick={()=> setCurrentBanda(5)}>Banda #5</button>}

            </div>

            <div className="buttons">

                <button onClick={()=>colorHandler('black')}>Negro</button>
                <button onClick={()=>colorHandler('brown')}>Marron</button>
                <button onClick={()=>colorHandler('red')}>Rojo</button>
                <button onClick={()=>colorHandler('orange')}>Naranja</button>
                <button onClick={()=>colorHandler('yellow')}>Amarillo</button>
                <button onClick={()=>colorHandler('green')}>Verde</button>
                <button onClick={()=>colorHandler('blue')}>Azul</button>
                <button onClick={()=>colorHandler('purple')}>Violeta</button>
                <button onClick={()=>colorHandler('gray')}>Gris</button>
                <button onClick={()=>colorHandler('white')}>Blanco</button>
                <button onClick={()=>colorHandler('gold')}>Dorado</button>
                <button onClick={()=>colorHandler('silver')}>Plateado</button>
                
            </div>
          </div>

          {(countBand === 1) && <Resistor a={bandas[0]} b={bandas[1]} c={bandas[2]} d={bandas[3]} />}
          {(countBand === 2) && <Resistor2 a={bandas[0]} b={bandas[1]} c={bandas[2]} d={bandas[3]} e={bandas[4]} />}
          <h2>{resistenciaResultante}</h2>
        </div>
    </div>
  );
}

export default App;
