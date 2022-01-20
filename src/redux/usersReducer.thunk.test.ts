import { APIResponseType, ResultCodeEnum } from './../api/api';
import { actions, follow, unfollow } from './usersReducer'
import { userAPI } from '../api/user-api'

jest.mock('../api/user-api')


const userAPIMock = userAPI as jest.Mocked<typeof userAPI>

const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

test('Follow thunk', async () => {
    userAPIMock.follow.mockReturnValue(Promise.resolve(result))
    const thunk = follow(1)

    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();


    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(1, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(1, false))
})

test('Unfollow thunk', async () => {

    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

    const thunk = unfollow(1)

    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();


    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(1, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(1, false))
})