import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {About} from '../../../client/components/About'

configure({adapter: new Adapter()})

test('<About />', () => {
  const expected = 'About Photo Locations'
  const wrapper = shallow(<About t={key => key} />)
  const actual = wrapper.find('h1').text()

  expect(actual).toEqual(expected)
})