'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  Home, 
  User, 
  Briefcase, 
  Mail, 
  Github, 
  Linkedin, 
  X 
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: Home, label: 'Home', href: '#home' },
  { icon: Briefcase, label: 'Projects', href: '#projects' },
  { icon: User, label: 'About Me', href: '#about' },
  { icon: Mail, label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: X, label: 'Twitter', href: 'https://twitter.com' },
];

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('Home');

  return (
    <motion.div
      initial={false}
      animate={{ 
        width: isCollapsed ? 64 : 320,
        x: 0 
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-gray-800 border-r border-gray-700 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={20} />
          </motion.button>
          
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Alex Rivera</h2>
                <p className="text-gray-400 text-sm">Creative Developer | Digital Artist</p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-400 text-xs">Open to Connect</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;
            
            return (
              <li key={item.label}>
                <motion.a
                  href={item.href}
                  onClick={() => setActiveItem(item.label)}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: 0.1 }}
                      className="ml-3 font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Social Links */}
      <div className="p-4 border-t border-gray-700">
        {!isCollapsed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-400 text-sm mb-3"
          >
            Connect with me
          </motion.p>
        )}
        
        <div className={`flex ${isCollapsed ? 'flex-col space-y-2' : 'space-x-3'}`}>
          {socialLinks.map((link) => {
            const Icon = link.icon;
            
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={isCollapsed ? link.label : undefined}
              >
                <Icon size={16} />
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
