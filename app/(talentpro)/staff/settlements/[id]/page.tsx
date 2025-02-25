"use client"
import React from 'react'
import Loader from '../../../../_components/ui/loader';
import loadable from '../../../../_components/ui/lazy-load';
import Header from '@/app/_components/ui/header'
import { useParams } from 'next/navigation';
const Sattlements = loadable(() => import('../../../../_components/settlements'), { loading: () => <Loader /> });

const page = () => {
  const params = useParams();

  return (
    <div>
      <Header />
      <Sattlements jobId={params.id} />
    </div>
  )
}

export default page
