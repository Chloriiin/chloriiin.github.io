import React from 'react'

const Contact = () => {
  const contactLinks = [
    {
      href: "mailto:keming_wang@outlook.com",
      imgSrc: "/images/nav/mail.png",
      alt: "email"
    },
    {
      href: "https://www.linkedin.com/in/magicoco117/",
      imgSrc: "/images/nav/linkedin.png",
      alt: "linkedin"
    },
    {
      href: "https://github.com/0CocoWang0",
      imgSrc: "/images/nav/github.png",
      alt: "github"
    }
  ]
  return (
    <button className="flex sm:gap-6 gap-8 align-bottom">
      {
        contactLinks.map((link, index) => (
          <a key={index} href={link.href} target="_blank" alt={link.alt}>
            <img src={link.imgSrc} className='h-8 w-8 sm:h-4 sm:w-4 object-contain transition-transform duration-200 ease-in-out hover:scale-125 focus:scale-125 active:scale-125 bg-[#2A2929] p-1 sm:p-0 rounded-full' />
          </a>
        ))
      }
    </button>
  )
}

export default Contact
