import { useAuth, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Heart, Users, TrendingUp, Eye } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Community = () => {

  const [creations, setCreations] = useState([])
  const {user} = useUser()
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const fetchCreations = async ()=>{
    try {
      const {data} = await axios.get('/api/user/get-published-creations', {
        headers : {Authorization: `Bearer ${await getToken()}`}
      })
      if (data.success){
        setCreations(data.creations)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const imageLikeToggle = async (id)=>{
    try {
      const {data} = await axios.post('/api/user/toggle-like-creation', {id}, {
        headers : {Authorization: `Bearer ${await getToken()}`}
      })

      if (data.success){
        toast.success(data.message)
        await fetchCreations()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user){
      fetchCreations()
    }
  },[user])

  return !loading ? (
    <div className='flex-1 h-full flex flex-col p-6'>
      {/* Header */}
      <div className='mb-6 animate-slideInDown'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg'>
            <Users className='w-6 h-6 text-white animate-pulse' />
          </div>
          <h1 className='text-2xl font-bold text-gray-800'>Community Creations</h1>
        </div>
        <p className='text-gray-600'>Discover and appreciate amazing AI-generated content from our community</p>
      </div>

      {/* Stats Bar */}
      <div className='flex gap-4 mb-6 animate-slideInUp'>
        <div className='bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 flex items-center gap-3 group'>
          <div className='p-2 bg-blue-100 rounded-lg group-hover:scale-110 transition-transform'>
            <Eye className='w-5 h-5 text-blue-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Total Views</p>
            <p className='font-bold text-gray-800'>{creations.reduce((sum, item) => sum + (item.likes?.length || 0), 0) * 12}</p>
          </div>
        </div>
        
        <div className='bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 flex items-center gap-3 group'>
          <div className='p-2 bg-rose-100 rounded-lg group-hover:scale-110 transition-transform'>
            <Heart className='w-5 h-5 text-rose-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Total Likes</p>
            <p className='font-bold text-gray-800'>{creations.reduce((sum, item) => sum + (item.likes?.length || 0), 0)}</p>
          </div>
        </div>
      </div>

      {/* Creations Grid */}
      <div className='bg-white h-full w-full rounded-xl overflow-y-scroll shadow-sm border border-gray-200'>
        {creations.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
            {creations.map((creation, index)=> (
              <div 
                key={index} 
                className='relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slideInUp'
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className='aspect-square overflow-hidden'>
                  <img 
                    src={creation.content} 
                    alt="" 
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                  />
                </div>

                {/* Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300'>
                  <div className='absolute bottom-0 left-0 right-0 p-4'>
                    <p className='text-white text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100'>
                      {creation.prompt}
                    </p>
                    
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <div className='w-6 h-6 bg-white/20 rounded-full flex items-center justify-center'>
                          <TrendingUp className='w-3 h-3 text-white' />
                        </div>
                        <span className='text-white text-xs'>Trending</span>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          imageLikeToggle(creation.id);
                        }}
                        className='flex gap-1 items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 hover:bg-white/30 transition-all duration-200 group/like'
                      >
                        <span className='text-white text-sm'>{creation.likes?.length || 0}</span>
                        <Heart 
                          className={`w-4 h-4 transition-all duration-200 group-hover/like:scale-125 ${
                            creation.likes?.includes(user.id) 
                              ? 'fill-red-500 text-red-500 animate-pulse' 
                              : 'text-white hover:text-red-400'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Like indicator */}
                <div className='absolute top-3 right-3'>
                  <div className='bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg'>
                    <Heart 
                      className={`w-4 h-4 transition-all duration-200 ${
                        creation.likes?.includes(user.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-400'
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-full py-16 text-gray-400'>
            <div className='p-8 bg-gray-100 rounded-full mb-6'>
              <Users className='w-16 h-16' />
            </div>
            <h3 className='text-xl font-semibold text-gray-600 mb-2'>No community creations yet</h3>
            <p className='text-center text-gray-500'>Be the first to share your amazing AI creations!</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center h-full'>
      <div className='relative'>
        <div className='w-16 h-16 border-4 border-pink-200 rounded-full animate-spin'></div>
        <div className='absolute top-0 left-0 w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin'></div>
        <Users className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-pink-500 animate-pulse' />
      </div>
    </div>
  )
}
export default Community;