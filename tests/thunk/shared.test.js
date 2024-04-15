import { hideLoading, showLoading } from "react-redux-loading-bar"
import api from "../../src/utils/api"
import { asyncPopulateUsersAndThreads } from "../../src/app/states/shared/action"
import { getAllThreadsActionCreator } from "../../src/app/states/threads/action"
import { getAllUsersActionCreator } from "../../src/app/states/users/action"

/**
 * skenario testing
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeUsersResponse = [
  {
    id: "user-123",
    name: "John Doe",
    email: "johndoe@gmail.com",
    avatar: "https://generated-image-url.jpg",
  },
]

const fakeThreadsResponse = [
  {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2024-04-14T07:00:00.000Z",
    ownerId: "users-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
]

const fakeErrorResponse = new Error("Ups, something went wrong")

describe("asyncPopulateUsersAndThreads thunk", () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers
    api._getAllThreads = api.getAllThreads
  })

  afterEach(() => {
    api.getAllUsers = api._getAllUsers
    api.getAllThreads = api._getAllThreads

    delete api._getAllUsers
    delete api._getAllThreads
  })

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse)
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse)
    // mock dispatch
    const dispatch = vi.fn()

    // action
    await asyncPopulateUsersAndThreads()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(getAllUsersActionCreator(fakeUsersResponse))
    expect(dispatch).toHaveBeenCalledWith(getAllThreadsActionCreator(fakeThreadsResponse))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it("should dispatch action and call alert correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.reject(fakeErrorResponse)
    api.getAllThreads = () => Promise.reject(fakeErrorResponse)
    // mock dispatch
    const dispatch = vi.fn()
    // mock alert
    window.alert = vi.fn()

    // action
    await asyncPopulateUsersAndThreads()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
  })
})
