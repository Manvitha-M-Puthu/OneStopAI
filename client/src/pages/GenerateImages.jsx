import { Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {

  const imageStyle = ['Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style', 'Realistic style', '3D style', 'Portrait style']
    
      const [selectedStyle, setSelectedStyle] = useState('Realistic')
      const [input, setInput] = useState('')
      const [publish, setPublish] = useState(false)
      const [loading, setLoading] = useState(false)
      const [content, setContent] = useState('')

      const {getToken} = useAuth()
    
      const onSubmitHandler = async (e)=>{
        e.preventDefault();
        try {
          setLoading(true)

          const prompt = `Generate an image of ${input} in the style ${selectedStyle}`

          const { data } = await axios.post('/api/ai/generate-image', {prompt, publish}, {headers: {Authorization: `Bearer ${await getToken()}`}})

         if (data.success) {
          setContent(data.content)
         }else{
          toast.error(data.message)
         }
        } catch (error) {
          toast.error(error.message)
        }
        setLoading(false)
      }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='p-2 bg-green-100 rounded-lg animate-pulse'>
              <Sparkles className='w-6 text-[#00AD25]'/>
            </div>
            <h1 className='text-xl font-semibold text-gray-800'>AI Image Generator</h1>
          </div>
          
          <div className='space-y-4'>
            <div>
              <p className='text-sm font-medium text-gray-700 mb-2'>Describe Your Image</p>
              <textarea 
                onChange={(e)=>setInput(e.target.value)} 
                value={input} 
                rows={4} 
                className='w-full p-3 px-4 outline-none text-sm rounded-lg border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-200 resize-none hover:border-gray-300' 
                placeholder='Describe what you want to see in the image..' 
                required
              />
            </div>

            <div>
              <p className='text-sm font-medium text-gray-700 mb-3'>Style</p>
              <div className='grid grid-cols-2 gap-2'>
                {imageStyle.map((item)=>(
                  <button
                    type="button"
                    onClick={()=> setSelectedStyle(item)} 
                    className={`text-xs px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 font-medium transform hover:scale-105 active:scale-95 ${
                      selectedStyle === item 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md' 
                        : 'text-gray-600 border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 hover:text-green-700'
                    }`} 
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className='bg-gray-50 rounded-lg p-4 border-2 border-gray-100 hover:border-gray-200 transition-colors'>
              <div className='flex items-center gap-3'>
                <label className='relative cursor-pointer'>
                  <input 
                    type="checkbox" 
                    onChange={(e)=>setPublish(e.target.checked)} 
                    checked={publish} 
                    className='sr-only peer' 
                  />
                  <div className='w-10 h-6 bg-gray-300 rounded-full peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-green-500 transition-all duration-300 relative'>
                    <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-md ${publish ? 'translate-x-4' : 'translate-x-0'}`}></span>
                  </div>
                </label>
                <div>
                  <p className='text-sm font-medium text-gray-700'>Make this image Public</p>
                  <p className='text-xs text-gray-500'>Share with the community</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            disabled={loading} 
            className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-3 mt-6 text-sm rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 disabled:opacity-70 group'
          >
            {loading ? (
              <div className='flex items-center gap-2'>
                <span className='w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin'></span>
                <span>Creating...</span>
              </div>
            ) : (
              <>
                <Image className='w-5 group-hover:scale-110 transition-transform duration-200'/>
                Generate Image
              </>
            )}
          </button>
      </form>

      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-xl flex flex-col border border-gray-200 min-h-96 shadow-sm hover:shadow-lg transition-all duration-300'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='p-2 bg-green-100 rounded-lg'>
            <Image className='w-5 h-5 text-[#00AD25]' />
          </div>
          <h1 className='text-xl font-semibold text-gray-800'>Generated image</h1>
        </div>
        
        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400 animate-pulse'>
              <div className='p-4 bg-gray-100 rounded-full'>
                <Image className='w-9 h-9' />
              </div>
              <p className='text-center'>Enter a topic and click "Generate image" to get started</p>
            </div>
          </div>
        ) : (
          <div className='mt-3 h-full rounded-lg overflow-hidden animate-fadeIn'>
            <img 
              src={content} 
              alt="Generated image" 
              className='w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-500 cursor-zoom-in'
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default GenerateImages;