'use client'

import { useAuth } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const { logOut } = useAuth()
  const router = useRouter()
  const handleLogout = async () => {
    try {
      await logOut()
      // Redirect to login page after logout
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <button type='button' className='btn' onClick={handleLogout}>
      Log out
    </button>
  )
}
