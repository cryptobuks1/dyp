import React from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { STAKING_REWARDS_INFO, useStakingInfo } from '../../state/stake/hooks'
import { TYPE, ExternalLink } from '../../theme'
import PoolCard from '../../components/earn/PoolCard'
import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
// import { Countdown } from './Countdown'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'
import Arrow from '../../assets/svg/arrow.svg'
import Whitelist from '../../components/Whitelist'

const PageWrapper = styled(AutoColumn)`
  max-width: 100%;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`

// const SpaceBetween = styled.div`
//   display: block;
// `

export default function Earn() {
  const { chainId } = useActiveWeb3React()
  const stakingInfos = useStakingInfo()

  //console.log(stakingInfos)

  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
  `

  const stakingRewardsExist = Boolean(typeof chainId === 'number' && (STAKING_REWARDS_INFO[chainId]?.length ?? 0) > 0)

  return (
    <PageWrapper gap="lg" justify="center">
      <Whitelist />
      <TopSection gap="md">
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>DYP Staking Pools</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  Deposit your liquidity provider tokens to receive Ethereum rewards.
                </TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  In order to lower the risk of DYP price volatility, all pool rewards are automatically converted from
                  DYP to ETH by the smart contract at 00:00 UTC, and ETH is distributed as a reward to the liquidity
                  providers. <p>{'\n'}</p> Maintaining token price stability — every day at 00:00 UTC, the smart
                  contract will automatically try to convert the DYP rewards to ETH. If the DYP price is affected by
                  more than{' '}
                  <a style={{ color: 'red', textDecoration: 'none' }} href="#earn">
                    <img src={Arrow} alt="icon"></img>2.5%
                  </a>
                  , then the maximum DYP amount that does not affect the price will be swapped to ETH, with the
                  remaining amount distributed in the next day’s rewards. After seven days, if we still have
                  undistributed DYP rewards, the DeFi Yield protocol governance will vote on whether the remaining DYP
                  will be distributed to the token holders or burned (all burned tokens are removed from circulation).
                </TYPE.white>
              </RowBetween>{' '}
              <ExternalLink
                style={{ color: 'white', textDecoration: 'underline' }}
                href="https://dypfinance.medium.com/dyp-staking-pools-tutorial-82bd49e65527"
                target="_blank"
              >
                <TYPE.white fontSize={14}>DYP Staking Pools Tutorial</TYPE.white>
              </ExternalLink>
              <RowBetween />{' '}
              <ExternalLink
                style={{ color: 'white', textDecoration: 'underline' }}
                href="https://medium.com/@dypfinance/introducing-the-defi-yield-protocol-12ea2146d328"
                target="_blank"
              >
                <TYPE.white fontSize={14}>Read more about DYP</TYPE.white>
              </ExternalLink>
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </DataCard>
      </TopSection>

      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>Participating pools</TYPE.mediumHeader>
          {/*<Countdown exactEnd={stakingInfos?.[0]?.periodFinish} />*/}
        </DataRow>

        <PoolSection>
          {stakingRewardsExist && stakingInfos?.length === 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            'No active rewards'
          ) : (
            stakingInfos?.map(stakingInfo => {
              // need to sort by added liquidity here
              return <PoolCard key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} />
            })
          )}
        </PoolSection>
      </AutoColumn>
    </PageWrapper>
  )
}
