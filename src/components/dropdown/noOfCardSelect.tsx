import React from 'react';

interface IProps {
    handleNoOfCards: (e: any) => void
}

const NoOfCardSelect: React.FC<IProps> = ({ handleNoOfCards }) => {
    return (
        <div>
            <div className="col-auto">
            <label className="visually-hidden" htmlFor="autoSizingSelect">Cards</label>
                <select className="form-select" name="cards" id="autoSizingSelect" onChange={handleNoOfCards}>
                    <option selected>No Of Cards</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default NoOfCardSelect;