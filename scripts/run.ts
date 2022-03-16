import { ethers } from "hardhat";

async function main() {
  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: ethers.utils.parseEther("0.1"),
  });

  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);

  let contractBalance = await ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(contractBalance));

  await waveContract.getTotalWaves();

  const waveTxn1 = await waveContract.wave("a message ~!");
  await waveTxn1.wait();

  const waveTxn2 = await waveContract.wave("another msg --");
  await waveTxn2.wait();

  contractBalance = await ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(contractBalance));

  const allWaves = await waveContract.getAllWaves();
  console.log(allWaves);

  // await waveContract.getTotalWaves();

  // waveTxn = await waveContract.connect(randomPerson).wave("Random person's message!");
  // await waveTxn.wait();

  // await waveContract.getTotalWaves();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
