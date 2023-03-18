import { useSelector } from 'react-redux'
import {
  AddLiquidityResult,
  getAddLiquidityResult,
  getInitAddLiquidityResult,
  TokenPairState,
  tryBigIntToString,
  tryStringToBigInt
} from '../../utils/dex'
import { selectMintState } from './selectors'
import { useMemo } from 'react'
import { useTokenPairState } from '../useTokenPairState'

export function useDerivedMintInfo(setError: (err: string | undefined) => void): {
  tokenAInput: string | undefined,
  tokenBInput: string | undefined,
  tokenAAmount: bigint | undefined,
  tokenBAmount: bigint | undefined,
  tokenPairState: TokenPairState | undefined,
  addLiquidityResult: AddLiquidityResult | undefined,
} {
  const { lastInput, inputValue, otherInputValue, tokenAInfo, tokenBInfo } = useSelector(selectMintState)
  const { state: tokenPairState, error: getTokenPairStateError } = useTokenPairState(tokenAInfo, tokenBInfo)

  const parsedAmount = useMemo(() => {
    const tokenInfo = lastInput === 'TokenA' ? tokenAInfo : tokenBInfo
    try {
      return tryStringToBigInt(inputValue, tokenInfo?.decimals)
    } catch (error) {
      console.log(`Invalid input: ${inputValue}, ${tokenInfo?.decimals}`)
      setError(`${error}`)
      return undefined
    }
  }, [lastInput, tokenAInfo, tokenBInfo, inputValue, setError])

  const otherAmount = useMemo(() => {
    const tokenInfo = lastInput === 'TokenA' ? tokenBInfo : tokenAInfo
    try {
      return tryStringToBigInt(otherInputValue, tokenInfo?.decimals)
    } catch (error) {
      console.log(`Invalid input: ${otherInputValue}, ${tokenInfo?.decimals}`)
      setError(`${error}`)
      return undefined
    }
  }, [otherInputValue, lastInput, tokenAInfo, tokenBInfo, setError])

  const addLiquidityResult = useMemo(() => {
    try {
      setError(getTokenPairStateError)
      if (tokenAInfo === undefined || tokenBInfo === undefined) {
        return undefined
      }
      const [tokenAId, tokenBId] = lastInput === 'TokenA' ? [tokenAInfo.id, tokenBInfo.id] : [tokenBInfo.id, tokenAInfo.id]
      if (tokenPairState !== undefined && tokenPairState.reserve0 === 0n) {
        return parsedAmount !== undefined && otherAmount !== undefined
          ? getInitAddLiquidityResult(tokenAId, tokenBId, parsedAmount, otherAmount)
          : undefined
      }
      return parsedAmount !== undefined && tokenPairState && lastInput
        ? getAddLiquidityResult(tokenPairState, tokenAId, parsedAmount, lastInput)
        : undefined
    } catch (error) {
      console.log(`${error}`)
      setError(`${error}`)
      return undefined
    }
  }, [tokenPairState, getTokenPairStateError, lastInput, tokenAInfo, tokenBInfo, parsedAmount, otherAmount, setError])

  return useMemo(() => {
    if (tokenPairState === undefined || tokenPairState.reserve0 === 0n) {
      const [tokenAInput, tokenBInput, tokenAAmount, tokenBAmount] = lastInput === 'TokenA'
        ? [inputValue, otherInputValue, parsedAmount, otherAmount]
        : [otherInputValue, inputValue, otherAmount, parsedAmount]
      return { tokenAInput, tokenBInput, tokenAAmount, tokenBAmount, tokenPairState, addLiquidityResult }
    }

    try {
      const tokenAInput = lastInput === 'TokenA' ? inputValue : tryBigIntToString(addLiquidityResult?.amountA, tokenAInfo?.decimals)
      const tokenBInput = lastInput === 'TokenB' ? inputValue : tryBigIntToString(addLiquidityResult?.amountB, tokenBInfo?.decimals)
      const tokenAAmount = lastInput === 'TokenA' ? parsedAmount : addLiquidityResult?.amountA
      const tokenBAmount = lastInput === 'TokenB' ? parsedAmount : addLiquidityResult?.amountB
      return { tokenAInput, tokenBInput, tokenAAmount, tokenBAmount, tokenPairState, addLiquidityResult }
    } catch (error) {
      console.log(`${error}`)
      setError(`${error}`)
      return { tokenAInput: undefined, tokenBInput: undefined, tokenAAmount: undefined, tokenBAmount: undefined, tokenPairState, addLiquidityResult }
    }
  }, [tokenPairState, lastInput, inputValue, otherInputValue, parsedAmount, otherAmount, addLiquidityResult, tokenAInfo, tokenBInfo, setError])
}
