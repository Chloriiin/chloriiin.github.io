import React from 'react'
import ReactionButton from './ReactionButton';
import Contact from '../../shared/Contact';

const HeadProfile = () => {
    return (
        <div id="navbar" >
            <div id="profile" className="items-center lg:flex">
                <img src="/images/nav/profile-fun.png" alt="Toggle Sidebar" className="h-15 rounded-2xl mb-5 lg:mb-0" />
                <div className="lg:pl-5 flex-row">
                    <span>
                        <h1 className='text-md font-bold'>Keming Wang</h1>
                        <p className='text-sm text-[#727272]'>Neuroscience | Computer Science | Linguistics</p>
                    </span>

                    <span className="relative top-3.5 flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                    </span>
                    <p className='pl-4 text-sm text-[#70FF64]'>Open to Connect</p>


                </div>
            </div>

            <p className='text-sm pt-5 pb-5 text-[#727272]'>" I could be a neuroscientist spotting commercial opportunities, a linguist building web
                platforms, or a designer conducting data analysis." </p>
            <div className='md:pb-10 pb-5'>
                <ReactionButton />
            </div>

            <div className='md:pb-10 pb-5 pl-2'>
                <Contact />
            </div>
        </div>
    )
}

export default HeadProfile
