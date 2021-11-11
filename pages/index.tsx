import React from 'react'
import { Microphone } from '../model/microphone'
import { GetServerSideProps } from 'next';
import {PrismaClient} from '@prisma/client'
import next from 'next';
const prisma = new PrismaClient()

export interface IndexProps {
  microphones: Microphone[];
}

export default function index({microphones}: IndexProps) {
  return (
    <pre>
      {JSON.stringify(microphones, null, 4)}
    </pre>
  )
}

export const getServerSideProps : GetServerSideProps<IndexProps> = async ctx => {
  const microphones = await prisma.microphone.findMany(); 

  return {props: {microphones}}
}
