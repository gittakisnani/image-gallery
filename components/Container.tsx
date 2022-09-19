import { ContainerProps } from "../types/types"

const Container = ({ className = "", children } : ContainerProps) => {
  return (
    <div className={`w-full max-w-[1400px] mx-auto bg-inherit ${className}`}>
        {children}
    </div>
  )
}

export default Container