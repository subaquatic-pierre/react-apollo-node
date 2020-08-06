import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { shallow, mount } from 'enzyme'

export const mountSetup = (Component, mocks = [], props = {}) => {
    return mount(
        <MockedProvider
            mocks={mocks}
            addTypename={false}>
            <Component />
        </MockedProvider>
    )
}

export const shallowSetup = (Component, props = {}) => {
    return shallow(
        <Component {...props} />
    )
}

