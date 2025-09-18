'use client'

import Image from 'next/image'
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LikeBtn from '@/components/LikeBtn'
import { Clsss } from '@/components/utilities/misc'
import { useEffect, useState, useRef, useCallback } from 'react'

type Recipe = {
  id: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  name: string
  cuisine: string
}
type DatetimeResponse = {
  year?: number
  month?: number
  day?: number
  hour?: number
  minute?: number
  seconds?: number
  dateTime?: string
  date?: string
  time?: string
  timeZone?: string
  dayOfWeek?: string
  dstActive?: boolean
}

// Endpoints
const RECIPES_API_URL = 'https://dummyjson.com/recipes'
const DATETIME_API_URL =
  'https://timeapi.io/api/time/current/zone?timeZone=Asia%2FTokyo'

// Custom hooks
const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fetchRecipes = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get<{ recipes: Recipe[] }>(RECIPES_API_URL)

      setRecipes(response.data.recipes)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch recipes'

      setError(errorMessage)
      console.error('Error fetching recipes:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { recipes, isLoading, error, fetchRecipes }
}
const useDatetime = () => {
  const [datetime, setDatetime] = useState<DatetimeResponse>({})
  const [error, setError] = useState<string | null>(null)
  const fetchDatetime = useCallback(async () => {
    setError(null)

    try {
      const response = await axios.get<DatetimeResponse>(DATETIME_API_URL)

      setDatetime(response.data)
      console.table(response.data)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch datetime'

      setError(errorMessage)
      console.error('Error fetching datetime:', err)
    }
  }, [])

  return { datetime, error, fetchDatetime }
}

/**
 * Catalog page component.
 * Displays a comprehensive catalog of UI components and data fetching examples.
 */

