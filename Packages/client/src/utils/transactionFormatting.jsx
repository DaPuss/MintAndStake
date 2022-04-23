import { BigNumber } from 'ethers';

export const formatTokenIds = (tokenIds) => {
  let ids = [];
  for (let i = 0; i < tokenIds.length; i++) {
    ids = [...ids, BigNumber.from(tokenIds[i]).toNumber()];
  }
  return ids;
};

export const formatMetadata = (ids, tokenMetadata) => {
  let metadata = [];
  for (let i = 0; i < tokenMetadata.length; i++) {
    metadata = [
      ...metadata,
      {
        id: ids[i],
        level: BigNumber.from(tokenMetadata[i][0]).toNumber(),
        gravyEaten: BigNumber.from(tokenMetadata[i][1]).toNumber(),
        rarity: BigNumber.from(tokenMetadata[i][2]).toNumber(),
        name: tokenMetadata[i][3]
      }
    ];
  }
  return metadata;
};
