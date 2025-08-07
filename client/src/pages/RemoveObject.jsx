import { Scissors, Sparkles, Download, Upload, Target } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {

  const [input, setInput] = useState('')
  const [object, setObject] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const {getToken} = useAuth()
      
    const onSubmitHandler = async (e)=>{
          e.preventDefault();
          try {
            setLoading(true)

            if(object.split(' ').length > 1){
              toast.error('Please enter only one object name')
              setLoading(false)
              return
            }

              const formData = new FormData()
              formData.append('image', input)
              formData.append('object', object)

              const { data } = await axios.post('/api/ai/remove-image-object',formData, {headers: {Authorization: `Bearer ${await getToken()}`}})

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

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    if (files[0]) {
      setInput(files[0])
    }
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'>

          <div className='flex items-center gap-3 mb-6'>
            <div className='p-2 bg-blue-100 rounded-lg animate-pulse'>
              <Sparkles className='w-6 text-[#4A7AFF]'/>
            </div>
            <h1 className='text-xl font-semibold text-gray-800'>Object Removal</h1>
          </div>

          <div className='space-y-4'>
            <div>
              <p className='text-sm font-medium text-gray-700 mb-3'>Upload image</p>
              
              <div 
                className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${
                  dragOver 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={(e) => { e.preventDefault(); setDragOver(false) }}
              >
                <input 
                  onChange={(e)=>setInput(e.target.files[0])} 
                  type="file" 
                  accept='image/*' 
                  className='absolute inset-0 w-full h-full opacity-0 cursor-pointer' 
                  required
                />
                
                <div className='text-center'>
                  <div className={`p-3 bg-gray-100 rounded-full inline-block mb-3 transition-all duration-300 ${dragOver ? 'scale-110 bg-blue-100' : ''}`}>
                    <Upload className={`w-6 h-6 transition-colors ${dragOver ? 'text-blue-500' : 'text-gray-400'}`} />
                  </div>
                  <p className='text-sm text-gray-600 mb-1'>
                    {input ? input.name : 'Drop image here or click to browse'}
                  </p>
                  <p className='text-xs text-gray-500'>Supports JPG, PNG, and other formats</p>
                </div>
              </div>
            </div>

            <div>
              <div className='flex items-center gap-2 mb-3'>
                <Target className='w-4 h-4 text-blue-500' />
                <p className='text-sm font-medium text-gray-700'>Object to remove</p>
              </div>
              
              <textarea 
                onChange={(e)=>setObject(e.target.value)} 
                value={object} 
                rows={3} 
                className='w-full p-3 px-4 outline-none text-sm rounded-lg border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none hover:border-gray-300' 
                placeholder='e.g., watch, spoon, car (single object only)' 
                required
              />
              
              <div className='mt-2 flex items-center gap-2'>
                <div className={`w-2 h-2 rounded-full transition-colors ${object.split(' ').length === 1 && object.trim() ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <p className='text-xs text-gray-500'>
                  {object.split(' ').length === 1 && object.trim() ? 'Single object detected ✓' : 'Please enter only one object name'}
                </p>
              </div>
            </div>
          </div>
          
          <button 
            disabled={loading || !input || !object || object.split(' ').length > 1} 
            className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-3 mt-6 text-sm rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group'
          >
            {loading ? (
              <div className='flex items-center gap-2'>
                <span className='w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin'></span>
                <span>Removing...</span>
              </div>
            ) : (
              <>
                <Scissors className='w-5 group-hover:rotate-12 transition-transform duration-200'/>
                Remove object
              </>
            )}
          </button>
      </form>

      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-xl flex flex-col border border-gray-200 min-h-96 shadow-sm hover:shadow-lg transition-all duration-300'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-blue-100 rounded-lg'>
              <Scissors className='w-5 h-5 text-[#4A7AFF]' />
            </div>
            <h1 className='text-xl font-semibold text-gray-800'>Processed Image</h1>
          </div>
          
          {content && (
            <button
              onClick={() => {
                const link = document.createElement('a')
                link.href = content
                link.download = 'object-removed.png'
                link.click()
              }}
              className='p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors group'
              title="Download image"
            >
              <Download className='w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform' />
            </button>
          )}
        </div>

        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400 animate-pulse'>
              <div className='p-4 bg-gray-100 rounded-full'>
                <Scissors className='w-9 h-9' />
              </div>
              <p className='text-center'>Upload an image and specify an object to remove</p>
            </div>
          </div>
        ) : (
          <div className='mt-3 h-full flex items-center justify-center animate-fadeIn'>
            <img 
              src={content} 
              alt="Processed image" 
              className='max-w-full max-h-full object-contain rounded-lg hover:scale-105 transition-transform duration-500 shadow-lg'
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default RemoveObject;