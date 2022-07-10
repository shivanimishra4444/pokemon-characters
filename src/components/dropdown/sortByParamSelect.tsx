import React from 'react';

interface IProps {
    handleSorting: (e:any) => void
}

const SortByParamSelect: React.FC<IProps> = ({ handleSorting }) => {
    return (
        <div className="col-auto">
            <label className="visually-hidden" htmlFor="autoSizingSelect">Cards</label>
            <select className="form-select" name="cards" id="autoSizingSelect" onChange={handleSorting}>
                <option selected>Sort By</option>
                <option value="name">Name</option>
                <option value="height">Height</option>
                <option value="weight">Weight</option>
            </select>
        </div>

    );
};

export default SortByParamSelect;