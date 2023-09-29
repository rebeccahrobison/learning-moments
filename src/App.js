import { Login } from "./components/auth/Login.js"
import { Register } from "./components/auth/Register"
import { ApplicationViews } from "./views/ApplicationViews"
import { Routes, Route } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import "./App.css"

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={
        <Authorized>
          <ApplicationViews />
        </Authorized>
      } />
    </Routes>
  )
}
