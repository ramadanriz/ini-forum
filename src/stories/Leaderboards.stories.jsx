import Leaderboards from "../components/Fragments/Leaderboards"

const story = {
  title: "Components/Leaderboards",
  component: Leaderboards,
}

export default story

export const Basic = {
  args: {
    leaderboards: [
      {
        user: {
          id: "users-123",
          name: "John Doe",
          email: "johndoe@gmail.com",
          avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random",
        },
        score: 10,
      },
      {
        user: {
          id: "users-124",
          name: "Jane Doe",
          email: "janedoe@gmail.com",
          avatar: "https://ui-avatars.com/api/?name=Jone+Doe&background=random",
        },
        score: 5,
      },
    ],
  },
}
