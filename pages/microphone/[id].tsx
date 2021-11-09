import {PrismaClient} from '@prisma/client'
import {  GetStaticProps, NextApiRequest, NextApiResponse  } from "next";
import { useRouter } from 'next/router';
const prisma = new PrismaClient()

export default function MicorphoneDetail({item}) {
   const router = useRouter();
   if(router.isFallback) {
      return <div>Loading ..... Sorry for the wait!!</div>
   }
   return (
      <div>
         <div>{item.id}</div>
         <div>{item.brand}</div>
         <div>{item.model}</div>
         <div>{item.price}</div>
         <div>{item.imageUrl}</div>
      </div>
   )
}

export async function getStaticProps(ctx) {

   const item = await prisma.microphone.findUnique({
      where: {
         id: parseInt(ctx.params.id),
         },
   })
   return {
      props: {
         item,
      },
   }
}

export async function getStaticPaths() {
   const microphones = await prisma.microphone.findMany();
   const paths = microphones.map(m => (
      { params: { id: m.id.toString() } }
   ))
   return {
      fallback: true,
      paths,
   };
 }
