import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ChangeTheme: React.FC = () => {

    const { theme, setTheme } = useTheme();
    const [ mounted, setmMounted ] = useState(false);

    useEffect(() => {
        setmMounted(true)
    },[mounted])

 
    return(
       <>
       {
           mounted && (
               <button
                className="absolute top-10 right-10 w-10 h-5 md:w-12 md:h-6 rounded-2xl bg-white flex items-center transition duration-300 focus:outline-none shadow"
                onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}
                >
                    <div
                        className="w-6 h-6 md:w-7 md:h-7 relative rounded-full transition duration-500 transform bg-gray-700 translate-x-full dark:bg-yellow-500 dark:-translate-x-2 p-1 text-white ">
                        {
                            theme === 'dark' ? 
                            (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            )
                            :
                            (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>  
                            )
                        }    
                        
                    </div>
                </button>
           )
       }
       </>
    )
}

export default ChangeTheme