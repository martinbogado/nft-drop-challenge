
const Footer = () => {
  return (
    <footer className="flex justify-center space-x-4 border-t border-yellow-400/[0.15] bg-white/25 py-4 text-center text-sm font-medium uppercase dark:bg-black/25 dark:text-white">
      made by<span className="text-yellow-500 ml-1">martin</span>
      <div className="flex justify-center space-x-3">
          <a href="https://www.linkedin.com/in/martinbogado/" target='_blank'><img className='w-5 hover:scale-125 transition dark:invert' src="images/assets/linkedin-logo.png" alt="" /></a>
          <a href="https://github.com/martinbogado" target='_blank'><img className='w-5 hover:scale-125 transition dark:invert' src="images/assets/github-logo.png" alt="" /></a>
      </div>
    </footer>
  )
}

export default Footer