import { getPokemon } from '@/config/api';
import React, { useEffect, useState } from 'react';
import Card from '../card';
import './pokemon.scss'

interface IPokemon{
    data:[],
    nextUrl:'',
    prevUrl:''
}

export const Pokemon = () => {

    const [pokemons, setPokemons] = useState<IPokemon>({data:[], nextUrl:'', prevUrl:''})
    const [loading, setLoading] = useState(true)
    const [limit, setLimit] = useState(20)
    const [offset, setOffset] = useState(0)


    useEffect(() => {
        const fetchPokemon = async () => {
            const result = await getPokemon(limit, offset);
            setPokemons({data:result.results, nextUrl:result.next,prevUrl:result.previous})
            setLoading(false)
        }
        fetchPokemon()
    }, [])


    
    return (!loading &&
        <div className='pokemon'>
            <div className='container'>
                
                <div className="pokemon__characters row">
                    {pokemons.data.map(pokemon => {
                        return (
                            <Card pokemon={pokemon} />
                        )
                    })}
                </div>
            </div>
        </div>

    );
};

