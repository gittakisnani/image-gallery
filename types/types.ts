import { StaticImageData } from "next/image"
import { ReactNode } from "react"
import { User } from "../pages/edit-profile"

export type HeaderProps = {
    bg?: string
    searchBar?: boolean
    className?: string
    user?: User
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
    link: string
    username: string
}

export type PictureInfosProps = {
    url: string
    createdAt: Date
    views: number
    likes: number
    downloads: number
    infos: boolean
    setInfos: (value: boolean) => void
}

export interface Trends {
    text: string
    image: string | StaticImageData
}


export interface ModalProps {
    text?: string
    setText: (value: string) => void
    setIsOpen: (value: boolean) => void
    isOpen: boolean
}
