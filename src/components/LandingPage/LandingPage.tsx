

const LandingPage = () => {
    return(
        <div className='grid grid-rows-2 justify-between h-[90vh] lg:h-screen lg:grid-cols-2 md:grid-cols-2 box-border'>
            <div className="col-span-2 md:col-span-1 lg:row-span-2 mb-12 mt-8 sm:mt-16 flex flex-col space-y-6 text-center md:mb-0 md:text-left md:justify-center md:space-y-2">
                <h1 className=" text-3xl font-extralight dark:text-white  md:max-w-md md:text-6xl lg:font-bold">
                    Discover and collect rare <span className="font-bold text-yellow-600">NFTs</span>
                </h1>
            </div>
            
            <div className='md:col-span-1 md:row-span-2 md:relative'>
                <div className='absolute md:top-1/2 lg:top-1/2 w-max lg:hover:-translate-y-[220px] transition duration-300 -translate-y-[180px] translate-x-[200px] sm:-translate-y-[180px] sm:translate-x-[350px] md:translate-x-[220px] lg:-translate-y-[200px] lg:translate-x-[300px]'>
                    <div className=' w-32 sm:w-48 card transition rounded-sm lg:w-72 '>  
                        <img src="static/images/monkey.png" alt="kong" />   
                    </div> 
                </div>
                <div className='absolute md:top-1/2 lg:top-1/2 w-max lg:hover:-translate-y-[120px] transition duration-300 -translate-y-[80px] translate-x-[100px] sm:-translate-y-[80px] sm:translate-x-[180px] md:translate-x-[120px] lg:-translate-y-[100px] lg:translate-x-[160px]'>
                    <div className=' w-32 sm:w-48 card transition rounded-sm lg:w-72'>   
                        <img src="static/images/avatar.png" alt="avatar" />  
                    </div> 
                </div>
                <div className='absolute md:top-1/2 lg:top-1/2 w-max lg:hover:-translate-y-3 transition duration-300'>
                    <div className=' w-32 sm:w-48 card transition rounded-sm lg:w-72'>  
                        <img src="static/images/azuki.png" alt="azuki" />  
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default LandingPage