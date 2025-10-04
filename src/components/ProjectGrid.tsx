'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    demo?: string;
    github?: string;
  };
  color: string;
  height: number;
  status?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Every creation is a Pearl',
    description: 'A community driven platform for artists to showcase their work, connect with others, and explore the world of sonic creativity.',
    image: '/api/placeholder/400/300',
    tags: ['Website', 'Product Design', 'Frontend Dev'],
    links: {
      demo: 'https://demo.com',
      github: 'https://github.com',
    },
    color: 'from-orange-500 to-red-500',
    height: 320,
    status: 'In progress',
  },
  {
    id: 2,
    title: 'Computational Neuroscience & Data Analytics',
    description: 'Exploring the Natural Science Dataset (NSD) to understand how the human brain processes natural images.',
    image: '/api/placeholder/400/280',
    tags: ['Data', 'Exploratory Data Analysis'],
    links: {
      demo: 'https://demo.com',
      github: 'https://github.com',
    },
    color: 'from-blue-600 to-purple-600',
    height: 280,
  },
  {
    id: 3,
    title: 'ARIPPLE: When Arts Ripple',
    description: 'A novel solution for artists. The project empowers features including user authentication, artwork trading, and subscription-based monetization.',
    image: '/api/placeholder/400/350',
    tags: ['Website', 'Software', 'Product Design'],
    links: {
      demo: 'https://demo.com',
      github: 'https://github.com',
    },
    color: 'from-cyan-400 to-blue-500',
    height: 350,
    status: 'In Progress',
  },
  {
    id: 4,
    title: 'NORD Consulting Website',
    description: 'Leading the revamp of NORD Consulting website to enhance their digital presence through comprehensive SEO optimization.',
    image: '/api/placeholder/400/260',
    tags: ['Website', 'Webflow', 'Front-end Dev', 'CMS', 'SSR'],
    links: {
      demo: 'https://demo.com',
      github: 'https://github.com',
    },
    color: 'from-purple-600 to-pink-600',
    height: 260,
  },
  {
    id: 5,
    title: 'Being an artist in the digital age',
    description: 'Without boundary, I create stories and characters that transcend the limits of reality.',
    image: '/api/placeholder/400/300',
    tags: ['Design', 'Procreate', 'Multi-media', 'Animation'],
    links: {
      demo: 'https://demo.com',
      github: 'https://github.com',
    },
    color: 'from-green-500 to-emerald-600',
    height: 300,
    status: 'In progress',
  },
  {
    id: 6,
    title: 'Interactive Data Visualization',
    description: 'A comprehensive dashboard for real-time data analysis and interactive visualizations.',
    image: '/api/placeholder/400/290',
    tags: ['React', 'D3.js', 'Data Viz', 'Analytics'],
    links: {
      demo: 'https://demo.com',
      github: 'https://github.com',
    },
    color: 'from-indigo-500 to-purple-600',
    height: 290,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export default function ProjectGrid() {
  const getColumns = () => {
    // Create 3 columns for the masonry layout
    const columns: Project[][] = [[], [], []];
    
    projects.forEach((project, index) => {
      columns[index % 3].push(project);
    });
    
    return columns;
  };

  const columns = getColumns();

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-3"
        >
          Featured Work
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400"
        >
          A curated collection of creative projects and technical endeavors
        </motion.p>
      </div>

      {/* Projects Container with curved border */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-6">
              {column.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <div
                    className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    style={{ height: project.height }}
                  >
                    {/* Project Image with Gradient Overlay */}
                    <div className="relative h-40 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`} />
                      <div className="absolute inset-0 bg-black/20" />
                      
                      {/* Status Badge */}
                      {project.status && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full">
                            {project.status}
                          </span>
                        </div>
                      )}
                      
                      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.links.demo && (
                          <motion.a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink size={16} className="text-white" />
                          </motion.a>
                        )}
                        {project.links.github && (
                          <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Github size={16} className="text-white" />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
