import profileReducer, { actions } from './profileReducer';

let state = {
        posts: [
            { id: 1, message: 'My first post!', likesCount: 0 },
            { id: 2, message: '“All I know is that the first step is to create a vision, because when you see the vision – the beautiful vision – that creates the want power.“', likesCount: 0 },
        ],
        profile: null,
        status: ''
    }

test('length of posts should be incremented', () => {
    // 1. start test data
    let action = actions.addPost('Test text');
    // 2 action
    let newState = profileReducer(state, action)
    // 3 expectation
    expect(newState.posts.length).toBe(3)
});

test('message of post should be correct', () => {
    // 1. start test data
    let action = actions.addPost('Test text');
    // 2 action
    let newState = profileReducer(state, action)
    // 3 expectation
    expect(newState.posts[2].message).toBe('Test text')
});

test('after deleting length of posts should be decremented', () => {
    // 1. start test data
    let action = actions.deletePost(1);
    // 2 action
    let newState = profileReducer(state, action)
    // 3 expectation
    expect(newState.posts.length).toBe(1)
});

test(`after deleting length of posts shouldn't be decrement if id is incorrect`, () => {
    // 1. start test data
    let action = actions.deletePost(3);
    // 2 action
    let newState = profileReducer(state, action)
    // 3 expectation
    expect(newState.posts.length).toBe(2)
});