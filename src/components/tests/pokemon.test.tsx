import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pokemon from '../pokemon';
import React from 'react';

configure({ adapter: new Adapter() });

const wrapper = shallow(<Pokemon />);

describe('<Pokemon />', () => {

    it('renders without crashing', () => {
        wrapper;
        expect(wrapper.find('div').exists());
    });
})