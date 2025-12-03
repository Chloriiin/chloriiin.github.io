import React from 'react';
import AnimatedAccessButton from '../../ui/AnimatedAccessButton';

interface Publication {
  reference: string;
  authors: string[];
  date: string;
  roles: string[];
  url?: string;
  status?: string;
  dateLabel?: string;
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
    },
    {
      reference: "Tran, T. Q. M., Erkelens, B., Ye, Z., N. V. N. Tran, Vinh, T., Jun, L. W., Ho, L., Nguyen, L., Huynh T. B. Chau, Al Diab Al Azzawi, M., Tran, L., Thuy, D. H. D., Tran, P., Le, M. H. N., & Huy, N. T. (2025). \"Impact of APOE4 Genotype on Efficacy and Safety of Monoclonal Antibody Therapies in Alzheimer's Disease.\" In submission to Scientific Reports (Nature Portfolio).",
      authors: [
        "Tran, T. Q. M.",
        "Erkelens, B.",
        "Ye, Z.",
        "N. V. N. Tran",
        "Vinh, T.",
        "Jun, L. W.",
        "Ho, L.",
        "Nguyen, L.",
        "Huynh T. B. Chau",
        "Al Diab Al Azzawi, M.",
        "Tran, L.",
        "Thuy, D. H. D.",
        "Tran, P.",
        "Le, M. H. N.",
        "Huy, N. T."
      ],
      date: "2025",
      roles: [],
      status: "In submission (Scientific Reports, Nature Portfolio)"
    },
    {
      reference: "McFadden, W. M., Gao, X., Ye, Z., Wen, X., Lorson, Z. C., Zheng, H., Fahim, J., Emanuelli, A., Kirby, K. A., & Sarafianos, S. G. (2023). \"Thermal Shift Analysis in R (TSAR) identifies folic acid as a molecule that interacts with HIV-1 capsid.\" bioRxiv. https://doi.org/10.1101/2023.11.29.569293",
      authors: [
        "McFadden, W. M.",
        "Gao, X.",
        "Ye, Z.",
        "Wen, X.",
        "Lorson, Z. C.",
        "Zheng, H.",
        "Fahim, J.",
        "Emanuelli, A.",
        "Kirby, K. A.",
        "Sarafianos, S. G."
      ],
      date: "November 2023",
      dateLabel: "Preprint",
      roles: [],
      url: "https://www.biorxiv.org/lookup/doi/10.1101/2023.11.29.569293",
      status: "bioRxiv preprint"
    }
  ];

  return (
    <section id="publications" className="p-5 pt-8">
      <h2 className="text-3xl font-bold text-white mb-8 pb-2 border-b border-[#2a2a2a] inline-block">Publications</h2>
      <div className="space-y-6">
        {publications.map((pub, index) => (
          <div key={index} className="bg-[#000000] rounded-lg overflow-hidden p-5">
            <p className="text-white text-md mb-3 font-medium">{pub.reference}</p>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
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
                <p className="text-sm text-gray-400">
                  {pub.dateLabel ?? 'Published'}: <span className="text-gray-300">{pub.date}</span>
                </p>
              </div>
              {(pub.url || pub.status) && (
                <div className="flex md:justify-end">
                  {pub.url ? (
                    <AnimatedAccessButton href={pub.url} />
                  ) : (
                    <span className="text-sm text-gray-400 italic">{pub.status}</span>
                  )}
                </div>
              )}
            </div>
            {/* Roles retained in data model for future use, but hidden per request */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PublicationsSection;
