import { MemoryRouter } from "react-router-dom"
import Navbar from "../components/Fragments/Navbar"

const story = {
  title: "Components/Navbar",
  component: Navbar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default story

export const WithoutAuthUser = {}

export const WithAuthUser = {
  args: {
    authUser: {
      id: "user-123",
      name: "John Doe",
      email: "johndoe@gmail.com",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random",
    },
  },
}
