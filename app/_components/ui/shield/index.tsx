import React from 'react';
import Image from 'next/image';

interface VerificationIconProps {
    id_is_verified: boolean;
    contact_is_verified: boolean;
    height: number;
    width: number;
}

const VerificationIconMobile: React.FC<VerificationIconProps> = ({ id_is_verified, contact_is_verified, height, width }) => {
    let src: string;

    if (id_is_verified && contact_is_verified) {
        src = '/images/client-portal/all-events/verified.icon.svg';
    } else if (id_is_verified || contact_is_verified) {
        src = '/images/client-portal/all-events/semi-verified-shield.svg';
    } else {
        src = '/images/client-portal/all-events/not-verified-shield.svg';
    }

    return <Image alt="verified-icon" height={height} width={width} src={src} />;
};

export default VerificationIconMobile;
