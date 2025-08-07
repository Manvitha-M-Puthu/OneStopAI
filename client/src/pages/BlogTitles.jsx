import { useAuth } from '@clerk/clerk-react';
import { Hash, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {

  const blogCategories = ['General',  'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food']
  
    const [selectedCategory, setSelectedCategory] = useState('General')
    const [input, setInput] = useState('')

    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')

    const {getToken} = useAuth()
  
    const onSubmitHandler = async (e)=>{
      e.preventDefault();
      try {
         setLoading(true)
         const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`

         const { data } = await axios.post('/api/ai/generate-blog-title', {prompt}, {headers: {Authorization: `Bearer ${await getToken()}`}})

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
            <div className='p-2 bg-purple-100 rounded-lg animate-pulse'>
              <Sparkles className='w-6 text-[#8E37EB]'/>
            </div>
            <h1 className='text-xl font-semibold text-gray-800'>AI Title Generator</h1>
          </div>
          
          <div className='space-y-4'>
            <div>
              <p className='text-sm font-medium text-gray-700 mb-2'>Keyword</p>
              <input 
                onChange={(e)=>setInput(e.target.value)} 
                value={input} 
                type="text" 
                className='w-full p-3 px-4 outline-none text-sm rounded-lg border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 hover:border-gray-300' 
                placeholder='The future of artificial intelligence is...' 
                required
              />
            </div>

            <div>
              <p className='text-sm font-medium text-gray-700 mb-3'>Category</p>
              <div className='grid grid-cols-2 gap-2'>
                {blogCategories.map((item)=>(
                  <button
                    type="button"
                    onClick={()=> setSelectedCategory(item)} 
                    className={`text-xs px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 font-medium transform hover:scale-105 active:scale-95 ${
                      selectedCategory === item 
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md' 
                        : 'text-gray-600 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700'
                    }`} 
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            disabled={loading} 
            className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-3 mt-6 text-sm rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group'
          >
            {loading ? (
              <div className='flex items-center gap-2'>
                <span className='w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin'></span>
                <span>Generating...</span>
              </div>
            ) : (
              <>
                <Hash className='w-5 group-hover:rotate-12 transition-transform duration-200'/>
                Generate title
              </>
            )}
          </button>
      </form>

      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-xl flex flex-col border border-gray-200 min-h-96 shadow-sm hover:shadow-lg transition-all duration-300'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='p-2 bg-purple-100 rounded-lg'>
            <Hash className='w-5 h-5 text-[#8E37EB]' />
          </div>
          <h1 className='text-xl font-semibold text-gray-800'>Generated titles</h1>
        </div>
        
        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400 animate-pulse'>
              <div className='p-4 bg-gray-100 rounded-full'>
                <Hash className='w-9 h-9' />
              </div>
              <p className='text-center'>Enter a topic and click "Generate title" to get started</p>
            </div>
          </div>
        ) : (
          <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600 animate-fadeIn'>
            <div className='reset-tw prose prose-sm max-w-none'>
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default BlogTitles;