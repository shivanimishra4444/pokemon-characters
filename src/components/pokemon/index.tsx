import { getPokemon, getPokemonDetails, getPokemonPagination } from '@/config/api';
import React, { useEffect, useState } from 'react';
import Card from '../card';
import NoOfCardSelect from '../dropdown/noOfCardSelect';
import SortByParamSelect from '../dropdown/sortByParamSelect';
import './pokemon.scss'

interface IPokemon {
    data: IData[],
    nextUrl: '',
    prevUrl: ''
}

interface IData {
    name: string;
    url: string
}

interface IAbility {
    ability: {
        name: string
    }
}


interface IDetail {
    sprites: { other: { 'official-artwork': { 'front_default'; string } } }
    height: number;
    weight: number;
    abilities: IAbility[]
}
export const Pokemon = () => {

    const [pokemons, setPokemons] = useState<IPokemon>({ data: [], nextUrl: '', prevUrl: '' })
    const [limit, setLimit] = useState<number>(20)
    const [offset, setOffset] = useState<number>(0)
    const [details, setDetails] = useState<IDetail[]>([])


    useEffect(() => {
        const fetchPokemon = async () => {
            const result = await getPokemon(limit, offset);
            setPokemons({ data: result.results, nextUrl: result.next, prevUrl: result.previous })
        }
        fetchPokemon()
    }, [])

    useEffect(() => {
        setDetails([])
        const getDetails = async (url: string) => {
            const result = await getPokemonDetails(url);
            setDetails((prevDetails) => ([...prevDetails, result]))
        }
        pokemons.data.forEach((pokemon) => {
            getDetails(pokemon.url)
        })
    }, [pokemons])


    const getPokemonFromApi = async (limit: number) => {
        const result = await getPokemon(limit, offset);
        setPokemons({ data: result.results, nextUrl: result.next, prevUrl: result.previous })
    }


    const handleNoOfCards = (event: any) => {
        const limit = event.target.value
        getPokemonFromApi(limit)
        setLimit(limit)

    }
    const handleNextClick = async () => {
        const result = await getPokemonPagination(pokemons.nextUrl)
        setPokemons({ data: result.results, nextUrl: result.next, prevUrl: result.previous })
    }

    const handleSorting = (event: any) => {
        const { value } = event.target
        const sortedPokemon = value === "name" ? details.slice().sort((a, b) => a[value].localeCompare(b[value])) : details.slice().sort((a, b) => a[value] - b[value])
        setDetails(sortedPokemon)
    }

    const handlePrevClick = async () => {
        const result = await getPokemonPagination(pokemons.prevUrl)
        setPokemons({ data: result.results, nextUrl: result.next, prevUrl: result.previous })
    }

    const renderComponent = (details.length > 0 && details.length === pokemons.data.length)
    return (renderComponent &&
        <div className='pokemon'>
            <div className='container'>
                <NoOfCardSelect handleNoOfCards={(event)=> handleNoOfCards(event)}/>
                <SortByParamSelect handleSorting={(event) => handleSorting(event)} />
                <div className="container d-flex justify-content-between">
                    <button /* disabled={this.state.page<=1} */ type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div>
                <div className="pokemon__characters row">
                    {details.map(pokemon => {
                        return (
                            <Card pokemon={pokemon} />
                        )
                    })}
                </div>
            </div>
        </div>

    );
};

