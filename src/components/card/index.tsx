import { capitalizeFirstLetter } from '@/helper/helper';
import React from 'react';
import { Link } from 'react-router-dom';
import './card.scss'
interface IProps {
    pokemon: any
}

const Card: React.FC<IProps> = ({ pokemon }) => {   
    return (
        <div className="character col-sm-3 ">
            <div className="card">
                <h5 className="card-header bg-transparent border-success">{capitalizeFirstLetter(pokemon.name)}</h5>
                <img src={pokemon.sprites.other["official-artwork"]["front_default"]} alt={pokemon.name} />
                <div className="card-body">
                    <p className="card-text"><b>Height:</b>{` ${pokemon.height} cm`}</p>
                    <p className="card-text"><b>Weight: </b>{` ${pokemon.weight} kg`}</p>
                    <p className="card-text"><b>Abilities: </b>
                    {pokemon.abilities.map((ability, index )=> {
                        return <span key={index}>{` ${ability.ability.name} ,`}</span>
                    })}
                    </p>
                    <Link to={`/detail/${pokemon.name}`} className="btn btn-primary">
                        Explore
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;