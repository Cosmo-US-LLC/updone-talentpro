"use client";
import Link from "next/link";
import React from "react";

type FooterListProps = {
  title: string;
  items: { text: string; href: string }[];
};

const FooterList: React.FC<FooterListProps> = ({ title, items }) => {
  return (
    <div className="w-full lg:w-4/12 px-4 space-y-4">
      <span className="font-[600] block capitalize text-[24px] mb-2">
        {title}
      </span>
      <ul className="list-unstyled space-y-4">
        {items.map((item, index) => (
          <li key={index}>
            <Link className="block pb-2 text-sm" href={item.href}>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterList;
