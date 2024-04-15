import { hideLoading, showLoading } from "react-redux-loading-bar"
import api from "../../src/utils/api"
import { asyncLogin, loginActionCreator } from "../../src/app/states/authUser/action"

/**
 * skenario testing
 *
 * - asyncLogin thunk
 *  - should dispatch action correctly when login success
 *  - should dispatch action and call alert correctly when login failed
 */

const fakeLoginResponse = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw",
}

const fakeGetOwnProfileResponse = {
  id: "user-123",
  name: "John Doe",
  email: "johndoe@gmail.com.com",
  avatar: "https://generated-image-url.jpg",
}

const fakeLoginInput = {
  email: "johndoe@gmail.com.com",
  password: "JohnDoe",
}

const fakeErrorResponse = new Error("Ups, something went wrong")

describe("asyncLogin thunk", () => {
  beforeEach(() => {
    api._login = api.login
    api._getOwnProfile = api.getOwnProfile
  })

  afterEach(() => {
    api.login = api._login
    api.getOwnProfile = api._getOwnProfile

    delete api._login
    delete api._getOwnProfile
  })

  it("should dispatch action correctly when login success", async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.resolve(fakeLoginResponse)
    api.getOwnProfile = () => Promise.resolve(fakeGetOwnProfileResponse)
    // mock dispatch
    const dispatch = vi.fn()

    // action
    await asyncLogin(fakeLoginInput)(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(loginActionCreator(fakeGetOwnProfileResponse))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it("should dispatch action and call alert correctly when login failed", async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse)
    // mock dispatch
    const dispatch = vi.fn()
    // mock alert
    window.alert = vi.fn()

    // action
    await asyncLogin(fakeLoginInput)(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
  })
})
