"use client"
import React from 'react'
import WiggleElement from '../../shared/WiggleElement'
import { useEffect, useState } from 'react'

const Exp = ({ expList }) => {
    const content = expList.content

    return (
        <div className='flex flex-col gap-15 border-l-3 border-[#2A2929] mb-30'>
            {content.map((exp, index) => (
                <div key={index} className='flex flex-col gap-2 border-l-3 border-[#727272] pl-5 hover:border-[#91EAE4]'>
                    <p className='text-[#727272] text-sm'>{exp.time}</p>
                    <p className='text-white text-md'>{exp.title}<br /><span className='text-[#91EAE4] text-[12px]'>{exp.company}</span></p>
                    <p className='text-[#727272] text-sm'>{exp.description}</p>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        {exp.skills.map((skill, index) => (
                            <WiggleElement key={index}>
                                <div
                                    className="bg-[#2A2929] text-[10px] p-1 px-2 rounded-md transitiotext-white h-auto"
                                >
                                    <span>{skill}</span>
                                </div>
                            </WiggleElement>
                        ))}
                    </div>
                    {exp.link && (
                        <a
                            href={exp.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='mt-2 inline-block'
                        >
                            <button className='mt-1 px-3 py-1 text-[12px] bg-[#91EAE4] text-black rounded-md hover:bg-[#B2F2EF] transition-all'>
                                View Details
                            </button>
                        </a>
                    )}

                </div>
            ))}

        </div>
    )
}

export default Exp
