import React from 'react';

interface IProps {
    handleNoOfCards: (e:any)=>void
}

const NoOfCardSelect: React.FC<IProps> = ({ handleNoOfCards }) => {
    return (
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
    );
};

export default NoOfCardSelect;