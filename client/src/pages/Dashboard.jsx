import React, { useEffect, useState } from 'react'
import { Gem, Sparkles, TrendingUp } from 'lucide-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Dashboard = () => {
 
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const getDashboardData = async ()=>{
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers : {Authorization: `Bearer ${await getToken()}`}
      })

      if (data.success) {
        setCreations(data.creations)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(()=>{
    getDashboardData()
  }, [])

  return (
    <div className='h-full overflow-y-scroll p-6'>
      <div className='mb-6 animate-slideInDown'>
        <h1 className='text-2xl font-bold text-gray-800 mb-2'>Dashboard</h1>
        <p className='text-gray-600'>Welcome back! Here's your creative overview</p>
      </div>

      <div className='flex justify-start gap-4 flex-wrap mb-8'>
        {/* Total Creations Card */}
        <div className='flex justify-between items-center w-72 p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group animate-slideInLeft'>
            <div className='text-slate-600'>
              <p className='text-sm font-medium text-gray-500'>Total Creations</p>
              <h2 className='text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors'>{creations.length}</h2>
            </div>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center group-hover:scale-110 transition-transform duration-300'>
              <Sparkles className='w-6 text-white animate-pulse' />
            </div>
        </div>

        {/* Active Plan Card */}
        <div className='flex justify-between items-center w-72 p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group animate-slideInUp delay-100'>
            <div className='text-slate-600'>
              <p className='text-sm font-medium text-gray-500'>Active Plan</p>
              <h2 className='text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors'>
                <Protect plan='premium' fallback="Free">Premium</Protect>
              </h2>
            </div>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300'>
              <Gem className='w-6 text-white' />
            </div>
        </div>

        {/* Trending Card */}
        <div className='flex justify-between items-center w-72 p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group animate-slideInRight delay-200'>
            <div className='text-slate-600'>
              <p className='text-sm font-medium text-gray-500'>This Week</p>
              <h2 className='text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors'>+{Math.floor(creations.length * 0.3)}</h2>
            </div>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] text-white flex justify-center items-center group-hover:scale-110 transition-transform duration-300'>
              <TrendingUp className='w-6 text-white' />
            </div>
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='relative'>
            <div className='w-16 h-16 border-4 border-purple-200 rounded-full animate-spin'></div>
            <div className='absolute top-0 left-0 w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin'></div>
          </div>
        </div>
      ) : (
        <div className='bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden animate-fadeIn'>
          <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6'>
            <h2 className='text-xl font-semibold text-white flex items-center gap-3'>
              <Sparkles className='w-6 h-6 animate-pulse' />
              Recent Creations
            </h2>
          </div>
          
          <div className='p-6'>
            {creations.length > 0 ? (
              <div className='space-y-3'>
                {creations.map((item, index) => (
                  <div 
                    key={item.id} 
                    className='animate-slideInUp'
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CreationItem item={item}/>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center py-16 text-gray-400'>
                <div className='p-6 bg-gray-100 rounded-full mb-4 animate-bounce'>
                  <Sparkles className='w-12 h-12' />
                </div>
                <h3 className='text-lg font-semibold text-gray-600 mb-2'>No creations yet</h3>
                <p className='text-center'>Start creating amazing content with AI!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default Dashboard