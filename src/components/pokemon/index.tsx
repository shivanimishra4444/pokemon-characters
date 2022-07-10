import { getPokemon, getPokemonDetails, getPokemonPagination } from '@/config/api';
import React, { useEffect, useState } from 'react';
import Card from '../card';
import NoOfCardSelect from '../dropdown/noOfCardSelect';
import SortByParamSelect from '../dropdown/sortByParamSelect';
import './pokemon.scss'

interface IPokemon {
    data: IData[],
    nextUrl: string,
    prevUrl: string
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


export interface IDetail {
    sprites: { other: { 'official-artwork': { 'front_default'; string } } }
    height: number;
    weight: number;
    abilities: IAbility[];
    name: string;
    moves?: IMove[];
}
interface IMove {
    move: { name: string }
}
 const Pokemon: React.FC = () => {

    const [pokemons, setPokemons] = useState<IPokemon>({ data: [], nextUrl: '', prevUrl: '' })
    const [limit, setLimit] = useState<number>(20)
    const [offset, setOffset] = useState<number>(0)
    const [details, setDetails] = useState<IDetail[]>([])
    const [searchText, setSearchText] = useState('')
    const [searchedList, setSearchedList] = useState<IDetail[]>([])
    const localSortby = window.localStorage.getItem('sortedBy')



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
            localSortby ? setDetails((prevDetails) => {
                const detailArray = [...prevDetails, result]
                const sortedData = saveSortedDataOnRefresh(localSortby, detailArray);
                return sortedData
            }) : setDetails((prevDetails) => ([...prevDetails, result]))
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
        setSearchedList([])
        setSearchText('')
    }

    const handleSorting = (event: any) => {
        const { value } = event.target
        const sortedPokemon = value === "name" ? details.slice().sort((a, b) => a[value].localeCompare(b[value])) : details.slice().sort((a, b) => a[value] - b[value])
        setDetails(sortedPokemon)
        localStorage.setItem('sortedBy', value)
    }

    const saveSortedDataOnRefresh = (value: string, details: IDetail[]) => {
        const sortedPokemon = value === "name" ? details.slice().sort((a, b) => a[value].localeCompare(b[value])) : details.slice().sort((a, b) => a[value] - b[value])
        return sortedPokemon
    }

    const handlePrevClick = async () => {
        const result = await getPokemonPagination(pokemons.prevUrl)
        setPokemons({ data: result.results, nextUrl: result.next, prevUrl: result.previous })
        setSearchedList([])
        setSearchText('')
    }

    const handleSearchOnChange = (event: any) => {
        const { value } = event.target
        const lowerTextValue = value.toLowerCase()
        setSearchText(value)
        const filteredBySearchText = details.filter(detail => {
            const lcName = detail.name.toLowerCase()
            const lcAbility = detail.abilities.map(ability => ability.ability.name.toLowerCase().replace('-', '')).filter(ab=>ab.includes(lowerTextValue))
            return (lcName.includes(lowerTextValue) || lcAbility.length>0)
        })
        if (value !== "" && filteredBySearchText.length > 0) {
            setSearchedList(filteredBySearchText)
            localStorage.setItem('searchtext', value)
        }
        else {
            setSearchedList([])
            localStorage.removeItem('searchtext')
        }
    }

    const renderComponent = (details.length > 0 && details.length === pokemons.data.length) || searchText !== ''
    const list = searchedList.length > 0 ? searchedList : details
    return (renderComponent &&
        <div className='pokemon'>
            <div className='container'>
                <div className="container d-flex justify-content-between mb-5">
                    <NoOfCardSelect handleNoOfCards={(event) => handleNoOfCards(event)} />
                    <SortByParamSelect handleSorting={(event) => handleSorting(event)} />
                    <input
                        type="text"
                        value={searchText}
                        onChange={(event) => handleSearchOnChange(event)}
                        placeholder={'search'}
                        className="search"
                    />
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={pokemons.prevUrl == null} type="button" className="btn btn-primary" onClick={handlePrevClick}> &larr; Previous</button>
                    <button type="button" className="btn btn-primary" onClick={handleNextClick}>Next &rarr;</button>
                </div>
                <div className="pokemon__characters row">
                    {list.map(pokemon => {
                        return (
                            <Card pokemon={pokemon} />
                        )
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={pokemons.prevUrl == null} type="button" className="btn btn-primary" onClick={handlePrevClick}> &larr; Previous</button>
                    <button type="button" className="btn btn-primary" onClick={handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        </div>

    );
};

export default Pokemon;
