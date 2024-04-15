import { hideLoading, showLoading } from "react-redux-loading-bar"
import api from "../../src/utils/api"
import { asyncGetLeaderboards, getLeaderboardsActionCreator } from "../../src/app/states/leaderboards/action"

/**
 * skenario testing
 *
 * - asyncGetLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeLeaderBoardsResponse = [
  {
    user: {
      id: "users-123",
      name: "John Doe",
      email: "johndoe@gmail.com",
      avatar: "https://generated-image-url.jpg",
    },
    score: 10,
  },
]

const fakeErrorResponse = new Error("Ups, something went wrong")

describe("asyncGetLeaderboards thunk", () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards
  })

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards

    delete api._getLeaderboards
  })

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.resolve(fakeLeaderBoardsResponse)
    // mock dispatch
    const dispatch = vi.fn()

    // action
    await asyncGetLeaderboards()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(getLeaderboardsActionCreator(fakeLeaderBoardsResponse))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it("should dispatch action and call alert correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse)
    // mock dispatch
    const dispatch = vi.fn()
    // mock alert
    window.alert = vi.fn()

    // action
    await asyncGetLeaderboards()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
  })
})