export default function Catalog() {
  const { recipes, isLoading, error: recipesError, fetchRecipes } = useRecipes()
  const { datetime, error: datetimeError, fetchDatetime } = useDatetime()
  const refInitialRender = useRef(true)

  useEffect(() => {
    fetchRecipes()
  }, [fetchRecipes])

  useEffect(() => {
    // Prevent execution on initial render
    if (refInitialRender.current) {
      refInitialRender.current = false
      return
    }

    if (Object.keys(datetime).length > 0) {
      console.table(datetime)
    }
  }, [datetime])

  const openModal = useCallback(() => {
    const modal = document.querySelector('#exModal') as HTMLDialogElement

    modal?.showModal()
  }, [])

  return (
    <div id='page' className='flex h-screen flex-col pt-16'>
      <title>Catalog - UI Components</title>
      <meta
        name='description'
        content='Comprehensive catalog of UI components including accordion, alerts, buttons, cards, forms, and more.'
      />

      <Header />

      <main className='stack-5 container mx-auto grow px-4 py-6'>
        <section className='stack-4'>
          <h1>Catalog</h1>

          <div className='stack-3'>
            <h2>Accordion</h2>
            <div className='stack-1'>
              <div className='collapse-arrow bg-base-200 collapse'>
                <input type='radio' name='my-accordion-2' defaultChecked />
                <div className='collapse-title font-medium'>
                  Click to open this one and close others
                </div>
                <div className='collapse-content'>
                  <p>hello</p>
                </div>
              </div>
              <div className='collapse-arrow bg-base-200 collapse'>
                <input type='radio' name='my-accordion-2' />
                <div className='collapse-title font-medium'>
                  Click to open this one and close others
                </div>
                <div className='collapse-content'>
                  <p>hello</p>
                </div>
              </div>
              <div className='collapse-arrow bg-base-200 collapse'>
                <input type='radio' name='my-accordion-2' />
                <div className='collapse-title font-medium'>
                  Click to open this one and close others
                </div>
                <div className='collapse-content'>
                  <p>hello</p>
                </div>
              </div>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Alert</h2>
            <div className='stack-2'>
              <div className='alert' role='alert'>
                <i className='bi-info-circle text-lg'></i>
                <span>12 unread messages. Tap to see.</span>
              </div>
              <div className='alert alert-success' role='alert'>
                <i className='bi-check-circle text-lg'></i>
                <span>Your purchase has been confirmed!</span>
              </div>
              <div className='alert alert-warning' role='alert'>
                <i className='bi-exclamation-circle text-lg'></i>
                <span>Warning: Invalid email address</span>
              </div>
              <div className='alert alert-error' role='alert'>
                <i className='bi-x-circle text-lg'></i>
                <span>Error: Task failed unexpectedly</span>
              </div>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Badge</h2>
            <div className='stack-0 flex flex-wrap gap-2'>
              <span className='badge'>default</span>
              <span className='badge badge-neutral'>neutral</span>
              <span className='badge badge-primary'>primary</span>
              <span className='badge badge-secondary'>secondary</span>
              <span className='badge badge-accent'>accent</span>
              <span className='badge badge-info'>info</span>
              <span className='badge badge-success'>success</span>
              <span className='badge badge-warning'>warning</span>
              <span className='badge badge-error'>error</span>
              <span className='badge badge-ghost'>ghost</span>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Breadcrumbs</h2>
            <div className='stack-0'>
              <div className='breadcrumbs text-sm'>
                <ul>
                  <li>
                    <a>Home</a>
                  </li>
                  <li>
                    <a>Documents</a>
                  </li>
                  <li>Add Document</li>
                </ul>
              </div>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Button</h2>
            <div className='stack-0 flex flex-wrap gap-2'>
              <button className='btn'>default</button>
              <button className='btn btn-neutral'>neutral</button>
              <button className='btn btn-primary'>primary</button>
              <button className='btn btn-secondary'>secondary</button>
              <button className='btn btn-accent'>accent</button>
              <button className='btn btn-info'>info</button>
              <button className='btn btn-success'>success</button>
              <button className='btn btn-warning'>warning</button>
              <button className='btn btn-error'>error</button>
              <button className='btn btn-ghost'>ghost</button>
              <button className='btn btn-link'>link</button>
            </div>
            <div className='stack-0 flex flex-wrap gap-2'>
              <button className='btn btn-outline'>default</button>
              <button className='btn btn-outline btn-neutral'>neutral</button>
              <button className='btn btn-outline btn-primary'>primary</button>
              <button className='btn btn-outline btn-secondary'>
                secondary
              </button>
              <button className='btn btn-outline btn-accent'>accent</button>
              <button className='btn btn-outline btn-info'>info</button>
              <button className='btn btn-outline btn-success'>success</button>
              <button className='btn btn-outline btn-warning'>warning</button>
              <button className='btn btn-outline btn-error'>error</button>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Card</h2>
            <div className='stack-0 flex flex-wrap gap-4'>
              <a
                href='#'
                className='card bg-base-100 w-72 shadow transition hover:opacity-90 hover:shadow-lg sm:w-96'>
                <figure>
                  <Image
                    src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
                    width={928}
                    height={548}
                    alt='Shoes'
                  />
                </figure>
                <div className='card-body'>
                  <h2 className='card-title'>
                    Shoes!
                    <div className='badge badge-accent badge-outline text-xs'>
                      NEW
                    </div>
                  </h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className='card-actions justify-end'>
                    <div className='badge badge-outline'>Fashion</div>
                    <div className='badge badge-outline'>Products</div>
                  </div>
                </div>
              </a>
              <a
                href='#'
                className='card bg-base-100 w-72 shadow transition hover:opacity-90 hover:shadow-lg sm:w-96'>
                <figure>
                  <Image
                    src='https://dummyjson.com/image/928x548/282828?type=webp&fontFamily=Lobster&text=I+am+Lobster'
                    width={928}
                    height={548}
                    alt='Google Fonts'
                  />
                </figure>
                <div className='card-body'>
                  <h2 className='card-title'>Google Fonts</h2>
                  <p>What if lobsters fell down from the sky?</p>
                  <div className='card-actions justify-end'>
                    <div className='badge badge-outline'>Eat &apos;em</div>
                    <div className='badge badge-outline'>Evacuate</div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Data Fetching (with Axios)</h2>
            <div className='stack-0'>
              {isLoading ? (
                <div className='flex flex-wrap place-content-center'>
                  <span className='loading loading-ring loading-lg'></span>
                </div>
              ) : recipesError ? (
                <div className='alert alert-error' role='alert'>
                  <i className='bi-x-circle text-lg'></i>
                  <span>Error: {recipesError}</span>
                </div>
              ) : (
                <ul className='flex flex-wrap gap-4 text-sm leading-tight'>
                  {recipes.map((recipe: Recipe) => (
                    <li key={recipe.id}>
                      <div className='flex gap-1'>
                        <small
                          className={Clsss(
                            'badge badge-xs w-14',
                            recipe.difficulty === 'Easy'
                              ? 'badge-success'
                              : recipe.difficulty === 'Medium'
                                ? 'badge-warning'
                                : 'badge-error',
                          )}>
                          {recipe.difficulty}
                        </small>
                        <div>
                          <strong>{recipe.name}</strong> / {recipe.cuisine}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className='stack-3'>
            <h2>Datetime (TimeAPI)</h2>
            <div className='stack-2'>
              <button
                type='button'
                className='btn btn-neutral'
                onClick={fetchDatetime}>
                Fetch datetime
              </button>
              {datetimeError && (
                <div className='alert alert-error' role='alert'>
                  <i className='bi-x-circle text-lg'></i>
                  <span>Error: {datetimeError}</span>
                </div>
              )}
            </div>
          </div>

          <div className='stack-3'>
            <h2>Dropdown</h2>
            <div className='stack-0'>
              <div className='dropdown'>
                <div className='btn btn-neutral' tabIndex={0} role='button'>
                  Dropdown
                </div>
                <ul
                  className='menu dropdown-content rounded-box bg-base-100 z-1 w-52 p-2 shadow-sm'
                  tabIndex={0}>
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='fab'>
            <div
              className='btn btn-lg btn-circle btn-primary'
              role='button'
              tabIndex={0}>
              <i className='bi-plus text-2xl'></i>
            </div>
            <div className='fab-close'>
              <span>Close</span>
              <span className='btn btn-circle btn-lg btn-error'>
                <i className='bi-x text-2xl'></i>
              </span>
            </div>
            <div>
              <span>Label A</span>
              <button className='btn btn-lg btn-circle'>A</button>
            </div>
            <div>
              <span>Label B</span>
              <button className='btn btn-lg btn-circle'>B</button>
            </div>
            <div>
              <span>Label C</span>
              <button className='btn btn-lg btn-circle'>C</button>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Filter</h2>
            <div className='stack-0'>
              <form className='filter'>
                <input
                  type='reset'
                  className='btn btn-square'
                  value='×'
                  aria-label='Clear filters'
                />
                <input
                  type='radio'
                  name='frameworks'
                  className='btn'
                  aria-label='Svelte'
                />
                <input
                  type='radio'
                  name='frameworks'
                  className='btn'
                  aria-label='Vue'
                />
                <input
                  type='radio'
                  name='frameworks'
                  className='btn'
                  aria-label='React'
                />
              </form>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Form</h2>
            <div className='bg-slate-50 p-6'>
              <form className='stack-3 mx-auto' style={{ maxWidth: '48rem' }}>
                <div className='form-control'>
                  <label htmlFor='exText' className='label'>
                    <span className='label-text'>Username</span>
                  </label>
                  <input
                    type='text'
                    id='exText'
                    className='input input-bordered w-full'
                    placeholder='JaneDoe'
                    autoComplete='username'
                  />
                </div>
                <div className='form-control'>
                  <label htmlFor='exPw' className='label'>
                    <span className='label-text'>Password</span>
                  </label>
                  <input
                    type='password'
                    id='exPw'
                    className='input input-bordered w-full'
                    autoComplete='current-password'
                  />
                </div>
                <div className='form-control'>
                  <label className='label cursor-pointer justify-start gap-2'>
                    <input
                      type='checkbox'
                      id='exCheckbox'
                      className='checkbox'
                      defaultChecked
                    />
                    <span className='label-text'>Remember me</span>
                  </label>
                </div>
                <div className='form-control'>
                  <button type='submit' className='btn btn-primary min-w-40'>
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Hero (with mockup browser)</h2>
            <div className='stack-0'>
              <div className='mockup-browser bg-base-300 border'>
                <div className='mockup-browser-toolbar'>
                  <div className='input'>
                    https://daisyui.com/components/mockup-browser/
                  </div>
                </div>
                <div
                  className='hero min-h-96'
                  style={{
                    backgroundImage:
                      'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
                  }}>
                  <div className='hero-overlay bg-opacity-60'></div>
                  <div className='hero-content text-neutral-content text-center'>
                    <div className='max-w-md'>
                      <h1 className='mb-5 text-5xl font-bold'>Hello there</h1>
                      <p className='mb-5'>
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                      </p>
                      <button className='btn btn-primary'>Get Started</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Label</h2>
            <div className='stack-0'>
              <label className='input input-bordered flex items-center gap-2'>
                <span className='label-text'>https://</span>
                <input
                  type='url'
                  placeholder='example.com'
                  className='grow'
                  aria-label='Website URL'
                />
              </label>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Like button</h2>
            <div className='stack-0 flex flex-wrap gap-4'>
              <LikeBtn
                productId='123'
                className='btn btn-ghost btn-circle btn-lg h-8 w-8'
              />
              <LikeBtn
                productId='456'
                className='btn btn-ghost btn-circle btn-lg h-8 w-8'
              />
              <LikeBtn
                productId='789'
                className='btn btn-ghost btn-circle btn-lg h-8 w-8'
              />
            </div>
          </div>

          <div className='stack-3'>
            <h2>List</h2>
            <div className='stack-0'>
              <ul className='list bg-base-100 rounded-box shadow'>
                <li className='list-row'>
                  <div>
                    <Image
                      src='https://img.daisyui.com/images/profile/demo/1@94.webp'
                      width={94}
                      height={94}
                      className='rounded-box size-12'
                      alt='Dio Lupa'
                    />
                  </div>
                  <div>
                    <div>Dio Lupa</div>
                    <div className='text-xs font-semibold uppercase opacity-60'>
                      Remaining Reason
                    </div>
                  </div>
                  <button className='btn btn-square btn-ghost'>
                    <i className='bi-play-circle text-lg'></i>
                  </button>
                  <LikeBtn
                    productId='123'
                    className='btn btn-square btn-ghost'
                  />
                </li>
                <li className='list-row'>
                  <div>
                    <Image
                      src='https://img.daisyui.com/images/profile/demo/4@94.webp'
                      width={94}
                      height={94}
                      className='rounded-box size-12'
                      alt='Ellie Beilish'
                    />
                  </div>
                  <div>
                    <div>Ellie Beilish</div>
                    <div className='text-xs font-semibold uppercase opacity-60'>
                      Bears of a fever
                    </div>
                  </div>
                  <button className='btn btn-square btn-ghost'>
                    <i className='bi-play-circle text-lg'></i>
                  </button>
                  <LikeBtn
                    productId='456'
                    className='btn btn-square btn-ghost'
                  />
                </li>
                <li className='list-row'>
                  <div>
                    <Image
                      src='https://img.daisyui.com/images/profile/demo/3@94.webp'
                      width={94}
                      height={94}
                      className='rounded-box size-12'
                      alt='Sabrino Gardener'
                    />
                  </div>
                  <div>
                    <div>Sabrino Gardener</div>
                    <div className='text-xs font-semibold uppercase opacity-60'>
                      Cappuccino
                    </div>
                  </div>
                  <button className='btn btn-square btn-ghost'>
                    <i className='bi-play-circle text-lg'></i>
                  </button>
                  <LikeBtn
                    productId='789'
                    className='btn btn-square btn-ghost'
                  />
                </li>
              </ul>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Loading</h2>
            <div className='stack-0 flex flex-wrap gap-4'>
              <span className='loading loading-ring loading-lg'></span>
              <span className='loading loading-spinner loading-lg'></span>
              <span className='loading loading-dots loading-lg'></span>
              <span className='loading loading-ball loading-lg'></span>
              <span className='loading loading-bars loading-lg'></span>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Menu</h2>
            <div className='stack-0'>
              <ul className='menu rounded-box bg-base-200 w-full md:w-80'>
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Parent</a>
                  <ul>
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                    <li>
                      <a>Parent</a>
                      <ul>
                        <li>
                          <a>Submenu 1</a>
                        </li>
                        <li>
                          <a>Submenu 2</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Modal (Dialog)</h2>
            <div className='stack-0'>
              <button
                type='button'
                className='btn btn-neutral'
                onClick={openModal}>
                Launch modal
              </button>
              <dialog id='exModal' className='modal'>
                <div className='modal-box'>
                  <h3 className='text-lg font-bold'>Hello!</h3>
                  <p className='py-4'>
                    Press ESC key or click outside to close
                  </p>
                </div>
                <form method='dialog' className='modal-backdrop'>
                  <button type='submit'>close</button>
                </form>
              </dialog>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Pagination (with Join)</h2>
            <div className='stack-0'>
              <div className='join'>
                <button className='btn join-item btn-sm md:btn-md'>
                  <i className='bi-chevron-bar-left'></i>
                </button>
                <button className='btn join-item btn-sm md:btn-md'>1</button>
                <button className='btn join-item btn-sm md:btn-md'>2</button>
                <button className='btn btn-disabled join-item btn-sm md:btn-md'>
                  <i className='bi-three-dots'></i>
                </button>
                <button className='btn join-item btn-sm md:btn-md'>99</button>
                <button className='btn join-item btn-sm md:btn-md'>100</button>
                <button className='btn join-item btn-sm md:btn-md'>
                  <i className='bi-chevron-bar-right'></i>
                </button>
              </div>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Progress</h2>
            <div className='stack-0 flex flex-col gap-4'>
              <progress className='progress progress-primary w-full sm:w-96'></progress>
              <progress
                className='progress progress-primary w-full sm:w-96'
                value={0}
                max='100'></progress>
              <progress
                className='progress progress-primary w-full sm:w-96'
                value='66.6'
                max='100'></progress>
              <progress
                className='progress progress-primary w-full sm:w-96'
                value='100'
                max='100'></progress>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Radio</h2>
            <div className='stack-0 flex gap-2'>
              <div>
                <input
                  type='radio'
                  name='radio-1'
                  className='radio'
                  defaultChecked
                />
              </div>
              <div>
                <input type='radio' name='radio-1' className='radio' />
              </div>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Range</h2>
            <div className='stack-0'>
              <div className='w-full max-w-xs'>
                <input
                  type='range'
                  className='range'
                  min={0}
                  max='100'
                  defaultValue='25'
                  step='25'
                />
                <div className='mt-2 flex justify-between px-2.5 text-xs'>
                  <span>|</span>
                  <span>|</span>
                  <span>|</span>
                  <span>|</span>
                  <span>|</span>
                </div>
                <div className='mt-2 flex justify-between px-2.5 text-xs'>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Rating</h2>
            <div className='stack-0'>
              <div className='rating'>
                <input
                  type='radio'
                  name='rating-2'
                  className='mask mask-star-2 bg-orange-400'
                  aria-label='1 star'
                />
                <input
                  type='radio'
                  name='rating-2'
                  className='mask mask-star-2 bg-orange-400'
                  aria-label='2 star'
                  defaultChecked
                />
                <input
                  type='radio'
                  name='rating-2'
                  className='mask mask-star-2 bg-orange-400'
                  aria-label='3 star'
                />
                <input
                  type='radio'
                  name='rating-2'
                  className='mask mask-star-2 bg-orange-400'
                  aria-label='4 star'
                />
                <input
                  type='radio'
                  name='rating-2'
                  className='mask mask-star-2 bg-orange-400'
                  aria-label='5 star'
                />
              </div>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Steps</h2>
            <div className='stack-0'>
              <ul className='steps'>
                <li className='step step-primary'>Register</li>
                <li className='step step-primary'>Choose plan</li>
                <li className='step'>Purchase</li>
                <li className='step'>Receive Product</li>
              </ul>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Tab</h2>
            <div className='stack-0'>
              <div className='tabs tabs-lifted' role='tablist'>
                <input
                  type='radio'
                  name='exTab'
                  className='tab'
                  role='tab'
                  aria-label='Tab 1'
                />
                <div
                  className='tab-content border-base-300 bg-base-100 p-6'
                  role='tabpanel'>
                  Tab content 1
                </div>
                <input
                  type='radio'
                  name='exTab'
                  className='tab'
                  role='tab'
                  aria-label='Tab 2'
                  defaultChecked
                />
                <div
                  className='tab-content border-base-300 bg-base-100 p-6'
                  role='tabpanel'>
                  Tab content 2
                </div>
                <input
                  type='radio'
                  name='exTab'
                  className='tab'
                  role='tab'
                  aria-label='Tab 3'
                />
                <div
                  className='tab-content border-base-300 bg-base-100 p-6'
                  role='tabpanel'>
                  Tab content 3
                </div>
              </div>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Table</h2>
            <div className='stack-3'>
              <h4 className='no-stack'>Default</h4>
              <div className='overflow-x-auto'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Last Login</th>
                      <th>Favourite Colour</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>Cy Ganderton</td>
                      <td>Quality Control Specialist</td>
                      <td>Littel, Schaden and Vandervort</td>
                      <td>Canada</td>
                      <td>12/16/2020</td>
                      <td>Blue</td>
                    </tr>
                    <tr>
                      <th>2</th>
                      <td>Hart Hagerty</td>
                      <td>Desktop Support Technician</td>
                      <td>Zemlak, Daniel and Leannon</td>
                      <td>United States</td>
                      <td>12/5/2020</td>
                      <td>Purple</td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Carroll Group</td>
                      <td>China</td>
                      <td>8/15/2020</td>
                      <td>Red</td>
                    </tr>
                    <tr>
                      <th>4</th>
                      <td>Marjy Ferencz</td>
                      <td>Office Assistant I</td>
                      <td>Rowe-Schoen</td>
                      <td>Russia</td>
                      <td>3/25/2021</td>
                      <td>Crimson</td>
                    </tr>
                    <tr>
                      <th>5</th>
                      <td>Yancy Tear</td>
                      <td>Community Outreach Specialist</td>
                      <td>Wyman-Ledner</td>
                      <td>Brazil</td>
                      <td>5/22/2020</td>
                      <td>Indigo</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className='no-stack'>Small and striped</h4>
              <div className='overflow-x-auto'>
                <table className='table-zebra table-xs table'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Last Login</th>
                      <th>Favourite Colour</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>6</th>
                      <td>Irma Vasilik</td>
                      <td>Editor</td>
                      <td>Wiza, Bins and Emard</td>
                      <td>Venezuela</td>
                      <td>12/8/2020</td>
                      <td>Purple</td>
                    </tr>
                    <tr>
                      <th>7</th>
                      <td>Meghann Durtnal</td>
                      <td>Staff Accountant IV</td>
                      <td>Schuster-Schimmel</td>
                      <td>Philippines</td>
                      <td>2/17/2021</td>
                      <td>Yellow</td>
                    </tr>
                    <tr>
                      <th>8</th>
                      <td>Sammy Seston</td>
                      <td>Accountant I</td>
                      <td>O&apos;Hara, Welch and Keebler</td>
                      <td>Indonesia</td>
                      <td>5/23/2020</td>
                      <td>Crimson</td>
                    </tr>
                    <tr>
                      <th>9</th>
                      <td>Lesya Tinham</td>
                      <td>Safety Technician IV</td>
                      <td>Turner-Kuhlman</td>
                      <td>Philippines</td>
                      <td>2/21/2021</td>
                      <td>Maroon</td>
                    </tr>
                    <tr>
                      <th>10</th>
                      <td>Zaneta Tewkesbury</td>
                      <td>VP Marketing</td>
                      <td>Sauer LLC</td>
                      <td>Chad</td>
                      <td>6/23/2020</td>
                      <td>Green</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className='no-stack'>With visual elements</h4>
              <div className='overflow-x-auto'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>
                        <label>
                          <input type='checkbox' className='checkbox' />
                        </label>
                      </th>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Favourite Colour</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        <label>
                          <input type='checkbox' className='checkbox' />
                        </label>
                      </th>
                      <td>
                        <div className='flex items-center gap-3'>
                          <div className='avatar'>
                            <div className='mask mask-squircle h-12 w-12'>
                              <Image
                                src='https://img.daisyui.com/images/profile/demo/3@94.webp'
                                width={94}
                                height={94}
                                alt='Avatar Tailwind CSS Component'
                              />
                            </div>
                          </div>
                          <div>
                            <div className='font-bold'>Brice Swyre</div>
                            <div className='text-sm opacity-50'>China</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Carroll Group
                        <br />
                        <span className='badge badge-ghost badge-sm'>
                          Tax Accountant
                        </span>
                      </td>
                      <td>Red</td>
                      <th>
                        <button className='btn btn-ghost btn-xs'>
                          details
                        </button>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <label>
                          <input type='checkbox' className='checkbox' />
                        </label>
                      </th>
                      <td>
                        <div className='flex items-center gap-3'>
                          <div className='avatar'>
                            <div className='mask mask-squircle h-12 w-12'>
                              <Image
                                src='https://img.daisyui.com/images/profile/demo/4@94.webp'
                                width={94}
                                height={94}
                                alt='Avatar Tailwind CSS Component'
                              />
                            </div>
                          </div>
                          <div>
                            <div className='font-bold'>Marjy Ferencz</div>
                            <div className='text-sm opacity-50'>Russia</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Rowe-Schoen
                        <br />
                        <span className='badge badge-ghost badge-sm'>
                          Office Assistant I
                        </span>
                      </td>
                      <td>Crimson</td>
                      <th>
                        <button className='btn btn-ghost btn-xs'>
                          details
                        </button>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <label>
                          <input type='checkbox' className='checkbox' />
                        </label>
                      </th>
                      <td>
                        <div className='flex items-center gap-3'>
                          <div className='avatar'>
                            <div className='mask mask-squircle h-12 w-12'>
                              <Image
                                src='https://img.daisyui.com/images/profile/demo/5@94.webp'
                                width={94}
                                height={94}
                                alt='Avatar Tailwind CSS Component'
                              />
                            </div>
                          </div>
                          <div>
                            <div className='font-bold'>Yancy Tear</div>
                            <div className='text-sm opacity-50'>Brazil</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Wyman-Ledner
                        <br />
                        <span className='badge badge-ghost badge-sm'>
                          Community Outreach Specialist
                        </span>
                      </td>
                      <td>Indigo</td>
                      <th>
                        <button className='btn btn-ghost btn-xs'>
                          details
                        </button>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className='no-stack'>With pinned rows and cols</h4>
              <div className='h-80 overflow-x-auto'>
                <table className='table-zebra table-pin-rows table-pin-cols table'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <td>Name</td>
                      <td>Job</td>
                      <td>company</td>
                      <td>location</td>
                      <td>Last Login</td>
                      <td>Favorite Color</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>10</th>
                      <td>Zaneta Tewkesbury</td>
                      <td>VP Marketing</td>
                      <td>Sauer LLC</td>
                      <td>Chad</td>
                      <td>6/23/2020</td>
                      <td>Green</td>
                    </tr>
                    <tr>
                      <th>11</th>
                      <td>Andy Tipple</td>
                      <td>Librarian</td>
                      <td>Hilpert Group</td>
                      <td>Poland</td>
                      <td>7/9/2020</td>
                      <td>Indigo</td>
                    </tr>
                    <tr>
                      <th>12</th>
                      <td>Sophi Biles</td>
                      <td>Recruiting Manager</td>
                      <td>Gutmann Inc</td>
                      <td>Indonesia</td>
                      <td>2/12/2021</td>
                      <td>Maroon</td>
                    </tr>
                    <tr>
                      <th>13</th>
                      <td>Florida Garces</td>
                      <td>Web Developer IV</td>
                      <td>Gaylord, Pacocha and Baumbach</td>
                      <td>Poland</td>
                      <td>5/31/2020</td>
                      <td>Purple</td>
                    </tr>
                    <tr>
                      <th>14</th>
                      <td>Maribeth Popping</td>
                      <td>Analyst Programmer</td>
                      <td>Deckow-Pouros</td>
                      <td>Portugal</td>
                      <td>4/27/2021</td>
                      <td>Aquamarine</td>
                    </tr>
                    <tr>
                      <th>15</th>
                      <td>Moritz Dryburgh</td>
                      <td>Dental Hygienist</td>
                      <td>Schiller, Cole and Hackett</td>
                      <td>Sri Lanka</td>
                      <td>8/8/2020</td>
                      <td>Crimson</td>
                    </tr>
                    <tr>
                      <th>16</th>
                      <td>Reid Semiras</td>
                      <td>Teacher</td>
                      <td>Sporer, Sipes and Rogahn</td>
                      <td>Poland</td>
                      <td>7/30/2020</td>
                      <td>Green</td>
                    </tr>
                    <tr>
                      <th>17</th>
                      <td>Alec Lethby</td>
                      <td>Teacher</td>
                      <td>Reichel, Glover and Hamill</td>
                      <td>China</td>
                      <td>2/28/2021</td>
                      <td>Khaki</td>
                    </tr>
                    <tr>
                      <th>18</th>
                      <td>Aland Wilber</td>
                      <td>Quality Control Specialist</td>
                      <td>Kshlerin, Rogahn and Swaniawski</td>
                      <td>Czech Republic</td>
                      <td>9/29/2020</td>
                      <td>Purple</td>
                    </tr>
                    <tr>
                      <th>19</th>
                      <td>Teddie Duerden</td>
                      <td>Staff Accountant III</td>
                      <td>Pouros, Ullrich and Windler</td>
                      <td>France</td>
                      <td>10/27/2020</td>
                      <td>Aquamarine</td>
                    </tr>
                    <tr>
                      <th>20</th>
                      <td>Lorelei Blackstone</td>
                      <td>Data Coordinator</td>
                      <td>Witting, Kutch and Greenfelder</td>
                      <td>Kazakhstan</td>
                      <td>6/3/2020</td>
                      <td>Red</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className='stack-3'>
            <h2>Toggle</h2>
            <div className='stack-0'>
              <input type='checkbox' defaultChecked className='toggle' />
            </div>
          </div>

          <div className='stack-3'>
            <h2>Tooltip</h2>
            <div className='stack-0'>
              <div className='tooltip tooltip-right' data-tip='hello'>
                <button className='btn btn-neutral'>Hover me</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
