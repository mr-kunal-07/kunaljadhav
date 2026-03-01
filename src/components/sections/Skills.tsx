import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useAnimation } from "framer-motion";
import {
  Code2, Globe, Database, GitBranch, Zap, Users
} from "lucide-react";

const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  useEffect(() => { if (inView) controls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } }); }, [controls, inView]);
  return <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={controls} className={className}>{children}</motion.div>;
};

const SKILLS_DATA = [
  {
    category: "Languages",
    icon: <Code2 size={22} />,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-400/10",
    items: ["C++", "JavaScript", "TypeScript", "Python"],
  },
  {
    category: "Frontend",
    icon: <Globe size={22} />,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-400/10",
    items: ["HTML/CSS", "React JS", "Next JS", "Redux", "Tailwind CSS", "Material UI"],
  },
  {
    category: "Backend",
    icon: <Database size={22} />,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-400/10",
    items: ["Node JS", "Express JS", "MongoDB", "Firebase", "REST API"],
  },
  {
    category: "Dev Tools",
    icon: <GitBranch size={22} />,
    iconColor: "text-green-400",
    iconBg: "bg-green-400/10",
    items: ["Git", "GitHub", "VS Code", "Figma", "Vercel"],
  },
  {
    category: "Animation",
    icon: <Zap size={22} />,
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-400/10",
    items: ["GSAP", "Framer Motion", "CSS Animations", "Lottie"],
  },
  {
    category: "Soft Skills",
    icon: <Users size={22} />,
    iconColor: "text-teal-400",
    iconBg: "bg-teal-400/10",
    items: ["Problem Solving", "Teamwork", "Communication", "Leadership", "Logical Thinking"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },

  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Skills = () => (
  <div className="mt-16">
    <AnimatedSection>
      <h2 className="section-title"><span className="gradient-text">My Skills</span></h2>
      <motion.div
        className="w-24 h-0.5 bg-gradient-to-r from-foreground/50 to-transparent mb-8 mt-2"
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }} style={{ transformOrigin: "left" }}
      />
    </AnimatedSection>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {SKILLS_DATA.map((skill, i) => (
        <motion.div
          key={skill.category}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
          className="glass-card group cursor-default"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-lg ${skill.iconBg} flex items-center justify-center ${skill.iconColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
              {skill.icon}
            </div>
            <h4 className="text-base font-bold text-foreground">{skill.category}</h4>
          </div>
          <ul className="space-y-2">
            {skill.items.map((s, si) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + si * 0.05, duration: 0.3 }}
                className="text-sm text-muted-foreground flex items-center gap-2 transition-colors duration-200 group-hover:text-foreground/80"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 group-hover:bg-foreground/40 transition-colors" />
                {s}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Skills;
