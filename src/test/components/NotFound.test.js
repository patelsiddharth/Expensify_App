import React from 'react'
import { shallow } from 'enzyme'
import NotFound from '../../components/NotFound';

test('Should render Not Found Page', () => {
    const wrapper = shallow(<NotFound />)
    expect(wrapper).toMatchSnapshot();
})