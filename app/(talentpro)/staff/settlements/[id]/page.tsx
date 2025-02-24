"use client"
import React from 'react'
import Loader from '../../../../_components/ui/loader';
import loadable from '../../../../_components/ui/lazy-load';
import Header from '@/app/_components/ui/header'
const Sattlements = loadable(() => import('../../../../_components/settlements'), { loading: () => <Loader /> });

const page = ({ params }: { params: { id: number } }) => {

  return (
    <div>
      <Header />
      <Sattlements jobId={params.id} />
    </div>
  )
}

export default page
