import { FC } from 'react'

interface INavIcons {
  icon: JSX.Element
}

const NavIcons: FC<INavIcons> = ({ icon }) => {
  return (
    <li className="cursor-pointer">
      <button>{icon}</button>
    </li>
  )
}

export default NavIcons
