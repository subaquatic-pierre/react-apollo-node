import { buildQueries, queryHelpers } from '@testing-library/react'

const queryAllByName = (...args) =>
    queryHelpers.queryAllByAttribute('name', ...args)

const getMultipleNameError = (c, value) =>
    `Found multiple elements with the 'name' attribute of: ${value}`

const getMissingNameError = (c, value) =>
    `Unable to find an element with the 'name' attribute of: ${value}`

const [
    queryByName,
    getAllByName,
    getByName,
    findAllBeName,
    findByName
] = buildQueries(queryAllByName, getMultipleNameError, getMissingNameError)

export {
    queryByName,
    getAllByName,
    getByName,
    findAllBeName,
    findByName,
}