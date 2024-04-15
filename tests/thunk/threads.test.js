import { hideLoading, showLoading } from "react-redux-loading-bar"
import api from "../../src/utils/api"
import { asyncCreateThread, createThreadActionCreator } from "../../src/app/states/threads/action"

/**
 * skenario testing
 *
 * - asyncCreateThread thunk
 *  - should dispatch action correctly when create thread success
 *  - should dispatch action and call alert correctly when create thread failed
 *
 */

const fakeCreateThreadResponse = {
  id: "thread-1",
  title: "Thread Pertama",
  body: "Ini adalah thread pertama",
  category: "General",
  createdAt: "2024-04-14T07:00:00.000Z",
  ownerId: "users-123",
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
}

const fakeCreateThreadInput = {
  title: "Thread Pertama",
  body: "Ini adalah thread pertama",
  category: "General",
}

const fakeErrorResponse = new Error("Ups, something went wrong")

describe("asyncCreateThread thunk", () => {
  beforeEach(() => {
    api._createThread = api.createThread
  })

  afterEach(() => {
    api.createThread = api._createThread

    delete api._createThread
  })

  it("should dispatch action correctly when create thread success", async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.resolve(fakeCreateThreadResponse)
    // mock dispatch
    const dispatch = vi.fn()

    // action
    await asyncCreateThread(fakeCreateThreadInput)(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(createThreadActionCreator(fakeCreateThreadResponse))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it("should dispatch action and call alert correctly when create thread failed", async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.reject(fakeErrorResponse)
    // mock dispatch
    const dispatch = vi.fn()
    // mock alert
    window.alert = vi.fn()

    // action
    await asyncCreateThread(fakeCreateThreadInput)(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
  })
})
