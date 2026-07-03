import { motion } from 'framer-motion'
import { FaFacebook, FaWhatsapp, FaChevronDown, FaReact, FaNodeJs, FaAndroid, FaApple } from 'react-icons/fa'
import { SiTypescript, SiFirebase, SiNestjs, SiTailwindcss } from 'react-icons/si'
import { OrbitingCircles } from './magicui/OrbitingCircles'
import Navbar from './Navbar'
import type { MainData, Language } from '../types'
import corestackLogo from '../assets/corestack.png'

const ELECTRIC_BLUE = '#0EA5FF'

interface HeaderProps {
  data: MainData
  language: Language
  toggleLanguage: () => void
}

const ICON_MAP: Record<string, React.ReactNode> = {
  facebook: <FaFacebook size={22} />,
  whatsapp: <FaWhatsapp size={22} />,
}

const SECTORS: Record<string, string[]> = {
  EN: ['Restaurants', 'Agriculture', 'Industry', 'Residential', 'Education', 'Healthcare', 'Logistics', 'Retail', 'Construction'],
  ES: ['Restaurantes', 'Agricultura', 'Industria', 'Residenciales', 'Educación', 'Salud', 'Logística', 'Comercio', 'Construcción'],
}

// Logo actual = 130px de ancho (radio ~65px). Los radios de las órbitas dejan
// un margen claro respecto al logo y entre sí, sin encimarse:
//   logo borde 65px → anillo interior (radio 90, icono 32 → cubre 74–106px)
//   → anillo exterior (radio 135, icono 38 → cubre 116–154px) → contenedor 340px (margen 170px)
const LOGO_SIZE = 130

function TechBadge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div
      className="flex size-full items-center justify-center rounded-full border border-slate-700 bg-slate-800 shadow-lg opacity-30 transition-opacity duration-200 hover:opacity-100"
      style={{ color }}
    >
      {children}
    </div>
  )
}

const INNER_STACK = [
  { icon: <FaReact size={18} />, color: '#61DAFB' },
  { icon: <SiTypescript size={16} />, color: '#3178C6' },
  { icon: <SiFirebase size={16} />, color: '#FFCA28' },
  { icon: <FaNodeJs size={18} />, color: '#3C873A' },
]

const OUTER_STACK = [
  { icon: <SiNestjs size={20} />, color: '#E0234E' },
  { icon: <FaAndroid size={20} />, color: '#3DDC84' },
  { icon: <FaApple size={20} />, color: '#E5E7EB' },
  { icon: <SiTailwindcss size={20} />, color: '#38BDF8' },
]

const Header = ({ data, language, toggleLanguage }: HeaderProps) => (
  <section id="home" className="relative min-h-screen bg-slate-900 flex flex-col">
    <Navbar language={language} toggleLanguage={toggleLanguage} />

    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-6 max-w-3xl"
      >
        <div className="relative flex h-[340px] w-[340px] items-center justify-center">
          <img
            src={corestackLogo}
            alt="Corestack"
            width={LOGO_SIZE}
            className="relative z-10"
          />

          {/* Envuelve ambos anillos en su propio flex centrado (mismo truco de
              static-position que ya arregla el centrado). La opacidad ya NO
              va acá — un opacity en el padre limita a todos los hijos como
              techo, así que cada ícono nunca podría "superarlo" en hover.
              Por eso el opacity-30 + hover:opacity-100 vive en TechBadge. */}
          <div className="absolute inset-0 flex items-center justify-center">
            <OrbitingCircles radius={90} duration={64} iconSize={32} reverse>
              {INNER_STACK.map((tech, i) => (
                <TechBadge key={i} color={tech.color}>
                  {tech.icon}
                </TechBadge>
              ))}
            </OrbitingCircles>

            <OrbitingCircles radius={135} duration={104} iconSize={38}>
              {OUTER_STACK.map((tech, i) => (
                <TechBadge key={i} color={tech.color}>
                  {tech.icon}
                </TechBadge>
              ))}
            </OrbitingCircles>
          </div>
        </div>

        <h1 className="mt-2 text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
          {data.name.split(' ').slice(0, -1).join(' ')}{' '}
          <span style={{ color: ELECTRIC_BLUE }}>{data.name.split(' ').slice(-1)}</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
          <span className="text-blue-400 font-semibold">{data.occupation}</span>
          {' — '}
          {data.description}
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {SECTORS[language].map(sector => (
            <span
              key={sector}
              className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-medium tracking-wide"
            >
              {sector}
            </span>
          ))}
          <span className="px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/50 text-blue-400 text-xs font-medium tracking-wide">
            {language === 'EN' ? 'more...' : 'más...'}
          </span>
        </div>

        <div className="flex items-center gap-5">
          {data.social.map(network => (
            <a
              key={network.name}
              href={network.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
            >
              {ICON_MAP[network.name] ?? null}
            </a>
          ))}
        </div>

        <motion.button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg shadow-blue-600/30"
        >
          {language === 'EN' ? 'Learn More' : 'Saber más'}
        </motion.button>

        {/* En flujo normal (ya no absolute bottom-8): el espaciado del gap-6
            del padre lo separa del botón automáticamente, sin importar la
            altura de la pantalla — no puede volver a solaparse. */}
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-slate-500 hover:text-blue-400 transition-colors duration-200 animate-bounce"
          aria-label="Scroll down"
        >
          <FaChevronDown size={24} />
        </button>
      </motion.div>
    </div>
  </section>
)

export default Header
