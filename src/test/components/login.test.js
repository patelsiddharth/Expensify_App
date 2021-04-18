import React from 'react';
import {shallow} from 'enzyme';
import {Login} from '../../components/login';

test('Should correctly render Login page', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toMatchSnapshot();
})

test('Should call start log in on button click', () => {
    const startLogin = jest.fn();
    const wrapper = shallow(<Login startLogin={startLogin}/>)
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();
})