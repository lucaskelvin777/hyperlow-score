import React, { useState, useEffect, useCallback , useRef} from 'react';
import BlocoStore from './Components/BlocoStore';
import { Score } from './interface/Score';
import './App.css';
import { Link, Redirect } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
//import { MemoryRouter, Route } from 'react-router';

function App(props: any) {
  const [dados, setDados] = useState<Score[]>([]);
  const [paginas, setPaginas] = useState(1);
  const [pagina, setPagina] = useState(1);
  const [pesquisa, setPesquisa] = useState('');
  const [carregando, setCarregando] = useState<boolean>(false);

  async function get(page: number, pesq: string = "") {
    setCarregando(true);
    let search = (pesq !== '') ? '&search=' + pesq : '';
    fetch('https://devlucasweb.site/api-hyperlow/index.php?page=' + page + search).then(response => {
      response.json().then(element => {
        setDados(element.data);
        setPaginas(element.paginas);
        setCarregando(false);
      })
    });
  }
  useEffect(() => {
    
    let page = (props.match?.params.page !== undefined) ? Number(props.match.params.page) : 1;
    setPagina(page);
    get(page);
  }, [])
  useEffect(() => {
    get(pagina);
  }, [pagina]);
  useEffect(() => {
    setPagina(Number(props.match?.params.page))
  }, [props.match?.params.page]);
  function handleForm(event:any){
    event.preventDefault();
    get(1,pesquisa);
  }
  return (
    <div className="container">
      <div className="bloco">
        <h1>HyperLow</h1>
        <h2>Scores</h2>
        <hr />
        <form className="form-row"  onSubmit={handleForm}>
        <div className="input-form">
        
          <Input type="text" placeholder="Pesquisa pelo nome aqui" 
          onChange={e => setPesquisa(e.target.value)} value={pesquisa}/>
        </div>

        <Button type="submit" variant="contained" color="primary" >Buscar Score</Button>
        </form>
        <hr />
        <div className="bloco-principal">

          {carregando === false ? dados.map(element => (
            <BlocoStore key={element.id} clicks_r={element.clicks_r}
              reinicio_fase={element.reinicio_fase} created_at={element.created_at}
              nome={element.nome} batidas={element.batidas} />
          )) : "Carregando..."}
          <div className="paginacao-bloco">
            <Pagination
              page={pagina}
              count={paginas}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/${item.page === 1 ? '' : `${item.page}`}`}
                  {...item}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
