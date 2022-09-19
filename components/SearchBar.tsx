import { useState } from 'react'
import { BsSearch } from '../components/Icons'
import SearchModel from './SearchModel'

const SearchBar = ({ bg = 'bg-gray-200 ' }: { bg?: string}) => {
    const [searchText, setSearchText] = useState('')
    const [searchModel, setSearchModel] = useState(false)

    const handleChangeSearchText = (e: any) => {
        //Show suggestions

        setSearchText(e.target.value)
    }

    const handleSubmit = (e: any, query: typeof searchText) => {
        e.preventDefault()
        console.log(query)
    }

    const handleFocus = () => {
        setSearchModel(true)
    }

    const handleBlur = () => {
        setSearchModel(false)
    }
    return (
        <form
            onSubmit={(e) => handleSubmit(e, searchText)}
            className={`flex items-center focus-within:bg-white rounded-md focus-within:rounded-none border-b border-transparent focus-within:border-gray-200 max-w-[600px] mx-auto ${bg}  relative`}
            role="search">
            {searchModel && <SearchModel />}
            <label htmlFor="searchText" className='absolute left-[20000px]'>Search for free photos.</label>
            <input
                onFocus={handleFocus}
                onBlur={handleBlur}
                type="text"
                role="searchbox"
                value={searchText}
                onChange={handleChangeSearchText}
                className='!p-3 flex-1'
                placeholder='Search for free photos'
            />
            <button className='bg-transparent p-3 border-l self-stretch'>
                <BsSearch />
            </button>
        </form>
    )
}

export default SearchBar