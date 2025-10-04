import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'

const Tabs = ({tabs, children}) => {
    const [active, setActive] = React.useState(0);

    return (
        <div>
            <div className="inline-flex gap-5 mb-4 bg-[#2A2929] p-1 rounded-lg justfy-center">
                {tabs.map((tab, index) => (
                    
                        <button
                            key={index}
                            className={`pb-2 text-sm ${index === active ? "bg-[#000000] rounded-lg px-2 py-1 text-white" : "rounded-lg p-2 px-2 py-1 text-[#727272]"}`}
                            onClick={() => setActive(index)}
                        >
                            {tab}
                        </button>  
                                               
                ))}
            </div>

            <div className="relative min-h-[400px] w-full overflow-auto">
                <AnimatePresence mode="wait">
                <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30}}
                    transition={{ duration: 0.3 }}
                    className="absolute w-full"
                >
                    {children[active]}
                </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Tabs
