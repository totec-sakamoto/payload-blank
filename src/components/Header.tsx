import Image from 'next/image'
import Link from 'next/link'

type NavigationItem = {
  href: string
  label: string
}

/**
 * Header component.
 * Displays the site logo and a dropdown navigation menu.
 */

export default function Header() {
  // Navigation items for the dropdown menu
  const navigationItems: NavigationItem[] = [
    { href: '/catalog', label: 'Catalog' },
  ]

  return (
    <header className='navbar fixed top-0 z-50 bg-slate-100'>
      <div className='flex-1'>
        <Link href='/' className='btn btn-ghost' aria-label='Go to homepage'>
          <Image
            src='/logo.svg'
            width={128}
            height={28}
            alt='Pseudo Logo'
            priority
          />
        </Link>
      </div>

      <div className='flex-none'>
        <div className='dropdown dropdown-end'>
          <div
            className='btn btn-ghost m-1'
            role='button'
            tabIndex={0}
            aria-label='Open pages menu'
            aria-haspopup='true'>
            Pages
            <i className='bi-chevron-down text-xs' aria-hidden='true'></i>
          </div>
          <ul
            className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm'
            role='menu'
            tabIndex={0}
            aria-label='Page navigation menu'>
            {navigationItems.map((item) => (
              <li key={item.href} role='none'>
                <Link
                  href={item.href}
                  className='btn btn-ghost justify-start'
                  role='menuitem'>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
