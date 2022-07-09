import React from 'react';

const SortByParamSelect = ({ handleSorting }) => {
    return (
        <div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Sort By :</label>
                            <select className="form-control" name="city" onChange={handleSorting}>
                                <option selected>Select</option>
                                <option value="age">Age</option>
                                <option value="height">Height</option>
                                <option value="weight">Weight</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortByParamSelect;