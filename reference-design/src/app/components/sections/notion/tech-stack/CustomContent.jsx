import React from 'react'
import { Treemap, ResponsiveContainer } from "recharts";


const CustomContent = (props) => {
    const {
      x, y, width, height, name, usage, src,
    } = props;

    // Normalize usage to range [0, 1]
    const minUsage = 15;
    const maxUsage = 100;
    const normalized = (usage - minUsage) / (maxUsage - minUsage);

    // Create a color: more usage → darker color
    const hue = 200; // blue
    const lightness = 100 - normalized * 85; // light → dark
    const colour = `hsl(${hue}, 50%, ${lightness}%)`;

    const gap = 5; // space between rectangles
    const borderRadius = 10; // border radius for rounded corners

    return (
      <g>
        <rect
          x={x + gap / 2}
          y={y + gap / 2}
          width={Math.max(0, width - gap)}
          height={Math.max(0, height - gap)}
          rx={borderRadius}
          ry={borderRadius}
          fill={colour}
        />
        {width > 60 && height > 20 && (
          <>
            
            <text
              x={x + width / 2}
              y={y + height / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={15}
              fill="#000"
            >
              {name}
            </text>
          </>
        )}
      </g>
    );
  };
  
  export default CustomContent