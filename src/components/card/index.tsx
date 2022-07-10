import React from 'react';
import './card.scss'
interface IProps {
    pokemon: any
}

const Card: React.FC<IProps> = ({ pokemon }) => {

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="character col-sm-3 ">
            <div className="card">
                <h5 className="card-header bg-transparent border-success">{capitalizeFirstLetter(pokemon.name)}</h5>
                <img src={pokemon.sprites.other["official-artwork"]["front_default"]} alt={pokemon.name} />
                <div className="card-body">
                    <p className="card-text">{pokemon.height}</p>
                    <p className="card-text">{pokemon.weight}</p>
                    {pokemon.abilities.map(ability => {
                        return <p className="card-text">{ability.ability.name}</p>
                    })}
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    );
};

export default Card;