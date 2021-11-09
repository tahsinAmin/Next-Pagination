import Head from 'next/head'
import Link from 'next/link'
import {PrismaClient} from '@prisma/client'
import { useState } from 'react'



export default function Home({ data }) {
  const [microphones, setMicrophones] = useState(data.microphones)
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-11/12 my-12 mx-auto">
       
          {microphones.map((p) => {
            return (
              <div key={p.id} className='text-blue-500'>
                <Link href='/[id]' as={`${p.id}`}>
                  <a>{p.brand + p.model}</a>
                </Link>
              </div>
            )
          })}
      </main>
    </div>
  )
}


export const getStaticProps = async ctx =>  {
  const prisma = new PrismaClient()
  const microphones = await prisma.microphone.findMany()

  return {
      props: {
          data: {
            microphones,
          }
      }
  }
}
