import PropTypes from "prop-types"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { setupStore } from "../app/store"

export default function renderWithProviders(ui, { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions } = {}) {
  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  }

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
