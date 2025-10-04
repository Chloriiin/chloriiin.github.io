"use client";
import { Treemap, Tooltip as ReTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from "recharts";
import Tabs from "./Tabs";
import CustomContent from "./CustomContent";

const techStack = [
  { name: "React", usage: 90, category: "Frontend", proficiency: 85, src: "/images/techicon/react.png" },
  { name: "Next.js", usage: 80, category: "Backend", proficiency: 80, src: "/images/techicon/nodejs.png" },
  { name: "Python", usage: 95, category: "Backend", proficiency: 100, src: "/images/techicon/python.png" },
  { name: "R", usage: 70, category: "Data Science", proficiency: 80, src: "/images/techicon/r.png" },
  { name: "SQL", usage: 50, category: "Database", proficiency: 60, src: "/images/techicon/postgresql.svg" },
  { name: "TailwindCSS", usage: 80, category: "Frontend", proficiency: 80, src: "/images/techicon/tailwind.png" },
  { name: "Procreate", usage: 90, category: "Frontend", proficiency: 100, src: "/images/techicon/procreate.png" },
  { name: "Sketch", usage: 95, category: "Frontend", proficiency: 100, src: "/images/techicon/sketch.png" },
  { name: "Git", usage: 85, category: "Frontend", proficiency: 100, src: "/images/techicon/sketch.png" }


];


export default function TechStackCharts() {

  return (
    <div className="w-full p-4">
      <Tabs tabs={["Treemap", "Radar Chart"]}>
        {/* Treemap */}
        <div className="h-[400px]">
          <ResponsiveContainer>
            <Treemap
              data={techStack}
              dataKey="usage"
              nameKey="name"
              content={<CustomContent />}
            >
              <ReTooltip />
            </Treemap>
          </ResponsiveContainer>
        </div>
        {/* Radar Chart */}
        <div className="h-[400px]">
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={techStack}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Usage" dataKey="usage" stroke="#91EAE4" fill="#91EAE4" fillOpacity={0.6} />
              <ReTooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

      </Tabs>
    </div>
  );
}
