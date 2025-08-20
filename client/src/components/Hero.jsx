import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
    const navigate = useNavigate()
    
    return (
        <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>
            <div className='absolute inset-0 bg-black/10'></div>
            
            <div className='relative z-10 text-center mb-8'>
                <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold mx-auto leading-[1.1] mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent'>
                    Create amazing content <br/> 
                    with <span className='bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent'>AI tools</span>
                </h1>
                <p className='mt-6 max-w-md sm:max-w-2xl 2xl:max-w-3xl m-auto text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed'>
                    Transform your content creation with our suite of premium AI tools. 
                    Write compelling articles, generate stunning images, and streamline your creative workflow 
                    with cutting-edge artificial intelligence.
                </p>
            </div>

            <div className='relative z-10 flex flex-col items-center gap-6'>

                <button 
                    onClick={() => navigate('/ai')} 
                    className='group bg-gradient-to-r from-primary to-purple-600 text-white px-12 py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 ease-out hover:from-purple-600 hover:to-primary'
                >
                    <span className='flex items-center gap-3'>
                        Start creating now
                        <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                        </svg>
                    </span>
                </button>
                

                <div className='flex flex-wrap justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-gray-600 mt-4'>
                    <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                        <span>No credit card required</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                        <span>Free trial included</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                        <span>Premium AI models</span>
                    </div>
                </div>
            </div>
            
            <div className='relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-12 text-gray-600'>
                <div className='flex items-center gap-3'>
                    <img src={assets.user_group} alt="Users" className='h-8 w-8 opacity-80'/>
                    <span className='text-sm sm:text-base font-medium'>Trusted by 10k+ creators</span>
                </div>
                
                <div className='flex items-center gap-2 text-yellow-500'>
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
                            <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z'/>
                        </svg>
                    ))}
                    <span className='text-gray-600 text-sm ml-1'>4.9/5 rating</span>
                </div>
            </div>

            <div className='absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse'></div>
            <div className='absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse' style={{animationDelay: '1s'}}></div>
        </div>
    )
}

export default Hero
