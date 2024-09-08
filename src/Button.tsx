import { text } from "stream/consumers"

type ButtonType = {
    title: string
    сlick?: () => void
    className?: string
}

export const Button = ({ title, сlick, className }: ButtonType) => {
    return (
        <button className={className} onClick={сlick}>{title}</button>
    )
}