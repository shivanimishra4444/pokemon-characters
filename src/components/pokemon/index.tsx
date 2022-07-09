import { getPokemon, getPokemonPagination } from '@/config/api';
import React, { useEffect, useState } from 'react';
import Card from '../card';
import SortByParamSelect from '../dropdown/sortByParamSelect';
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


    const getPokemonFromApi = async (limit) => {
        const result = await getPokemon(limit, offset);
        setPokemons({data:result.results, nextUrl:result.next,prevUrl:result.previous})
        setLoading(false)
    }


    const handleNoOfCards = (event) => {
        const limit = event.target.value
        getPokemonFromApi(limit)
        setLimit(limit)
        
    }
    const handleNextClick =async ()=>{
        const result = await getPokemonPagination(pokemons.nextUrl)
        setPokemons({data:result.results, nextUrl:result.next,prevUrl:result.previous})
        setLoading(false)
    }

    const handleSorting =(event)=>{
        const {value} =event.target
        const sortedPokemon = pokemons.data.sort((a,b)=> a[value]-b[value])

    }

    const handlePrevClick =async()=>{
        const result = await getPokemonPagination(pokemons.prevUrl)
        setPokemons({data:result.results, nextUrl:result.next,prevUrl:result.previous})
        setLoading(false)
    }
    return (!loading &&
        <div className='pokemon'>
            <div className='container'>
                <div>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Number of Cards :</label>
                                    <select className="form-control" name="city" onChange={handleNoOfCards}>
                                        <option selected>Select Number</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SortByParamSelect handleSorting={(event)=>handleSorting(event)}/>
                <div className="container d-flex justify-content-between">
                    <button /* disabled={this.state.page<=1} */ type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div>
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

