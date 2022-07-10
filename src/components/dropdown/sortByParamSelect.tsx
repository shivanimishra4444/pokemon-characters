import { capitalizeFirstLetter } from '@/helper/helper';
import React from 'react';

interface IProps {
    handleSorting: (e: any) => void
    localSortby: string
}



const SortByParamSelect: React.FC<IProps> = ({ handleSorting, localSortby }) => {
    const SortBy = [
        'name',
        'height',
        'weight'
    ]
    return (
        <div className="col-auto">
            <label className="visually-hidden" htmlFor="autoSizingSelect">Cards</label>
            <select className="form-select" name="cards" id="autoSizingSelect" onChange={handleSorting}>
                <option>Sort By</option>
                {SortBy.map((sort, index) => {
                    return (
                        <option key={index} value={sort} selected={sort===localSortby}>{capitalizeFirstLetter(sort)}</option>
                    )
                })}
            </select>
        </div>

    );
};

export default SortByParamSelect;