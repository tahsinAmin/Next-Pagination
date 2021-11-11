import React from 'react'
import { Microphone } from '../model/microphone'
import { GetServerSideProps } from 'next';
import {PrismaClient} from '@prisma/client'
import Link from 'next/link';
const prisma = new PrismaClient()

export interface IndexProps {
  microphones: Microphone[];
}

export default function index({microphones}: IndexProps) {
  return (
    <div>
      <Link href='/people'>
        <a>People</a>
      </Link>
      <pre>
        {JSON.stringify(microphones, null, 4)}
      </pre>
    </div>
  )
}

export const getServerSideProps : GetServerSideProps<IndexProps> = async ctx => {
  const microphones = await prisma.microphone.findMany(); 

  await new Promise(acc => {
    setTimeout(acc, 3000)
  })
  return {props: {microphones}}
}
