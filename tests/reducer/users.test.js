import usersReducer from "../../src/app/states/users/reducer"

/**
 * skenario testing
 *
 * - usersReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the users when given by GET_ALL_USERS action
 *  - should return the users with the new user when given by REGISTER_USER action
 *
 */

describe("usersReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = []
    const action = { type: "UNKNOWN" }

    // action
    const nextState = usersReducer(initialState, action)

    // assert
    expect(nextState).toEqual(initialState)
  })

  it("should return the users when given by GET_ALL_USERS action", () => {
    // arrange
    const initialState = []
    const action = {
      type: "GET_ALL_USERS",
      payload: {
        users: [
          {
            id: "user-123",
            name: "John Doe",
            email: "johndoe@gmail.com",
            avatar: "https://generated-image-url.jpg",
          },
        ],
      },
    }

    // action
    const nextState = usersReducer(initialState, action)

    // assert
    expect(nextState).toEqual(action.payload.users)
  })

  it("should return the users with the new user when given by REGISTER_USER action", () => {
    // arrange
    const initialState = [
      {
        id: "user-123",
        name: "John Doe",
        email: "johndoe@gmail.com",
        avatar: "https://generated-image-url.jpg",
      },
    ]

    const action = {
      type: "REGISTER_USER",
      payload: {
        user: {
          id: "user-124",
          name: "Jane Doe",
          email: "janedoe@gmail.com",
          avatar: "https://generated-image-url.jpg",
        },
      },
    }

    // action
    const nextState = usersReducer(initialState, action)

    // assert
    expect(nextState).toEqual([action.payload.user, ...initialState])
  })
})
