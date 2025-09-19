import { headers as getHeaders } from 'next/headers'
import Link from 'next/link'
import { getPayload } from 'payload'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import config from '@/payload.config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/**
 * Home page component.
 * Displays the main content and layout for the top page.
 */

export default async function Home() {
  // Init date format as Japan locale
  dayjs.locale('ja')

  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div id='page' className='flex h-screen flex-col pt-16'>
      <title>payload-blank</title>
      <meta
        name='description'
        content='A boilerplate for a full-stack app built with Next.js and Payload CMS'
      />

      <Header />

      <main className='stack-5 container mx-auto grow px-4 py-6'>
        <div className='stack-4 alert' role='alert'>
          <div className='flex gap-2'>
            {user ? (
              <div>Good day, {user.name}!</div>
            ) : (
              <div>You&apos;re not logged in.</div>
            )}
            <div>
              <Link
                href='/admin'
                className='btn btn-neutral btn-xs'
                target='_blank'
                rel='noopener noreferrer'>
                {user ? <>Admin</> : <>Log in</>}
              </Link>
            </div>
          </div>
        </div>

        <section className='stack-4'>
          <hgroup className='stack-3'>
            <h1>吾輩は猫である</h1>
            <p className='text-lg font-bold'>夏目漱石</p>
          </hgroup>
          <p>
            <Link
              href='https://www.aozora.gr.jp/cards/000148/files/789_14547.html'
              target='_blank'
              rel='noopener noreferrer'>
              青空文庫で全文を読む
              <i className='bi-arrow-right'></i>
            </Link>
          </p>
          <div className='stack-3'>
            <p>吾輩は猫である。名前はまだ無い。</p>
            <p>
              どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所で
              <strong>ニャーニャー</strong>
              泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。
            </p>
            <p>
              しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。
            </p>
            <p>
              この書生の掌の裏でしばらくはよい心持に坐っておったが、しばらくすると非常な速力で運転し始めた。書生が動くのか自分だけが動くのか分らないが無暗に眼が廻る。胸が悪くなる。到底助からないと思っていると、どさりと音がして眼から火が出た。それまでは記憶しているがあとは何の事やらいくら考え出そうとしても分らない。
            </p>
            <p>
              ふと気が付いて見ると書生はいない。たくさんおった兄弟が一疋も見えぬ。肝心の母親さえ姿を隠してしまった。その上今までの所とは違って無暗に明るい。眼を明いていられぬくらいだ。はてな何でも容子がおかしいと、のそのそ這い出して見ると非常に痛い。吾輩は藁の上から急に笹原の中へ棄てられたのである。
            </p>
            <p>
              ようやくの思いで笹原を這い出すと向うに大きな池がある。吾輩は池の前に坐ってどうしたらよかろうと考えて見た。別にこれという分別も出ない。しばらくして泣いたら書生がまた迎に来てくれるかと考え付いた。ニャー、ニャーと試みにやって見たが誰も来ない。そのうち池の上をさらさらと風が渡って日が暮れかかる。腹が非常に減って来た。泣きたくても声が出ない。仕方がない、何でもよいから食物のある所まであるこうと決心をしてそろりそろりと池を左りに廻り始めた。どうも非常に苦しい。そこを我慢して無理やりに這って行くとようやくの事で何となく人間臭い所へ出た。ここへ這入ったら、どうにかなると思って竹垣の崩れた穴から、とある邸内にもぐり込んだ。
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
