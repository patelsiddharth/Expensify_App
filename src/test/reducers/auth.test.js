import authReducer from '../../reducers/auth';

test('Should set uid for Login', () => {
    const state = authReducer({}, {type : "LOGIN", uid : 1000});
    expect(state).toEqual({uid : 1000});
})

test('Should clear uid for Logout', () => {
    const state = authReducer({}, {type : "LOGOUT"});
    expect(state).toEqual({});
})