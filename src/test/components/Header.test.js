import {Header} from '../../components/Header';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ReactShallowRenderer from 'react-test-renderer/shallow';

test('should render Header correct', () => {
    const wrapper = shallow(<Header startLogout={() => {}}/>);

    expect(wrapper.find('h1').length).toBe(1);
    
    expect(wrapper.find('h1').text()).toBe('Expensify App');

    expect(toJSON(wrapper)).toMatchSnapshot();
    
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
})

test('Should call start log out on button click', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout}/>)
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
})