const { ethers } = require("hardhat")
const { expect } = require("chai")

describe("Get login and password stored as private variables", () => {
    it("reads the two variables", async () => {
        // constructor arguements
        const userNameBytes = ethers.utils.formatBytes32String("Some Name")
        const passwordBytes = ethers.utils.formatBytes32String("Some Password")

        // Deploying the Login contract
        const LoginFactory = await ethers.getContractFactory("Login")
        const Login = await LoginFactory.deploy(userNameBytes, passwordBytes)
        await Login.deployed()

        // Getting private variables at storage slot 0 and 1
        const slot0Val = await ethers.provider.getStorageAt(Login.address, 0)
        const slot1Val = await ethers.provider.getStorageAt(Login.address, 1)

        // Checking expected and return values
        expect(ethers.utils.parseBytes32String(slot0Val)).to.be.equal("Some Name")
        expect(ethers.utils.parseBytes32String(slot1Val)).to.be.equal("Some Password")
    })
})
