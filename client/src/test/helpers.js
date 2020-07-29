import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { mount, shallow } from 'enzyme';

export const mountSetup = (Component, mocks = [], props = {}) => {
    return mount(
        <MockedProvider client={mocks} addTypename={false}>
            <Component />
        </MockedProvider>
    )
}

export const shallowSetup = (Component, props = {}) => {
    return shallow(
        <Component {...props} />
    )
}

