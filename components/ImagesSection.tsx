import { useState } from 'react'
import Container from './Container'
import { AiOutlineUp, AiOutlineDown, AiOutlineCheck} from './Icons'
import { ModalProps } from './Modal'
import Picture from './Picture'


const ImagesSection = ({ setIsOpen, isOpen, setText }: ModalProps & { setText: (value: string) => void }) => {
    const [sort, setSort] = useState('Trending')
    const [showSorts, setShowSorts] = useState(false);

    const handleSetSort = (sort: string) => {
        setShowSorts(false);
        setSort(sort)
    }

  return (
    <section id='explore' className='bg-white'>
        <Container className='p-4 px-8 md:p-6 md:px-14'>
            <div className='flex items-center justify-between'>
                <h3 className='text-xl md:text-2xl font-semibold'>
                    Free Stock photos
                </h3>
                <div onClick={() => setShowSorts(!showSorts)} className='p-2 border border-gray-200 hover:border-gray-300 transitions relative flex justify-between items-center w-[120px] rounded-md'>
                    <p>{sort}</p>
                    <span>{showSorts ? <AiOutlineUp /> : <AiOutlineDown />}</span>
                    {showSorts && <ul className='bg-white shadow-2xl p-4 absolute top-[120%] z-20 rounded-md'>
                        {['Trending', 'New'].map(el => (
                            <li onClick={() => handleSetSort(el)} key={el} className='navbar__li flex items-center justify-between p-2 rounded-md cursor-pointer'>
                                <p>{el}</p>
                                {el === sort && <span><AiOutlineCheck /></span>}
                            </li>
                        ))}
                    </ul>}
                </div>
            </div>
            <div className='my-10 max-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
                <Picture setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} />
                <Picture setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} />
                <Picture setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} />
                <Picture setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} />
                <Picture setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} />
                <Picture setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} />
                <Picture setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} />
                <Picture setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} />
                <Picture setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} />
                <Picture setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} />
                <Picture setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} />
                <Picture setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} />
            </div>
        </Container>
    </section>
  )
}

export default ImagesSection