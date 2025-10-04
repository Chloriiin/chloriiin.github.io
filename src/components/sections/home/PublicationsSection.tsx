import React from 'react';
import AnimatedAccessButton from '../../ui/AnimatedAccessButton';

interface Publication {
  reference: string;
  authors: string[];
  date: string;
  roles: string[];
  url?: string;
}

const PublicationsSection: React.FC = () => {
  const publications: Publication[] = [
    {
      reference: "He, E., Ye, Z., & Zou, C. (2025). \"Quantitative Hybrid Structure Analysis of Equipment Wear under Dynamic Pressure based on Digital Intelligent Algorithm.\" 2025 3rd International Conference on Data Science and Information System (ICDSIS), May 16-17, 2025. DOI: 10.1109/ICDSIS65355.2025.11071008",
      authors: ["He, E.", "Ye, Z.", "Zou, C."],
      date: "May 2025",
      roles: [
        "Co-developed the SSFP, HEW, and HEWAN models, including mathematical formulation and physical interpretation, with primary responsibility for conceptualizing the beam-like stair structure, enabling a more realistic simulation of wear processes under dynamic pressure",
        "Led the development of model visualizations and scientific figures, designing original illustrations and simulation results to clearly communicate the practical impact and applicability of the new predictive methodology"
      ],
      url: "https://doi.org/10.1109/ICDSIS65355.2025.11071008"
    }
  ];

  return (
    <section id="publications" className="p-5 pt-8">
      <h2 className="text-3xl font-bold text-white mb-8 pb-2 border-b border-[#2a2a2a] inline-block">Publications</h2>
      <div className="space-y-6">
        {publications.map((pub, index) => (
          <div key={index} className="bg-[#000000] rounded-lg overflow-hidden p-5">
            <p className="text-white text-md mb-3 font-medium">{pub.reference}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-sm text-gray-400">Authors:</span>
              {pub.authors.map((author, idx) => (
                <span 
                  key={idx} 
                  className={`text-sm ${author.includes('Ye, Z.') ? 'text-green-400 font-medium' : 'text-gray-300'}`}
                >
                  {author}{idx < pub.authors.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-400 mb-3">Published: <span className="text-gray-300">{pub.date}</span></p>
            <div>
              <p className="text-sm text-gray-400 mb-1">Contributions:</p>
              <ul className="list-disc pl-5">
                {pub.roles.map((role, idx) => (
                  <li key={idx} className="text-sm text-gray-300">{role}</li>
                ))}
              </ul>
            </div>
            {pub.url && (
              <div className="mt-4 flex justify-end">
                <AnimatedAccessButton href={pub.url} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PublicationsSection;
