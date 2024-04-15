import { hideLoading, showLoading } from "react-redux-loading-bar"
import api from "../../src/utils/api"
import { asyncIsPreload, isPreloadActionCreator } from "../../src/app/states/isPreload/action"
import { loginActionCreator } from "../../src/app/states/authUser/action"

/**
 * skenario testing
 *
 * - asyncIsPreload thunk
 *  - should dispatch action correctly when isPreload success
 *  - should dispatch action and call alert correctly when isPreload failed
 */

const fakeAuthUserResponse = [
  {
    id: "user-123",
    name: "John Doe",
    email: "johndoe@gmail.com",
    avatar: "https://generated-image-url.jpg",
  },
]

const fakeErrorResponse = new Error("Ups, something went wrong")

describe("asyncIsPreload thunk", () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile
  })

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile

    delete api._getOwnProfile
  })

  it("should dispatch action correctly when isPreload success", async () => {
    // arrange
    // stub implementation
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse)
    api.getAccessToken = () => "customtoken"
    // mock dispatch
    const dispatch = vi.fn()

    // action
    await asyncIsPreload()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(loginActionCreator(fakeAuthUserResponse))
    expect(dispatch).toHaveBeenCalledWith(isPreloadActionCreator(false))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it("should dispatch action and call alert correctly when isPreload failed", async () => {
    // arrange
    // stub implementation
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse)
    // mock dispatch
    const dispatch = vi.fn()
    // mock alert
    window.alert = vi.fn()

    // action
    await asyncIsPreload()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(loginActionCreator(null))
    expect(dispatch).toHaveBeenCalledWith(isPreloadActionCreator(false))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
