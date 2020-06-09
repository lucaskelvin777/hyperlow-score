import React from 'react';
import {Score} from '../../interface/Score';
import './style.css';
const BlocoStore: React.FC<Score> = (props) => {
  return (
    <div className="bloco-store">
      <p className="titulo">{props.nome}</p>
      <hr/>
      <p>Clicks R: {props.clicks_r}</p>
      <p>Batidas: {props.batidas}</p>
      <p>Fases perdidas: {props.reinicio_fase}</p>
      <p>{props.created_at}</p>
      <hr/>
    </div>
  );
}

export default BlocoStore;