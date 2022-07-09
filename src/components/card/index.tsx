import { getPokemonDetails } from '@/config/api';
import { client } from '@/config/environment';
import React, { useEffect, useState } from 'react';

import './card.scss'
interface IProps {
    pokemon: any
}

interface IDetail {
    sprites: { other: { 'official-artwork': { 'front_default'; string } } }
    height: number;
    weight: number;
    abilities: IAbility[]
}

interface IAbility {
    ability: {
        name: string
    }
}

const Card = ({ pokemon }) => {

    const [details, setDetails] = useState<IDetail>()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getDetails = async () => {
            const response = await getPokemonDetails(pokemon.url)
            setDetails(response)
            setLoading(false)
        }
        getDetails()

    }, [])

     const capitalizeFirstLetter =(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        !loading &&
            <div className="character col-sm-3 ">
                <div className="card">
                <h5 className="card-header bg-transparent border-success">{capitalizeFirstLetter(pokemon.name)}</h5>
                    <img src={details.sprites.other["official-artwork"]["front_default"]} alt={pokemon.name} />
                    <div className="card-body">
                        <p className="card-text">{details.height}</p>
                        <p className="card-text">{details.weight}</p>
                        {details.abilities.map(ability => {
                            return <p className="card-text">{ability.ability.name}</p>
                        })}
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>

    );
};

export default Card;