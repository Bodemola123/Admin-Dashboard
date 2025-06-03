import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Basicinfo = ({ userData }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const userId = userData?.id

const handleDelete = async () => {
  if (!userId || loading) return;

  const confirmed = window.confirm(
    'Are you sure you want to delete this account? This action is irreversible.'
  );
  if (!confirmed) return;

  setLoading(true);

  try {
    const response = await fetch(
      `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api?user_id=${userId}`,
      { method: 'DELETE' }
    );

    if (!response.ok) {
      throw new Error('Failed to delete account');
    }

    toast.success('Account deleted successfully.');
    sessionStorage.removeItem('userData');
    router.push('/users');
  } catch (error) {
    toast.error(error.message || 'Something went wrong while deleting the account.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className='bg-[#FFFFFF] py-4 px-8 gap-4 rounded-[23px] flex flex-col overflow-y-auto scrollbar-hide w-full'>
      <div className='max-w-2xl flex flex-col gap-4'>
              <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-start items-start gap-2'>
          <p className='text-[#032400] font-medium text-2xl'>User ID</p>
          <p className='text-[#6D6D6D] font-normal text-base'>This is the user ID number</p>
        </div>
        <p className='flex justify-start items-center text-[#6d6d6d]'>{userData?.user_id}</p>
      </div>

      <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-start items-start gap-2'>
          <p className='text-[#032400] font-medium text-2xl'>User fullname</p>
          <p className='text-[#6D6D6D] font-normal text-base'>This is the user fullname</p>
        </div>
        <p className='flex justify-start items-center text-[#6d6d6d]'>{userData?.fullname || "Not provided"}</p>
      </div>

      <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-start items-start gap-2'>
          <p className='text-[#032400] font-medium text-2xl'>Email</p>
          <p className='text-[#6D6D6D] font-normal text-base'>This is the user email</p>
        </div>
        <p className='flex justify-start items-center text-[#6d6d6d]'>{userData?.email}</p>
      </div>

      <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-start items-start gap-2'>
          <p className='text-[#032400] font-medium text-2xl'>Role</p>
          <p className='text-[#6D6D6D] font-normal text-base'>This is the user role</p>
        </div>
        <div className='flex justify-start items-center'>
          <div className='flex justify-start items-center px-2 py-[2px] h-[26px] rounded-2xl bg-[#ECFDF3]'>
            <p className=' text-base text-[#4255FF] font-medium'>{userData?.org_details.role || "None"}</p>
          </div>
        </div>
      </div>

            <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-start items-start gap-2'>
          <p className='text-[#032400] font-medium text-2xl'>Access Level</p>
          <p className='text-[#6D6D6D] font-normal text-base'>This is the user role</p>
        </div>
        <div className='flex justify-start items-center'>
          <div className='flex justify-start items-center px-2 py-[2px] h-[26px] rounded-2xl bg-[#ECFDF3]'>
            <p className=' text-base text-[#430099] font-medium'>{userData?.org_details.access_level || "None"}</p>
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
