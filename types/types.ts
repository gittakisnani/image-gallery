import { StaticImageData } from "next/image"
import { ReactNode } from "react"

export type HeaderProps = {
    bg?: string
    searchBar?: boolean
    className?: string
}

export type ContainerProps = {
    className?: string
    children: ReactNode
}

export interface WindowSize {
    height: number | undefined
    width: number | undefined
}

export type ShareProps = {
    share: boolean
    setShare: (value: boolean) => void
}

export interface Trends {
    text: string
    image: string | StaticImageData
}