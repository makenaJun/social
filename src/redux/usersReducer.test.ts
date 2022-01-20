import usersReducer, { InitialStateType, actions } from './usersReducer';

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'Igor',
                followed: false,
                photos: {
                    large: null,
                    small: null
                },
                status: 'Status test 1'
            },
            {
                id: 1,
                name: 'Andrei',
                followed: false,
                photos: {
                    large: null,
                    small: null
                },
                status: 'Status test 2'
            }
            ,
            {
                id: 2,
                name: 'Sasha',
                followed: true,
                photos: {
                    large: null,
                    small: null
                },
                status: 'Status test 3'
            },
            {
                id: 3,
                name: 'Dima',
                followed: true,
                photos: {
                    large: null,
                    small: null
                },
                status: 'Status test 4'
            }
        ],
        pageSize: 10,
        portionSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('Followed to user', () => {

    let newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('Unfollowed to user', () => {

    let newState = usersReducer(state, actions.unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()

})