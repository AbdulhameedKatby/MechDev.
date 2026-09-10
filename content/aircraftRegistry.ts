import type { AircraftData } from '../lib/types'
import concorde from './concorde'
import boeing747 from './aircraft/boeing747'
import cessna172 from './aircraft/cessna172'
import f16 from './aircraft/f16'
import sr71 from './aircraft/sr71'
import harrier from './aircraft/harrier'
import a350 from './aircraft/a350'
import x59 from './aircraft/x59'
import f35b from './aircraft/f35b'
import a380 from './aircraft/a380'
import bellX1 from './aircraft/bellX1'
import comet from './aircraft/comet'
import b2 from './aircraft/b2'
import piperCub from './aircraft/piperCub'
import spaceShipOne from './aircraft/spaceShipOne'

export const aircraftList: AircraftData[] = [
  concorde,
  boeing747,
  cessna172,
  f16,
  sr71,
  harrier,
  a350,
  x59,
  f35b,
  a380,
  bellX1,
  comet,
  b2,
  piperCub,
  spaceShipOne,
]

export const aircraftMap: Record<string, AircraftData> = {
  'concorde': concorde,
  'boeing-747': boeing747,
  'cessna-172': cessna172,
  'f16-falcon': f16,
  'sr71-blackbird': sr71,
  'harrier-vtol': harrier,
  'a350-efficiency': a350,
  'x59-nose': x59,
  'f35b-hover': f35b,
  'a380-scale': a380,
  'bell-x1': bellX1,
  'comet-failure': comet,
  'b2-spirit': b2,
  'piper-cub': piperCub,
  'spaceshipone': spaceShipOne,
}

export function getAircraftBySlug(slug: string): AircraftData | undefined {
  return aircraftMap[slug]
}
