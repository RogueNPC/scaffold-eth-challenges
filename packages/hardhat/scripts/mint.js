/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");
const ipfsAPI = require("ipfs-http-client");

const ipfs = ipfsAPI({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

const delayMS = 1000; // sometimes xDAI needs a 6000ms break lol 😅

const main = async () => {
  // ADDRESS TO MINT TO:
  const toAddress = "YOUR_FRONTEND_ADDRESS";

  console.log("\n\n 🎫 Minting to " + toAddress + "...\n");

  const { deployer } = await getNamedAccounts();
  const yourCollectible = await ethers.getContract("YourCollectible", deployer);

  const soccerball = {
    description: "A regular soccerball",
    external_url: "https://unsplash.com/photos/dKCKiC0BQtU",  // "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: __dirname + "/images/soccerball.jpg",  // "https://austingriffith.com/images/paintings/buffalo.jpg",
    name: "Soccerball",
    attributes: [
      {
        trait_type: "Popularity",
        value: "Globally",
      },
      {
        trait_type: "Background",
        value: "Grass",
      },
      {
        trait_type: "Relevance",
        value: 50,
      },
    ],
  };
  console.log("Uploading soccerball...");
  const uploaded = await ipfs.add(JSON.stringify(soccerball));

  console.log("Minting soccerball with IPFS hash (" + uploaded.path + ")");
  await yourCollectible.mintItem(toAddress, uploaded.path, {
    gasLimit: 400000,
  });

  await sleep(delayMS);

  const volleyball = {
    description: "A regular volleyball",
    external_url: "https://unsplash.com/photos/xhC8IzemTGU", // <-- this can link to a page for the specific file too
    image: __dirname + "/images/volleyball.jpg",
    name: "Volleyball",
    attributes: [
      {
        trait_type: "Popularity",
        value: "Globally",
      },
      {
        trait_type: "Background",
        value: "Water",
      },
      {
        trait_type: "Relevance",
        value: 40,
      },
    ],
  };
  console.log("Uploading volleyball...");
  const uploadedvolleyball = await ipfs.add(JSON.stringify(volleyball));

  console.log("Minting volleyball with IPFS hash (" + uploadedvolleyball.path + ")");
  await yourCollectible.mintItem(toAddress, uploadedvolleyball.path, {
    gasLimit: 400000,
  });

  await sleep(delayMS);

  const basketball = {
    description: "A regular basketball",
    external_url: "https://unsplash.com/photos/mu7amBMAT3E", // <-- this can link to a page for the specific file too
    image: __dirname + "/images/basketball.jpg",
    name: "Basketball",
    attributes: [
      {
        trait_type: "Popularity",
        value: "Globally",
      },
      {
        trait_type: "Background",
        value: "Leaves",
      },
      {
        trait_type: "Relevance",
        value: 47,
      },
    ],
  };
  console.log("Uploading basketball...");
  const uploadedbasketball = await ipfs.add(JSON.stringify(basketball));

  console.log("Minting basketball with IPFS hash (" + uploadedbasketball.path + ")");
  await yourCollectible.mintItem(toAddress, uploadedbasketball.path, {
    gasLimit: 400000,
  });

  await sleep(delayMS);

  const golfball = {
    description: "A regular golfball",
    external_url: "https://unsplash.com/photos/PgInf7vCphw", // <-- this can link to a page for the specific file too
    image: __dirname + "/images/golfball.jpg",
    name: "Golfball",
    attributes: [
      {
        trait_type: "Popularity",
        value: "Pastime",
      },
      {
        trait_type: "Background",
        value: "Grass",
      },
      {
        trait_type: "Relevance",
        value: 27,
      },
    ],
  };
  console.log("Uploading golfball...");
  const uploadedgolfball = await ipfs.add(JSON.stringify(golfball));

  console.log("Minting golfball with IPFS hash (" + uploadedgolfball.path + ")");
  await yourCollectible.mintItem(toAddress, uploadedgolfball.path, {
    gasLimit: 400000,
  });

  await sleep(delayMS);

  console.log(
    "Transferring Ownership of YourCollectible to " + toAddress + "..."
  );

  await yourCollectible.transferOwnership(toAddress, { gasLimit: 400000 });

  await sleep(delayMS);

  const discgolf = {
    description: "A rare discgolf basket",
    external_url: "https://unsplash.com/photos/fuNrB1GjYOE", // <-- this can link to a page for the specific file too
    image: __dirname + "/images/discgolf.jpg",
    name: "DiscgolfBasket",
    attributes: [
      {
        trait_type: "Popularity",
        value: "Niche",
      },
      {
        trait_type: "Background",
        value: "Grass",
      },
      {
        trait_type: "Relevance",
        value: 7,
      },
    ],
  };
  console.log("Uploading discgolf...");
  const uploadeddiscgolf = await ipfs.add(JSON.stringify(discgolf));

  console.log("Minting discgolf with IPFS hash (" + uploadeddiscgolf.path + ")");
  await yourCollectible.mintItem(toAddress, uploadeddiscgolf.path, {
    gasLimit: 400000,
  });

  await sleep(delayMS);

  console.log(
    "Transferring Ownership of YourCollectible to " + toAddress + "..."
  );

  await yourCollectible.transferOwnership(toAddress, { gasLimit: 400000 });

  await sleep(delayMS);
  /*


  console.log("Minting zebra...")
  await yourCollectible.mintItem("0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1","zebra.jpg")

  */

  // const secondContract = await deploy("SecondContract")

  // const exampleToken = await deploy("ExampleToken")
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
