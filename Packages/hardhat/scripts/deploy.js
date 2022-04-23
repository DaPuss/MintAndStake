const hre = require("hardhat");

async function main() {

  const Gravy = await hre.ethers.getContractFactory("Gravy");
  const gravy = await Gravy.deploy();
  await gravy.deployed();
  console.log("gravy deployed to:", gravy.address);

  const Puss = await hre.ethers.getContractFactory("Puss");
  const puss = await Puss.deploy(gravy.address);
  await puss.deployed();
  console.log("puss deployed to:", puss.address);

  const Stake = await hre.ethers.getContractFactory("Stake");
  const stake = await Stake.deploy(puss.address, gravy.address);
  await stake.deployed();
  console.log("stake deployed to:", stake.address);

  await gravy.setStaker(stake.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
