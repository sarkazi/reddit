import { FC, MouseEventHandler } from 'react'

interface IActionPanel {
  icon: JSX.Element
  info?: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

const ActionPanel: FC<IActionPanel> = ({ icon, info, onClick }) => {
  return (
    <button onClick={onClick} className="flex space-x-1 items-center">
      {icon}
      <p>{info}</p>
    </button>
  )
}

export default ActionPanel
