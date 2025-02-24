"use client"
import React from 'react'
import Bartender from './services-icons/Bartender'
import Cocktail from './services-icons/Cocktail'
import Waiter from './services-icons/Waiter'
import PromoModel from './services-icons/Promomodel'
import BarBack from './services-icons/Barback'
import EventHelper from './services-icons/EventHelper'

const RenderServices = ({serviceName,selectedServiceName}:any) => {
  return (
    <div>
      {serviceName.name=="Bartender" && <Bartender selectedServiceName={selectedServiceName} serviceName={serviceName.name}/>}
      {serviceName.name=="Cocktail Server" && <Cocktail selectedServiceName={selectedServiceName} serviceName={serviceName.name}/>}
      {serviceName.name=="Waiter" && <Waiter selectedServiceName={selectedServiceName} serviceName={serviceName.name}/>}
      {serviceName.name=="Promo Model" && <PromoModel selectedServiceName={selectedServiceName} serviceName={serviceName.name}/>}
      {serviceName.name=="Event Helper" && <EventHelper selectedServiceName={selectedServiceName} serviceName={serviceName.name}/>}
      {serviceName.name=="Barback" && <BarBack selectedServiceName={selectedServiceName} serviceName={serviceName.name}/>}


    </div>
  )
}

export default RenderServices
