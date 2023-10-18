import { useLocation } from 'react-router-dom'
import * as customObject from '../../../src/utils/object'

type LocationDataProps = {
  [K in keyof ReturnType<typeof useLocation>]?: boolean
}

export const LocationData = (props: LocationDataProps = {}) => {
  const location = useLocation()

  return customObject.keys(props).map((key) => {
    return (
      <div key={key} data-testid={`location-${key}`}>
        {location[key]}
      </div>
    )
  })
}
