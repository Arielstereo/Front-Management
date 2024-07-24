import Link from "next/link"


const Footer = () => {
  return (
    <div className="pt-32 pb-12 w-full text-center">
      <span className="text-slate-400">Created by <Link href="https://www.linkedin.com/in/arielstereo/" className="text-sky-200 hover:text-blue-300" target="_blank">Ariel Martinez</Link> | 2024</span>
    </div>
  )
}

export default Footer