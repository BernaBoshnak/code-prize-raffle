import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PrizeId, Prize as TPrize } from '@services/api/response/prize'
import { getPrizesWithUsersCount } from '@services/models/prize'
import Prize from './Prize'

export type TPrizes = Record<PrizeId, TPrize>

const Prizes = () => {
  const [prizes, setPrizes] = useState<TPrizes | undefined>()

  useEffect(() => {
    getPrizesWithUsersCount().then((prizes) => {
      setPrizes(prizes)
    })
  }, [])

  const headingContent =
    Object.keys(prizes ?? {}).length > 0
      ? 'All promotions'
      : 'No promotions available at this time'

  return (
    <>
      <Container className="py-2">
        <div className="codes-circle bg-danger mx-auto my-3 fs-3 text-white">
          <div className="position-absolute top-50 start-50 translate-middle">
            <FontAwesomeIcon icon={faCoins} fixedWidth />
            <div data-testid="codes-amount">
              <span className="visually-hidden">
                Total number of your codes:
              </span>
              50
            </div>
          </div>
        </div>
        <h3 className="text-dark-emphasis text-center text-uppercase mb-5">
          {prizes ? headingContent : 'Loading...'}
        </h3>
        {prizes &&
          Object.entries(prizes).map(([id, prize]) => (
            <Prize key={id} id={id} {...prize} />
          ))}
      </Container>
    </>
  )
}

export default Prizes
