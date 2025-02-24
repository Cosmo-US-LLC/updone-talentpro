'use client'

import Image from "next/image";

interface PositionProps {
  [key: string]: string | number;
}

const FormDecoration = ({ position }: { position: PositionProps }) => {
  return (
    <div style={position}>
      <Image width={722} height={745} src='/images/booking/formDecorator.svg' alt='step-1' />
    </div>
  );
};

export default FormDecoration;
