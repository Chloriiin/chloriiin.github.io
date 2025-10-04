import React from 'react'

const HeadProfile: React.FC = () => {
    return (
        <div id="navbar" >
            <div id="profile" className="items-center lg:flex">
                <img src="/images/nav/profile.jpg" alt="Profile Photo" className="h-12 w-12 rounded-2xl mb-5 lg:mb-0 object-cover" />
                <div className="lg:pl-5 flex-row">
                    <span>
                        <h1 className='text-md font-bold'>Zhijiang (Zach) Ye</h1>
                        <p className='text-sm text-[#727272]'>Biology | Applied Mathematics | Undergraduate Researcher</p>
                    </span>

                    <div className="flex items-center mt-2">
                        <span className="relative flex w-2 h-2 mr-3">
                            <span className="absolute inline-flex w-full h-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500"></span>
                        </span>
                        <p className='text-sm text-[#70FF64]'>Open to graduate opportunities</p>
                    </div>
                    
                </div>
            </div>

            <p className='text-sm pt-5 pb-5 text-[#727272]'>"I am a biological explorer architecting numerical conundrums; a mathematical enthusiast wandering through molecules and proteins; a passionate dreamer chasing inspiration." </p>
        </div>
    )
}

export default HeadProfile
