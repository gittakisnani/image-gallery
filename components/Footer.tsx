import Container from "./Container"
import TRENDS from '../config/trends'
import { AiFillApple, AiFillAndroid, BsLinkedin, BsTwitter, AiFillFacebook, BsGithub } from './Icons'
import Link from "next/link"
const Footer = () => {
  return (
    <footer className="bg-black text-white">
        <Container className="px-4 md:px-8 lg:px-12 py-10 md:py-14 lg:py-18 grid gap-4 md:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-inherit">
            <div className="">
                <h5 className="text-ld md:text-xl font-semibold">
                Free photos and videos shared by talented creators.
                </h5>
                <p className="text-lg font-semibold text-gray-500 my-2">
                Download one of our apps.
                </p>

                <div className="flex gap-2 items-center">
                    <button className="text-black flex gap-1 items-center text-lg font-semibold rounded-md p-2 bg-gray-100">
                        <span className="text-2xl"><AiFillApple /></span>
                        IOS
                    </button>
                    <button className="text-black flex gap-1 items-center text-lg font-semibold rounded-md p-2 bg-gray-100">
                        <span className="text-2xl"><AiFillAndroid /></span>
                        Android
                    </button>
                </div>

                <div className="flex items-center gap-4 text-2xl mt-8">
                    <a href="https://github.com/gittakisnani" rel="noopener noreferrer" target='_blank' className="transitions hover:text-gray-300">
                        <BsGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/taki-snani-1ba6ba236/" rel="noopener noreferrer" target='_blank' className="transitions hover:text-gray-300">
                        <BsLinkedin />
                    </a>
                    <a href="https://twitter.com/yestakisnani" rel="noopener noreferrer" target='_blank' className="transitions hover:text-gray-300">
                        <BsTwitter />
                    </a>
                    <a href="https://facebook.com" rel="noopener noreferrer" target='_blank' className="transitions hover:text-gray-300">
                        <AiFillFacebook />
                    </a>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h5 className="text-xl tracking-tighter font-semibold mb-4">TakiSnani</h5>
                {['Free Stock Photos','Free Videos','Popular searches','Collections','Challenges','Leaderboard','Other plugins & apps'].map((el, index) => (
                    <p className="footer-link" key={index}>{el}</p>
                ))}
            </div>
            <div className="flex flex-col gap-2">
                <h5 className="text-xl tracking-tighter font-semibold mb-4">Company</h5>
                {['About','Blog','FAQ','Become a hero','Partner with','TakiSnani','Images','API'].map((el, index) => (
                    <p className="footer-link" key={index}>{el}</p>
                ))}
            </div>
            <div className="flex flex-col gap-2">
                <h5 className="text-xl tracking-tighter font-semibold mb-4">Free stock photos</h5>
                <div className="flex items-center gap-2 flex-wrap">
                {TRENDS.map(({text}, index) => (
                    <Link key={index} href={`/${text}`}>
                        <a className="border border-gray-200 text-gray-200 transitions hover:text-black hover:bg-gray-200 text-lg p-2 rounded-md font-semibold">{text}</a>
                    </Link>
                ))}
                </div>
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-wrap items-center justify-center gap-4">
                <p className="text-lg">© 2022 | All rights reserved</p>
                <a href="mailto:takisnbusiness@gmail.com">Takisnbusiness@gmail.com</a>
            </div>
        </Container>
    </footer>
  )
}

export default Footer