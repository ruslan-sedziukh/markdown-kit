import path from 'path'
import { isLink } from './isLink'

export const getAssetPath = (
  assetsPrePath: string | undefined,
  assetPath: string
): string => {
  if (!assetsPrePath || isLink(assetPath)) {
    return assetPath
  }

  return path.join(assetsPrePath, assetPath)
}
