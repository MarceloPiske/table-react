import React, {useMemo, useState} from 'react';
import { Axios } from 'axios';
import './App.css';

let linesTable = [
  {
    id: 0,
    nome: "Celo",
    sobrenome: "Piske",
    idade: 20,
    cidade: "Cariacica",
    solteiro: true
  },
  {
    id: 1,
    nome: "Arcelo",
    sobrenome: "Piske",
    idade: 20,
    cidade: "Cariacica",
    solteiro: true
  },
  {
    id: 2,
    nome: "Marcelo",
    sobrenome: "Hauch",
    idade: 20,
    cidade: "Cariacica",
    solteiro: false
  },
];


function starWarsAPI(){
  const axios = require('axios')
  axios.get('https://swapi.dev/api/people/')
  .then((response => {
    console.log(response.data.results);
  }))
};

console.log(starWarsAPI());

let listToRender = linesTable;

function App() {
  // fitros de botoes
  const [v, setFlagButton] = useState('');

  const [busca, setBusca] = useState('');

  // ToLowerCase está aqui para que a filtragem seja por feita ignorando A !== a 
  const filtrado = useMemo(() => {
    const lowerBusca = busca.toLocaleLowerCase()
    
    listToRender = linesTable.filter(listItem => listItem.nome.toLocaleLowerCase().includes(lowerBusca) || listItem.sobrenome.toLocaleLowerCase().includes(lowerBusca))
    return listToRender;
  }, [busca]);

  const filtradoPosButoon = useMemo(() => {
    if (v){
      listToRender = filtrado.filter(listItem => listItem[v] === true)
    }
    return listToRender;
  }, [filtrado, v]);

  listToRender = filtradoPosButoon
  // desenhar linhas da tabela
  function renderRows(listToRender) {
    console.log(listToRender);
    return listToRender.map(item => {
        return <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.sobrenome}</td>
                <td>{item.idade}</td>
                <td>{item.cidade}</td>
              </tr>
      });
  };

  return (
    <div className='container'>
      <div className='selectXTable'>
        <button value="solteiro" onClick={(ev) => setFlagButton(ev.target.value)}>Solteiro</button>
        <button>X2</button>
        <button>X3</button>
      </div>
      <div className='searchTable'>
        <input value={busca} type="text" className='searchInput' onChange={(ev) => setBusca(ev.target.value)}></input>
      </div>
      <div className='selectYTable'>
        <button>Y1</button>
        <button>Y2</button>
        <button>Y3</button>
      </div>
      <table className='table'>
        <thead>
          {/* classe de importação de titulo deve vir aqui */}
          <tr>
            <th>
              Nome
            </th>
            <th>
              Sobrenome
            </th>
            <th>
              Idade
            </th>
            <th>
              Cidade
            </th>
          </tr>
        </thead>
        <tbody>
          {console.log('renderizando')}
          {renderRows(listToRender)}
        </tbody>
      </table>
    </div>
  );
}

export default App;
