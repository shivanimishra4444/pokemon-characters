import React from 'react';

interface IProps {
    handleNoOfCards: (e: any) => void
    limit:number
}

const NoOfCardSelect: React.FC<IProps> = ({ handleNoOfCards, limit }) => {
    const Cards = [
        10,
        20,
        50
    ]

    return (
        <div>
            <div className="col-auto">
            <label className="visually-hidden" htmlFor="autoSizingSelect">Cards</label>
                <select className="form-select" name="cards" id="autoSizingSelect" onChange={handleNoOfCards}>
                    <option>No Of Cards</option>
                    {Cards.map((card, index) => {
                    return (
                        <option key={index} value={card} selected={card===limit}>{card}</option>
                    )
                })}
                </select>
            </div>
        </div>
    );
};

export default NoOfCardSelect;