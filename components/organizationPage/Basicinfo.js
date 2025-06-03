import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Basicinfo = ({ orgData }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const orgId = orgData?.id

  const handleDelete = async () => {
    if (!orgId) return

    const confirmed = window.confirm('Are you sure you want to delete this account? This action is irreversible.')
    if (!confirmed) return

    setLoading(true)

    try {
      const response = await fetch('https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ org_id: orgId }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete account')
      }

      // Cleanup and redirect
      sessionStorage.removeItem('orgData')
      router.push('/organizations')
    } catch (error) {
      toast.error(error.message || 'Something went wrong while deleting the account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-[#FFFFFF] py-4 px-8 gap-4 rounded-[23px] flex flex-col overflow-y-auto scrollbar-hide w-full'>
      <div className='max-w-2xl flex flex-col gap-4'>
              <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-start items-start gap-2'>
          <p className='text-[#032400] font-medium text-2xl'>User ID</p>
          <p className='text-[#6D6D6D] font-normal text-base'>This is the Org ID number</p>
        </div>
        <p className='flex justify-start items-center text-[#6d6d6d]'>{orgData?.id}</p>
      </div>

      <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-start items-start gap-2'>
          <p className='text-[#032400] font-medium text-2xl'>Organization name</p>
          <p className='text-[#6D6D6D] font-normal text-base'>This is the organization name</p>
        </div>
        <p className='flex justify-start items-center text-[#6d6d6d]'>{orgData?.organization_name || "Not provided"}</p>
      </div>

      <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-start items-start gap-2'>
          <p className='text-[#032400] font-medium text-2xl'>Email</p>
          <p className='text-[#6D6D6D] font-normal text-base'>This is the Organization email</p>
        </div>
        <p className='flex justify-start items-center text-[#6d6d6d]'>{orgData?.organization_email}</p>
      </div>

      <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-start items-start gap-2'>
          <p className='text-[#032400] font-medium text-2xl'>Industry</p>
          <p className='text-[#6D6D6D] font-normal text-base'>This is the industry it is under</p>
        </div>
        <div className='flex justify-start items-center'>
          <div className='flex justify-start items-center px-2 py-[2px] h-[26px] rounded-2xl bg-[#ECFDF3]'>
            <p className=' text-base text-[#4255FF] font-medium'>{orgData?.industry || "None"}</p>
          </div>
        </div>
      </div>

      <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-start items-start gap-2'>
          <p className='text-[#032400] font-medium text-2xl'>Delete Account</p>
          <p className='text-[#6D6D6D] font-normal text-base'>This action is irreversible</p>
        </div>
        <div className='flex justify-start items-center'>
          <button
            onClick={handleDelete}
            className={`px-5 py-2.5 text-[#0a0a0b] rounded-[25px] transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ff1e1e] hover:bg-red-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Basicinfo
