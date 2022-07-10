import { getPokemonDetailsByName } from '@/config/api';
import { capitalizeFirstLetter } from '@/helper/helper';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IDetail } from '../pokemon';
import './cardDetails.scss'
import { useHistory } from "react-router-dom";


type NameParams = {
    name: string;
};
const cardDetails: React.FC = () => {

    const [moreDetails, setMoreDetails] = useState<IDetail>()
    const { name } = useParams<NameParams>()
    const [loading, setLoading] = useState<boolean>(true)

    const history = useHistory();

    useEffect(() => {
        const getDetails = async () => {
            const result = await getPokemonDetailsByName(name)
            setMoreDetails(result)
            setLoading(false)
        }
        getDetails()
    }, [])
    return (
        <>
            {!loading ?
                <section className='card-detail container'>
                    <button type="button" className="btn btn-dark card-detail__button" onClick={history.goBack}>&larr; Back </button>
                    <div className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img className='card-detail__image' src={moreDetails.sprites.other["official-artwork"]["front_default"]} alt={moreDetails.name} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h4 className="card-title">Hi, I am <b>{capitalizeFirstLetter(moreDetails.name)}</b>. Please find below more details!</h4>
                                    <p className="card-text"><b>Height:</b>{` ${moreDetails.height} cm`}</p>
                                    <p className="card-text"><b>weight: </b>{` ${moreDetails.weight} kg`}</p>
                                    <p className="card-text"><b>Abilities: </b>
                                        {moreDetails.abilities.map((ability, index) => {
                                            return <span key={index}>{` ${ability.ability.name} ,`}</span>
                                        })}
                                    </p>
                                    <p className="card-text"><b>Moves: </b>
                                        {moreDetails.moves.map((move, index) => {
                                            return <span key={index}>{` ${move.move.name} ,`}</span>
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                :
                <div> Loading!!</div>
            }
        </>

    );
};

export default cardDetails;