import axios from "./axios"

const fetcher = async <T>(url: string): Promise<T | null> => {
    try {
        const { data } = await axios.get<T>(url);
        return data
    } catch(err) {
        return null
    }
}

export default fetcher