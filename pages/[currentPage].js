import React from 'react'
import Index, {getStaticProps} from '.'
import {PrismaClient} from '@prisma/client'

export default Index;
export {getStaticProps};

const prisma = new PrismaClient()

export async function getStaticPaths() {
   // const result = await prisma.$queryRaw`SELECT count(id) FROM Microphone`;
   const result = await prisma.microphone.groupBy({
      by: ['id']
   }) 
   // console.log(result.length)
   const total  = result.length;
   const numberOfPages = Math.ceil(total / 5.0);

    const paths = Array(numberOfPages- 1).fill('').map((_, index) => {
        return { params: {currentPage: (index + 1).toString()}}
      })

   return {
      fallback: false,
      paths: paths
   }
}