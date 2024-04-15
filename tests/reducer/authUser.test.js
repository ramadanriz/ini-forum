import authUserReducer from "../../src/app/states/authUser/reducer"

/**
 * skenario testing
 *
 * - authUserReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the authUser when given by LOGIN action
 *  - should return the authUser with the remove authUser when given by LOGOUT action
 *
 */

describe("authUserReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = null
    const action = { type: "UNKNOWN" }

    // action
    const nextState = authUserReducer(initialState, action)

    // assert
    expect(nextState).toEqual(initialState)
  })

  it("should return the authUser when given by LOGIN action", () => {
    // arrange
    const initialState = null
    const action = {
      type: "LOGIN",
      payload: {
        authUser: {
          id: "user-123",
          name: "John Doe",
          email: "johndoe@gmail.com",
          avatar: "https://generated-image-url.jpg",
        },
      },
    }

    // action
    const nextState = authUserReducer(initialState, action)

    // assert
    expect(nextState).toEqual(action.payload.authUser)
  })

  it("should return the authUser with the remove authUser when given by LOGOUT action", () => {
    // arrange
    const initialState = {
      id: "user-123",
      name: "John Doe",
      email: "johndoe@gmail.com",
      avatar: "https://generated-image-url.jpg",
    }
    const action = {
      type: "LOGOUT",
    }

    // action
    const nextState = authUserReducer(initialState, action)

    // assert
    expect(nextState).toBeNull()
  })
})
